#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTRACT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.studio/workflow.contract.json');
const STATE_PATH = '.studio/project-state.json';
const HASH = /^[a-f0-9]{64}$/i;
const VERSION = /^\d+(?:\.\d+){0,2}$/;
const DATE = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/;
const PROJECT_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/;
const EVENT_TYPES = new Set(['PROJECT_INITIALIZED', 'ARTIFACT_SUBMITTED']);
const STUDIO_ROOT = path.resolve(path.dirname(CONTRACT_PATH), '..');

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const issue = (code, message, extra = {}) => ({ code, message, ...extra });
const versionCompare = (a, b) => {
  const left = String(a).split('.').map(Number);
  const right = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    const difference = (left[i] || 0) - (right[i] || 0);
    if (difference !== 0) return difference;
  }
  return 0;
};
const nextVersion = current => {
  if (!current) return '1.0';
  const parts = String(current).split('.').map(Number);
  parts[parts.length - 1] += 1;
  return parts.join('.');
};
const forMode = (stage, key, mode) => stage[key + '_by_mode']?.[mode] ?? stage[key] ?? [];
const isWithin = (parent, child) => child === parent || child.startsWith(parent + path.sep);
const portableRelative = value => typeof value === 'string' ? value.replaceAll('\\', '/') : '';

export function validateContract(contract) {
  const errors = [];
  if (!isObject(contract) || contract.workflow_id !== 'ai-operated-web-studio') {
    return [issue('INVALID_CONTRACT', 'Invalid workflow contract.')];
  }
  if (
    contract.runtime?.minimum_node_major < 20 ||
    contract.runtime?.api_required !== false ||
    contract.runtime?.provider_specific !== false
  ) errors.push(issue('INVALID_RUNTIME', 'Contract must be Node 20+, API-free and provider-neutral.'));
  if (!Array.isArray(contract.stages) || contract.stages.length !== 10) {
    errors.push(issue('INVALID_STAGE_COUNT', 'Exactly Stage 0-9 are required.'));
  }
  if (!Array.isArray(contract.artifacts) || !Array.isArray(contract.gates)) {
    errors.push(issue('INVALID_COLLECTIONS', 'Artifacts and gates must be arrays.'));
  }
  if (errors.length) return errors;

  const stages = new Map(contract.stages.map(stage => [stage.id, stage]));
  const artifacts = new Map(contract.artifacts.map(artifact => [artifact.id, artifact]));
  const gates = new Map(contract.gates.map(gate => [gate.id, gate]));
  if (stages.size !== 10 || artifacts.size !== contract.artifacts.length || gates.size !== contract.gates.length) {
    errors.push(issue('DUPLICATE_ID', 'Stage, artifact and gate IDs must be unique.'));
  }

  contract.stages.forEach((stage, index) => {
    if (stage.id !== 'stage-' + String(index).padStart(2, '0') || stage.number !== index) {
      errors.push(issue('STAGE_ORDER', 'Stages must be ordered stage-00 through stage-09.'));
    }
    for (const dependency of stage.dependencies ?? []) {
      if (!stages.has(dependency) || stages.get(dependency).number >= index) {
        errors.push(issue('INVALID_DEPENDENCY', stage.id + ' has invalid dependency ' + dependency));
      }
    }
    const artifactIds = [
      ...(stage.required_artifacts ?? []),
      ...Object.values(stage.required_artifacts_by_mode ?? {}).flat()
    ];
    for (const artifactId of artifactIds) {
      if (!artifacts.has(artifactId)) errors.push(issue('UNKNOWN_ARTIFACT', stage.id + ' references ' + artifactId));
    }
    const gateIds = [
      ...(stage.required_start_gates ?? []),
      ...(stage.required_completion_gates ?? []),
      ...Object.values(stage.required_start_gates_by_mode ?? {}).flat(),
      ...Object.values(stage.required_completion_gates_by_mode ?? {}).flat()
    ];
    for (const gateId of gateIds) {
      if (!gates.has(gateId)) errors.push(issue('UNKNOWN_GATE', stage.id + ' references ' + gateId));
    }
  });

  contract.artifacts.forEach(artifact => {
    if (!stages.has(artifact.stage_id)) errors.push(issue('UNKNOWN_ARTIFACT_STAGE', artifact.id + ' has unknown stage.'));
  });
  contract.gates.forEach(gate => {
    if (!Array.isArray(gate.required_roles) || !Array.isArray(gate.allowed_decisions) || !Array.isArray(gate.artifact_ids)) {
      errors.push(issue('INVALID_GATE', gate.id + ' is incomplete.'));
    }
    for (const role of gate.required_roles ?? []) {
      if (!contract.roles.includes(role)) errors.push(issue('UNKNOWN_ROLE', gate.id + ' references ' + role));
    }
    for (const artifactId of gate.artifact_ids ?? []) {
      if (!artifacts.has(artifactId)) errors.push(issue('UNKNOWN_GATE_ARTIFACT', gate.id + ' references ' + artifactId));
    }
  });
  return errors;
}

