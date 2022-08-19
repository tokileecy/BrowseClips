# BrowseClips

## Site

```
-- :3000/    (Next App)
  -- /login
  -- /admin
-- :4000/    (Nest App)
  -- /api    (Swagger Doc)
-- :5555/    (Prisma Studio)
```

## VSCode Setup

Install Recommended Extensions.s

```
# vscode commend(cmd + p)
> Extensions: Show Recommended Extensions
```

## Run App

### Runing on Docker

if Docker is Running on MacOS, Enable **VirtioFS accelerated directory sharing** feature in Experimental features might speed up Yarn Linking.

1. check docker version:
  * docker version above 20.10.14
  * docker compose version above v2.4.1
2. add `.env` file to project root.
  * APP_ENV: runing mode, 'production' or 'development'
3. run apps
```sh
  sudo chmod +x docker-entrypoint.sh
  # or docker-compose up
  docker compose up
```

## Dev

1. [Nest App (apps/nest-app/README.md)](apps/nest-app/README.md)

### Refresh VSCode TypeScript Path IntelliSense

VSCode intelliSense might lost when remove and reisntall node_modules, restart TS server for get IntelliSense back.

```
# Selected a Ts file.
# vscode commend(cmd + p)
> TypeScript: Restart TS server
```

## Scripts

```sh
  # build all local docker images
  ./script/build-docker -a

  # specify app build
  ./script/build-docker <app-name>

  # also clean yarn cache
  ./scripts/clean --cache
```
