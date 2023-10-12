# Build instructions

## Building the binary

### Prerequisites

To build the `todored` crate, the following must be installed on your local machine:

- [Rust](https://www.rust-lang.org/)
  - rustc (stable)
  - cargo

### Build

To begin compilation, run the following cargo command:

```console
$ cargo build --release
```

### Artifacts

The built executable will be available in `target/release/todored`.

## Building the container image

### Prerequisites

To build the `ghcr.io/steffo99/todocolors-red` container image, the following must be installed on your local machine:

- [Docker Engine](https://docs.docker.com/engine/)

Additionally, to build a multiplatform image, [buildx](https://docs.docker.com/engine/reference/commandline/buildx/) must be configured to use the `docker-container` driver, which can be used with:

```console
# docker buildx create --use
```

### Build and push

To build the container image and push it to GitHub Containers, run:

```console
# docker buildx build . --tag ghcr.io/steffo99/todocolors-red --platform linux/amd64,linux/arm64/v8,linux/arm/v7 --push
```

### Artifacts

The built image will be available at the `ghcr.io/steffo99/todocolors-red:latest` tag, both on the local machine and at the remote GitHub Containers repository.
