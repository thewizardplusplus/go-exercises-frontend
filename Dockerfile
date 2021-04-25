FROM node:15.14-alpine3.13

WORKDIR /node/src/go-exercises-frontend
COPY package.json package-lock.json ./
RUN npm install --production --loglevel=verbose --update-notifier=false

COPY .eslintrc.json .
COPY public public
COPY src src
RUN npm run-script build --loglevel=verbose --update-notifier=false
