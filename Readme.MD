# TodoSvc 📝

**할일 목록 관리 서비스**

현대적인 웹 기술 스택을 활용한 RESTful API 기반의 할일 목록 관리 애플리케이션입니다.

![Node.js](https://img.shields.io/badge/Node.js->=16.0.0-brightgreen)
![Express](https://img.shields.io/badge/Express-4.21.2-blue)
![LokiJS](https://img.shields.io/badge/LokiJS-1.5.12-orange)
![License](https://img.shields.io/badge/License-ISC-yellow)

## Demo  
https://todosvc.bmaster.kro.kr

## 🚀 기능

- ✅ **할일 관리**: 생성, 조회, 수정, 삭제 (CRUD)
- 👤 **멀티 유저**: 소유자별 할일 목록 관리
- ✔️ **완료 토글**: 할일 완료 상태 변경
- 🌐 **RESTful API**: 표준 HTTP 메서드 지원
- 📱 **반응형 UI**: Bootstrap 기반 모바일 친화적 인터페이스
- ⚡ **빠른 응답**: 메모리 기반 NoSQL 데이터베이스

## 🛠️ 기술 스택

### Backend
- **Node.js** (>=16.0.0)
- **Express.js** (4.21.2) - 웹 프레임워크
- **LokiJS** (1.5.12) - 메모리 기반 NoSQL 데이터베이스
- **Babel** (7.26.0) - ES6+ JavaScript 트랜스파일러

### Frontend
- **EJS** (3.1.10) - 템플릿 엔진
- **Bootstrap** (CSS 프레임워크)
- **Font Awesome** - 아이콘 라이브러리
- **jQuery** - DOM 조작

### 개발 도구
- **Nodemon** (3.1.7) - 개발 서버 자동 재시작
- **CORS** (2.8.5) - Cross-Origin Resource Sharing
- **Morgan** (1.10.1) - HTTP 요청 로거

## 📋 요구사항

- Node.js 16.0.0 이상
- npm 또는 yarn

## ⚙️ 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd todosvc
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 모드 실행
```bash
npm run start:dev
```

### 4. 프로덕션 빌드 및 실행
```bash
# 빌드
npm run build

# 실행
npm start
```

## 🌐 API 엔드포인트

### 기본 정보
- **Base URL**: `http://localhost:8000`
- **Content-Type**: `application/json`

### 사용자 관리
```http
GET /users/:id                     # 사용자 정보 조회 (3초 지연)
GET /todolist/:owner/create        # 새 소유자 생성 및 샘플 데이터
```

### 할일 목록 관리
```http
GET    /todolist/:owner            # 할일 목록 조회
POST   /todolist/:owner            # 새 할일 추가
GET    /todolist/:owner/:id        # 특정 할일 조회
PUT    /todolist/:owner/:id        # 할일 수정
PUT    /todolist/:owner/:id/done   # 완료 상태 토글
DELETE /todolist/:owner/:id        # 할일 삭제
```

### 지연 테스트 API (1초 지연)
```http
GET    /todolist_long/:owner
POST   /todolist_long/:owner
GET    /todolist_long/:owner/:id
PUT    /todolist_long/:owner/:id
PUT    /todolist_long/:owner/:id/done
DELETE /todolist_long/:owner/:id
```

## 📊 데이터 구조

### Todo Item
```json
{
  "id": 1628123456789,
  "todo": "ES6 공부",
  "desc": "ES6 공부를 해야 합니다",
  "done": false
}
```

### API 응답 형식
```json
{
  "status": "success|fail",
  "message": "작업 결과 메시지",
  "item": { /* 데이터 객체 */ }
}
```

## 🔧 개발 스크립트

```bash
npm run start:dev   # 개발 모드 (nodemon + babel-node)
npm run build       # Babel 트랜스파일 (src → build)
npm start           # 프로덕션 모드
```

## 🌍 라이브 데모

운영 중인 서비스를 확인해보세요:
- 🔗 [https://todosvc.bmaster.kro.kr](https://todosvc.bmaster.kro.kr)

## 📁 프로젝트 구조

```
todosvc/
├── src/                    # 소스 코드
│   ├── index.js           # 메인 서버 엔트리 포인트
│   ├── routes.js          # API 라우팅
│   └── tododao.js         # 데이터 접근 계층
├── build/                 # Babel 빌드 결과
├── public/                # 정적 자원
│   ├── css/              # 스타일시트
│   ├── js/               # JavaScript 라이브러리
│   ├── img/              # 이미지
│   └── fonts/            # 폰트 파일
├── views/                 # EJS 템플릿
├── test/                  # 테스트 파일
├── log/                   # 로그 파일 (자동 생성)
└── package.json           # 프로젝트 설정
```

## 🔒 보안 고려사항

- **캐시 비활성화**: 브라우저 캐싱 방지 헤더 설정
- **CORS 설정**: Cross-Origin 요청 허용
- **입력 검증**: 할일 제목 필수 입력 검증
- **에러 처리**: 표준화된 에러 응답

## ⚠️ 주의사항

- **메모리 기반 DB**: 서버 재시작 시 데이터가 초기화됩니다
- **단일 인스턴스**: 현재 구조는 단일 서버 인스턴스만 지원합니다
- **개발/테스트 용도**: 프로덕션 환경에서는 영구 저장소 사용을 권장합니다

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the ISC License.

## 🆕 최근 업데이트

- **v1.0.0**: 의존성 라이브러리 최신 버전 업데이트
  - Express 4.21.2, Babel 7.26.0, Nodemon 3.1.7 등
  - 보안 취약점 해결
  - 코드 품질 개선

---

**Made with ❤️ using Node.js and Express**
