# Web app image for Google Cloud Run (service github-to-mcp-web).
# Build context is the repository root so the workspace packages resolve.
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile \
 && pnpm --filter @github-to-mcp/openapi-parser build \
 && pnpm --filter @nirholas/github-to-mcp build \
 && pnpm --filter web build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=8080
COPY --from=build /app /app
WORKDIR /app/apps/web
EXPOSE 8080
CMD ["sh", "-c", "exec node_modules/.bin/next start -p ${PORT}"]
