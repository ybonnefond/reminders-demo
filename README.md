# Turbulent reminders

Demo application using NestJS + Websockets + CQRS + Scheduler + Hexagonal architecture

## Overview

The backend application is composed of 3 main modules:

### ConfigurationModule

Small module to pass environment variables to the app

### GatewayModule

Contain the websocket gateway.
All commands are sent to through one 'command' event dans dispatched to handlers using nestjs cqrs module.
This module also expose the broadcaster service to send events back to clients.

### ReminderModule

Contain the reminder logic following hexagonal architecture:

- domain: framework agnostic domain logic
- infrastructure: storage & broadcasting reminder's specific infrastructure
- interfaces: cqrs command handler & scheduler

## Launch the app

```shell
yarn start
```

Or using docker, which also exposes a basic client:

```shell
docker-compose up --build
```

Then open the [sample client](http://localhost:8080)

## Run the tests

Make sur you installed the dependencies

```shell
yarn install
```

Run the tests with coverage

```shell
yarn test:cov
```
