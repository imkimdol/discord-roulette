FROM node:18-alpine

WORKDIR /bot

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env ./
COPY ./src ./src

RUN yarn install
RUN yarn run compile
RUN yarn run deploy

CMD yarn run start