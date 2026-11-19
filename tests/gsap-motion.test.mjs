import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const examplePath = fileURLToPath(new URL('../skills/gsap-motion/examples/ReactHeroMotion.js', import.meta.url));
const skillPath = fileURLToPath(new URL('../skills/gsap-motion/SKILL.md', import.meta.url));
const blankPackagePath = fileURLToPath(new URL('../blueprints/starter/blank/package.json', import.meta.url));

test('GSAP React example is valid JavaScript syntax without requiring optional GSAP packages', () => {
  const result = spawnSync(process.execPath, ['--check', examplePath], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test('GSAP React example respects reduced motion and keeps content fail-open', async () => {
  const source = await readFile(examplePath, 'utf8');
  assert.match(source, /prefers-reduced-motion: no-preference/);
  assert.match(source, /media\.revert\(\)/);
  assert.match(source, /data-motion-intro/);
  assert.doesNotMatch(source, /opacity:\s*0|autoAlpha:\s*0|display:\s*none/);
  assert.match(source, /contextSafe/);
});

test('GSAP remains an opt-in capability and its documented license boundary is explicit', async () => {
  const skill = await readFile(skillPath, 'utf8');
  const blankPackage = JSON.parse(await readFile(blankPackagePath, 'utf8'));
  assert.match(skill, /npm install gsap @gsap\/react/);
  assert.match(skill, /Do not add either dependency to the neutral Blank Starter/);
  assert.match(skill, /prefers-reduced-motion/);
  assert.match(skill, /https:\/\/gsap\.com\/standard-license/);
  assert.match(skill, /visual animation editor/);
  assert.equal(Object.keys(blankPackage.dependencies).some((name) => name.startsWith('gsap') || name === '@gsap/react'), false);
  assert.equal(Object.keys(blankPackage.devDependencies).some((name) => name.startsWith('gsap') || name === '@gsap/react'), false);
});
