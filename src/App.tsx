import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockPage from "./pages/StockPage";
import AddStockPage from "./pages/AddStockPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import PortfolioPage from "./pages/PortfolioPage";
import { Layout } from "antd";
import NavBar from "./components/Layout/NavBar";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Content style={{ padding: "24px", minHeight: "100vh" }}>
                    <HomePage />
                  </Content>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Content style={{ padding: "24px", minHeight: "100vh" }}>
                    <PortfolioPage />
                  </Content>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/stock/:id"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Content style={{ padding: "24px", minHeight: "100vh" }}>
                    <StockPage />
                  </Content>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/create-stock"
            element={
              <PrivateRoute>
                <>
                  <NavBar /> 
                  <Content style={{ padding: "24px", minHeight: "100vh" }}>
                    <AddStockPage />
                  </Content>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-stock/:id"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Content style={{ padding: "24px", minHeight: "100vh" }}>
                  <AddStockPage />
                  </Content>
                </>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
