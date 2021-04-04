FROM node:15 as builder

WORKDIR /usr/service

# Ensure to install deps only if the package.json has been modified
COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

CMD yarn ci

# Runtime assets builder temp image
FROM node:15-alpine as production-builder

WORKDIR /usr/service

# Ensure to install deps only if the package.json has been modified
COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --prod

COPY --from=builder /usr/service/dist ./

RUN find . -name "*.test.js*" -delete \
  && find . -name "*.spec.js*" -delete \
  && find . -name "*.ts*" -delete \
  && find . -name "*.js.map" -delete

# Runtime Image
FROM node:15-alpine as production

# Create app directory
WORKDIR /usr/service

COPY --from=production-builder /usr/service .

EXPOSE 3000

CMD ["node", "main"]
