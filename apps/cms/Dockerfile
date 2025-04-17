# syntax=docker.io/docker/dockerfile:1
FROM node:22.14.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ! TODO FIX THIS SHIT
# Install pnpm directly instead of using corepack
RUN npm install -g pnpm@10.8.1

# Copy root workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy the CMS package.json
COPY apps/cms/package.json ./apps/cms/
# Copy any shared libs the CMS depends on
COPY libs ./libs/

# ! TODO FIX THIS SHIT
# Install dependencies WITHOUT frozen-lockfile flag
RUN pnpm install --filter=sw-site-cms...

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# ! TODO FIX THIS SHIT
# Install pnpm directly instead of using corepack
RUN npm install -g pnpm@10.8.1

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./node_modules

# Copy all project files
COPY . .

# Build the CMS app
WORKDIR /app/apps/cms
RUN pnpm build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /opt/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
# COPY --from=builder /app/apps/cms/package.json ./
# COPY --from=builder /app/apps/cms/node_modules ./node_modules
# COPY --from=builder /app/apps/cms/.next ./
# COPY --from=builder /app/apps/cms/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/media ./media
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/media ./media

USER nextjs
EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/cms/server.js"]
