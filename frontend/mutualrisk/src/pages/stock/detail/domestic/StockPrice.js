import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';

const stockInfo = {
	name: '엔비디아',
	ticker: 'NVDA',
	market: 'NASDAQ',
	sector: '기술',
	industry: '반도체 및 반도체 장비',
	issuedStocks: 24530000000,
	companyValue: '2조 8455억 USD',
	dailyPriceChangeRate: 2.4,
	dailyPriceChange: 2.3,
	price: 116.3,
	summary:
		'NVIDIA Corporation은 미국, 대만, 중국, 홍콩 및 전 세계에 그래픽, 컴퓨팅 및 네트워킹 솔루션을 제공합니다. 그래픽 부문에서는 게임 및 PC용 GeForce GPU, GeForce NOW 게임 스트리밍 서비스 및 관련 인프라, 게임 플랫폼용 솔루션, 엔터프라이즈 워크스테이션 그래픽용 Quadro/NVIDIA RTX GPU, 클라우드 기반 비주얼 및 가상 컴퓨팅용 가상 GPU 또는 vGPU 소프트웨어, 인포테인먼트 시스템용 자동차 플랫폼, 메타버스 및 3D 인터넷 애플리케이션 구축 및 운영을 위한 Omniverse 소프트웨어 등을 제공합니다. 컴퓨팅 및 네트워킹 부문은 데이터센터 컴퓨팅 플랫폼과 인피니밴드용 퀀텀 및 이더넷용 스펙트럼을 포함한 엔드투엔드 네트워킹 플랫폼, 엔비디아 드라이브 자율주행 플랫폼 및 자동차 개발 계약, 젯슨 로봇 및 기타 임베디드 플랫폼, 엔비디아 AI 엔터프라이즈 및 기타 소프트웨어, DGX 클라우드 소프트웨어 및 서비스로 구성됩니다. 이 회사의 제품은 게임, 전문 시각화, 데이터 센터 및 자동차 시장에서 사용됩니다. 이 회사는 주문자 상표 부착 생산업체, 오리지널 장치 제조업체, 시스템 통합업체 및 유통업체, 독립 소프트웨어 공급업체, 클라우드 서비스 제공업체, 소비자 인터넷 기업, 애드인 보드 제조업체, 유통업체, 자동차 제조업체 및 1차 자동차 공급업체, 기타 에코시스템 참여업체에 제품을 판매하고 있습니다. NVIDIA Corporation은 1993년에 설립되었으며 캘리포니아주 산타클라라에 본사를 두고 있습니다.',
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};

const StockPrice = ({ price, dailyPriceChange, dailyPriceChangeRate }) => {
	const pointColor =
		parseInt(dailyPriceChange) === 0
			? colors.text.sub2
			: parseInt(dailyPriceChange) > 0
			? colors.point.red
			: colors.point.blue;

	console.log({ price, dailyPriceChange, dailyPriceChangeRate });
	return (
		<Stack
			direction="row"
			sx={{
				justifyContent: 'flex-start',
				alignItems: 'center',
				borderRadius: '10px',
				backgroundColor: colors.background.white,
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Stack
				spacing={1}
				direction="row"
				sx={{
					padding: '15px',
					width: 'fit-content',
					height: 'fit-content',
				}}>
				<Stack direction="column" spacing={0.4}>
					<Box
						sx={{
							fontSize: '24px',
							color: pointColor,
							fontWeight: 'bold',
						}}>{`${price.toLocaleString('ko-KR')} 원`}</Box>
					<Stack direction="row" spacing={1}>
						<Box
							sx={{
								fontSize: '14px',
								color: colors.text.sub1,
								fontWeight: '500',
							}}>
							{`어제보다`}
						</Box>
						<Box
							sx={{
								fontSize: '14px',
								color: pointColor,
								fontWeight: '500',
							}}>
							{`${parseInt(dailyPriceChange) > 0 ? '+' : ''}${parseInt(
								dailyPriceChange
							).toLocaleString('ko-KR')}원 (${dailyPriceChangeRate}%)`}
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default StockPrice;
