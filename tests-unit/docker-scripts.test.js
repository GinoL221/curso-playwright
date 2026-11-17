const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function runDockerScript(script, args = []) {
  const directory = fs.mkdtempSync(path.join(__dirname, '.docker-command-'));
  try {
    fs.writeFileSync(path.join(directory, 'docker-compose'), '#!/usr/bin/env node\nconsole.log(JSON.stringify(process.argv.slice(2)))\n', { mode: 0o755 });
    const output = execFileSync('npm', ['run', '--silent', script, '--', ...args], {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, PATH: `${directory}${path.delimiter}${process.env.PATH}` },
      encoding: 'utf8',
    });
    return JSON.parse(output.trim());
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('docker:test installs locked dependencies in the test container before running Playwright', () => {
  assert.deepEqual(runDockerScript('docker:test'), [
    'run', '--rm', 'playwright', 'sh', '-c',
    'npm ci --ignore-scripts && npx playwright test "$@"', 'sh',
  ]);
});

test('docker:test forwards Playwright arguments through the container shell', () => {
  const args = ['--list', '--project=chromium', 'tests/my test.spec.js'];
  const composeArgs = runDockerScript('docker:test', args);
  const directory = fs.mkdtempSync(path.join(__dirname, '.docker-command-'));
  try {
    fs.writeFileSync(path.join(directory, 'npm'), '#!/bin/sh\nexit 0\n', { mode: 0o755 });
    fs.writeFileSync(path.join(directory, 'npx'), '#!/usr/bin/env node\nconsole.log(JSON.stringify(process.argv.slice(2)))\n', { mode: 0o755 });
    const output = execFileSync('sh', composeArgs.slice(4), {
      env: { ...process.env, PATH: `${directory}${path.delimiter}${process.env.PATH}` },
      encoding: 'utf8',
    });
    assert.deepEqual(JSON.parse(output.trim()), ['playwright', 'test', ...args]);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('docker:up still starts Compose with orphan removal', () => {
  assert.deepEqual(runDockerScript('docker:up'), ['up', '--remove-orphans']);
});