function safeRelativePath(value) {
  if (typeof value !== 'string' || !value.trim() || path.isAbsolute(value) || path.win32.isAbsolute(value)) return false;
  const parts = portableRelative(value).split('/');
  return !parts.some(part => part === '..' || part === '.' || part === '') &&
    !/^[a-z]:/i.test(portableRelative(value));
}

async function assertProjectRoot(rootPath) {
  const root = await fs.realpath(path.resolve(rootPath));
  if (!(await fs.stat(root)).isDirectory()) throw new Error('Project root must be an existing directory.');
  if (isWithin(STUDIO_ROOT, root)) {
    throw new Error('Use a separate client project repository/folder, not the shared Web Studio repository.');
  }
  return root;
}

async function writeJsonAtomic(filePath, value, projectRoot) {
  const folder = path.dirname(filePath);
  await fs.mkdir(folder, { recursive: true });
  const realFolder = await fs.realpath(folder);
  if (!isWithin(projectRoot, realFolder)) throw new Error('State directory resolves outside the project root.');
  const temporary = filePath + '.tmp-' + process.pid + '-' + Date.now();
  try {
    await fs.writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
    await fs.rename(temporary, filePath);
  } catch (error) {
    await fs.rm(temporary, { force: true }).catch(() => {});
    throw error;
  }
}

function nextEventId(events) {
  return 'EVT-' + String(events.length + 1).padStart(6, '0');
}

async function readJson(filePath, label) {
  const raw = await fs.readFile(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(label + ' invalid JSON: ' + error.message);
  }
}

async function readProjectState(root) {
  return readJson(path.join(root, STATE_PATH), 'Project state');
}

