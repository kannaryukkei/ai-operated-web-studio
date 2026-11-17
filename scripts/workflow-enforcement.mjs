#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const CONTRACT_PATH=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../.studio/workflow.contract.json');
const STATE_PATH='.studio/project-state.json';
const HASH=/^[a-f0-9]{64}$/i,VERSION=/^\d+(?:\.\d+){0,2}$/,DATE=/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/;
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const err=(code,message,extra={})=>({code,message,...extra});
const versionCmp=(a,b)=>{const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number);for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return d;}return 0;};
const byMode=(s,k,m)=>s[k+'_by_mode']?.[m]??s[k]??[];
export function validateContract(c){
 const e=[];if(!obj(c)||c.workflow_id!=='ai-operated-web-studio')return [err('INVALID_CONTRACT','Invalid workflow contract.')];
 if(c.runtime?.minimum_node_major<20||c.runtime?.api_required!==false||c.runtime?.provider_specific!==false)e.push(err('INVALID_RUNTIME','Contract must be Node 20+, API-free and provider-neutral.'));
 if(!Array.isArray(c.stages)||c.stages.length!==10)e.push(err('INVALID_STAGE_COUNT','Exactly Stage 0-9 are required.'));
 if(!Array.isArray(c.artifacts)||!Array.isArray(c.gates))e.push(err('INVALID_COLLECTIONS','Artifacts and gates must be arrays.'));
 if(e.length)return e;
 const ss=new Map(c.stages.map(x=>[x.id,x])),aa=new Map(c.artifacts.map(x=>[x.id,x])),gg=new Map(c.gates.map(x=>[x.id,x]));
 if(ss.size!==10||aa.size!==c.artifacts.length||gg.size!==c.gates.length)e.push(err('DUPLICATE_ID','Stage, artifact and gate IDs must be unique.'));
 c.stages.forEach((s,i)=>{if(s.id!=='stage-'+String(i).padStart(2,'0')||s.number!==i)e.push(err('STAGE_ORDER','Stages must be ordered stage-00 to stage-09.'));
 for(const d of s.dependencies??[])if(!ss.has(d)||ss.get(d).number>=i)e.push(err('INVALID_DEPENDENCY',s.id+' has invalid dependency '+d));
 for(const id of [...(s.required_artifacts??[]),...Object.values(s.required_artifacts_by_mode??{}).flat()])if(!aa.has(id))e.push(err('UNKNOWN_ARTIFACT',s.id+' references '+id));
 for(const id of [...(s.required_start_gates??[]),...(s.required_completion_gates??[]),...Object.values(s.required_start_gates_by_mode??{}).flat(),...Object.values(s.required_completion_gates_by_mode??{}).flat()])if(!gg.has(id))e.push(err('UNKNOWN_GATE',s.id+' references '+id));});
 c.artifacts.forEach(a=>{if(!ss.has(a.stage_id))e.push(err('UNKNOWN_ARTIFACT_STAGE',a.id+' has unknown stage.'));});
 c.gates.forEach(g=>{if(!Array.isArray(g.required_roles)||!Array.isArray(g.allowed_decisions)||!Array.isArray(g.artifact_ids))e.push(err('INVALID_GATE',g.id+' is incomplete.'));
 for(const r of g.required_roles??[])if(!c.roles.includes(r))e.push(err('UNKNOWN_ROLE',g.id+' references '+r));
 for(const id of g.artifact_ids??[])if(!aa.has(id))e.push(err('UNKNOWN_GATE_ARTIFACT',g.id+' references '+id));});
 return e;
}
function safePath(p){if(typeof p!=='string'||!p.trim()||path.isAbsolute(p))return false;const a=p.replaceAll('\\\\','/').split('/');return !a.some(x=>x==='..'||x==='.')&&!/^[a-z]:/i.test(p);}
async function checkArtifact(r,d,root){
 const e=[];if(!obj(r))return [err('INVALID_ARTIFACT_RECORD','Artifact must be an object.')];
 if(r.stage_id!==d.stage_id)e.push(err('ARTIFACT_STAGE_MISMATCH',r.artifact_id+' stage mismatch.'));
 if(!VERSION.test(r.version??''))e.push(err('INVALID_ARTIFACT_VERSION',r.artifact_id+' needs numeric version.'));
 if(!safePath(r.path))return [...e,err('UNSAFE_ARTIFACT_PATH',r.artifact_id+' path must stay inside project root.')];
 if(!HASH.test(r.sha256??''))e.push(err('INVALID_ARTIFACT_HASH',r.artifact_id+' needs SHA-256.'));
 if(r.status!=='SUBMITTED')e.push(err('INVALID_ARTIFACT_STATUS',r.artifact_id+' status must be SUBMITTED.'));
 if(!DATE.test(r.produced_at??'')||!Number.isFinite(Date.parse(r.produced_at)))e.push(err('INVALID_ARTIFACT_TIMESTAMP',r.artifact_id+' needs ISO timestamp.'));
 let rr,fr;try{rr=await fs.realpath(root);fr=await fs.realpath(path.resolve(root,r.path));}catch{return [...e,err('MISSING_ARTIFACT_FILE',r.artifact_id+' file missing: '+r.path)];}
 if(!fr.startsWith(rr+path.sep))return [...e,err('ARTIFACT_PATH_ESCAPE',r.artifact_id+' resolves outside project root.')];
 if(!(await fs.stat(fr)).isFile())return [...e,err('ARTIFACT_NOT_FILE',r.artifact_id+' is not a file.')];
 if(HASH.test(r.sha256??'')){const actual=createHash('sha256').update(await fs.readFile(fr)).digest('hex');if(actual!==r.sha256.toLowerCase())e.push(err('ARTIFACT_HASH_MISMATCH',r.artifact_id+' changed after submission; create a new version and renew approvals.'));}
 return e;
}
function checkApproval(a,g,current,good,c,mode){
 const e=[];if(!obj(a))return [err('INVALID_APPROVAL',g.id+' must be an object.')];
 if(typeof a.approval_id!=='string'||!a.approval_id.trim()||a.gate_id!==g.id||typeof a.subject!=='string'||!a.subject.trim())e.push(err('INVALID_APPROVAL_METADATA',g.id+' needs ID, matching gate and subject.'));
 if(!g.allowed_decisions.includes(a.decision))e.push(err('INVALID_GATE_DECISION',g.id+' decision is not allowed.'));
 if(g.conditional_preview_only&&a.decision==='CONDITIONAL_PREVIEW'&&mode!=='preview_only')e.push(err('PREVIEW_APPROVAL_NOT_PRODUCTION','Conditional G0 cannot authorize production.'));
 const list=Array.isArray(a.artifact_bindings)?a.artifact_bindings:[];if(!Array.isArray(a.artifact_bindings))e.push(err('MISSING_APPROVAL_BINDINGS',g.id+' needs artifact bindings.'));
 const binds=new Map(list.filter(obj).map(x=>[x.artifact_id,x]));if(binds.size!==list.length)e.push(err('INVALID_APPROVAL_BINDING',g.id+' has malformed or duplicate bindings.'));
 for(const id of g.artifact_ids){const r=current.get(id),b=binds.get(id);if(!r)e.push(err('GATE_ARTIFACT_MISSING',g.id+' requires '+id));else if(!good.has(id+'@'+r.version))e.push(err('GATE_ARTIFACT_INVALID',g.id+' cannot bind invalid '+id));else if(!b||b.version!==r.version||b.sha256!==r.sha256)e.push(err('STALE_APPROVAL',g.id+' is not bound to current '+id+' version/hash.'));}
 if(binds.size!==g.artifact_ids.length)e.push(err('UNEXPECTED_APPROVAL_BINDING',g.id+' has unrelated or missing bindings.'));
 const roles=new Map();if(!Array.isArray(a.approvers))e.push(err('MISSING_APPROVERS',g.id+' needs approvers.'));
 for(const p of Array.isArray(a.approvers)?a.approvers:[]){if(!obj(p)||!c.roles.includes(p.role)||roles.has(p.role)){e.push(err('INVALID_APPROVER',g.id+' has invalid/duplicate role.'));continue;}roles.set(p.role,p);if(p.decision!=='APPROVED'||typeof p.person!=='string'||!p.person.trim()||!DATE.test(p.decided_at??'')||typeof p.evidence_reference!=='string'||!p.evidence_reference.trim())e.push(err('INCOMPLETE_APPROVER',g.id+' approver lacks person, decision, date or evidence.'));}
 for(const r of g.required_roles)if(!roles.has(r))e.push(err('REQUIRED_APPROVER_MISSING',g.id+' requires '+r));
 for(const r of roles.keys())if(!g.required_roles.includes(r))e.push(err('UNEXPECTED_APPROVER_ROLE',g.id+' does not accept '+r));
 if(!DATE.test(a.recorded_at??'')||!Number.isFinite(Date.parse(a.recorded_at)))e.push(err('INVALID_APPROVAL_TIMESTAMP',g.id+' needs recorded_at.'));
 return e;
}
export async function evaluateProject({contract,state,projectRoot}){
 const e=validateContract(contract);if(e.length)return {ok:false,issues:e,gates:[],stages:[],current_stage:null};
 if(!obj(state))return {ok:false,issues:[err('INVALID_PROJECT_STATE','State must be a JSON object.')],gates:[],stages:[],current_stage:null};
 const fields=['schema_version','workflow_id','project_id','delivery_mode','artifacts','approvals'];
 for(const k of Object.keys(state))if(!fields.includes(k))e.push(err(k==='stages'||k==='stage_statuses'?'UNTRUSTED_STAGE_STATUS_FIELD':'UNKNOWN_STATE_FIELD','Unexpected state field '+k+'. Stage status is derived.'));
 if(state.schema_version!==contract.schema_version||state.workflow_id!==contract.workflow_id)e.push(err('STATE_CONTRACT_MISMATCH','State schema/workflow mismatch.'));
 if(typeof state.project_id!=='string'||!state.project_id.trim()||state.project_id.startsWith('REPLACE-'))e.push(err('INVALID_PROJECT_ID','Use stable project ID.'));
 if(!contract.project_modes.includes(state.delivery_mode))e.push(err('INVALID_DELIVERY_MODE','Choose preview_only or production.'));
 if(!Array.isArray(state.artifacts)||!Array.isArray(state.approvals))e.push(err('INVALID_STATE_COLLECTIONS','Artifacts and approvals must be arrays.'));
 if(e.length)return {ok:false,issues:e,gates:[],stages:[],current_stage:null};
 const defs=new Map(contract.artifacts.map(x=>[x.id,x])),good=new Set(),seen=new Set();
 for(const r of state.artifacts){if(!obj(r)||!defs.has(r.artifact_id)){e.push(err('UNKNOWN_ARTIFACT','Unknown artifact entry.'));continue;}const k=r.artifact_id+'@'+r.version;if(seen.has(k))e.push(err('DUPLICATE_ARTIFACT_VERSION','Duplicate '+k));seen.add(k);const x=await checkArtifact(r,defs.get(r.artifact_id),projectRoot);x.forEach(a=>e.push({...a,artifact_id:r.artifact_id}));if(!x.length)good.add(k);}
 const current=new Map();for(const r of state.artifacts){if(!defs.has(r?.artifact_id))continue;const o=current.get(r.artifact_id);if(!o||versionCmp(r.version,o.version)>0)current.set(r.artifact_id,r);}
 const approvals=new Map(),ids=new Set();for(const a of state.approvals){if(!obj(a)||!a.approval_id||ids.has(a.approval_id)||approvals.has(a.gate_id)){e.push(err('DUPLICATE_OR_INVALID_APPROVAL','Approval IDs and gate records must be unique.'));continue;}ids.add(a.approval_id);approvals.set(a.gate_id,a);}
 const gates=contract.gates.map(g=>{const a=approvals.get(g.id);if(!a)return {gate_id:g.id,status:'NOT_RECORDED',passed:false,issues:[]};const x=checkApproval(a,g,current,good,contract,state.delivery_mode);x.forEach(z=>e.push({...z,gate_id:g.id}));return {gate_id:g.id,status:x.length?'INVALID':'PASSED',passed:!x.length,issues:x};});
 const gatePass=new Map(gates.map(x=>[x.gate_id,x.passed])),states=new Map(),stages=[];
 for(const s of contract.stages){if((s.not_applicable_modes??[]).includes(state.delivery_mode)){states.set(s.id,'NOT_APPLICABLE');stages.push({stage_id:s.id,number:s.number,status:'NOT_APPLICABLE',can_start:false,missing_artifacts:[],missing_gates:[]});continue;}
 const dep=byMode(s,'dependencies',state.delivery_mode),start=byMode(s,'required_start_gates',state.delivery_mode),finish=byMode(s,'required_completion_gates',state.delivery_mode),required=byMode(s,'required_artifacts',state.delivery_mode);
 const md=dep.filter(x=>states.get(x)!=='PASSED'),ms=start.filter(x=>!gatePass.get(x)),mf=finish.filter(x=>!gatePass.get(x)),ma=required.filter(x=>!current.has(x)),bad=required.some(x=>{const a=current.get(x);return a&&!good.has(x+'@'+a.version);}),done=required.length-ma.length;
 const status=md.length?'LOCKED':ms.length?'AWAITING_APPROVAL':bad?'FAILED':ma.length?(done?'IN_PROGRESS':'READY'):mf.length?'AWAITING_APPROVAL':'PASSED';
 states.set(s.id,status);stages.push({stage_id:s.id,number:s.number,status,can_start:status==='READY'||status==='IN_PROGRESS',missing_dependencies:md,missing_start_gates:ms,missing_artifacts:ma,missing_completion_gates:mf});}
 return {ok:e.length===0,issues:e,gates,stages,current_stage:stages.find(s=>!['PASSED','NOT_APPLICABLE'].includes(s.status))?.stage_id??null,project_id:state.project_id,delivery_mode:state.delivery_mode};
}
async function readJson(p,label){const raw=await fs.readFile(p,'utf8');try{return JSON.parse(raw);}catch(e){throw new Error(label+' invalid JSON: '+e.message);}}
async function main(){const [cmd,...args]=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||!args[i+1])throw new Error('Invalid arguments.');opts[args[i].slice(2)]=args[i+1];}
 const root=path.resolve(opts.root??process.cwd()),c=await readJson(path.resolve(opts.contract??CONTRACT_PATH),'Contract');
 if(cmd==='validate-contract'){const issues=validateContract(c);console.log(JSON.stringify({ok:!issues.length,issues,stage_count:c.stages?.length??0,artifact_count:c.artifacts?.length??0,gate_count:c.gates?.length??0},null,2));if(issues.length)process.exitCode=1;return;}
 if(!['status','validate','can-start'].includes(cmd))throw new Error('Use validate-contract, status, validate or can-start.');
 const s=await readJson(path.resolve(opts.state??path.join(root,STATE_PATH)),'Project state'),v=await evaluateProject({contract:c,state:s,projectRoot:root});
 if(cmd==='can-start'){const st=v.stages.find(x=>x.stage_id===opts.stage);if(!st)throw new Error('Unknown stage.');console.log(JSON.stringify({ok:v.ok&&st.can_start,...st,issues:v.issues},null,2));if(!v.ok||!st.can_start)process.exitCode=1;return;}
 console.log(JSON.stringify(v,null,2));if(!v.ok||v.stages.some(x=>x.status==='FAILED'))process.exitCode=1;}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e.message);process.exitCode=1;});
