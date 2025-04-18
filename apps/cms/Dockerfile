# syntax=docker.io/docker/dockerfile:1
FROM node:22.14.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ git
WORKDIR /app

# Install pnpm directly instead of using corepack
RUN npm install -g pnpm@10.8.1

# Copy root workspace configuration
# Copy the CMS package.json
# Copy any shared libs the CMS depends on
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY libs ./libs/

# Install dependencies - set npm config for Alpine Linux (musl)
ENV PNPM_HOME=/usr/local/bin
ENV npm_config_target_libc=musl
RUN pnpm install --filter=sw-site-cms... --node-linker=hoisted

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm directly instead of using corepack
RUN npm install -g pnpm@10.8.1

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .

# Rebuild any native modules for Alpine specifically targeting musl libc
ENV npm_config_target_libc=musl
RUN cd /app && pnpm rebuild

# Build the CMS app
WORKDIR /app/apps/cms
RUN pnpm build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat python3 make g++
RUN npm install --no-save @libsql/linux-x64-musl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output to /app
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./

# Create .next directory at the right location - this is critical
RUN mkdir -p /app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static/ ./apps/cms/.next/static/

USER nextjs
EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/cms/server.js"]