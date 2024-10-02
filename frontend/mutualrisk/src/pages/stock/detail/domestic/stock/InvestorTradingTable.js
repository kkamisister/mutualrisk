import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { colors } from 'constants/colors';
const InvestorTradingTable = ({ records }) => {
	const columns = [
		{
			field: '일자',
			headerAlign: 'left',
			align: 'left',
			width: 140,
		},
		{
			field: '개인 순매수',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
		{
			field: '외국인 순매수',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
		{
			field: '외국인 지분율',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
		{
			field: '기관 순매수',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
		{
			field: '거래량',
			headerAlign: 'right',
			align: 'right',
			width: 140,
			valueFormatter: value => value.toLocaleString(),
		},
	];
	const rows = records.map((record, idx) => {
		return {
			id: idx,

			align: 'center',
			일자: record.date,
			'개인 순매수': record.individualPureBuyQuant,
			'외국인 순매수': record.foreignerPureBuyQuant,
			'외국인 지분율': record.foreignerHoldRatio,
			'기관 순매수': record.organPureBuyQuant,
			거래량: record.accumulatedTradingVolume,
		};
	});

	return (
		<Box
			sx={{
				height: 350,
				width: '100%',
				[`.${gridClasses.cell}.cold`]: {
					color: colors.point.blue,
				},
				[`.${gridClasses.cell}.hot`]: {
					color: colors.point.red,
				},
			}}>
			<DataGrid
				sx={{
					'& .MuiDataGrid-footerContainer': { display: 'none' },
					borderRadius: '10px',
				}}
				rows={rows}
				columns={columns}
				getCellClassName={params => {
					if (params.field === '일자') {
						return '';
					}
					return params.value >= 15 ? 'hot' : 'cold';
				}}
			/>
		</Box>
	);
};
export default InvestorTradingTable;
