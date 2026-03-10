FROM node:20-slim

WORKDIR /app

ENV DISABLE_ADMIN=true

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 5

COPY . .

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
