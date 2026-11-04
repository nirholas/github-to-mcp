# Documentation Site Deployment

The documentation at [github-to-mcp-docs.modelcontextprotocol.name](https://github-to-mcp-docs.modelcontextprotocol.name) is a MkDocs Material site hosted on Cloudflare Pages.

| Item | Value |
|------|-------|
| Host | Cloudflare Pages, project `github-to-mcp-docs` |
| Production URL | `https://github-to-mcp-docs.modelcontextprotocol.name` |
| Security headers | `mkdocs/docs/_headers` (copied into the build) |
| DNS | Proxied CNAME in the `modelcontextprotocol.name` Cloudflare zone, pointing to `github-to-mcp-docs.pages.dev` |

## Build

```bash
pip install -r mkdocs/python-deps.txt
cd mkdocs
mkdocs build            # output: mkdocs/site/
```

## Deploy

Export `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, then run from the repository root:

```bash
npx wrangler@4 pages deploy mkdocs/site --project-name=github-to-mcp-docs --branch=main
```

Deploys are manual. GitHub Actions is not used for this site.

## Verify

```bash
curl -sI https://github-to-mcp-docs.modelcontextprotocol.name | head -1   # HTTP/2 200
```

## Rollback

In the Cloudflare dashboard, open **Workers & Pages → github-to-mcp-docs → Deployments**.
Pick an earlier production deployment and select **Rollback to this deployment**.

## Web app

The Next.js app in `apps/web` runs on Google Cloud Run as the `github-to-mcp-web` service (project `aerial-vehicle-466722-p5`, region `us-central1`).
The Cloudflare Worker `github-to-mcp-proxy` serves `https://github-to-mcp.modelcontextprotocol.name` and forwards every request to the `run.app` URL, setting `X-Forwarded-Host`.
Redeploy the app with `gcloud run deploy github-to-mcp-web --source apps/web --region us-central1`.
