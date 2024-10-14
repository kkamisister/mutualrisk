# Mutual Risk -  자산 포트폴리오 추천 서비스

## 0. 팀원

| **이름** | **역할** | **기술 스택** |
| --- | --- | --- |
| 허경환(팀장) | BE | `FastAPI` `Docker` `Spark` `MySQL` `HDFS` `MongoDB` `Airflow` |
| 조용수 | BE, Infra | `Spring` `FastAPI` `JPA` `Redis` `MySQL` `MongoDB` `Airflow` |
| 김경현 | BE | `FastAPI` `Spring`  `Docker` `MySQL` `MongoDB` `Airflow` `Redis` |
| 김영표 | FE | `React` `Javascript` `react-query` `zustand` `Material UI` |
| 김하연 | FE | `React` `Javascript` `react-query` `zustand` `Material UI` |
| 김윤지 | FE | `React` `Javascript` `react-query` `zustand` `Material UI` |

## 1. 프로젝트 개요

개인이 위험자산에 투자하여 포트폴리오를 구성할 경우 분산투자는 수익률의 변동성을 줄이는 가장 효과적인 수단이며, 이는 자산 가격의 하락 발생시 발생하는 손실을 줄여 안정적인 수익 창출을 돕습니다.

그러나 개인투자자는 분산투자를 잘 하지 않는 경향이 있어, 다른 투자자들에 비해 불필요한 리스크를 감수하기 쉽습니다. 특히 COVID-19 이후 주식 투자를 시작한 개인투자자의 경우 이러한 현상이 더욱 심화되는 것으로 관측되었습니다.

이에 저희는 투자 경험이 적은 개인 투자자를 대상으로, 포트폴리오의 최적 비중을 추천하는 서비스를 기획하였습니다. 유저는 투자하기를 희망하는 자산 목록을 입력하여 해당 자산에 투자하는 최적 포트폴리오를 추천받을 수 있으며, 해당 포트폴리오의 각종 성과 지표를 모니터링할 수 있습니다.

## 2. 서비스 개요

Mutual Risk는 사용자가 자신의 포트폴리오를 효율적으로 파악하고 관리할 수 있도록 돕습니다. 포트폴리오의 자산 변동률 및 성과 지표들을 그래프로 보여줍니다. 리밸런싱 주기에 맞추어 사용자에게 이메일 알림을 발송하고, 최적 포트폴리오 비율 및 현재 포트폴리오의 성과를 높일 수 있는 종목을 추천해줍니다.

### 포트폴리오 제작 기능

- **종목 검색 및 추가**: 종목 코드 혹은 종목 이름 기반 검색을 통해 종목을 검색 및 추가할 수 있습니다.
- **제약조건 설정**: 각 자산별로 투자 비중을 결정할 수 있습니다. 투자 비중의 상한선, 하한선, 정확한 투자 비중을 결정할 수 있으며, 설정할 경우 해당 조건을 만족시키는 포트폴리오 중 최적 포트폴리오를 추천해 주게 됩니다. 추가로, 유저의 포트폴리오 투자 금액도 이곳에서 설정합니다.
- **최적 포트폴리오 계산** : 유저가 입력한 자산 목록들과 제약 조건을 바탕으로, 최적 포트폴리오를 계산하는 기능입니다. 최적 포트폴리오는, 제약 조건을 만족시키는 포트폴리오들 중 샤프 비율(포트폴리오의 수익률의 변동성 대비 포트폴리오의 기대 수익률)을 최대로 하는 포트폴리오로 정의됩니다.
- **기존 포트폴리오와의 비교 및 추천자산 선정** : 기존 포트폴리오가 있을 경우, 백테스팅 등 새로 계산된 포트폴리오와의 퍼포먼스 비교를 통해 유저가 선택하는 데 도움을 줍니다. 동시에, 새로 계산된 포트폴리오에 추가하면 포트폴리오의 샤프 비율이 가장 많이 증가하는 자산을 찾아 유저에게 추천합니다.

### 리밸런싱

- **리밸런싱 알림** : 하루에 한 번씩, 유저의 포트폴리오를 모니터링하여 최적 포트폴리오를 새로 산출합니다. 가격 변동으로 인해 현재 포트폴리오의 비중과 최적 포트폴리오로 구한 비중이 크게 차이나게 되는 경우, 리밸런싱이 필요한 시점으로 간주하고 유저에게 리밸런싱이 필요하다는 내용의 메일을 보냅니다.
- **포트폴리오 투자 비중 조정** : 유저는 ‘리밸런싱’ 탭에서 간편하게 최적 포트폴리오 비중을 구하고 해당 포트폴리오로 업데이트할 수 있습니다. 편의성을 위해, 기존 포트폴리오에서 최적포트폴리오로 업데이트하기 위해 각 주식을 얼마나 사고 팔아야 하는지를 계산하여 유저에게 보여 줍니다.

