FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 5

COPY . .
RUN npx medusa build

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
