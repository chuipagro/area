FROM node:18-alpine

COPY . .
WORKDIR /app

RUN npm install

EXPOSE $PORT

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
