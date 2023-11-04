FROM node:18-alpine

COPY . .
WORKDIR /app

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]
