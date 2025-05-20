FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build event

FROM node:18-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --from=build /app/dist/apps/event ./dist

CMD ["node", "dist/main"]