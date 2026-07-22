FROM node:24-alpine AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app

# Sometimes needed for native dependencies
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# 2. Build app
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=secret,id=gcp_credentials \
    GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/gcp_credentials \
    npm run build

# 3. Serve app
FROM base AS runner

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Needed to run app
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
