# Vtuber_Clips

## VSCode Setup

Install Recommended Extensions.s

```
# vscode commend(cmd + p)
> Extensions: Show Recommended Extensions
```

## Run App

### Runing on Docker

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