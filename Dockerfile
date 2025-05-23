# Node.js 베이스 이미지
FROM node:20.15.1-slim

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "run", "dev"]
