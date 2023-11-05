FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN mkdir -p /application/
RUN ln -s /application/client.apk public/client.apk

RUN npm install

EXPOSE 8081

CMD ["npm", "run", "start"]
