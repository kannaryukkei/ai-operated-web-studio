import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtemp,mkdir,rm,writeFile,symlink,readFile,stat} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {evaluateProject,initializeProject,submitArtifact,validateContract} from '../scripts/workflow-enforcement.mjs';

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
 s.approvals.push({approval_id:'APR-'+id,gate_id:id,decision:decision??g.allowed_decisions[0],subject:'Test '+id,artifact_bindings:bindings,approvers:g.required_roles.map(role=>({role,person:'Test '+role,decision:'APPROVED',decided_at:'2026-11-18T10:30:00Z',evidence_reference:'test://'+id+'/'+role})),recorded_at:'2026-11-18T10:31:00Z'});
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
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='STALE_APPROVAL'&&x.gate_id==='G2'));
});
test('missing human approval role invalidates G0',async t=>{
 const r=await root();t.after(()=>rm(r,{recursive:true,force:true}));
 const s=state();await stage(r,s,0);const g=contract.gates[0];
 const bindings=g.artifact_ids.map(id=>{const a=s.artifacts.find(x=>x.artifact_id===id);return {artifact_id:id,version:a.version,sha256:a.sha256};});
 s.approvals.push({approval_id:'APR-G0',gate_id:'G0',decision:'APPROVED',subject:'Incomplete',artifact_bindings:bindings,approvers:[{role:'studio_owner',person:'Owner',decision:'APPROVED',decided_at:'2026-11-18T10:30:00Z',evidence_reference:'test://owner'}],recorded_at:'2026-11-18T10:31:00Z'});
 assert.ok((await evaluate(r,s)).issues.some(x=>x.code==='REQUIRED_APPROVER_MISSING'));
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