### 내 포트폴리오

- **추천 자산 확인** : 현재 포트폴리오의 추천 자산을 확인할 수 있습니다. 자산을 포트폴리오에 투자하였을 때 기대 수익률과 위험률의 변화량이 표시되며, ‘추천하기’ 버튼을 통해 현재 투자 자산들에 추천 자산이 포함된 상태의 포트폴리오 제작 화면으로 이동이 가능합니다.
- **포트폴리오 지표 확인** : 현재 포트폴리오의 위험률, 투자 현황을 나타내는 다양한 지표들을 확인할 수 있습니다. 구체적으로 포트폴리오의 평가 금액, 누적 수익률, 샤프 비율, 개별 자산 대비 샤프 비율의 순위, 보유 자산 비율 등을 확인 가능합니다.
- **포트폴리오 투자 성과 확인** : 포트폴리오의 과거 수익률 추이를 그래프로 보여 줍니다. 포트폴리오의 valuation 변화와 벤치마크로 사용되는 S&P 500 지수의 valuation 변화를 제공하여, 벤치마크 대비 포트폴리오가 어느 정도의 수익을 거뒀는지 확인 가능합니다.

### 관심 종목

- **관심 종목**: 사용자는 자신이 원하는 종목을 이름과 티커로 검색하여 관심 종목에 추가할 수 있습니다. 추가된 종목은 관심 종목 페이지 내 리스트에서 전날 종가, 변동률과 금액을 확인할 수 있습니다.
- **나만의 뉴스**: 관심 종목에 추가된 종목들에 대한 뉴스를 한 눈에 확인할 수 있습니다. 뉴스 정보는 1일 1회 모든 종목에 대한 뉴스를 네이버와 구글에서 가져옵니다.

### 펀드사 투자 목록

- **상위 20개 투자운용사 목록**: 미국 SEC에서 제공해주는 13F 문서를 통해 자산 규모가 큰 상위 20개 투자운용사들의 목록을 제공
    - 13F: 1억 달러(1,000억) 이상의 자산을 통제하는 "기관 투자자"가 SEC에 제출 한 분기 별 보고서
    - 상위 20개 투자운용사들이 가장 최근 보고서 기준 많이 보유/구매한 상위 10개 종목 대한 보유량 및 구매량을 막대 그래프와 종목 정보를 제공
- **투자운용사의 상세 포트폴리오**: 특정 투자운용사들에 대한 상세 정보 제공
    - **펀드 정보 요약:** 보유 종목 가치, 보유 종목 개수, QoQ 회전율 및 가치 변화
    - **투자자 정보:** 대표 이름, 회사명, 최근 실적 발표일
    - **분기별 수익률 기록:** 회사의 포트폴리오와 S&P 500의 수익률 비교
    - **섹터 편중:** 갖고 있는 종목의 섹터에 대한 비중
    - **종목 보유량:** 보유 종목에 간략한 정보 및 보유량 막대그래프 제공

### 상세 종목 정보

- 유저는 내 포트폴리오, 관심 종목, 헤더 검색바를 통해 상세 종목에 대한 정보를 조회할 수 있습니다. 종목에 대한 정보는 뉴스 정보를 제외하고는 종목의 시장에 따라서 다르게 보여집니다.
- **미국 주식 및 ETF**: TradingView에서 제공해주는 iframe Widget을 통해 실시간 시세, 환율, 종목의 프로필, 기술적 분석 등에 대한 정보를 확인할 수 있습니다.
- **국내 주식**: DB에 저장되어 있는 일일 종가 시세 정보를 통해 전날 종가 정보와 차트를 보여줍니다. 추가적으로 회사에 대한 간단한 설명, PER, PBR, EPS와 같은 가치 평가 지표, 막대 그래프와 표로 투자자별 매매 동향을 보여줍니다.
- **국내 ETF**: DB에 저장되어 있는 일일 종가 시세 정보를 통해 전날 종가 정보와 차트를 보여줍니다. 추가적으로 회사에 대한 간단한 설명을 보여주고 파이차트와 표로 포트폴리오의 구성 요소를 보여줍니다.

