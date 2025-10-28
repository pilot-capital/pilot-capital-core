import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import LoginPage from "./pages/blog/LoginPage";
import DashboardPage from "./pages/app/DashboardPage";
import { useAuth } from "./hooks/useAuth";

function PrivateRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/app/*"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
