# 베이스이미지
FROM node:16-alpine

# 컨테이너 안에서 어떤 경로로 실행할지 기재
WORKDIR /src

#프로젝트 파일 복사
COPY ["package.json", "package-lock.json", "./"]

COPY .env ./

RUN npm install --silent

COPY . .

CMD  ["node", "app.js"]

EXPOSE 3000
