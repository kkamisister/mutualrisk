import { useState } from 'react';
import {
	Box,
	Stack,
	Avatar,
	IconButton,
	Typography,
	Grid,
} from '@mui/material';
import { colors } from 'constants/colors';
import SubTitle from 'components/title/SubTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import StockSearchModal from './StockSearchModal';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const stockInfoSample = {
	title: '엔비디아',
	market: 'NASDAQ',
	symbol: 'NVDA',
	price: 13.55,
	fluctuateRate: 3.2,
	fluctuatePrice: 0.66,
	imageURL:
		'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-NAS00208X-E0.png',
};
const BookmarkStockListItem = () => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
			}}>
			<Stack
				direction="row"
				spacing={0.3}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					fontSize: '14px',
				}}>
				<Avatar alt="종목 이미지" src={stockInfoSample.imageURL} />
				&nbsp;
				<Box sx={{ fontWeight: 'bold' }}>{stockInfoSample.title}</Box>
				<Box
					sx={{
						color: colors.text.sub2,
					}}>{`${stockInfoSample.symbol}(${stockInfoSample.market})`}</Box>
			</Stack>
			<Stack
				direction="column"
				spacing={0.5}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box sx={{ fontSize: '14px', color: colors.text.main }}>
					{stockInfoSample.price}
					&nbsp;USD
				</Box>
				<Box
					sx={{
						color: colors.point.red,
						fontSize: '12px',
					}}>
					{`+${stockInfoSample.fluctuatePrice}(+${stockInfoSample.fluctuateRate}%)`}
				</Box>
			</Stack>
		</Stack>
	);
};
const AddStockButton = ({ setOpenSearchModal }) => {
	return (
		<IconButton
			onClick={() => setOpenSearchModal(true)}
			sx={{
				backgroundColor: colors.background.box,
				padding: '10px',
				borderRadius: '10px',
				justifyContent: 'center',
				alignItems: 'center',
				'&:hover': {
					backgroundColor: colors.point.stroke, // hover 시 배경색 변경 (빨간색)
				},
			}}>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<AddCircleOutlineIcon fontSize="large" />
				<Typography sx={{ fontWeight: 500, color: colors.text.sub1 }}>
					추가하기
				</Typography>
			</Stack>
		</IconButton>
	);
};

const options = [
	{ value: 'price', label: '금액' },
	{ value: 'fluctuate', label: '변동률' },
	{ value: 'size', label: '시가총액' },
];

const StockBookmarkList = () => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [bookmarkListEdit, setBookmarkListEdit] = useState(false);

	return (
		<Stack
			spacing={1}
			sx={{
				backgroundColor: colors.background.white,
				padding: '15px',
				borderRadius: '10px',
				border: `solid 1px ${colors.point.stroke}`,
			}}>
			<Stack
				direction="row"
				sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography
					sx={{ textDecoration: 'underline', cursor: 'pointer' }}
					onClick={() => setBookmarkListEdit(!bookmarkListEdit)}>
					{bookmarkListEdit ? '저장' : '편집'}
				</Typography>
				<Select
					defaultValue={selectedOption}
					value={selectedOption}
					options={options}
					onChange={newOption => setSelectedOption(newOption)}
				/>
			</Stack>
			<AddStockButton setOpenSearchModal={setOpenSearchModal} />

			{[0, 0, 0, 0, 0].map(() => {
				return (
					<Stack
						direction="row"
						sx={{
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}>
						{/* 아이콘이 부드럽게 나타나도록 transition을 추가 */}
						{bookmarkListEdit && (
							<Stack
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									padding: '10px',
								}}>
								<RemoveCircleIcon sx={{ color: colors.point.red }} />
							</Stack>
						)}
						<BookmarkStockListItem />
					</Stack>
				);
			})}

			<StockSearchModal
				open={openSearchModal}
				handleClose={() => {
					setOpenSearchModal(false);
				}}
			/>
		</Stack>
	);
};

export default StockBookmarkList;
