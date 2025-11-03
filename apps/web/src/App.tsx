import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { SampleButton } from "./components/SampleButton";
import { useSample } from "./hooks/useSample";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function App() {
    const { count, increment } = useSample();

    const { isAuthenticated } = useAuth();

    function PrivateRoute({ children }: { children: React.ReactElement }) {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    return (
        <Router>
            <nav
                style={{
                    background:
                        "linear-gradient(135deg, #0a0a0a 0%, #2d1b4e 100%)",
                    borderBottom: "2px solid #9d4edd",
                    boxShadow: "0 2px 20px rgba(157,78,221,0.2)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100vw",
                    zIndex: 1000,
                    padding: "1rem 0",
                    margin: 0,
                    borderRadius: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: "1400px",
                        margin: "0 auto",
                        padding: "0 2rem",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "#c77dff",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        🇰🇾 Pilot Capital
                    </Link>

                    <div
                        style={{
                            display: "flex",
                            gap: "2rem",
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                            marginLeft: "2rem",
                            marginRight: "2rem",
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "#fff",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                transition: "all 0.3s ease",
                                border: "1px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(157,78,221,0.2)";
                                e.currentTarget.style.borderColor = "#9d4edd";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                                e.currentTarget.style.borderColor =
                                    "transparent";
                            }}
                        >
                            Home
                        </Link>

                        <Link
                            to="/globe"
                            style={{
                                textDecoration: "none",
                                color: "#fff",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                transition: "all 0.3s ease",
                                border: "1px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(157,78,221,0.2)";
                                e.currentTarget.style.borderColor = "#9d4edd";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                                e.currentTarget.style.borderColor =
                                    "transparent";
                            }}
                        >
                            Globe
                        </Link>

                        <Link
                            to="/blog"
                            style={{
                                textDecoration: "none",
                                color: "#fff",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                transition: "all 0.3s ease",
                                border: "1px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(157,78,221,0.2)";
                                e.currentTarget.style.borderColor = "#9d4edd";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                                e.currentTarget.style.borderColor =
                                    "transparent";
                            }}
                        >
                            Blog
                        </Link>

                        {isAuthenticated && (
                            <Link
                                to="/forum"
                                style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "20px",
                                    transition: "all 0.3s ease",
                                    border: "1px solid transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(157,78,221,0.2)";
                                    e.currentTarget.style.borderColor =
                                        "#9d4edd";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                    e.currentTarget.style.borderColor =
                                        "transparent";
                                }}
                            >
                                Forum
                            </Link>
                        )}

                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "#000",
                                    background:
                                        "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
                                    padding: "0.5rem 1.5rem",
                                    borderRadius: "25px",
                                    fontWeight: "600",
                                    boxShadow: "0 0 15px rgba(157,78,221,0.3)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 5px 25px rgba(157,78,221,0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 15px rgba(157,78,221,0.3)";
                                }}
                            >
                                Login
                            </Link>
                        ) : (
                            <Link
                                to="/dashboard"
                                style={{
                                    textDecoration: "none",
                                    color: "#c77dff",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "20px",
                                    border: "1px solid #c77dff",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "#c77dff";
                                    e.currentTarget.style.color = "#000";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                    e.currentTarget.style.color = "#c77dff";
                                }}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: "80px" }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="page-content">
                                <Helmet>
                                    <title>🇰🇾 Pilot Capital Main</title>
                                    <meta
                                        name="description"
                                        content="Main page of Pilot Capital application"
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
                                    <a href="https://react.dev" target="_blank">
                                        <img
                                            src={reactLogo}
                                            className="logo react"
                                            alt="React logo"
                                        />
                                    </a>
                                </div>
                                <h1>Vite + React</h1>
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
                        path="/landing"
                        element={
                            <div className="page-content">
                                <LandingPage />
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
                </Routes>
            </div>
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
