import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtemp,mkdir,rm,writeFile,symlink,readFile,stat} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {evaluateProject,initializeProject,submitArtifact,recordApproval,processGithubInbox,validateContract} from '../scripts/workflow-enforcement.mjs';

const here=path.dirname(fileURLToPath(import.meta.url));
const contract=JSON.parse(await readFile(path.resolve(here,'../.studio/workflow.contract.json'),'utf8'));
const root=()=>mkdtemp(path.join(os.tmpdir(),'awos-'));
const state=(mode='preview_only')=>({schema_version:contract.schema_version,workflow_id:contract.workflow_id,project_id:'TEST-001',delivery_mode:mode,artifacts:[],approvals:[],events:[]});
async function add(r,s,id,v='1.0',body='# evidence\n'){
 const d=contract.artifacts.find(x=>x.id===id),p='project-artifacts/'+d.stage_id+'/'+id+'-v'+v+'.md',f=path.join(r,p);
 await mkdir(path.dirname(f),{recursive:true});await writeFile(f,body);
 const a={artifact_id:id,stage_id:d.stage_id,version:v,path:p,sha256:createHash('sha256').update(body).digest('hex'),status:'SUBMITTED',produced_at:'2026-11-18T10:00:00Z'};
 s.artifacts=s.artifacts.filter(x=>!(x.artifact_id===id&&x.version===v));s.artifacts.push(a);return a;
}
async function stage(r,s,i){for(const id of contract.stages[i].required_artifacts??[])await add(r,s,id);}
async function approve(r,s,id,decision){
 const g=contract.gates.find(x=>x.id===id),bindings=[];
 for(const x of g.artifact_ids){let a=s.artifacts.filter(y=>y.artifact_id===x).at(-1);if(!a)a=await add(r,s,x);bindings.push({artifact_id:x,version:a.version,sha256:a.sha256});}
 s.approvals=s.approvals.filter(x=>x.gate_id!==id);
 s.approvals.push({approval_id:'APR-'+id,gate_id:id,decision:decision??g.allowed_decisions[0],subject:'Test '+id,artifact_bindings:bindings,approvers:g.required_roles.map(role=>({role,person:'Test '+role,decision:'APPROVED',decided_at:'2026-11-18T10:30:00Z',evidence_reference:'test://'+id+'/'+role,identity_source:'self_declared'})),recorded_at:'2026-11-18T10:31:00Z'});
}
async function progress(r,s,n){for(let i=0;i<=n;i++){await stage(r,s,i);if(i===2)await approve(r,s,'G1');if(i===4)await approve(r,s,'G2');if(i===5)await approve(r,s,'G3');}await approve(r,s,'G0',s.delivery_mode==='preview_only'?'CONDITIONAL_PREVIEW':'APPROVED');}
const evaluate=(r,s)=>evaluateProject({contract,state:s,projectRoot:r});