## 3. 주요 기술 및 아키텍처

**Spark 종목추천**  

- 기존 포트폴리오에 포함되지 않은 모든 종목들을 대상으로 다음의 작업을 수행
    - 기존 포트폴리오에 해당 종목을 추가한 포트폴리오를 만들어 Sharp-ratio 계산
    - 이 과정을 Spark로 분산 처리 수행
- 가장 높은 Sharp-ratio가 나오는 포트폴리오에 추가한 종목을 추천

**EfficientFrontier** 

- 위험률(x값)을 고정했을 때, 수익률(y값)이 최대가 되는 포트폴리오를 효율적 포트폴리오라고 하며, 효율적 포트폴리오들을 이은 곡선을 효율적 포트폴리오 곡선이라고 한다.
- 원점과 효율적 포트폴리오를 이었을 때, 기울기(sharp-ratio)가 최대인 포트폴리오를 추천한다.

**prophet 시계열 모델을 통해 expectedReturn 예측**

- 시계열 예측 모델인 Prophet 모델을 이용하여 각 자산의 미래 1년간의 수익률을 예측. 해당 수익률의 평균을 자산의 기대 수익률로 사용

**Redis를 사용하여 로그인 토큰관리, 종목별 영업일 캐싱**

- 현재 로직상, 영업일을 가지고 오는 로직이 병목임을 파악하고 해당 부분을 캐싱하여 응답속도를 1/3로 줄임. Redis에서 제공하는 Hash 자료구조를 활용하여 저장

**크론탭을 사용한 리밸런싱 알림**

- 유저가 설정한 비중의 상한,하한을 벗어나거나 비중변화가 10% 이상 생긴 경우, 유저에게 메일알람을 보내도록 설정

**airflow를 사용한 데이터 적재 자동화**

- 종목과 관련된 naver, google 뉴스 데이터 ETL 작업 daily 수행
- 주식 데이터 ETL 작업 daily 수행
- 예상 수익률 ELT 작업 daily 수행

### Front-End Optimistic Update를 통한 UX 개선

북마크 추가와 같은 사용자에게 실시간으로 피드백을 주어야하는 요청들에 대해서는 Optimistic Update를 통해 더 빠른 피드백을 제공해줍니다. Optimistic Update가 적용되기 이전에는 북마크 추가 및 삭제 API를 호출하고 응답이 온 것을 확인 후 북마크 리스트를 다시 요청하여 서버로 부터 응답이 오는 시간 동안은 사용자에게 즉각적인 피드백을 제공해주지 못하였습니다.

Optimistic Update를 적용하여 우선 내부에서 관리하고 있는 북마크 상태에 대해 추가 및 삭제를 하여 사용자에게는 피드백을 우선적으로 주게되고 이후 API 요청을 통해 내부 상태를 갱신하는 방식을 사용하였습니다. 그 결과 기존에는 서버 요청 시간만큼 피드백이 지연되었지만 적용 후에은 사용자에게 즉각적인 피드백이 가능해졌습니다.

### 서비스 아키텍쳐

![Mutual_Risk](/uploads/12a9f90203945a7715a523838226a2b1/Mutual_Risk.png)

## 4. 사용 화면

1. **랜딩페이지** : 최초 페이지입니다. 로그인 버튼을 눌러서 카카오 로그인을 진행할 수 있습니다
    
![image__5_](/uploads/63a3e7dd621c9184fd51ad1e83a5dd09/image__5_.png)
    
    1. **신규 유저** : 신규 유저는 로그인 직후 초기 포트폴리오를 생성할 수 있도록 포트폴리오 제작 페이지로 리다이렉트
    2. **기존 유저** : 기존 유저는 로그인 직후 보유하고 있는 포트폴리오의 성과를 분석한 포트폴리오 대시보드로 이동
2. 포트폴리오의 효율적 포트폴리오 곡선, 섹터정보, 백테스팅 도구, Monthly Return

![image__6_](/uploads/075ff46b8798af36db78328ffd58d136/image__6_.png)

![image__7_](/uploads/5f9282dc23f804fa0e7a82e52b093c6b/image__7_.png)

![image__8_](/uploads/ec0b5ceac296d12caaabe4fe5e8af682/image__8_.png)

![image__9_](/uploads/c3c3869aaf3e718e3d723fbc56009b24/image__9_.png)
1. 

## 5. 결론

