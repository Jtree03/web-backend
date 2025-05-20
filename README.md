# 웹 백엔드 과제

## 실행 방법

### 서버 실행

```shell
docker-compose up -d
```

### swagger api 서버 접속

http://localhost:5000/api

## 특이사항

### Nestjs 11 버젼이 아니라 10 버젼을 사용한 이유

Nestjs 는 11 버젼 부터 Node 20 버젼 이상을 요구하기 시작하였습니다.
그래서 기술스택 요구사항에서 Nestjs 는 최신 버젼이 적혀있지만 Node 18 버젼에서는 적합하지 않아 Nestjs@10 버젼을 사용하였습니다. [관련 링크](https://docs.nestjs.com/migration-guide#nodejs-v16-and-v18-no-longer-supported)

만약, Node 버전을 20 이상으로 올린다면 Nestjs 도 그에 맞춰 11 버젼으로 올릴 수 있습니다.