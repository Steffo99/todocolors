FROM node:20

WORKDIR /usr/src/todoblue
COPY ./ ./

RUN yarn install
RUN yarn run build

ENTRYPOINT ["yarn", "run", "start"]
CMD ["--port=8081"]

LABEL org.opencontainers.image.title="Todocolors Blue"
LABEL org.opencontainers.image.description="Blue(lib) frontend for Todocolors"
LABEL org.opencontainers.image.licenses="AGPL-3.0-or-later"
LABEL org.opencontainers.image.url="https://github.com/Steffo99/todocolors"
LABEL org.opencontainers.image.authors="Stefano Pigozzi <me@steffo.eu>"

EXPOSE 8081
