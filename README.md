# NestJS NSA 백엔드

## 실행 방법

### 1. 서버 실행

```shell
docker-compose up -d
```

### 2. swagger api 서버 접속

http://localhost:5000/api

### 3. /auth/signup 요청 수행

비밀번호는 8자리 이상이어야합니다.

Body:
```json
{
  "nickname": "asd",
  "email": "admin@nexon.com",
  "password": "asdfasdf"
}
```

### 4. /auth/login 요청 수행

Body:
```json
{
  "email": "admin@nexon.com",
  "password": "asdfasdf"
}
```

Response:
```json
{
  "access_token": "access_token"
}
```

### 5. 자물쇠 클릭 or Authorize 버튼 클릭

![스크린샷 2025-05-20 154755](https://github.com/user-attachments/assets/d2371214-c383-4259-b128-f30da82f0c83)

Value 에 access_token 을 그대로 넣어줍니다.
"Bearer access_token" 형태로 자동으로 변환해줍니다.

### 6. 나머지 api 실행

첫번째로 가입하는 유저는 Admin 권한이 자동 부여됩니다.
다음 가입하는 유저로 일반적인 테스트를 수행할 수 있습니다.

## 특이사항

### Nestjs 11 버젼이 아니라 10 버젼을 사용한 이유

Nestjs 최신 버젼인 11 버젼 부터 Node 20 버젼 이상을 요구하기 시작하였습니다.
이에 Node 18 버젼에서는 적합하지 않아 Nestjs@10 버젼을 사용하였습니다. [관련 링크](https://docs.nestjs.com/migration-guide#nodejs-v16-and-v18-no-longer-supported)

만약, Node 버전을 20 이상으로 올린다면 Nestjs 도 그에 맞춰 11 버젼으로 올릴 수 있습니다.