test('Contract is Stage 0-9, API-free and provider-neutral',()=>{
 assert.deepEqual(validateContract(contract),[]);
 assert.equal(contract.stages.length,10);assert.equal(contract.gates.length,8);
 assert.equal(contract.runtime.api_required,false);assert.equal(contract.runtime.provider_specific,false);
});
test('new project opens Stage 0 and locks Stage 1',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const x=await evaluate(r,state());assert.equal(x.stages[0].status,'READY');assert.equal(x.stages[1].status,'LOCKED');
});
test('project initialization creates a fresh preview-only state and first event',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const result=await initializeProject({rootPath:r,projectId:'LAUNDRY-CERIA',deliveryMode:'preview_only',actor:'test-operator'},contract);
 assert.equal(result.state.events[0].event_type,'PROJECT_INITIALIZED');
 assert.equal(result.state.project_id,'LAUNDRY-CERIA');
 assert.equal((await stat(path.join(r,'project-artifacts'))).isDirectory(),true);
 assert.equal((await evaluate(r,result.state)).stages[0].status,'READY');
});
test('initialization refuses to overwrite an existing project state',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 await assert.rejects(()=>initializeProject({rootPath:r,projectId:'PROJECT-002',deliveryMode:'production'},contract),/already exists/);
 const saved=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal(saved.project_id,'PROJECT-001');
});
test('initialization rejects malformed project IDs and delivery modes',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await assert.rejects(()=>initializeProject({rootPath:r,projectId:'x',deliveryMode:'preview_only'},contract),/project-id/);
 await assert.rejects(()=>initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'live'},contract),/mode/);
});
test('Stage 1 is locked until Stage 0 artifacts exist',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await add(r,s,'raw-material-index');const x=await evaluate(r,s);
 assert.equal(x.stages[0].status,'IN_PROGRESS');assert.equal(x.stages[1].status,'LOCKED');
});
test('artifact submission snapshots file, hashes it and appends history',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 await mkdir(path.join(r,'drafts'),{recursive:true});await writeFile(path.join(r,'drafts/Raw Material Index.md'),'source packet v1');
 const result=await submitArtifact({rootPath:r,artifactId:'raw-material-index',filePath:'drafts/Raw Material Index.md'},contract);
 assert.equal(result.artifact.version,'1.0');assert.equal(result.event.event_type,'ARTIFACT_SUBMITTED');
 assert.equal(result.evaluation.stages[0].status,'IN_PROGRESS');
 const stored=await readFile(path.join(r,result.artifact.path),'utf8');assert.equal(stored,'source packet v1');
 const manifest=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal(manifest.artifacts.length,1);assert.equal(manifest.events.length,2);
 assert.equal(manifest.artifacts[0].sha256,createHash('sha256').update(stored).digest('hex'));
});
test('revised submission auto-increments version and preserves prior immutable snapshot',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 await mkdir(path.join(r,'drafts'),{recursive:true});await writeFile(path.join(r,'drafts/source.md'),'v1');
 const first=await submitArtifact({rootPath:r,artifactId:'raw-material-index',filePath:'drafts/source.md'},contract);
 await writeFile(path.join(r,'drafts/source.md'),'v2 revised');
 const second=await submitArtifact({rootPath:r,artifactId:'raw-material-index',filePath:'drafts/source.md'},contract);
 assert.equal(first.artifact.version,'1.0');assert.equal(second.artifact.version,'1.1');
 assert.equal(await readFile(path.join(r,first.artifact.path),'utf8'),'v1');
 assert.equal(await readFile(path.join(r,second.artifact.path),'utf8'),'v2 revised');
 const manifest=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal((await evaluate(r,manifest)).ok,true);
});
test('artifact submission rejects a future-stage artifact while Stage 0 is active',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 await mkdir(path.join(r,'drafts'),{recursive:true});await writeFile(path.join(r,'drafts/offer.md'),'offer');
 await assert.rejects(()=>submitArtifact({rootPath:r,artifactId:'offer-matrix',filePath:'drafts/offer.md'},contract),/Later-stage artifacts are locked/);
});
test('artifact submission rejects unknown artifact IDs',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 await assert.rejects(()=>submitArtifact({rootPath:r,artifactId:'nonexistent',filePath:'x.md'},contract),/Unknown artifact/);
});
test('artifact submission rejects traversal and external symlink source paths',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const outside=path.join(os.tmpdir(),'awos-source-'+Date.now());await writeFile(outside,'private');t.after(()=>rm(outside,{force:true}));
 await assert.rejects(()=>submitArtifact({rootPath:r,artifactId:'raw-material-index',filePath:'../secret'},contract),/project-relative/);
 await symlink(outside,path.join(r,'outside-link'));
 await assert.rejects(()=>submitArtifact({rootPath:r,artifactId:'raw-material-index',filePath:'outside-link'},contract),/outside the project root/);
});
test('forged PASSED stage status is rejected',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();s.stages=[{stage_id:'stage-00',status:'PASSED'}];
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='UNTRUSTED_STAGE_STATUS_FIELD'));
});
test('Stage 5 requires G0 and Stage 4 plus G2',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await progress(r,s,4);s.approvals=s.approvals.filter(x=>x.gate_id!=='G0');
 const x=await evaluate(r,s),z=x.stages.find(a=>a.stage_id==='stage-05');
 assert.equal(x.stages[4].status,'PASSED');assert.equal(z.status,'AWAITING_APPROVAL');assert.deepEqual(z.missing_start_gates,['G0']);
});
test('production Stage 8 blocks until G4, G5 and G6',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state('production');await progress(r,s,7);const z=(await evaluate(r,s)).stages[8];
 assert.equal(z.status,'AWAITING_APPROVAL');assert.deepEqual(z.missing_start_gates,['G4','G5','G6']);
});
test('production Stage 8 opens only after approvals bind current QA artifacts',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state('production');await progress(r,s,7);await approve(r,s,'G4');await approve(r,s,'G5');await approve(r,s,'G6');
 const x=await evaluate(r,s);assert.equal(x.ok,true);assert.equal(x.stages[8].status,'READY');
});
test('production Stage 8 passes only after release artifacts and G7',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state('production');await progress(r,s,7);await approve(r,s,'G4');await approve(r,s,'G5');await approve(r,s,'G6');
 for(const id of contract.stages[8].required_artifacts_by_mode.production)await add(r,s,id);
 let x=await evaluate(r,s);assert.equal(x.stages[8].status,'AWAITING_APPROVAL');await approve(r,s,'G7');
 x=await evaluate(r,s);assert.equal(x.stages[8].status,'PASSED');assert.equal(x.stages[9].status,'READY');
});
test('preview-only skips release stage but may enter calibration after QA',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await progress(r,s,7);const x=await evaluate(r,s);
 assert.equal(x.stages[8].status,'NOT_APPLICABLE');assert.equal(x.stages[9].status,'READY');
});
test('artifact checksum mismatch fails the stage',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state(),a=await add(r,s,'raw-material-index');await writeFile(path.join(r,a.path),'tampered');
 const x=await evaluate(r,s);assert.ok(x.issues.some(y=>y.code==='ARTIFACT_HASH_MISMATCH'));assert.equal(x.stages[0].status,'FAILED');
});
test('path traversal and symlink escapes are rejected',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));const s=state();
 s.artifacts.push({artifact_id:'raw-material-index',stage_id:'stage-00',version:'1.0',path:'../secret',sha256:'a'.repeat(64),status:'SUBMITTED',produced_at:'2026-11-18T10:00:00Z'});
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='UNSAFE_ARTIFACT_PATH'));
 s.artifacts=[{artifact_id:'raw-material-index',stage_id:'stage-00',version:'1.1',path:'..\\secret.txt',sha256:'b'.repeat(64),status:'SUBMITTED',produced_at:'2026-11-18T10:00:00Z'}];
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='UNSAFE_ARTIFACT_PATH'),'Windows traversal must be rejected');
 const outside=path.join(os.tmpdir(),'awos-out-'+Date.now());await writeFile(outside,'private');t.after(()=>rm(outside,{force:true}));
 await mkdir(path.join(r,'project-artifacts'),{recursive:true});await symlink(outside,path.join(r,'project-artifacts','link'));
 s.artifacts=[{artifact_id:'raw-material-index',stage_id:'stage-00',version:'1.0',path:'project-artifacts/link',sha256:createHash('sha256').update('private').digest('hex'),status:'SUBMITTED',produced_at:'2026-11-18T10:00:00Z'}];
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='ARTIFACT_PATH_ESCAPE'));
});
test('new WRP version invalidates prior G2 approval',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await progress(r,s,4);await add(r,s,'website-requirements-pack','2.0','# revised');
 const evaluation=await evaluate(r,s);
 assert.equal(evaluation.ok,true);
 assert.equal(evaluation.gates.find(x=>x.gate_id==='G2').status,'STALE');
});
test('missing human approval role leaves G0 pending',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await stage(r,s,0);const g=contract.gates[0];
 const bindings=g.artifact_ids.map(id=>{const a=s.artifacts.find(x=>x.artifact_id===id);return {artifact_id:id,version:a.version,sha256:a.sha256};});
 s.approvals.push({approval_id:'APR-G0',gate_id:'G0',decision:'APPROVED',subject:'Incomplete',artifact_bindings:bindings,approvers:[{role:'studio_owner',person:'Owner',decision:'APPROVED',decided_at:'2026-11-18T10:30:00Z',evidence_reference:'test://owner',identity_source:'self_declared'}],recorded_at:'2026-11-18T10:31:00Z'});
 const evaluation=await evaluate(r,s);
 assert.equal(evaluation.ok,true);
 assert.equal(evaluation.gates.find(x=>x.gate_id==='G0').status,'PENDING');
 assert.deepEqual(evaluation.gates.find(x=>x.gate_id==='G0').pending_roles,['client_business_owner']);
});
test('unknown gate IDs in approval records are rejected',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();s.approvals.push({approval_id:'APR-UNKNOWN',gate_id:'G99'});
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='DUPLICATE_OR_INVALID_APPROVAL'));
});
test('conditional G0 approval never authorizes production',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state('production');await stage(r,s,0);await approve(r,s,'G0','CONDITIONAL_PREVIEW');
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='PREVIEW_APPROVAL_NOT_PRODUCTION'));
});


