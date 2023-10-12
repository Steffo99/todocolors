# Development

## Prerequisites

To run `todoblue` locally for development, the following software must be installed on your local machine:

- [Node.JS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Dependencies

Before being able to run `todoblue`, dependencies must be installed via Yarn:

```console
$ yarn install
```

As with all Node.JS applications, dependencies are placed in the `node_modules/` directory.

## Configuration

Development `todoblue` instances require some environment variables to be set:

```dotenv
# The URL where the todored backend can be found at.
NEXT_PUBLIC_TODOBLUE_OVERRIDE_BASE_URL=http://ethernet.nitro.home.steffo.eu:8080
```

## Running

A run-script is provided for running the development server, and it can be run via Yarn:

```console
$ yarn run dev --port=8081
```

An HTTP server serving the local version of `todoblue` with hot-reload will become available on port `:8081`.
