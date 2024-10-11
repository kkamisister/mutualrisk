import React from 'react';
import { useQuery } from '@tanstack/react-query';
import WidgetContainer from 'components/container/WidgetConatiner';
import Title from 'components/title/Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchMonthlyReturnByPortfolioId } from 'utils/apis/analyze';

const formatPercentage = value => `${value.toFixed(2)}%`;
const formatDate = dateString => {
	const date = new Date(dateString);
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
	};
};

const MonthlyReturns = ({ portfolioId }) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['monthlyReturns', portfolioId],
		queryFn: () => fetchMonthlyReturnByPortfolioId(portfolioId),
		staleTime: 300000,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching monthly returns data.</div>;
	}

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
							const { year, month } = formatDate(item.date);
							const returnRate = formatPercentage(item.portfolioReturns);

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