async function checkArtifact(record, definition, projectRoot) {
  const errors = [];
  if (!isObject(record)) return [issue('INVALID_ARTIFACT_RECORD', 'Artifact must be an object.')];
  if (record.stage_id !== definition.stage_id) errors.push(issue('ARTIFACT_STAGE_MISMATCH', record.artifact_id + ' stage mismatch.'));
  if (!VERSION.test(record.version ?? '')) errors.push(issue('INVALID_ARTIFACT_VERSION', record.artifact_id + ' needs numeric version.'));
  if (!safeRelativePath(record.path)) return [...errors, issue('UNSAFE_ARTIFACT_PATH', record.artifact_id + ' path must stay inside project root.')];
  if (!HASH.test(record.sha256 ?? '')) errors.push(issue('INVALID_ARTIFACT_HASH', record.artifact_id + ' needs SHA-256.'));
  if (record.status !== 'SUBMITTED') errors.push(issue('INVALID_ARTIFACT_STATUS', record.artifact_id + ' status must be SUBMITTED.'));
  if (!DATE.test(record.produced_at ?? '') || !Number.isFinite(Date.parse(record.produced_at))) {
    errors.push(issue('INVALID_ARTIFACT_TIMESTAMP', record.artifact_id + ' needs ISO timestamp.'));
  }

  let rootReal;
  let fileReal;
  try {
    rootReal = await fs.realpath(projectRoot);
    fileReal = await fs.realpath(path.resolve(rootReal, ...portableRelative(record.path).split('/')));
  } catch {
    return [...errors, issue('MISSING_ARTIFACT_FILE', record.artifact_id + ' file missing: ' + record.path)];
  }
  if (!isWithin(rootReal, fileReal) || fileReal === rootReal) {
    return [...errors, issue('ARTIFACT_PATH_ESCAPE', record.artifact_id + ' resolves outside project root.')];
  }
  if (!(await fs.stat(fileReal)).isFile()) return [...errors, issue('ARTIFACT_NOT_FILE', record.artifact_id + ' is not a file.')];
  if (HASH.test(record.sha256 ?? '')) {
    const actual = createHash('sha256').update(await fs.readFile(fileReal)).digest('hex');
    if (actual !== record.sha256.toLowerCase()) {
      errors.push(issue('ARTIFACT_HASH_MISMATCH', record.artifact_id + ' changed after submission; investigate integrity before continuing.'));
    }
  }
  return errors;
}

function checkApproval(approval, gate, currentArtifacts, validVersions, contract, mode) {
  const errors = [];
  if (!isObject(approval)) return [issue('INVALID_APPROVAL', gate.id + ' must be an object.')];
  if (
    typeof approval.approval_id !== 'string' || !approval.approval_id.trim() ||
    approval.gate_id !== gate.id ||
    typeof approval.subject !== 'string' || !approval.subject.trim()
  ) errors.push(issue('INVALID_APPROVAL_METADATA', gate.id + ' needs ID, matching gate and subject.'));
  if (!gate.allowed_decisions.includes(approval.decision)) errors.push(issue('INVALID_GATE_DECISION', gate.id + ' decision is not allowed.'));
  if (gate.conditional_preview_only && approval.decision === 'CONDITIONAL_PREVIEW' && mode !== 'preview_only') {
    errors.push(issue('PREVIEW_APPROVAL_NOT_PRODUCTION', 'Conditional G0 cannot authorize production.'));
  }

  const bindings = Array.isArray(approval.artifact_bindings) ? approval.artifact_bindings : [];
  if (!Array.isArray(approval.artifact_bindings)) errors.push(issue('MISSING_APPROVAL_BINDINGS', gate.id + ' needs artifact bindings.'));
  const bindingMap = new Map(bindings.filter(isObject).map(binding => [binding.artifact_id, binding]));
  if (bindingMap.size !== bindings.length) errors.push(issue('INVALID_APPROVAL_BINDING', gate.id + ' has malformed or duplicate bindings.'));
  for (const artifactId of gate.artifact_ids) {
    const current = currentArtifacts.get(artifactId);
    const binding = bindingMap.get(artifactId);
    if (!current) errors.push(issue('GATE_ARTIFACT_MISSING', gate.id + ' requires ' + artifactId));
    else if (!validVersions.has(artifactId + '@' + current.version)) errors.push(issue('GATE_ARTIFACT_INVALID', gate.id + ' cannot bind invalid ' + artifactId));
    else if (!binding || binding.version !== current.version || binding.sha256 !== current.sha256) {
      errors.push(issue('STALE_APPROVAL', gate.id + ' is not bound to current ' + artifactId + ' version/hash.'));
    }
  }
  if (bindingMap.size !== gate.artifact_ids.length) errors.push(issue('UNEXPECTED_APPROVAL_BINDING', gate.id + ' has unrelated or missing bindings.'));

  const approvers = new Map();
  if (!Array.isArray(approval.approvers)) errors.push(issue('MISSING_APPROVERS', gate.id + ' needs approvers.'));
  for (const approver of Array.isArray(approval.approvers) ? approval.approvers : []) {
    if (!isObject(approver) || !contract.roles.includes(approver.role) || approvers.has(approver.role)) {
      errors.push(issue('INVALID_APPROVER', gate.id + ' has invalid/duplicate role.'));
      continue;
    }
    approvers.set(approver.role, approver);
    if (
      approver.decision !== 'APPROVED' ||
      typeof approver.person !== 'string' || !approver.person.trim() ||
      !DATE.test(approver.decided_at ?? '') ||
      typeof approver.evidence_reference !== 'string' || !approver.evidence_reference.trim()
    ) errors.push(issue('INCOMPLETE_APPROVER', gate.id + ' approver lacks person, date or evidence.'));
  }
  for (const role of gate.required_roles) if (!approvers.has(role)) errors.push(issue('REQUIRED_APPROVER_MISSING', gate.id + ' requires ' + role));
  for (const role of approvers.keys()) if (!gate.required_roles.includes(role)) errors.push(issue('UNEXPECTED_APPROVER_ROLE', gate.id + ' does not accept ' + role));
  if (!DATE.test(approval.recorded_at ?? '') || !Number.isFinite(Date.parse(approval.recorded_at))) {
    errors.push(issue('INVALID_APPROVAL_TIMESTAMP', gate.id + ' needs recorded_at.'));
  }
  return errors;
}

