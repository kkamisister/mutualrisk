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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
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
							path="/rebalance"
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
							path="/stock/detail/:assetId"
							element={<StockDetailPage />}></Route>
						<Route path="/fund/list" element={<FundPage />}></Route>
						<Route
							path="/fund/detail/:fundId"
							element={<FundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
