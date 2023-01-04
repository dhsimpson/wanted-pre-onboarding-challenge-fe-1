# 화면 구성

### [메인화면]

- 경로 : /
- 기능이 없는 메인 화면
- <img src="./public/readme/main.png" width="200px"/>

### [로그인/회원가입 화면]

- 경로 : /auth
- 로그인, 회원가입 기능
- <img src="./public/readme/login.png" width="200px"/>

### [Todo리스트 화면]

- 경로 : /todos
- todo 리스트를 볼 수 있고, 자세히 보기 버튼, todo 추가 버튼이 있는 화면
- <img src="./public/readme/todo.png" width="200px"/>

### [Todo 상세 화면]

- 경로 : /todos/[id]
- todo 리스트 영역 하위에 노출되며, 수정하기, 삭제하기 기능이 있는 화면
- 접기 버튼 클릭 시 'Todo리스트 화면'으로 route
- <img src="./public/readme/todo_detail.png" width="200px"/>

### [로그인 Alert]

- 로그인/회원가입 화면 이외 화면 진입 시 Alert, 확인버튼 클릭 시 로그인/회원가입 화면으로 route
- <img src="./public/readme/login_alert.png" width="200px"/>

<br/>
<br/>

# [API ReadME](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

<br/>

# 프로젝트 실행

```
yarn (or yarn install)
yarn start
```

<br/>

# 프로젝트 셋팅

1. yarn 버전을 berry 로 변경 및 프로젝트 초기화

```
yarn set version berry
yarn init(yarn 관련 파일 생성)
yarn install(berry 는 pnp가 기본이므로 node_modules 대신 pnp 생성)
```

c.f.) [\*.test.tsx 오류 해결 방법](https://mmsesang.tistory.com/entry/Yarn-berry-yarn-pnp-%ED%99%98%EA%B2%BD%EC%9C%BC%EB%A1%9C-React-Typescript-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0#:~:text=Allow%EB%A5%BC%20%EB%88%8C%EB%9F%AC%EC%A4%8D%EB%8B%88%EB%8B%A4.-,7.%20jest%2Ddom%20%EC%9E%AC%EC%84%A4%EC%B9%98,-%EC%97%AC%EA%B8%B0%EA%B9%8C%EC%A7%80%20%EC%A7%84%ED%96%89%ED%95%98%EA%B3%A0%20yarn)

c.f.) [airbnb eslint + prettier 셋팅](https://velog.io/@9rganizedchaos/%EA%B0%9C%EB%B0%9C-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-ESLint-eslint-config-airbnb-typescript-Prettier-React-TypeScript)

c.f.) [react nested route : /todos/:id](https://www.robinwieruch.de/react-router-nested-routes/)

# Package Manager

- version : yarn berry (3.x.x, yarn LTS)

# 모듈 관리

- pnp (plug and play)

# 설치 할 라이브러리 목록

[For Product]

- React
- Material UI
- axios
- react-query

[For Dev]

- typescript
- eslint
- prettier

# 이슈

- react 는 pnp 를 지원하지 않는 것인가? yarn start 로 react dev모드 실행시키면 node_modules가 생성 된다.
