# Moby Frontend

> 데스트톱 해상도는 전혀 지원하지 않습니다. 크롬 개발자 도구에서 `iPhone 6/7/8 Plus` 해상도로 테스트 해주세요.

- [Link](https://gifted-khorana-7ea737.netlify.app/)

## Tech Stacks

- React
  - Ionic Framework
  - Styled Components
  - Recoil (maybe)
- Capacitor

## Getting Started

```
yarn
yarn start
```

## Commands

```
yarn check:lint
yarn fix:lint
yarn check:prettier
yarn fix:prettier
```

## Available Routes

- 로그인 : `/login`
- 회원가입 : `/sign-up`
- 마켓 플레이스 : `/`
- 아티스트 정보 : `/artists/:artistId`
- 상품 정보 : `/items/:itemId`
- 상품 결제 : `/purchase`
- 결제 완료 : `/purchase-success/:purchaseId`
- 내 지갑 : `/my-wallet`
- 마이 페이지 : `/my-page`
- NFT 랭킹 : `/rank`

## Env Vars

- `REACT_APP_API_URL`
