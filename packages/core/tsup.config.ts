import { defineConfig } from 'tsup';

export default [
  // Library build
  defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: false, // Disabled due to openapi-parser type conflicts
    sourcemap: true,
    clean: true,
    target: 'es2022',
    outExtension: () => ({ js: '.mjs' }),
    // Not published to npm: inline it so `npx @nirholas/github-to-mcp` installs.
    noExternal: ['@github-to-mcp/openapi-parser'],
  }),
  // CLI build  
  defineConfig({
    entry: ['src/cli.ts'],
    format: ['esm'],
    sourcemap: true,
    target: 'es2022',
    outExtension: () => ({ js: '.mjs' }),
    noExternal: ['@github-to-mcp/openapi-parser'],
    banner: {
      js: '#!/usr/bin/env node',
    },
  }),
];
