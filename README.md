# ![](media/icon.png) Todocolors

A self-hostable multiplayer todo app with Redis, Rust, WebSockets and Next.js.

> Warning:
>
> This project is currently a prototype.
> 
> Features may be changed, break, or have security issues without anything being communicated!
> 
> The code is a bit better now, but still may get rewritten from scratch for the next iteration of the project!
> 
> Use and contribute at your own risk.

## Screenshots

![Screenshot of the application, detailing a nonsensical "Plan for conquering the world"](media/screenshot.png 'Screenshot of the application, detailing a nonsensical "Plan for conquering the world')

## Architecture

The application is split in two modules:
- [todored](todored), a backend written in [Rust] built upon [axum]
- [todoblue](todoblue), a frontend written in [TypeScript] built upon [Next.JS]

[Rust]: https://www.rust-lang.org/
[axum]: https://docs.rs/axum/latest/axum/
[TypeScript]: https://www.typescriptlang.org/
[Next.JS]: https://nextjs.org/

## Installation

To deploy your own instance of Todocolors, use the files contained in `todopod/`, tweaking the `network_mode` and `ports` of the `caddy` container as you see appropriate.

Data will be stored in the `data/redis/rdata/` directory.

### Further customization

For more customization, make changes and then build your own Docker images using the provided `Dockerfile` in `todored/` and `todoblue/`.

## Build

Build instructions are provided for the two modules:
- [todored](todored/BUILD.md)
- [todoblue](todoblue/BUILD.md)

## License

This project is licensed under the [AGPL-3.0-or-later](./LICENSE.txt).

## Attribution

Open source attributions are split by module, see:
- [Todored attributions](./todored/NOTICE.md)
- [Todoblue attributions](./todoblue/NOTICE.txt)
