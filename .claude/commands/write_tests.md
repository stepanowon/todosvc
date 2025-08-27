포괄적인 테스트 작성: $ARGUMENTS

테스트 규칙:

- React Testing Library와 함께 Vitest 사용
- 테스트 파일은 소스 파일과 동일한 폴더 내의 **tests** 디렉토리에 배치
- 테스트 파일 이름은 [filename].test.ts(x) 형식 사용
- 임포트 시 @/ 접두사 사용

커버리지:

- 정상 경로(happy path) 테스트
- 엣지 케이스(edge case) 테스트
- 에러 상태 테스트
- 구현 세부사항보다 동작과 공개 API 테스트에 집중
