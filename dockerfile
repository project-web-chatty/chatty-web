# Step 1: Node 17 이미지를 사용해 리액트 애플리케이션 빌드
FROM node:17 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Step 2: Nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]