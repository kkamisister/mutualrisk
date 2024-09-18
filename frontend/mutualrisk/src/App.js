import LoginPage from './pages/home/login/LoginPage';
import LoginCallbackPage from './pages/home/login/LoginCallbackPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockDetailPage from 'pages/stock/detail/StockDetailPage';
import StockBookmarkPage from 'pages/stock/bookmark/StockBookmarkPage';
import FundListPage from 'pages/fund/list/FundListPage';
import FundDetailPage from 'pages/fund/detail/FundDetailPage';
import PortfolioCreatePage from 'pages/portfolio/create/PortfolioCreatePage';
import DashboardLayout from 'layouts/DashboardLayout';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route
						path="/login/kakao/callback"
						element={<LoginCallbackPage />}></Route>
					<Route element={<DashboardLayout />}>
						<Route
							path="/portfolio/detail"
							element={<StockDetailPage />}></Route>
						<Route
							path="/portfolio/rebalance"
							element={<StockDetailPage />}></Route>
						<Route
							path="/portfolio/create"
							element={<PortfolioCreatePage />}></Route>
						<Route
							path="/stock/bookmark"
							element={<StockBookmarkPage />}></Route>
						<Route
							path="/stock/detail/:id"
							element={<StockDetailPage />}></Route>
						<Route path="/fund/list" element={<FundListPage />}></Route>
						<Route
							path="/fund/detail/:id"
							element={<FundDetailPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
