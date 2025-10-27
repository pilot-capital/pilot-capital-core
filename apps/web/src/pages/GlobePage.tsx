import React, { useState, useRef, useEffect } from "react";
import countriesData from "../data/countries.json";
import Globe from "react-globe.gl";
import Modal from "react-modal";

// Example country data (GeoJSON features)
// Load countries data via fetch for large GeoJSON

Modal.setAppElement("#root");

type CountryFeature = {
    type: string;
    properties: {
        name: string;
        "ISO3166-1-Alpha-3": string;
        [key: string]: any;
    };
    geometry: {
        type: string;
        coordinates: any;
    };
};

const GlobePage: React.FC = () => {
    const [selectedCountry, setSelectedCountry] =
        useState<CountryFeature | null>(null);
    const globeRef = useRef<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [polygons] = useState<CountryFeature[]>(
        countriesData.features as CountryFeature[]
    );
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleCountryClick = (country: CountryFeature) => {
        setSelectedCountry(country);
        setModalOpen(true);
    };

    // Rotate globe to selected country
    useEffect(() => {
        if (selectedCountry && globeRef.current) {
            // Get centroid of country geometry
            const geometry = selectedCountry.geometry;
            let lat = 0,
                lng = 0;
            if (geometry.type === "Polygon") {
                const coords = geometry.coordinates[0];
                const lats = coords.map((c: number[]) => c[1]);
                const lngs = coords.map((c: number[]) => c[0]);
                lat =
                    lats.reduce((a: number, b: number) => a + b, 0) /
                    lats.length;
                lng =
                    lngs.reduce((a: number, b: number) => a + b, 0) /
                    lngs.length;
            } else if (geometry.type === "MultiPolygon") {
                const coords = geometry.coordinates[0][0];
                const lats = coords.map((c: number[]) => c[1]);
                const lngs = coords.map((c: number[]) => c[0]);
                lat =
                    lats.reduce((a: number, b: number) => a + b, 0) /
                    lats.length;
                lng =
                    lngs.reduce((a: number, b: number) => a + b, 0) /
                    lngs.length;
            }
            globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 1200);
        }
    }, [selectedCountry]);

    return (
        <div>
            <h1>Interactive Globe</h1>
            {selectedCountry && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(34,34,34,0.92)",
                        color: "#fff",
                        borderRadius: "0 0 8px 8px",
                        padding: "6px 18px 6px 12px",
                        fontSize: "1rem",
                        zIndex: 110,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        minWidth: 180,
                        maxWidth: 320,
                    }}
                >
                    <span>
                        Selected:{" "}
                        <strong>{selectedCountry.properties.name}</strong>
                    </span>
                    <button
                        onClick={() => {
                            setSelectedCountry(null);
                            setModalOpen(false);
                        }}
                        style={{
                            background: "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px 10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "0.92rem",
                        }}
                    >
                        Unselect
                    </button>
                </div>
            )}
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                polygonsData={polygons}
                polygonCapColor={(polygon) => {
                    if (
                        selectedCountry &&
                        polygon.properties &&
                        polygon.properties.iso_a3 ===
                            selectedCountry.properties.iso_a3
                    ) {
                        return "rgba(255, 255, 0, 0.7)"; // Highlight selected country (yellow)
                    }
                    return "rgba(200, 0, 0, 0.3)";
                }}
                polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
                polygonStrokeColor={(polygon) => {
                    if (
                        selectedCountry &&
                        polygon.properties &&
                        polygon.properties.iso_a3 ===
                            selectedCountry.properties.iso_a3
                    ) {
                        return "#FFD700"; // Gold stroke for selected
                    }
                    return "#111";
                }}
                onPolygonClick={(polygon) =>
                    handleCountryClick(polygon as CountryFeature)
                }
                polygonLabel={(polygon) =>
                    `${(polygon as CountryFeature).properties.name}`
                }
                width={600}
                height={600}
            />
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Country Info"
                style={{
                    content: {
                        maxWidth: 220,
                        minHeight: 80,
                        left: "50%",
                        top: "32px",
                        right: "auto",
                        bottom: "auto",
                        transform: "translateX(-50%)",
                        background: "rgba(34,34,34,0.85)",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        textAlign: "left",
                        border: "none",
                        fontSize: "0.98rem",
                        zIndex: 100,
                        position: "fixed",
                    },
                    overlay: {
                        background: "rgba(0,0,0,0.05)",
                        zIndex: 99,
                    },
                }}
            >
                {selectedCountry ? (
                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                marginBottom: 4,
                            }}
                        >
                            {selectedCountry.properties.name ||
                                "Unknown Country"}
                        </div>
                        <div style={{ fontSize: "0.92rem", marginBottom: 8 }}>
                            <span style={{ color: "#aaa" }}>ISO:</span>{" "}
                            {selectedCountry.properties.iso_a3 || "N/A"}
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                background: "#444",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "4px 12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "0.92rem",
                                marginTop: 2,
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                                fontSize: "1.02rem",
                                marginBottom: 4,
                            }}
                        >
                            No country selected
                        </div>
                        <div
                            style={{
                                fontSize: "0.9rem",
                                marginBottom: 8,
                                color: "#bbb",
                            }}
                        >
                            Click a country on the globe to see details.
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                background: "#444",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "4px 12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "0.92rem",
                                marginTop: 2,
                            }}
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GlobePage;
