/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/signin";
import { localGet } from "./api/storage";

const defaultTheme = createTheme();

const checkAuth = () => {
  const token = localGet("token");
  return token != null;
}

const ProtectedRoute = ({ children }) => {
  return checkAuth() ? children : <Navigate to="/" />;
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