export async function evaluateProject({ contract, state, projectRoot }) {
  const errors = validateContract(contract);
  if (errors.length) return { ok: false, issues: errors, gates: [], stages: [], current_stage: null };
  if (!isObject(state)) {
    return { ok: false, issues: [issue('INVALID_PROJECT_STATE', 'State must be a JSON object.')], gates: [], stages: [], current_stage: null };
  }

  const allowedFields = ['schema_version', 'workflow_id', 'project_id', 'delivery_mode', 'artifacts', 'approvals', 'events'];
  for (const key of Object.keys(state)) {
    if (!allowedFields.includes(key)) {
      errors.push(issue(
        key === 'stages' || key === 'stage_statuses' ? 'UNTRUSTED_STAGE_STATUS_FIELD' : 'UNKNOWN_STATE_FIELD',
        'Unexpected state field ' + key + '. Stage status is derived.'
      ));
    }
  }
  if (state.schema_version !== contract.schema_version || state.workflow_id !== contract.workflow_id) {
    errors.push(issue('STATE_CONTRACT_MISMATCH', 'State schema/workflow mismatch.'));
  }
  if (typeof state.project_id !== 'string' || !PROJECT_ID.test(state.project_id)) {
    errors.push(issue('INVALID_PROJECT_ID', 'Use a stable project ID (3-64 letters, numbers, dots, underscores or hyphens).'));
  }
  if (!contract.project_modes.includes(state.delivery_mode)) errors.push(issue('INVALID_DELIVERY_MODE', 'Choose preview_only or production.'));
  if (!Array.isArray(state.artifacts) || !Array.isArray(state.approvals) || !Array.isArray(state.events)) {
    errors.push(issue('INVALID_STATE_COLLECTIONS', 'artifacts, approvals and events must be arrays.'));
  }
  if (errors.length) return { ok: false, issues: errors, gates: [], stages: [], current_stage: null };

  const definitions = new Map(contract.artifacts.map(artifact => [artifact.id, artifact]));
  const validArtifactVersions = new Set();
  const seenArtifactVersions = new Set();
  for (const record of state.artifacts) {
    if (!isObject(record) || !definitions.has(record.artifact_id)) {
      errors.push(issue('UNKNOWN_ARTIFACT', 'Unknown artifact entry.'));
      continue;
    }
    const key = record.artifact_id + '@' + record.version;
    if (seenArtifactVersions.has(key)) errors.push(issue('DUPLICATE_ARTIFACT_VERSION', 'Duplicate ' + key));
    seenArtifactVersions.add(key);
    const artifactErrors = await checkArtifact(record, definitions.get(record.artifact_id), projectRoot);
    artifactErrors.forEach(item => errors.push({ ...item, artifact_id: record.artifact_id }));
    if (!artifactErrors.length) validArtifactVersions.add(key);
  }

  const currentArtifacts = new Map();
  for (const record of state.artifacts) {
    if (!definitions.has(record?.artifact_id)) continue;
    const previous = currentArtifacts.get(record.artifact_id);
    if (!previous || versionCompare(record.version, previous.version) > 0) currentArtifacts.set(record.artifact_id, record);
  }

  const approvalMap = new Map();
  const approvalIds = new Set();
  for (const approval of state.approvals) {
    if (
      !isObject(approval) ||
      !approval.approval_id ||
      !contract.gates.some(gate => gate.id === approval.gate_id) ||
      approvalIds.has(approval.approval_id) ||
      approvalMap.has(approval.gate_id)
    ) {
      errors.push(issue('DUPLICATE_OR_INVALID_APPROVAL', 'Approval IDs and gate records must be unique and reference known gates.'));
      continue;
    }
    approvalIds.add(approval.approval_id);
    approvalMap.set(approval.gate_id, approval);
  }

  const gates = contract.gates.map(gate => {
    const approval = approvalMap.get(gate.id);
    if (!approval) return { gate_id: gate.id, status: 'NOT_RECORDED', passed: false, issues: [] };
    const gateErrors = checkApproval(approval, gate, currentArtifacts, validArtifactVersions, contract, state.delivery_mode);
    gateErrors.forEach(item => errors.push({ ...item, gate_id: gate.id }));
    return { gate_id: gate.id, status: gateErrors.length ? 'INVALID' : 'PASSED', passed: gateErrors.length === 0, issues: gateErrors };
  });

  const gatePass = new Map(gates.map(gate => [gate.gate_id, gate.passed]));
  const derivedStates = new Map();
  const stages = [];
  for (const stage of contract.stages) {
    if ((stage.not_applicable_modes ?? []).includes(state.delivery_mode)) {
      derivedStates.set(stage.id, 'NOT_APPLICABLE');
      stages.push({ stage_id: stage.id, number: stage.number, status: 'NOT_APPLICABLE', can_start: false, missing_artifacts: [], missing_gates: [] });
      continue;
    }
    const dependencies = forMode(stage, 'dependencies', state.delivery_mode);
    const startGates = forMode(stage, 'required_start_gates', state.delivery_mode);
    const completionGates = forMode(stage, 'required_completion_gates', state.delivery_mode);
    const requiredArtifacts = forMode(stage, 'required_artifacts', state.delivery_mode);
    const missingDependencies = dependencies.filter(id => derivedStates.get(id) !== 'PASSED');
    const missingStartGates = startGates.filter(id => !gatePass.get(id));
    const missingCompletionGates = completionGates.filter(id => !gatePass.get(id));
    const missingArtifacts = requiredArtifacts.filter(id => !currentArtifacts.has(id));
    const invalidArtifact = requiredArtifacts.some(id => {
      const record = currentArtifacts.get(id);
      return record && !validArtifactVersions.has(id + '@' + record.version);
    });
    const submittedCount = requiredArtifacts.length - missingArtifacts.length;
    const status = missingDependencies.length
      ? 'LOCKED'
      : missingStartGates.length
        ? 'AWAITING_APPROVAL'
        : invalidArtifact
          ? 'FAILED'
          : missingArtifacts.length
            ? (submittedCount ? 'IN_PROGRESS' : 'READY')
            : missingCompletionGates.length
              ? 'AWAITING_APPROVAL'
              : 'PASSED';
    derivedStates.set(stage.id, status);
    stages.push({
      stage_id: stage.id,
      number: stage.number,
      status,
      can_start: status === 'READY' || status === 'IN_PROGRESS',
      missing_dependencies: missingDependencies,
      missing_start_gates: missingStartGates,
      missing_artifacts: missingArtifacts,
      missing_completion_gates: missingCompletionGates
    });
  }

  const eventIds = new Set();
  state.events.forEach((event, index) => {
    if (
      !isObject(event) ||
      event.event_id !== 'EVT-' + String(index + 1).padStart(6, '0') ||
      eventIds.has(event.event_id) ||
      !EVENT_TYPES.has(event.event_type) ||
      typeof event.actor !== 'string' || !event.actor.trim() ||
      !DATE.test(event.occurred_at ?? '') || !Number.isFinite(Date.parse(event.occurred_at))
    ) errors.push(issue('INVALID_EVENT_LOG', 'Event log must have ordered unique IDs, known types, actor and ISO timestamps.', { event_index: index }));

    if (event?.event_type === 'ARTIFACT_SUBMITTED' && (
      typeof event.artifact_id !== 'string' ||
      typeof event.artifact_version !== 'string' ||
      !HASH.test(event.artifact_sha256 ?? '') ||
      typeof event.stage_id !== 'string'
    )) errors.push(issue('INVALID_ARTIFACT_EVENT', 'Artifact submission event is incomplete.', { event_id: event?.event_id }));
    eventIds.add(event?.event_id);
  });

  const next = stages.find(stage => !['PASSED', 'NOT_APPLICABLE'].includes(stage.status));
  return {
    ok: errors.length === 0,
    issues: errors,
    gates,
    stages,
    current_stage: next?.stage_id ?? null,
    project_id: state.project_id,
    delivery_mode: state.delivery_mode,
    event_count: state.events.length
  };
}

