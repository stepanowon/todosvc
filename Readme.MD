# 할일 목록 서비스 (todosvc)

Node.js, Express, LokiJS를 사용하여 구축된 간단한 RESTful 웹 서비스입니다.

## 기능

*   할일 항목 관리 (생성, 조회, 수정, 삭제)
*   할일 항목 완료/미완료 처리
*   소유자별 할일 목록 조회
*   개발 및 테스트를 위한 인-메모리 데이터베이스 (LokiJS)

## 사전 요구 사항

*   Node.js (버전 22.0.0 이상)

## 시작하기

1.  **저장소 복제:**
    ```bash
    git clone <repository-url>
    cd todosvc
    ```

2.  **의존성 설치:**
    ```bash
    npm install
    ```

3.  **개발 서버 시작:**
    ```bash
    npm run start:dev
    ```
    이 명령은 `babel-node`와 `nodemon`을 사용하여 코드 변경 시 자동으로 재시작되는 개발 서버를 시작합니다.

4.  **프로덕션 빌드:**
    ```bash
    npm run build
    ```
    이 명령은 Babel을 사용하여 `src` 디렉토리의 코드를 `build` 디렉토리로 트랜스파일합니다.

5.  **프로덕션 서버 시작:**
    ```bash
    npm start
    ```
    이 명령은 `build` 디렉토리에 트랜스파일된 코드를 사용하여 서버를 시작합니다.

## API 엔드포인트

이 서비스는 다음과 같은 RESTful 엔드포인트를 제공합니다:

*   `GET /` : 메인 페이지를 반환합니다.
*   `GET /todolist/:owner/create` : 샘플 데이터와 함께 새로운 소유자를 생성합니다.
*   `GET /todolist/:owner` : 특정 소유자의 할일 목록을 조회합니다.
*   `GET /todolist/:owner/:id` : 소유자와 ID로 특정 할일 항목을 조회합니다.
*   `POST /todolist/:owner` : 특정 소유자에게 새로운 할일 항목을 추가합니다.
*   `PUT /todolist/:owner/:id` : 소유자와 ID로 기존 할일 항목을 수정합니다.
*   `PUT /todolist/:owner/:id/done` : 할일 항목의 '완료' 상태를 토글합니다.
*   `DELETE /todolist/:owner/:id` : 소유자와 ID로 할일 항목을 삭제합니다.

`_long`이 경로에 포함된 엔드포인트 (예: `GET /todolist_long/:owner`)도 있으며, 요청을 처리하기 전에 1초의 지연을 추가합니다. 이는 테스트 목적으로 사용될 가능성이 높습니다.

## 데이터 모델

각 할일 항목은 다음과 같은 속성을 가집니다:

*   `id`: 고유 식별자 (숫자).
*   `owner`: 할일 목록의 소유자 (문자열).
*   `todo`: 할일 항목의 제목 (문자열).
*   `desc`: 할일 항목에 대한 설명 (문자열).
*   `done`: 항목이 완료되었는지 여부를 나타내는 불리언 값.

## 배포

이 서비스는 Vercel에 배포되도록 구성되었습니다. `vercel.json` 파일은 빌드 프로세스와 라우팅 규칙을 정의합니다.

## 의존성

*   **express**: 웹 프레임워크
*   **body-parser**: 요청 본문 파싱을 위한 미들웨어
*   **cors**: CORS 활성화를 위한 미들웨어
*   **ejs**: 메인 페이지를 위한 템플릿 엔진
*   **lokijs**: 인-메모리 데이터베이스
*   **shortid**: 짧은 ID 생성 라이브러리 (참고: 현재는 타임스탬프 기반 ID를 사용함)
*   **sleep-promise**: 지연을 추가하기 위한 유틸리티 (`_long` 엔드포인트에서 사용)

## 개발 의존성

*   **@babel/cli**, **@babel/core**, **@babel/node**, **@babel/preset-env**: ES6+ 코드를 트랜스파일하기 위한 Babel
*   **nodemon**: 개발 서버를 자동으로 재시작하기 위한 유틸리티