Mutual Risk 서비스는 비전문 개인 투자자들이 쉽고 효과적으로 자산을 관리할 수 있도록 돕는 것을 목표로 합니다. 리밸런싱 추천과 자산 다변화 전략을 통해 사용자는 보다 안정적이고 효율적인 포트폴리오를 구축할 수 있으며, 지속적인 성과 모니터링을 통해 투자 리스크를 최소화할 수 있습니다.



## 6. UI/UX기획

https://embed.figma.com/design/KhElPS7BdGJQeZ7T6PgWYu/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%B6%94%EC%B2%9C?node-id=102-1043&node-type=canvas&t=90mKiE6OdEZFVY0a-0&embed-host=notion&footer=false&theme=system

# DB 설계

## MySQL ERD

https://www.erdcloud.com/d/7KE5MkJjDW3cQuJ6P

![Copy_of_뮤탈리스크__1_](/uploads/631665c0d734d97fc5177a91a188b388/Copy_of_뮤탈리스크__1_.png)

## MongoDB Collection

- **MongoDB 포트폴리오 데이터 Document**
    
    ```json
    [{
      "_id": {
        "$oid": "66f4ee626c0ab3b41bc95d60"
      },
      "type": "portfolio",
      "userId": 1,
      "asset": [
        {
          "assetId": 4198,
          "code": "NVDA",
          "name": "NVIDIA Corporation Common Stock",
          "totalPurchaseQuanti": 3,
          "purchaseDate": "2024-09-06"
        },
        {
          "assetId": 3680,
          "code": "GOOGL",
          "name": "Alphabet Inc. Class A Common Stock",
          "purchaseQuantity": 4,
          "purchaseDate": "2024-09-06"
        },
        {
          "assetId": 3834,
          "code": "INTC",
          "name": "Intel Corporation Common Stock",
          "purchaseQuantity": 7,
          "purchaseDate": "2024-09-06"
        },
        {
          "assetId": 4770,
          "code": "TSLA",
          "name": "Tesla Inc. Common Stock",
          "purchaseQuantity": 9,
          "purchaseDate": "2024-09-06"
        }
      ],
      "lowerBound": [
        0.05,
        0.05,
        0.05,
        0.05
      ],
      "upperBound": [
        0.4,
        0.4,
        0.4,
        0.4
      ],
      "frontierPoints": [
        {
          "expectedReturn": 0.1991133011142147,
          "standardDeviation": 0.3280580608026344,
          "weights": [
            0.4,
            0.4,
            0.0991500053004487,
            0.1008499946995512
          ]
        },
        {
          "expectedReturn": 0.2040406795956279,
          "standardDeviation": 0.32821179327976235,
          "weights": [
            0.3999999448548784,
            0.3962768929531726,
            0.1080170794684487,
            0.0957060811600042
          ]
        },
    		.....,
        {
          "expectedReturn": 0.6819955238454192,
          "standardDeviation": 0.44496836242450066,
          "weights": [
            0.159703884074351,
            0.0500019036883335,
            0.3999975988778978,
            0.39029661217648
          ]
        },
        {
          "expectedReturn": 0.6869233862932862,
          "standardDeviation": 0.44839076038420744,
          "weights": [
            0.1501785447947282,
            0.0500040094572754,
            0.3999987781886452,
            0.3998186646888494
          ]
        }
      ],
      "weights": [
        0.22,
        0.25,
        0.24,
        0.29
      ]
    }]
    ```
    

- **MongoDB 펀드 데이터 Document**
    
    ```json
    {
        "_id": 314848454,
        "type": "fund",
        "name": "워런 버핏",
        "company": "버크셔해서웨이(Berkshire Hathaway)"
        "submissionDate": "2024-01-05", //서류 제출 날짜
        "asset": [
            {
    		        "code": 483320,
    			      "name": "엔비디아밸류체인액티브",
    			      "region" : "US",
                "valueOfHolding": 1000000, //보유종목 가치(단위: USD)
                "purchaseDate": "2024-09-06"
            },
            {
    		        "code": 005930,
    		        "name":"삼성전자", 
    		        "region" : "KR",
                "valueOfHolding": 1000000,
                "purchaseDate": "2024-09-06"
            },
            {
    		        "code": -1,
    		        "name":"기타", 
                "valueOfHolding": null,
                "purchaseDate": null
            },
            ...
        ],
        "valueOfHoldings": 2000000, //총 보유종목 가치(단위: USD)
    }
    ```
    

## API 명세서

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
| **리밸런싱 포트폴리오 확정** | `POST` |  |  | jwt 인증 |  |
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
