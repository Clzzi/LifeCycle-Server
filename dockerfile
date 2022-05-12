FROM node:16

WORKDIR /usr/src/lifecycle-server

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]