# VtuberClips - nest-app

## site:
```
-- :4000/    (Nest App)
  -- /api    (Swagger Doc)
-- :5555/    (Prisma Studio)
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Dev

### Regenerate Docs, Prisma Client Data, Dtos

```
yarn prisma generate
```