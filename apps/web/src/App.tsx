import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { SampleButton } from "./components/SampleButton";
import { useSample } from "./hooks/useSample";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobePage from "./pages/GlobePage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogCreatePage from "./pages/blog/BlogCreatePage";
import LoginPage from "./pages/blog/LoginPage";
import { Helmet } from "react-helmet-async";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import DashboardPage from "./pages/app/DashboardPage";
import { useAuth } from "./hooks/authContext";
import { AuthProvider } from "./hooks/authContext";
import { Navigate } from "react-router-dom";
import { AirlinesPage } from "./pages/AirlinesPage";
import { AirlineDetailPage } from "./pages/AirlineDetailPage";
import { Navigation } from "./components/Navigation";
import { CompassLogo } from "./components/CompassLogo";

function App() {
    const { count, increment } = useSample();

    const { isAuthenticated } = useAuth();

    function PrivateRoute({ children }: { children: React.ReactElement }) {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    return (
        <Router>
            <Navigation />
            <div style={{ marginTop: "60px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dev"
                        element={
                            <div className="page-content">
                                <Helmet>
                                    <title>🇰🇾 Pilot Capital Dev</title>
                                    <meta
                                        name="description"
                                        content="Dev page of Pilot Capital application"
                                    />
                                </Helmet>
                                <div>
                                    <a href="https://vite.dev" target="_blank">
                                        <img
                                            src={viteLogo}
                                            className="logo"
                                            alt="Vite logo"
                                        />
                                    </a>
                                    <div className="logo">
                                        <CompassLogo size={64} />
                                    </div>
                                </div>
                                <h1>Pilot Capital</h1>
                                <div className="card">
                                    <SampleButton label="This is the sample button man!" />
                                    <button
                                        style={{ marginLeft: 8 }}
                                        onClick={increment}
                                    >
                                        useSample count: {count}
                                    </button>
                                    <p>
                                        Edit <code>src/App.tsx</code> and save
                                        to test HMR
                                    </p>
                                </div>
                                <p className="read-the-docs">
                                    Click on the Vite and React logos to learn
                                    more
                                </p>
                            </div>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <div className="page-content">
                                <Home />
                            </div>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <div className="page-content">
                                <Helmet>
                                    <title>🇰🇾 Pilot Capital Contact</title>
                                    <meta
                                        name="description"
                                        content="Contact page of Pilot Capital application"
                                    />
                                </Helmet>
                                🇰🇾 Contact Page
                            </div>
                        }
                    />
                    <Route path="/globe" element={<GlobePage />} />
                    <Route
                        path="/blog"
                        element={
                            <div className="page-content">
                                <BlogListPage />
                            </div>
                        }
                    />
                    <Route
                        path="/blog/create"
                        element={
                            <div className="page-content">
                                <BlogCreatePage />
                            </div>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <div className="page-content">
                                <LoginPage />
                            </div>
                        }
                    />
                    <Route
                        path="/forum"
                        element={
                            <div className="page-content">
                                <ForumPage />
                            </div>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <div className="page-content">
                                <PrivateRoute>
                                    <DashboardPage />
                                </PrivateRoute>
                            </div>
                        }
                    />
                    <Route
                        path="/airlines"
                        element={
                            <div className="page-content">
                                <AirlinesPage />
                            </div>
                        }
                    />
                    <Route
                        path="/airlines/:id"
                        element={
                            <div className="page-content">
                                <AirlineDetailPage />
                            </div>
                        }
                    />
                </Routes>
            </div>
            <Routes>
                <Route path="/landing" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default function AppWithAuthProvider() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
