import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const resolveFromRoot = (relativePath: string) =>
  fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
  resolve: {
    // The workspace packages are consumed by name from tests and from each
    // other. Point those names at the TypeScript sources so a run never
    // depends on a stale dist build.
    alias: {
      '@github-to-mcp/openapi-parser': resolveFromRoot('./packages/openapi-parser/src/index.ts'),
      '@nirholas/github-to-mcp': resolveFromRoot('./packages/core/src/index.ts'),
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'packages/*/src/**/*.ts',
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/cli.ts',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
    include: ['packages/*/src/**/*.test.ts', 'tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
