FROM node:20 AS base

FROM base AS builder
WORKDIR /usr/src/todoblue

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ ./
RUN yarn run build


FROM base AS runner
WORKDIR /usr/lib/todoblue

COPY --from=builder /usr/src/todoblue/public ./public
COPY --from=builder /usr/src/todoblue/.next/standalone ./
COPY --from=builder /usr/src/todoblue/.next/static ./static

ENV NODE_ENV production

ENTRYPOINT ["node", "server.js"]
CMD []

LABEL org.opencontainers.image.title="Todocolors Blue"
LABEL org.opencontainers.image.description="Blue(lib) frontend for Todocolors"
LABEL org.opencontainers.image.licenses="AGPL-3.0-or-later"
LABEL org.opencontainers.image.url="https://github.com/Steffo99/todocolors"
LABEL org.opencontainers.image.authors="Stefano Pigozzi <me@steffo.eu>"

EXPOSE 3000
