FROM node:18-alpine

COPY . .
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