test('approval operations accumulate required roles without invalidating a pending project',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const s=initialized.state;await stage(r,s,0);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(s,null,2)+'\n');
 const first=await recordApproval({rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',role:'studio_owner',person:'Studio owner',evidenceReference:'github-review://owner/1',subject:'Stage 0 source and claim review'},contract);
 assert.equal(first.gate.status,'PENDING');
 assert.deepEqual(first.gate.pending_roles,['client_business_owner']);
 assert.equal(first.evaluation.ok,true);
 const second=await recordApproval({rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',role:'client_business_owner',person:'Client owner',evidenceReference:'github-review://client/1',subject:'Stage 0 source and claim review'},contract);
 assert.equal(second.gate.status,'PASSED');
 assert.equal(second.evaluation.ok,true);
 assert.equal(second.approval.approvers.length,2);
 const saved=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal(saved.events.filter(x=>x.event_type==='APPROVAL_RECORDED').length,2);
});

test('approval operations reject duplicate roles and roles not required by a gate',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const s=initialized.state;await stage(r,s,0);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(s,null,2)+'\n');
 const args={rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',role:'studio_owner',person:'Owner',evidenceReference:'evidence://owner',subject:'Approve Stage 0'};
 await recordApproval(args,contract);
 await assert.rejects(()=>recordApproval(args,contract),/already approved/);
 await assert.rejects(()=>recordApproval({...args,role:'studio_operator'},contract),/not required/);
});

test('a changed bound artifact makes an approval stale and starts a fresh approval round',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const s=initialized.state;
 for(const id of contract.gates.find(x=>x.id==='G0').artifact_ids)await add(r,s,id);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(s,null,2)+'\n');
 const common={rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',subject:'Stage 0 approval'};
 await recordApproval({...common,role:'studio_owner',person:'Owner',evidenceReference:'evidence://owner'},contract);
 await recordApproval({...common,role:'client_business_owner',person:'Client',evidenceReference:'evidence://client'},contract);
 const previousId=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8')).approvals[0].approval_id;
 await mkdir(path.join(r,'drafts'),{recursive:true});
 await writeFile(path.join(r,'drafts/source-register-v2.md'),'# updated source register\n');
 await submitArtifact({rootPath:r,artifactId:'source-register',filePath:'drafts/source-register-v2.md'},contract);
 const stale=await evaluate(r,JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8')));
 assert.equal(stale.ok,true);
 assert.equal(stale.gates.find(x=>x.gate_id==='G0').status,'STALE');
 const restarted=await recordApproval({...common,role:'studio_owner',person:'Owner',evidenceReference:'evidence://owner-v2'},contract);
 assert.equal(restarted.gate.status,'PENDING');
 assert.equal(restarted.approval.approvers.length,1);
 const saved=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.notEqual(saved.approvals[0].approval_id,previousId);
 assert.ok(saved.events.some(x=>x.event_type==='APPROVAL_ROUND_RESET'&&x.previous_approval_id===previousId));
 await recordApproval({...common,role:'client_business_owner',person:'Client',evidenceReference:'evidence://client-v2'},contract);
 const finalState=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal((await evaluate(r,finalState)).gates.find(x=>x.gate_id==='G0').status,'PASSED');
});

test('GitHub inbox adapter initializes projects and snapshots submitted artifacts without a local terminal',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const writeJson=async(relative,value)=>{const f=path.join(r,relative);await mkdir(path.dirname(f),{recursive:true});await writeFile(f,JSON.stringify(value,null,2)+'\n');};
 await writeJson('.studio/inbox/project-init.json',{project_id:'LAUNDRY-CERIA',delivery_mode:'preview_only'});
 for(const id of ['raw-material-index','source-register','fact-register','asset-permission-register']){
  const f=path.join(r,'.studio/inbox/artifacts',id,'submission.md');await mkdir(path.dirname(f),{recursive:true});await writeFile(f,'# '+id+'\n');
 }
 const result=await processGithubInbox({rootPath:r,actor:'studio-owner',contract});
 assert.equal(result.processed.filter(x=>x.type==='ARTIFACT_SUBMITTED').length,4);
 const manifest=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal(manifest.project_id,'LAUNDRY-CERIA');
 assert.equal(manifest.artifacts.length,4);
 assert.equal(manifest.events[0].actor,'studio-owner');
 assert.equal((await readFile(path.join(r,manifest.artifacts[0].path),'utf8')).startsWith('# '),true);
});

