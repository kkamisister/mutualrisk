from fastapi import FastAPI, Request
import httpx
import numpy as np
import pandas as pd
from pypfopt import EfficientFrontier
from pyspark.sql import SparkSession
from tqdm import tqdm

app = FastAPI()

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("MySQL to Spark") \
    .config("spark.driver.extraClassPath", "/home/ubuntu/mysql-connector-j-9.0.0/mysql-connector-j-9.0.0.jar") \
    .getOrCreate()

# MySQL에서 데이터 읽기
jdbc_url = "jdbc:mysql://j11a607.p.ssafy.io:3306/product"
properties = {
    "user": "ssafy",
    "password": "zeroticket607",
    "driver": "com.mysql.jdbc.Driver"
}

sql="select * from asset"

asset_df = spark.read.format("jdbc")\
                    .option("url", "jdbc:mysql://j11a607.p.ssafy.io:3306/product")\
                    .option("driver", "com.mysql.cj.jdbc.Driver")\
                    .option("query", sql)\
                    .option("user", "ssafy")\
                    .option("password", "zeroticket607")\
                    .load()

#데이터 준비
# 1. 기대 수익률
# 1-1. 'id'와 'expected_return' 컬럼만 선택
expected_returns_dict_df = asset_df.select("id", "expected_return")

# 1-2. 자산 id와 기대 수익률을 딕셔너리로 변환
expected_returns_dict = {row['id']: row['expected_return'] for row in expected_returns_dict_df.collect()}

print("기대 수익률 준비완료")

# 2. 공분산
# 2-1. asset 테이블에서 자산의 최대 ID 값 가져오기
max_id_query = "SELECT MAX(id) as max_id FROM asset"
max_id_df = spark.read.format("jdbc")\
    .option("url", jdbc_url)\
    .option("driver", "com.mysql.cj.jdbc.Driver")\
    .option("query", max_id_query)\
    .option("user", properties["user"])\
    .option("password", properties["password"])\
    .load()

max_id = max_id_df.collect()[0]['max_id']  # 최대 자산 ID

# 2-2. 모든 자산의 id 목록 가져오기 (asset_df는 기존 자산 테이블 DataFrame)
all_assets_df = asset_df.select("id")
all_assets = [row['id'] for row in all_assets_df.collect()]  # 자산 id 리스트

# 2-3. 공분산 데이터를 딕셔너리 형태로 변환하기
# 초기화된 공분산 딕셔너리 생성 (각 자산 id를 key로 설정하고 빈 리스트로 초기화)
cov_matrix_dict = {asset_id: [0] * len(all_assets) for asset_id in all_assets}

# 2-4. asset_id_1 값을 1부터 max_id까지 순차적으로 변경하면서 데이터 가져오기 및 공분산 딕셔너리 채우기
for asset_id_1 in tqdm(range(1, max_id + 1)):
    sql_cov = f"""
    SELECT asset_id_1, asset_id_2, covariance 
    FROM asset_covariance 
    WHERE asset_id_1 = {asset_id_1}
    """

    # asset_id_1에 해당하는 공분산 데이터 로드
    cov_df = spark.read.format("jdbc")\
        .option("url", jdbc_url)\
        .option("driver", "com.mysql.cj.jdbc.Driver")\
        .option("query", sql_cov)\
        .option("user", properties["user"])\
        .option("password", properties["password"])\
        .load()

    # 로드된 공분산 데이터를 딕셔너리에 추가
    for row in cov_df.collect():
        asset_1 = row['asset_id_1']
        asset_2 = row['asset_id_2']
        covariance_value = row['covariance']
        
        # asset_id_1 -> asset_id_2로 가는 공분산 값 설정
        idx_1 = all_assets.index(asset_1)  # asset_1의 인덱스
        idx_2 = all_assets.index(asset_2)  # asset_2의 인덱스

        # 대칭성을 위해 asset_id_1과 asset_id_2 간의 공분산 값을 모두 설정
        cov_matrix_dict[asset_1][idx_2] = covariance_value
        cov_matrix_dict[asset_2][idx_1] = covariance_value

