/**
 * @fileoverview The published package must be runnable with `npx @nirholas/github-to-mcp`:
 * a bin entry that the build produces with a shebang, and no dependency that
 * only exists inside this workspace (npm cannot resolve `workspace:*` or an
 * unpublished @github-to-mcp/* package, so the install itself would fail).
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');
const pkg = JSON.parse(read('../../package.json'));
const tsupConfig = read('../../tsup.config.ts');

describe('@nirholas/github-to-mcp package', () => {
  it('declares a bin named after the package that the CLI build emits', () => {
    expect(pkg.bin['github-to-mcp']).toBe('./dist/cli.mjs');
    expect(tsupConfig).toContain("entry: ['src/cli.ts']");
    expect(tsupConfig).toContain('#!/usr/bin/env node');
  });

  it('ships dist so the bin exists in the tarball', () => {
    expect(pkg.files).toContain('dist');
  });

  it('has no runtime dependency that only resolves inside the workspace', () => {
    const deps = Object.entries(pkg.dependencies ?? {}) as [string, string][];
    const bad = deps.filter(([name, range]) => range.startsWith('workspace:') || name.startsWith('@github-to-mcp/'));
    expect(bad).toEqual([]);
  });

  it('bundles the workspace parser into the build instead', () => {
    expect(tsupConfig).toContain('@github-to-mcp/openapi-parser');
    expect(tsupConfig).toContain('noExternal');
  });
});
