import HomePage from './pages/home/HomePage';
import LoginPage from './pages/home/login/LoginPage';
import LoginCallbackPage from './pages/home/login/LoginCallbackPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockDetailPage from 'pages/stock/detail/StockDetailPage';
import StockBookmarkPage from 'pages/stock/bookmark/StockBookmarkPage';
import FundPage from 'pages/fund/FundPage';
import PortfolioCreatePage from 'pages/portfolio/create/PortfolioCreatePage';
import PortfolioDetailPage from 'pages/portfolio/detail/PortfolioDetailPage';
import RebalanceMainPage from 'pages/portfolio/rebalance/main/RebalanceMainPage';
import RebalanceResultPage from 'pages/portfolio/rebalance/result/RebalanceResultPage';
import DashboardLayout from 'layouts/DashboardLayout';
import MainLayout from 'layouts/MainLayout';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/login" element={<LoginPage />}></Route>
					</Route>
					<Route
						path="/login/kakao/callback"
						element={<LoginCallbackPage />}></Route>
					<Route element={<DashboardLayout />}>
						<Route
							path="/portfolio/detail"
							element={<PortfolioDetailPage />}></Route>
						<Route
							path="/portfolio/rebalance"
							element={<RebalanceMainPage />}></Route>
						<Route
							path="/rebalance/result"
							element={<RebalanceResultPage />}></Route>
						<Route
							path="/portfolio/create"
							element={<PortfolioCreatePage />}></Route>
						<Route
							path="/stock/bookmark"
							element={<StockBookmarkPage />}></Route>
						<Route
							path="/stock/detail/:id"
							element={<StockDetailPage />}></Route>
						<Route path="/fund/list" element={<FundPage />}></Route>
						<Route path="/fund/detail/:id" element={<FundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
