FROM node:19.4.0-buster

WORKDIR /usr/src/front

COPY ./front/package.json ./
COPY ./front/package-lock.json ./
COPY ./front/tailwind.config.js ./

RUN npm install
RUN npm install react-icons --save

ENTRYPOINT [ "npm", "start" ]
