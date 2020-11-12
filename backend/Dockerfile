FROM node:10 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

RUN npm run build



FROM node:10

WORKDIR /usr/src/app

COPY . .

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD [ "node", "./dist/server.js" ]

