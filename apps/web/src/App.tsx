import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { SampleButton } from "./components/SampleButton";
import { useSample } from "./hooks/useSample";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function App() {
    const { count, increment } = useSample();

    return (
        <Router>
            <nav style={{ marginBottom: 16 }}>
                <Link to="/">Main</Link> | <Link to="/home">Home</Link> |{" "}
                <Link to="/contact">Contact</Link>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
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
                                    Edit <code>src/App.tsx</code> and save to
                                    test HMR
                                </p>
                            </div>
                            <p className="read-the-docs">
                                Click on the Vite and React logos to learn more
                            </p>
                        </div>
                    }
                />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/contact"
                    element={
                        <div>
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
            </Routes>
        </Router>
    );
}

export default App;
