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

## Installation

To deploy your own instance of Todocolors, use the (Docker) `compose.yml` file included in `todopod/`, tweaking the `network_mode` and `ports` of the `caddy` container as you see appropriate.

Data will be stored in the `data/redis/rdata/` directory.

### Further customization

For more customization, make changes and then build your own Docker images using the provided `Dockerfile` in `todored/` and `todoblue/`.

## Credits & acknowledgements

TODO