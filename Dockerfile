FROM node:16-alpine as build
WORKDIR /app/api
COPY package* .
RUN npm install --silent
COPY . .
RUN npm run build


FROM node:16-alpine
WORKDIR /app/api
ENV NODE_ENV=production 

COPY .env .
COPY --from=build /app/api/node_modules node_modules
COPY --from=build /app/api/dist dist

EXPOSE 4000

CMD ["node","dist/main"]
