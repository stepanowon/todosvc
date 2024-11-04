@echo off
REM 텍스트 파일에서 프로젝트 이름 읽기
SET /P PROJECT_NAME=<project-name.txt

REM Dockerfile 경로 설정
SET DOCKERFILE_PATH=../Dockerfile

REM Docker 이미지 빌드
docker build -t %PROJECT_NAME% -f %DOCKERFILE_PATH% ..

REM Docker 컨테이너 실행
docker run -d -p 8000:8000 --name %PROJECT_NAME% %PROJECT_NAME%
pause