test('GitHub inbox approvals require an allowlisted GitHub actor and bind each role to the current artifact versions',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const writeJson=async(relative,value)=>{const f=path.join(r,relative);await mkdir(path.dirname(f),{recursive:true});await writeFile(f,JSON.stringify(value,null,2)+'\n');};
 await writeJson('.studio/inbox/project-init.json',{project_id:'PROJECT-001',delivery_mode:'preview_only'});
 await writeJson('.studio/approver-roles.json',{schema_version:'1.0.0',github_users:{'studio-owner':['studio_owner'],'client-owner':['client_business_owner']}});
 for(const id of ['source-register','fact-register','asset-permission-register']){
  await writeJson('.studio/inbox/project-init.json',{project_id:'PROJECT-001',delivery_mode:'preview_only'});
  const f=path.join(r,'.studio/inbox/artifacts',id,'submission.md');await mkdir(path.dirname(f),{recursive:true});await writeFile(f,'# '+id+'\n');
 }
 await processGithubInbox({rootPath:r,actor:'studio-owner',contract});
 const approvalPath='.studio/inbox/approvals/G0/studio_owner.json';
 await writeJson(approvalPath,{decision:'CONDITIONAL_PREVIEW',subject:'Stage 0 approval',evidence_reference:'github://studio-owner/commit-1'});
 const first=await processGithubInbox({rootPath:r,actor:'studio-owner',contract});
 assert.equal(first.processed[0].status,'PENDING');
 const nextPath='.studio/inbox/approvals/G0/client_business_owner.json';
 await writeJson(nextPath,{decision:'CONDITIONAL_PREVIEW',subject:'Stage 0 approval',evidence_reference:'github://client-owner/commit-2'});
 const second=await processGithubInbox({rootPath:r,actor:'client-owner',contract});
 assert.equal(second.processed[0].status,'PASSED');
 const manifest=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 const approval=manifest.approvals.find(x=>x.gate_id==='G0');
 assert.equal(approval.approvers.length,2);
 assert.ok(approval.approvers.every(x=>x.identity_source==='github_actor'));
 assert.deepEqual(approval.approvers.map(x=>x.github_actor).sort(),['client-owner','studio-owner']);
});

