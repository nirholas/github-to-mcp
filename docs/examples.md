# github-to-mcp examples

Convert any GitHub repository into an MCP server

## Example 1

```text
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  1. Fetch & Classify  →  Detect repo type (API/CLI/Lib)     │
│  2. Extract Tools     →  OpenAPI, GraphQL, Code, README     │
│  3. Generate Server   →  TypeScript or Python MCP server    │
│  4. Bundle Output     →  Complete package with dependencies │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Ready-to-use MCP Server + Config               │
└─────────────────────────────────────────────────────────────┘
```

## Example 2

```bash
npx @nirholas/github-to-mcp https://github.com/stripe/stripe-node
```

## Example 3

```bash
git clone https://github.com/nirholas/github-to-mcp.git
cd github-to-mcp
pnpm install
pnpm build
```

## Example 4

```bash
# Basic usage
node packages/core/dist/cli.mjs https://github.com/owner/repo

# Specify output directory
node packages/core/dist/cli.mjs https://github.com/owner/repo --output ./my-mcp-server

# Generate Python instead of TypeScript
node packages/core/dist/cli.mjs https://github.com/owner/repo --language python

# Include only specific extraction sources
node packages/core/dist/cli.mjs https://github.com/owner/repo --sources openapi,readme

# Use a GitHub token for private repos or higher rate limits
GITHUB_TOKEN=ghp_xxx node packages/core/dist/cli.mjs https://github.com/owner/repo
```

## Example 5

```text
POST /users      →  create_user(name: string, email: string)
GET /users/{id}  →  get_user(id: string)
PUT /users/{id}  →  update_user(id: string, name?: string, email?: string)
DELETE /users/{id} →  delete_user(id: string)
GET /users       →  list_users(page?: number, limit?: number)
```

## Example 6

```bash
# Create a new project
mycli create --name myproject --template typescript
```

## Example 7

```bash
node server.mjs
```

## Example 8

```text
https://github-to-mcp-web-lp642k3kpa-uc.a.run.app/playground?gist=abc123&name=My%20API
```


Every snippet above is taken from the [repository documentation](https://github.com/nirholas/github-to-mcp#readme).
