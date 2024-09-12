// import LoginPage from "./pages/login/LoginPage";
// import LoginCallbackPage from "./pages/login/LoginCallbackPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import StockDetailPage from "pages/stockDetail/StockDetailPage";
import PortfolioCreatePage from 'pages/portfolio/create/PortfolioCreatePage';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					{/* <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/login/kakao/callback"
            element={<LoginCallbackPage />}
          ></Route>

          <Route path="/fund/detail" element={<StockDetailPage />}></Route> */}
					<Route
						path="/portfolio/create"
						element={<PortfolioCreatePage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