test('GitHub inbox adapter leaves an approval request untouched when the actor is not authorized',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const s=initialized.state;await stage(r,s,0);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(s,null,2)+'\n');
 const config={schema_version:'1.0.0',github_users:{'studio-owner':['studio_owner']}};
 await mkdir(path.join(r,'.studio'),{recursive:true});
 await writeFile(path.join(r,'.studio/approver-roles.json'),JSON.stringify(config,null,2)+'\n');
 const request=path.join(r,'.studio/inbox/approvals/G0/studio_owner.json');
 await mkdir(path.dirname(request),{recursive:true});
 await writeFile(request,JSON.stringify({decision:'CONDITIONAL_PREVIEW',subject:'Approve',evidence_reference:'github://not-authorized'},null,2)+'\n');
 await assert.rejects(()=>processGithubInbox({rootPath:r,actor:'unlisted-user',contract}),/not configured as an approver/);
 assert.equal((await stat(request)).isFile(),true);
});


test('one GitHub account cannot satisfy two required approval roles',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'PROJECT-001',deliveryMode:'preview_only'},contract);
 const projectState=initialized.state;
 for(const id of contract.gates.find(x=>x.id==='G0').artifact_ids)await add(r,projectState,id);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(projectState,null,2)+'\n');
 const common={rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',person:'same-github-user',actor:'same-github-user',identitySource:'github_actor',githubActor:'same-github-user',authorizedRoles:['studio_owner','client_business_owner'],subject:'Stage 0 approval'};
 await recordApproval({...common,role:'studio_owner',evidenceReference:'github://same-user/one'},contract);
 await assert.rejects(()=>recordApproval({...common,role:'client_business_owner',evidenceReference:'github://same-user/two'},contract),/cannot satisfy multiple required roles/);
});

