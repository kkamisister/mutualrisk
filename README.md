# 📊 Mutual Risk - 자산 포트폴리오 추천 서비스

## 👥 0. 팀원 소개

| 이름 | 역할 | 기술 스택 |
|------|------|-----------|
| 허경환 (팀장) | Backend | FastAPI, Docker, Spark, MySQL, HDFS, MongoDB, Airflow |
| 조용수 | Backend, Infra | Spring, FastAPI, JPA, Redis, MySQL, MongoDB, Airflow |
| 김경현 | Backend | FastAPI, Spring, Docker, MySQL, MongoDB, Airflow, Redis |
| 김영표 | Frontend | React, JavaScript, react-query, zustand, Material UI |
| 김하연 | Frontend | React, JavaScript, react-query, zustand, Material UI |
| 김윤지 | Frontend | React, JavaScript, react-query, zustand, Material UI |

## 📝 1. 프로젝트 개요

**Mutual Risk**는 투자 경험이 적은 개인 투자자를 위해 분산 투자와 리밸런싱을 통한 효율적인 자산 관리를 지원하는 포트폴리오 추천 서비스입니다.  
사용자는 희망 자산을 입력하고 제약 조건을 설정해 최적의 포트폴리오를 추천받을 수 있으며, 지속적인 성과 모니터링과 리밸런싱을 통해 투자 성과를 개선할 수 있습니다.

## 🚀 2. 서비스 기능

### 📌 포트폴리오 제작

- 종목 검색 및 추가
- 자산별 투자 비중 설정 (상한/하한/고정)
- 샤프 비율을 기준으로 최적 포트폴리오 계산
- 기존 포트폴리오와 비교 + 추천 자산 제안

### 🔄 리밸런싱

- 리밸런싱 필요 시 이메일 알림 발송
- 투자 비중 자동 조정 + 필요한 매수/매도량 제시

### 📊 내 포트폴리오 관리

- 추천 자산 확인 (기대 수익률/위험률)
- 평가 금액, 누적 수익률, 샤프 비율 등 지표 제공
- 과거 수익률 추이 및 벤치마크(S&P500) 비교

### ⭐ 관심 종목

- 종목 검색 후 리스트에 추가
- 뉴스 모아보기 기능 제공 (1일 1회 크롤링)

### 💼 펀드사 투자 목록

- 미국 SEC 기반 상위 20개 투자운용사 리스트
- 보유량 및 섹터 비중, 상세 포트폴리오 분석

### 🔍 상세 종목 정보

- 미국/국내 주식 및 ETF 정보 제공
- 실시간 시세(미국), 가치 평가 지표, 차트 등 시각화 제공

## 🧠 3. 주요 기술 및 아키텍처

### 📈 Spark 기반 종목 추천

- 모든 종목에 대해 기존 포트폴리오에 추가해본 후 샤프 비율을 계산
- Spark로 병렬 처리하여 성능 향상

### 📐 Efficient Frontier

- 위험률 고정 → 수익률 최대화하는 포트폴리오 추출
- 가장 기울기가 높은 지점을 최적 포트폴리오로 추천

### ⏳ Prophet 시계열 예측

- 각 자산의 1년 예상 수익률 예측 → 기대 수익률 계산에 활용

### 🧰 기타 기술

- Redis: 로그인 토큰 관리, 영업일 캐싱
- Crontab: 리밸런싱 알림 메일 자동 발송
- Airflow: 뉴스/주가/예상 수익률 자동 ETL
- Optimistic UI: 북마크 등 실시간 피드백 제공

### 🏗️ 서비스 아키텍처

