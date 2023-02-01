
FROM node:16.19-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 5000

CMD ["node", "index.js"]
# CMD ["npm", "run", "dev"]
