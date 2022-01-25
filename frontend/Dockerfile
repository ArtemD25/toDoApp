FROM node

WORKDIR /front

COPY package.json .

RUN npm install

COPY . .

CMD npm run docker-front