export async function initializeProject({ rootPath, projectId, deliveryMode, actor = 'local-operator' }, contract) {
  const root = await assertProjectRoot(rootPath);
  if (!PROJECT_ID.test(projectId ?? '')) throw new Error('project-id must be 3-64 characters using letters, numbers, dot, underscore or hyphen.');
  if (!contract.project_modes.includes(deliveryMode)) throw new Error('mode must be preview_only or production.');
  if (typeof actor !== 'string' || !actor.trim()) throw new Error('actor must be a non-empty display label.');

  const studioFolder = path.join(root, '.studio');
  await fs.mkdir(studioFolder, { recursive: true });
  if (!isWithin(root, await fs.realpath(studioFolder))) throw new Error('.studio directory resolves outside the project root.');
  const statePath = path.join(studioFolder, 'project-state.json');
  try {
    await fs.lstat(statePath);
    throw new Error('Project state already exists. Initialization never overwrites an existing project.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const artifactRoot = path.join(root, 'project-artifacts');
  await fs.mkdir(artifactRoot, { recursive: true });
  if (!isWithin(root, await fs.realpath(artifactRoot))) throw new Error('project-artifacts directory resolves outside the project root.');

  const now = new Date().toISOString();
  const state = {
    schema_version: contract.schema_version,
    workflow_id: contract.workflow_id,
    project_id: projectId,
    delivery_mode: deliveryMode,
    artifacts: [],
    approvals: [],
    events: [{
      event_id: 'EVT-000001',
      event_type: 'PROJECT_INITIALIZED',
      occurred_at: now,
      actor: actor.trim(),
      project_id: projectId,
      delivery_mode: deliveryMode
    }]
  };
  await writeJsonAtomic(statePath, state, root);
  return { root, state, state_path: path.relative(root, statePath).split(path.sep).join('/') };
}

async function resolveProjectFile(root, relativeFile) {
  if (!safeRelativePath(relativeFile)) throw new Error('file must be a project-relative path without traversal or absolute paths.');
  const normalized = portableRelative(relativeFile);
  let realFile;
  try {
    realFile = await fs.realpath(path.resolve(root, ...normalized.split('/')));
  } catch {
    throw new Error('Source file does not exist: ' + relativeFile);
  }
  if (!isWithin(root, realFile) || realFile === root) throw new Error('Source file resolves outside the project root.');
  if (!(await fs.stat(realFile)).isFile()) throw new Error('Source path must point to a file.');
  return realFile;
}

export async function submitArtifact({ rootPath, artifactId, filePath, version, actor = 'local-operator' }, contract) {
  const root = await assertProjectRoot(rootPath);
  if (typeof actor !== 'string' || !actor.trim()) throw new Error('actor must be a non-empty display label.');
  if (typeof artifactId !== 'string' || !artifactId.trim()) throw new Error('artifact is required.');
  const definition = contract.artifacts.find(artifact => artifact.id === artifactId);
  if (!definition) throw new Error('Unknown artifact ID: ' + artifactId);

  const statePath = path.join(root, STATE_PATH);
  const state = await readProjectState(root);
  const before = await evaluateProject({ contract, state, projectRoot: root });
  if (!before.ok) throw new Error('Project state is invalid. Run validate and investigate issues before submitting another artifact.');

  const activeStage = before.stages.find(stage => stage.stage_id === before.current_stage);
  if (!activeStage || !['READY', 'IN_PROGRESS'].includes(activeStage.status)) {
    throw new Error('No stage is currently accepting artifacts.');
  }
  if (definition.stage_id !== activeStage.stage_id) {
    throw new Error('Artifact belongs to ' + definition.stage_id + ', but active stage is ' + activeStage.stage_id + '. Later-stage artifacts are locked.');
  }

  const sourceFile = await resolveProjectFile(root, filePath);
  const existing = state.artifacts.filter(record => record.artifact_id === artifactId);
  const latest = existing.reduce((highest, record) => !highest || versionCompare(record.version, highest) > 0 ? record.version : highest, null);
  const newVersion = version ?? nextVersion(latest);
  if (!VERSION.test(newVersion)) throw new Error('version must be numeric, e.g. 1.0 or 1.0.1.');
  if (latest && versionCompare(newVersion, latest) <= 0) throw new Error('New artifact version must be greater than the current version (' + latest + ').');
  if (existing.some(record => record.version === newVersion)) throw new Error('This artifact version already exists.');

  const extension = path.extname(sourceFile);
  const safeExtension = /^\.[A-Za-z0-9]{1,10}$/.test(extension) ? extension.toLowerCase() : '.txt';
  const relativeDestination = [
    'project-artifacts', definition.stage_id, artifactId, 'v' + newVersion, artifactId + safeExtension
  ].join('/');
  const absoluteDestination = path.resolve(root, ...relativeDestination.split('/'));
  const destinationFolder = path.dirname(absoluteDestination);
  await fs.mkdir(destinationFolder, { recursive: true });
  if (!isWithin(root, await fs.realpath(destinationFolder))) throw new Error('Artifact destination resolves outside the project root.');

  let created = false;
  try {
    const bytes = await fs.readFile(sourceFile);
    await fs.writeFile(absoluteDestination, bytes, { flag: 'wx' });
    created = true;
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const occurredAt = new Date().toISOString();
    const record = {
      artifact_id: artifactId,
      stage_id: definition.stage_id,
      version: newVersion,
      path: relativeDestination,
      sha256,
      status: 'SUBMITTED',
      produced_at: occurredAt
    };
    const event = {
      event_id: nextEventId(state.events),
      event_type: 'ARTIFACT_SUBMITTED',
      occurred_at: occurredAt,
      actor: actor.trim(),
      stage_id: definition.stage_id,
      artifact_id: artifactId,
      artifact_version: newVersion,
      artifact_sha256: sha256
    };
    state.artifacts.push(record);
    state.events.push(event);
    await writeJsonAtomic(statePath, state, root);
    const after = await evaluateProject({ contract, state, projectRoot: root });
    if (!after.ok) throw new Error('Submitted artifact did not pass integrity validation: ' + JSON.stringify(after.issues));
    return { artifact: record, event, evaluation: after };
  } catch (error) {
    if (created) await fs.rm(absoluteDestination, { force: true }).catch(() => {});
    throw error;
  }
}

function parseArguments(argv) {
  const [command, ...rest] = argv;
  const options = {};
  for (let index = 0; index < rest.length; index += 1) {
    const key = rest[index];
    if (key === '--help' || key === '-h') {
      options.help = true;
      continue;
    }
    if (!key.startsWith('--') || !rest[index + 1] || rest[index + 1].startsWith('--')) {
      throw new Error('Invalid argument near ' + key + '. Every option needs a value.');
    }
    const name = key.slice(2);
    if (Object.hasOwn(options, name)) throw new Error('Duplicate option: ' + key);
    options[name] = rest[index + 1];
    index += 1;
  }
  return { command, options };
}

const usage = [
  'Usage:',
  '  node scripts/workflow-enforcement.mjs validate-contract',
  '  node scripts/workflow-enforcement.mjs init --root <project-dir> --project-id <id> --mode <preview_only|production>',
  '  node scripts/workflow-enforcement.mjs status --root <project-dir>',
  '  node scripts/workflow-enforcement.mjs validate --root <project-dir>',
  '  node scripts/workflow-enforcement.mjs can-start --root <project-dir> --stage <stage-00..stage-09>',
  '  node scripts/workflow-enforcement.mjs submit-artifact --root <project-dir> --artifact <artifact-id> --file <relative-path> [--version <version>]',
  '',
  '  --actor <display-label>  Self-declared audit label; not identity authentication.',
  '  --version <version>      Must increase monotonically; otherwise auto-increments.',
].join('\n');

export async function runCommand(argv, { contractPath = CONTRACT_PATH } = {}) {
  const { command, options } = parseArguments(argv);
  if (options.help || command === 'help' || !command) {
    console.log(usage);
    return;
  }
  const contract = await readJson(path.resolve(contractPath), 'Workflow contract');
  if (command === 'validate-contract') {
    const issues = validateContract(contract);
    console.log(JSON.stringify({
      ok: issues.length === 0,
      issues,
      stage_count: contract.stages?.length ?? 0,
      artifact_count: contract.artifacts?.length ?? 0,
      gate_count: contract.gates?.length ?? 0
    }, null, 2));
    if (issues.length) process.exitCode = 1;
    return;
  }

  const rootPath = path.resolve(options.root ?? process.cwd());
  if (command === 'init') {
    const result = await initializeProject({
      rootPath,
      projectId: options['project-id'],
      deliveryMode: options.mode,
      actor: options.actor
    }, contract);
    const evaluation = await evaluateProject({ contract, state: result.state, projectRoot: result.root });
    console.log(JSON.stringify({ initialized: true, ...result, evaluation }, null, 2));
    return;
  }
  if (command === 'submit-artifact') {
    const result = await submitArtifact({
      rootPath,
      artifactId: options.artifact,
      filePath: options.file,
      version: options.version,
      actor: options.actor
    }, contract);
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  if (!['status', 'validate', 'can-start'].includes(command)) throw new Error(usage);

  const root = await assertProjectRoot(rootPath);
  const state = await readProjectState(root);
  const evaluation = await evaluateProject({ contract, state, projectRoot: root });
  if (command === 'can-start') {
    const stage = evaluation.stages.find(item => item.stage_id === options.stage);
    if (!stage) throw new Error('Unknown stage: ' + options.stage);
    console.log(JSON.stringify({ ok: evaluation.ok && stage.can_start, ...stage, issues: evaluation.issues }, null, 2));
    if (!evaluation.ok || !stage.can_start) process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify(evaluation, null, 2));
  if (!evaluation.ok || evaluation.stages.some(stage => stage.status === 'FAILED')) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCommand(process.argv.slice(2)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
