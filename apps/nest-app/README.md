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
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Dev

### Regenerate Docs, Prisma Client Data, Dtos

```
yarn prisma generate
```