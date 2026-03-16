FROM node:20-slim

WORKDIR /app

COPY .medusa/server/package.json .medusa/server/package-lock.json ./
RUN npm install --omit=dev

COPY .medusa/server/ ./

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
