import React from "react";
import { Link } from "react-router-dom";
import { CompassLogo } from "../components/CompassLogo";

export default function LandingPage() {
    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
            {/* Hero Section */}
            <div
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    padding: "2rem",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        color: "white",
                        maxWidth: "800px",
                        width: "100%",
                    }}
                >
                    <div style={{ marginBottom: "2rem" }}>
                        <CompassLogo size="120" />
                    </div>

                    <h1
                        style={{
                            fontSize: "4rem",
                            fontWeight: "900",
                            marginBottom: "1rem",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            lineHeight: "1.2",
                        }}
                    >
                        Welcome to{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(45deg, #00ffff, #c77dff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Pilot Capital
                        </span>
                    </h1>

                    <p
                        style={{
                            fontSize: "1.5rem",
                            marginBottom: "3rem",
                            opacity: "0.9",
                            lineHeight: "1.6",
                        }}
                    >
                        Your ultimate aviation resource hub. Connect with
                        airlines, explore career opportunities, and join a
                        global community of aviation professionals.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            to="/airlines"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2rem",
                                background:
                                    "linear-gradient(45deg, #c77dff, #00ffff)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) =>
                                ((e.target as HTMLElement).style.transform =
                                    "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                                ((e.target as HTMLElement).style.transform =
                                    "scale(1)")
                            }
                        >
                            🛩️ Explore Airlines
                        </Link>

                        <Link
                            to="/globe"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                transition: "transform 0.2s",
                                backdropFilter: "blur(10px)",
                            }}
                            onMouseOver={(e) =>
                                ((e.target as HTMLElement).style.transform =
                                    "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                                ((e.target as HTMLElement).style.transform =
                                    "scale(1)")
                            }
                        >
                            🌍 View Global Map
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div
                style={{
                    width: "100%",
                    padding: "4rem 2rem",
                    background: "white",
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "3rem",
                            textAlign: "center",
                            marginBottom: "3rem",
                            color: "#374151",
                        }}
                    >
                        Everything You Need for Aviation
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "2rem",
                            marginBottom: "3rem",
                        }}
                    >
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                ✈️
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "1rem",
                                    color: "#374151",
                                }}
                            >
                                Airline Careers
                            </h3>
                            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                                Discover opportunities with major airlines
                                worldwide. Access salary data, requirements, and
                                hiring information.
                            </p>
                        </div>

                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                🌐
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "1rem",
                                    color: "#374151",
                                }}
                            >
                                Global Network
                            </h3>
                            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                                Connect with aviation professionals across the
                                globe. Share experiences and build your network.
                            </p>
                        </div>

                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                👥
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "1rem",
                                    color: "#374151",
                                }}
                            >
                                Community Forum
                            </h3>
                            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                                Join discussions with pilots, cabin crew, and
                                aviation enthusiasts. Share knowledge and
                                experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div
                style={{
                    width: "100%",
                    padding: "4rem 2rem",
                    background:
                        "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "white",
                            marginBottom: "1rem",
                        }}
                    >
                        Ready to Take Off?
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "rgba(255, 255, 255, 0.9)",
                            marginBottom: "2rem",
                            lineHeight: "1.6",
                        }}
                    >
                        Join thousands of aviation professionals who trust Pilot
                        Capital for their career development and networking
                        needs.
                    </p>

                    <Link
                        to="/airlines"
                        style={{
                            display: "inline-block",
                            padding: "1rem 2rem",
                            background: "white",
                            color: "#f5576c",
                            textDecoration: "none",
                            borderRadius: "8px",
                            fontSize: "1.1rem",
                            fontWeight: "700",
                            transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) =>
                            ((e.target as HTMLElement).style.transform =
                                "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                            ((e.target as HTMLElement).style.transform =
                                "scale(1)")
                        }
                    >
                        Get Started Now
                    </Link>

                    <p
                        style={{
                            fontSize: "0.9rem",
                            color: "rgba(255, 255, 255, 0.7)",
                            marginTop: "2rem",
                        }}
                    >
                        🇰🇾 Proudly headquartered in the Cayman Islands
                    </p>
                </div>
            </div>
        </div>
    );
}
