FROM node:lts-alpine

WORKDIR /usr/src/app

ADD package.json .

RUN npm install --quiet

CMD ["npm", "run", "dev"]