test('GitHub adapter template and project-state schema are valid JSON and declare least required permissions',async()=>{
 const schema=JSON.parse(await readFile(path.resolve(here,'../.studio/project-state.schema.json'),'utf8'));
 const approvers=JSON.parse(await readFile(path.resolve(here,'../.studio/github-native-adapter/approver-roles.template.json'),'utf8'));
 const workflow=await readFile(path.resolve(here,'../.studio/github-native-adapter/web-studio-operations.yml'),'utf8');
 assert.ok(schema.properties.events.items.properties.event_type.enum.includes('APPROVAL_RECORDED'));
 assert.equal(schema.properties.operating_mode.default,'client_service');
 assert.deepEqual(schema.properties.operating_mode.enum,['client_service','studio_development']);
 assert.ok(schema.properties.approvals.items.properties.approvers.items.properties.identity_source.enum.includes('development_simulation'));
 assert.deepEqual(approvers.github_users,{});
 assert.equal(approvers.development_simulation.enabled,false);
 assert.deepEqual(approvers.development_simulation.github_actors,{});
 assert.match(workflow,/contents: write/);
 assert.match(workflow,/process-github-inbox/);
 assert.match(workflow,/github\.actor/);
 assert.doesNotMatch(workflow,/secrets\.(?:GH_TOKEN|PAT|GITHUB_TOKEN)/i);
});


test('contract separates operating modes from delivery modes and defaults to strict client service',()=>{
 assert.deepEqual(contract.operating_modes,['client_service','studio_development']);
 assert.deepEqual(contract.delivery_modes,['preview_only','production']);
 assert.equal(contract.operating_mode_policy.default,'client_service');
 assert.equal(contract.operating_mode_policy.studio_development.external_release,'forbidden');
 assert.deepEqual(validateContract(contract),[]);
});

test('project initialization defaults to client service and explicitly records studio development when selected',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const client=await initializeProject({rootPath:r,projectId:'CLIENT-001',deliveryMode:'preview_only'},contract);
 assert.equal(client.state.operating_mode,'client_service');
 assert.equal(client.state.events[0].operating_mode,'client_service');
 await rm(r,{recursive:true,force:true});await mkdir(r,{recursive:true});
 const dev=await initializeProject({rootPath:r,projectId:'DEV-001',deliveryMode:'preview_only',operatingMode:'studio_development'},contract);
 assert.equal(dev.state.operating_mode,'studio_development');
 assert.equal(dev.state.events[0].operating_mode,'studio_development');
});

test('studio development can exercise a production-shaped lifecycle but never permits external release',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'DEV-001',deliveryMode:'production',operatingMode:'studio_development'},contract);
 const evaluation=await evaluate(r,initialized.state);
 assert.equal(evaluation.ok,true);
 assert.equal(evaluation.operating_mode,'studio_development');
 assert.equal(evaluation.delivery_mode,'production');
 assert.equal(evaluation.execution_class,'SIMULATION_ONLY');
 assert.equal(evaluation.external_release_allowed,false);
});

test('development simulation identities are forbidden in client service mode',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'CLIENT-001',deliveryMode:'preview_only'},contract);
 const projectState=initialized.state;
 for(const id of contract.gates.find(x=>x.id==='G0').artifact_ids)await add(r,projectState,id);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(projectState,null,2)+'\n');
 await assert.rejects(()=>recordApproval({
  rootPath:r,gateId:'G0',gateDecision:'CONDITIONAL_PREVIEW',role:'client_business_owner',
  person:'[SIMULATED] client_business_owner',evidenceReference:'test://simulated-client',
  subject:'G0 simulation',actor:'studio-owner',identitySource:'development_simulation',
  simulatedByGithubActor:'studio-owner',authorizedRoles:['client_business_owner']
 },contract),/only in studio_development/);
});

