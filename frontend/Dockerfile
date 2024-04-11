# 가져올 이미지를 정의
FROM node:alpine as build
# # 경로 설정하기
WORKDIR /frontend
# # package.json을 컨테이너의 frontend 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json /frontend/package.json

# 명령어 실행 (의존성 설치)
RUN yarn install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# npm start는 개발시 코드 변경 사항을 실시간으로 반영하기 위해 쓰는 것이고
# npm run build는 배포시에 사용하는 것
RUN npm run build
# CMD ["npm", "run", "build"]
# RUN npm start

FROM nginx:latest

# Nginx는 /usr/share/nginx/html를 기본적으로 웹 서버의 루트 디렉토리로 사용
# 위에서 build해서 생긴 /frontend/build를 nginx 웹 서버의 /usr/share/nginx/html로 복사(react를 nginx로 실행)
COPY --from=build /frontend/build /usr/share/nginx/html

# RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/nginx.conf
# (로컬)nginx.conf 파일 / (컨테이너) etc/nginx/conf.d/default.conf로 복사
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY conf/nginx.conf /etc/nginx/nginx.conf

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
