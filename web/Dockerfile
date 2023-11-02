FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN mkdir -p /mobile_app/
RUN ln -s /mobile_app/client.apk public/client.apk

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