![서비스 아키텍처](https://github.com/user-attachments/assets/afd991e6-52b6-4096-b2bd-c75418526395)

## 💻 4. 사용 화면

### 1. 랜딩 페이지 및 유저 흐름
- 신규 유저 : 신규 유저는 로그인 직후 초기 포트폴리오를 생성할 수 있도록 포트폴리오 제작 페이지로 리다이렉트
- 기존 유저 : 기존 유저는 로그인 직후 보유하고 있는 포트폴리오의 성과를 분석한 포트폴리오 대시보드로 이동

![랜딩 페이지](https://github.com/user-attachments/assets/49e51953-99b5-47a2-8af7-5b4e927ef658)

### 2. 포트폴리오 분석 화면

![효율적 포트폴리오](https://github.com/user-attachments/assets/de027962-1cda-4189-b58d-6ca17bd98bb8)
![섹터 정보](https://github.com/user-attachments/assets/f9b8d1bf-0093-4374-a162-25f90d5c2d2e)
![백테스팅](https://github.com/user-attachments/assets/05f7c5ff-0a13-43c9-b4d6-7ecdd8dec3d0)
![Monthly Return](https://github.com/user-attachments/assets/087cfbba-a374-47d3-bd43-46fa94a3126d)

## 🧾 5. 결론

Mutual Risk는 개인 투자자들이 데이터 기반으로 자산을 효율적으로 관리하고,  
성과를 분석하며, 리밸런싱을 통해 리스크를 최소화할 수 있도록 지원합니다.

## 🎨 6. UI/UX 기획

[Figma 디자인 바로가기](https://embed.figma.com/design/KhElPS7BdGJQeZ7T6PgWYu/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%B6%94%EC%B2%9C?node-id=102-1043)

## 🗃️ DB 설계

### MySQL ERD

🔗 [ERD 보기](https://www.erdcloud.com/d/7KE5MkJjDW3cQuJ6P)  
![ERD](https://github.com/user-attachments/assets/68d69244-dc89-4cc2-b40a-b92ba484b3d8)

### MongoDB Document 예시

```json
{
  "type": "portfolio",
  "userId": 1,
  "asset": [...],
  "lowerBound": [...],
  "upperBound": [...],
  "weights": [...]
}
```


## 📡 API 명세서

| **설명** | **Method** | **URI** | **response** | **특이사항** | **error** |
| --- | --- | --- | --- | --- | --- |
| **카카오 로그인** | `GET` | /api/v1/oauth/kakao |  |  |  |
| **로그아웃** | `GET` | /api/v1/oauth/kakao/logout |  |  |  |
| **카카오 로그인 콜백** | `GET` | /api/v1/oauth/kakao/callback | accessToken |  |  |
| **포트폴리오 제작** | `POST` | /api/v1/portfolio/init |  | jwt 인증 |  |
| **포트폴리오 확정** | `POST` | /api/v1/portfolio/final |  | jwt 인증 |  |
| **포트폴리오 제작 시 백테스팅 결과 요청 api** | `POST` | /api/v1/portfolio/backtest |  | jwt 인증 |  |
| **포트폴리오 추천 자산 정보반환** | `POST` | /api/v1/portfolio/recommend | 200 | jwt 인증 |  |
| **유저 관심종목 조회** | `GET` | /api/v1/asset/interest |  | jwt 인증 |  |
| **유저 관심종목 추가** | `POST` | /api/v1/asset/interest |  | jwt 인증 |  |
| **유저 관심종목 삭제** | `DELETE` | /api/v1/asset/interest |  | jwt 인증 |  |
| **키워드 기반 종목 검색 결과 조회** | `GET` | /api/v1/asset/keyword |  | jwt 인증 |  |
| **자산 정보 조회** | `GET` | /api/v1/asset/{assetId} |  |  |  |
| **주식 상세정보 조회** | `GET` | /api/v1/asset/detail/stock |  |  |  |
| **ETF 상세정보 조회** | `GET` | /api/v1/asset/detail/etf |  |  |  |
| **자산의 기간내 종가조회** | `GET` | /api/v1/asset/history/{assetId} |  |  |  |
| **리밸런싱 포트폴리오 제작** | `POST` | /api/v1/portfolio/rebalance/init |  | extraAssetId 생략 가능, jwt 인증 |  |
| **리밸런싱 포트폴리오 확정** | `POST` | /api/v1/portfolio/rebalance/final |  | jwt 인증 |  |
| **유저 전체 포트폴리오 조회** | `GET` | /api/v1/portfolio/my |  | jwt 인증 |  |
| **유저 포트폴리오 조회** | `GET` | /api/v1/portfolio/detail |  | jwt 인증 |  |
| **포트폴리오 백테스팅 결과 조회** | `GET` | /api/v1/portfolio/backtest |  | jwt 인증 |  |
| **효율적 포트폴리오 곡선 조회** | `GET` | /api/v1/portfolio/frontier |  | jwt 인증 |  |
| **실제 자산 평가액 증감 조회** | `GET` | /api/v1/portfolio/valuation |  | jwt 인증 |  |
| **포트폴리오 monthly return 조회** | `GET` | /api/v1/portfolio/monthly-return |  | jwt 인증 |  |
| **유저 포트폴리오 섹터 조회** | `GET` | /api/v1/portfolio/sector |  | jwt 인증 |  |
| **투자 자산 목록 조회** | `GET` | /api/v1/portfolio/assets |  | jwt 인증 |  |
| **포트폴리오 현황요약 조회** | `GET` | /api/v1/portfolio/summary |  | jwt 인증 |  |
| **자산별 수익률 및 공분산 계산** | `POST` | /api/v1/batch/asset |  |  |  |
| **종목별 뉴스 DB저장** | `POST` | /api/v1/batch/news |  |  |  |
| **펀드 목록 조회** | `GET` | /api/v1/funds |  | 운용액 기준 상위 20개 펀드 조회 |  |
| **펀드 상세 정보 조회** | `GET` | /api/v1/funds/{fundId} |  | 보유량 순으로 종목 정렬 후 반환, jwt 인증 |  |
| **펀드 평가액 변동 기록 조회** | `GET` | /api/vi/funds/history |  | jwt 인증 |  |


## 🎬 UCC 영상

🔗 [YouTube 영상 보기](https://youtu.be/9glI1H5ydaU)
