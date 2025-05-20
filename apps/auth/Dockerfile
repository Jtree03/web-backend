FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build auth

FROM node:18-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --from=build /app/dist/apps/auth ./dist

CMD ["node", "dist/main"]