print("공분산 준비완료")

# 함수
# 1. 샤프 비율 계산 함수
def get_sharp_ratio(expected_returns, cov_matrix, lower_bounds, upper_bounds):
    ef = EfficientFrontier(expected_returns, cov_matrix)
    ef.add_constraint(lambda x: x >= np.array(lower_bounds))    # 최소 비율 제약 조건
    ef.add_constraint(lambda x: x <= np.array(upper_bounds))    # 최대 비율 제약 조건
    ef.max_sharpe(0)  # 샤프 비율 최대화
    return ef.portfolio_performance(risk_free_rate=0, verbose=False)[2]

# 2. 공분산 행렬을 생성하는 함수
def create_cov_matrix(portfolio, cov_matrix_dict):
    n = len(portfolio)
    cov_matrix = np.zeros((n, n))  # n x n 공분산 행렬 초기화
    
    for i, asset_i in enumerate(portfolio):
        for j, asset_j in enumerate(portfolio):
            # 공분산 대칭성 보장 (상삼각과 하삼각 동일하게 설정)
            cov_value = cov_matrix_dict[asset_i][j]
            cov_matrix[i, j] = cov_value
            cov_matrix[j, i] = cov_value
    
    return pd.DataFrame(cov_matrix)

# 3. 포트폴리오 조합을 생성하는 함수
def create_portfolios(existing_assets, new_assets):
    portfolios = []
    for new_asset in new_assets:
        portfolio = existing_assets + [new_asset]
        portfolios.append(portfolio)
    return portfolios

# 4. 기대 수익률 및 공분산 행렬 데이터 준비 함수
def prepare_data(portfolio, expected_returns_dict, cov_matrix_dict):
    expected_returns = np.array([expected_returns_dict[asset] for asset in portfolio])
    cov_matrix = create_cov_matrix(portfolio, cov_matrix_dict)
    lower_bounds = [0.05] * len(portfolio)  # 각 자산에 대한 최소 비율
    upper_bounds = [0.4] * len(portfolio)  # 각 자산에 대한 최대 비율
    return expected_returns, cov_matrix, lower_bounds, upper_bounds

# 5. 샤프 비율을 계산하고 결과를 반환하는 함수
def calculate_sharp_ratio(portfolio):
    expected_returns, cov_matrix, lower_bounds, upper_bounds = prepare_data(portfolio, expected_returns_dict, cov_matrix_dict)
    sharp_ratio = get_sharp_ratio(expected_returns, cov_matrix, lower_bounds, upper_bounds)
    return (portfolio[-1], sharp_ratio)  # 새로운 자산과 샤프 비율 반환

# FastAPI 엔드포인트 - Spring 서버로부터 자산 리스트를 받음
@app.post("/optimize")
async def optimize_portfolio(request: Request):
    data = await request.json()  # Spring 서버로부터 받은 데이터
    existing_assets = data["existing_assets"]  # 기존 자산 리스트
    new_assets = data["new_assets"]  # 새로운 자산 리스트

    # 포트폴리오 조합 생성 및 최적화
    portfolios = create_portfolios(existing_assets, new_assets)
    print("포트폴리오 조합 생성 및 최적화 완료")
    
    # PySpark RDD로 포트폴리오 조합 만들기
    rdd = spark.sparkContext.parallelize(portfolios)
    print("rdd로 포트폴리오 조합 생성 완료")
    
    # 각 포트폴리오에 대해 샤프 비율 계산
    sharp_ratios = rdd.map(calculate_sharp_ratio).collect()
    print("각 포트폴리오에 대해 샤프비율 계산 완료")

    # 샤프 비율이 높은 상위 5개 자산 선택
    top_5_sharp_ratios = sorted(sharp_ratios, key=lambda x: x[1], reverse=True)[:5]
    print("샤프비율 상위 5개 반환 준비 완료")

    # 결과를 Spring 서버로 전송
    top_5_assets = [{"new_asset": asset, "sharp_ratio": ratio} for asset, ratio in top_5_sharp_ratios]

    return {"message": "Successfully optimized and sent to Spring", "top_5_assets": top_5_assets}

