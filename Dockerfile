FROM node:14.9.0

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app
