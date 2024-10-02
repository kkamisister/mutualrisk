import React, { useState } from 'react';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MonthlyReturns = () => {
	// 더미 데이터 설정
	const [data] = useState([
		{ date: '2024-09-01T13:01:12.2434903', portfolioReturns: 6.01 },
		{ date: '2024-08-01T13:01:12.2434903', portfolioReturns: -2.94 },
		{ date: '2024-07-01T13:01:12.2434903', portfolioReturns: -5.42 },
		{ date: '2024-06-01T13:01:12.2434903', portfolioReturns: 9.06 },
		{ date: '2024-05-01T13:01:12.2434903', portfolioReturns: 7.1 },
		{ date: '2024-04-01T13:01:12.2434903', portfolioReturns: -1.49 },
		{ date: '2024-03-01T13:01:12.2434903', portfolioReturns: 4.85 },
		{ date: '2024-02-01T13:01:12.2434903', portfolioReturns: 3.57 },
		{ date: '2024-01-01T13:01:12.2434903', portfolioReturns: -6.26 },
		{ date: '2023-12-01T13:01:12.2434903', portfolioReturns: 6.51 },
		{ date: '2023-11-01T13:01:12.2434903', portfolioReturns: 9.66 },
		{ date: '2023-10-01T13:01:12.2434903', portfolioReturns: -7.05 },
	]);

	return (
		<WidgetContainer>
			<Title text="월별 수익" />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="monthly returns table">
					<TableHead>
						<TableRow>
							<TableCell>년도</TableCell>
							<TableCell>월</TableCell>
							<TableCell align="right">수익률</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => {
							const date = new Date(item.date);
							const year = date.getFullYear();
							const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
							const returnRate = item.portfolioReturns.toFixed(2) + '%'; // 소수점 2자리까지 표시

							return (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{year}
									</TableCell>
									<TableCell>{month}</TableCell>
									<TableCell
										align="right"
										style={{
											color:
												item.portfolioReturns < 0 ? 'red' : 'black',
										}}>
										{returnRate}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</WidgetContainer>
	);
};

export default MonthlyReturns;
