#!/bin/bash

# 텍스트 파일에서 프로젝트 이름 읽기
PROJECT_NAME=$(cat project-name.txt)

# Dockerfile 경로 설정
DOCKERFILE_PATH=../Dockerfile

# Docker 이미지 빌드
docker build -t $PROJECT_NAME -f $DOCKERFILE_PATH ..

# Docker 컨테이너 실행
docker run -d -p 3000:3000 --name $PROJECT_NAME $PROJECT_NAME