test('one GitHub account can simulate client roles in studio development without impersonating a real client',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const writeJson=async(relative,value)=>{
  const file=path.join(r,relative);await mkdir(path.dirname(file),{recursive:true});
  await writeFile(file,JSON.stringify(value,null,2)+'\n');
 };
 await writeJson('.studio/inbox/project-init.json',{
  project_id:'DEV-LAUNDRY-001',delivery_mode:'preview_only',operating_mode:'studio_development'
 });
 await writeJson('.studio/approver-roles.json',{
  schema_version:'1.0.0',
  github_users:{'studio-operator':['studio_owner']},
  development_simulation:{
   enabled:true,
   github_actors:{'studio-operator':['client_business_owner','independent_reviewer']}
  }
 });
 for(const id of contract.gates.find(x=>x.id==='G0').artifact_ids){
  const file=path.join(r,'.studio/inbox/artifacts',id,id+'.md');
  await mkdir(path.dirname(file),{recursive:true});
  await writeFile(file,'# SYNTHETIC / DEVELOPMENT ONLY\n\nTest fixture for '+id+'\n');
 }
 const submitted=await processGithubInbox({rootPath:r,actor:'studio-operator',contract});
 assert.equal(submitted.processed.filter(x=>x.type==='ARTIFACT_SUBMITTED').length,3);
 await writeJson('.studio/inbox/approvals/G0/studio_owner.json',{
  decision:'CONDITIONAL_PREVIEW',subject:'Synthetic G0 test',evidence_reference:'test://source-fixture'
 });
 await writeJson('.studio/inbox/approvals/G0/client_business_owner.json',{
  decision:'CONDITIONAL_PREVIEW',subject:'Synthetic G0 test',evidence_reference:'test://simulated-client-fixture'
 });
 const result=await processGithubInbox({rootPath:r,actor:'studio-operator',contract});
 assert.deepEqual(result.processed.map(x=>x.status).sort(),['PASSED','PASSED']);
 const manifest=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 const gate=manifest.approvals.find(x=>x.gate_id==='G0');
 assert.equal(gate.approvers.length,2);
 const studioApproval=gate.approvers.find(x=>x.role==='studio_owner');
 const simulatedApproval=gate.approvers.find(x=>x.role==='client_business_owner');
 assert.equal(studioApproval.identity_source,'github_actor');
 assert.equal(studioApproval.github_actor,'studio-operator');
 assert.equal(simulatedApproval.identity_source,'development_simulation');
 assert.equal(simulatedApproval.person,'[SIMULATED] client_business_owner');
 assert.equal(simulatedApproval.simulated_by_github_actor,'studio-operator');
 assert.equal(gate.decision,'CONDITIONAL_PREVIEW');
 assert.ok(manifest.events.some(x=>x.event_type==='APPROVAL_RECORDED'&&x.identity_source==='development_simulation'));
 const evaluation=await evaluate(r,manifest);
 assert.equal(evaluation.ok,true);
 assert.equal(evaluation.gates.find(x=>x.gate_id==='G0').status,'PASSED');
 assert.equal(evaluation.external_release_allowed,false);
});

test('development simulation allowlist cannot bypass client service mode through the GitHub inbox',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const initialized=await initializeProject({rootPath:r,projectId:'CLIENT-STRICT-001',deliveryMode:'preview_only'},contract);
 const projectState=initialized.state;
 for(const id of contract.gates.find(x=>x.id==='G0').artifact_ids)await add(r,projectState,id);
 await writeFile(path.join(r,'.studio/project-state.json'),JSON.stringify(projectState,null,2)+'\n');
 await mkdir(path.join(r,'.studio'),{recursive:true});
 await writeFile(path.join(r,'.studio/approver-roles.json'),JSON.stringify({
  schema_version:'1.0.0',github_users:{},
  development_simulation:{enabled:true,github_actors:{'studio-operator':['client_business_owner']}}
 },null,2)+'\n');
 const request=path.join(r,'.studio/inbox/approvals/G0/client_business_owner.json');
 await mkdir(path.dirname(request),{recursive:true});
 await writeFile(request,JSON.stringify({
  decision:'CONDITIONAL_PREVIEW',subject:'Strict mode test',evidence_reference:'test://fake-client'
 },null,2)+'\n');
 await assert.rejects(()=>processGithubInbox({rootPath:r,actor:'studio-operator',contract}),/not configured for role client_business_owner/);
 assert.equal((await stat(request)).isFile(),true);
 const saved=JSON.parse(await readFile(path.join(r,'.studio/project-state.json'),'utf8'));
 assert.equal(saved.approvals.length,0);
});

