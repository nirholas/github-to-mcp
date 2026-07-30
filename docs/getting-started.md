# Getting started with github-to-mcp

Convert any GitHub repository into an MCP server

## Install

```bash
npm install github-to-mcp-monorepo
```

## Verify the install

Clone the repository and run its checks to confirm everything works on your machine:

```bash
git clone https://github.com/nirholas/github-to-mcp.git
cd github-to-mcp
```

Available commands:

| Command | Runs |
|---|---|
| `npm run dev` | `pnpm --filter web dev` |
| `npm run build` | `pnpm -r build` |
| `npm run lint` | `pnpm -r lint` |
| `npm run test` | `vitest run` |
| `npm run typecheck` | `pnpm -r typecheck` |

## Next steps

- [Examples](./examples.md) shows runnable snippets.
- The [README](https://github.com/nirholas/github-to-mcp#readme) is the complete reference.
- Found a problem? [Open an issue](https://github.com/nirholas/github-to-mcp/issues).
