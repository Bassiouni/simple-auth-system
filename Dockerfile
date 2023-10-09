FROM node:alpine3.18 as base

RUN npm i -g pnpm

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prune --prod

EXPOSE 3000

CMD [ "pnpm", "start" ]
