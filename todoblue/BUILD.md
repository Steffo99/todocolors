# Build instructions

## Building the static pages

### Prerequisites

To build the `todoblue` package, the following must be installed on your local machine:

- [Node.JS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Install dependencies

When using Yarn, dependencies must be manually installed from the lockfile:

```console
$ yarn install
```

### Build

A run-script is provided to build the Next.JS application:

```console
$ yarn run build
```

### Artifacts

Dependencies are installed in the `node_modules/` directory.

The build application is placed in the `.next/` directory.

## Building the container image

### Prerequisites

To build the `ghcr.io/steffo99/todocolors-blue` container image, the following must be installed on your local machine:

- [Docker Engine](https://docs.docker.com/engine/)

Additionally, to build a multiplatform image, [buildx](https://docs.docker.com/engine/reference/commandline/buildx/) must be configured to use the `docker-container` driver, which can be used with:

```console
# docker buildx create --use
```

### Build and push

To build the container image and push it to GitHub Containers, run:

```console
# docker buildx build . --tag ghcr.io/steffo99/todocolors-blue --platform linux/amd64,linux/arm64/v8,linux/arm/v7 --push
```

### Artifacts

The built image will be available at the `ghcr.io/steffo99/todocolors-blue:latest` tag, both on the local machine and at the remote GitHub Containers repository.
