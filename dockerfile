# Step 1: Node 17 이미지를 사용해 리액트 애플리케이션 빌드
FROM node:17 AS builder

WORKDIR /app

# package.json과 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
# 모든 의존성 설치
RUN npm install
# 또는 필요한 경우 @types와 Babel 플러그인을 별도로 설치:
# RUN npm install --save-dev @types/sockjs-client @babel/plugin-proposal-private-property-in-object

# 애플리케이션 파일 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# Step 2: Nginx로 정적 파일 서빙
FROM nginx:alpine

# 빌드된 파일 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 기본 포트 설정
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
