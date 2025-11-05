
FROM node:25-alpine3.21

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon && npm install
COPY . .

EXPOSE 3000
CMD ["nodemon", "--legacy-watch", "index.js"]
