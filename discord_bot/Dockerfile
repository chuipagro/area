FROM node:18-alpine

COPY . .
WORKDIR /app

RUN npm install && npm run build

EXPOSE $PORT

CMD ["npm", "run", "start"]
