FROM node:16
WORKDIR /client
COPY . /client/
RUN npm install

RUN npm run build
EXPOSE 8080

CMD npm run serve