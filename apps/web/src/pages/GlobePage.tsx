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

    // Predefined center points for major countries based on famous/populated areas
    const getCountryCenter = (countryCode: string, countryName: string) => {
        const centers: {
            [key: string]: { lat: number; lng: number; altitude: number };
        } = {
            // Major countries with better center points
            USA: { lat: 39.8283, lng: -98.5795, altitude: 2.8 }, // Geographic center of US
            RUS: { lat: 55.7558, lng: 37.6176, altitude: 3.5 }, // Moscow area
            CHN: { lat: 35.8617, lng: 104.1954, altitude: 2.8 }, // Center of China
            CAN: { lat: 56.1304, lng: -106.3468, altitude: 3.2 }, // Center of Canada
            BRA: { lat: -14.235, lng: -51.9253, altitude: 2.8 }, // Center of Brazil
            AUS: { lat: -25.2744, lng: 133.7751, altitude: 2.8 }, // Center of Australia
            IND: { lat: 20.5937, lng: 78.9629, altitude: 2.5 }, // Center of India
            ARG: { lat: -38.4161, lng: -63.6167, altitude: 2.8 }, // Center of Argentina
            KAZ: { lat: 48.0196, lng: 66.9237, altitude: 2.8 }, // Center of Kazakhstan
            DZA: { lat: 28.0339, lng: 1.6596, altitude: 2.5 }, // Center of Algeria
            COD: { lat: -4.0383, lng: 21.7587, altitude: 2.5 }, // Center of DRC
            SAU: { lat: 23.8859, lng: 45.0792, altitude: 2.3 }, // Center of Saudi Arabia
            MEX: { lat: 23.6345, lng: -102.5528, altitude: 2.3 }, // Center of Mexico
            IDN: { lat: -0.7893, lng: 113.9213, altitude: 2.5 }, // Center of Indonesia
            SDN: { lat: 12.8628, lng: 30.2176, altitude: 2.5 }, // Center of Sudan
            LBY: { lat: 26.3351, lng: 17.2283, altitude: 2.3 }, // Center of Libya
            IRN: { lat: 32.4279, lng: 53.688, altitude: 2.3 }, // Center of Iran
            MNG: { lat: 46.8625, lng: 103.8467, altitude: 2.5 }, // Center of Mongolia
            PER: { lat: -9.19, lng: -75.0152, altitude: 2.3 }, // Center of Peru
            TCD: { lat: 15.4542, lng: 18.7322, altitude: 2.3 }, // Center of Chad
            NER: { lat: 17.6078, lng: 8.0817, altitude: 2.3 }, // Center of Niger
            AGO: { lat: -11.2027, lng: 17.8739, altitude: 2.2 }, // Center of Angola
            MLI: { lat: 17.5707, lng: -3.9962, altitude: 2.3 }, // Center of Mali
            ZAF: { lat: -30.5595, lng: 22.9375, altitude: 2.2 }, // Center of South Africa
            COL: { lat: 4.5709, lng: -74.2973, altitude: 2.2 }, // Bogotá area
            ETH: { lat: 9.145, lng: 40.4897, altitude: 2.1 }, // Center of Ethiopia
            BOL: { lat: -16.2902, lng: -63.5887, altitude: 2.2 }, // Center of Bolivia
            MRT: { lat: 21.0079, lng: -10.9408, altitude: 2.2 }, // Center of Mauritania
            EGY: { lat: 26.8206, lng: 30.8025, altitude: 2.1 }, // Center of Egypt
            TZA: { lat: -6.369, lng: 34.8888, altitude: 2.0 }, // Center of Tanzania
            NGA: { lat: 9.0765, lng: 8.6753, altitude: 2.0 }, // Center of Nigeria
            VEN: { lat: 6.4238, lng: -66.5897, altitude: 2.1 }, // Center of Venezuela
            NAM: { lat: -22.9576, lng: 18.4904, altitude: 2.1 }, // Center of Namibia
            MOZ: { lat: -18.6657, lng: 35.5296, altitude: 2.1 }, // Center of Mozambique
            PAK: { lat: 30.3753, lng: 69.3451, altitude: 2.0 }, // Center of Pakistan
            TUR: { lat: 38.9637, lng: 35.2433, altitude: 1.8 }, // Center of Turkey
            CHL: { lat: -35.6751, lng: -71.543, altitude: 2.5 }, // Center of Chile
            ZMB: { lat: -13.1339, lng: 27.8493, altitude: 1.9 }, // Center of Zambia
            MMR: { lat: 21.9162, lng: 95.956, altitude: 1.9 }, // Center of Myanmar
            AFG: { lat: 33.9391, lng: 67.71, altitude: 1.9 }, // Center of Afghanistan
            SOM: { lat: 5.1521, lng: 46.1996, altitude: 1.9 }, // Center of Somalia
            CAF: { lat: 6.6111, lng: 20.9394, altitude: 1.9 }, // Center of CAR
            UKR: { lat: 48.3794, lng: 31.1656, altitude: 1.8 }, // Center of Ukraine
            MDG: { lat: -18.7669, lng: 46.8691, altitude: 1.9 }, // Center of Madagascar
            BWA: { lat: -22.3285, lng: 24.6849, altitude: 1.8 }, // Center of Botswana
            KEN: { lat: -0.0236, lng: 37.9062, altitude: 1.8 }, // Center of Kenya
            FRA: { lat: 46.2276, lng: 2.2137, altitude: 1.6 }, // Center of France
            YEM: { lat: 15.5527, lng: 48.5164, altitude: 1.7 }, // Center of Yemen
            THA: { lat: 15.87, lng: 100.9925, altitude: 1.7 }, // Center of Thailand
            ESP: { lat: 40.4637, lng: -3.7492, altitude: 1.6 }, // Madrid area
            TKM: { lat: 38.9697, lng: 59.5563, altitude: 1.8 }, // Center of Turkmenistan
            CMR: { lat: 7.3697, lng: 12.3547, altitude: 1.7 }, // Center of Cameroon
            PNG: { lat: -6.315, lng: 143.9555, altitude: 1.8 }, // Center of Papua New Guinea
            SWE: { lat: 60.1282, lng: 18.6435, altitude: 1.8 }, // Stockholm area
            UZB: { lat: 41.3775, lng: 64.5853, altitude: 1.7 }, // Center of Uzbekistan
            MAR: { lat: 31.7917, lng: -7.0926, altitude: 1.6 }, // Center of Morocco
            IRQ: { lat: 33.2232, lng: 43.6793, altitude: 1.6 }, // Center of Iraq
            PRY: { lat: -23.4425, lng: -58.4438, altitude: 1.7 }, // Center of Paraguay
            ZWE: { lat: -19.0154, lng: 29.1549, altitude: 1.6 }, // Center of Zimbabwe
            JPN: { lat: 36.2048, lng: 138.2529, altitude: 1.6 }, // Center of Japan
            DEU: { lat: 51.1657, lng: 10.4515, altitude: 1.4 }, // Center of Germany
            COG: { lat: -0.228, lng: 15.8277, altitude: 1.6 }, // Center of Congo
            FIN: { lat: 61.9241, lng: 25.7482, altitude: 1.7 }, // Center of Finland
            VNM: { lat: 14.0583, lng: 108.2772, altitude: 1.6 }, // Center of Vietnam
            MYS: { lat: 4.2105, lng: 101.9758, altitude: 1.6 }, // Center of Malaysia
            NOR: { lat: 60.472, lng: 8.4689, altitude: 1.7 }, // Center of Norway
            CIV: { lat: 7.54, lng: -5.5471, altitude: 1.5 }, // Center of Ivory Coast
            POL: { lat: 51.9194, lng: 19.1451, altitude: 1.4 }, // Center of Poland
            OMN: { lat: 21.4735, lng: 55.9754, altitude: 1.5 }, // Center of Oman
            ITA: { lat: 41.8719, lng: 12.5674, altitude: 1.4 }, // Rome area
            PHL: { lat: 12.8797, lng: 121.774, altitude: 1.6 }, // Center of Philippines
            ECU: { lat: -1.8312, lng: -78.1834, altitude: 1.4 }, // Center of Ecuador
            BFA: { lat: 12.2383, lng: -1.5616, altitude: 1.4 }, // Center of Burkina Faso
            NZL: { lat: -40.9006, lng: 174.886, altitude: 1.6 }, // Center of New Zealand
            GAB: { lat: -0.8037, lng: 11.6094, altitude: 1.4 }, // Center of Gabon
            GIN: { lat: 9.9456, lng: -9.6966, altitude: 1.4 }, // Center of Guinea
            GBR: { lat: 55.3781, lng: -3.436, altitude: 1.3 }, // Center of UK
            UGA: { lat: 1.3733, lng: 32.2903, altitude: 1.2 }, // Center of Uganda
            GHA: { lat: 7.9465, lng: -1.0232, altitude: 1.3 }, // Center of Ghana
            ROU: { lat: 45.9432, lng: 24.9668, altitude: 1.3 }, // Center of Romania
            LAO: { lat: 19.8563, lng: 102.4955, altitude: 1.3 }, // Center of Laos
            GUY: { lat: 4.8604, lng: -58.9302, altitude: 1.3 }, // Center of Guyana
            BLR: { lat: 53.7098, lng: 27.9534, altitude: 1.2 }, // Center of Belarus
            KGZ: { lat: 41.2044, lng: 74.7661, altitude: 1.3 }, // Center of Kyrgyzstan
            SEN: { lat: 14.4974, lng: -14.4524, altitude: 1.2 }, // Center of Senegal
            SYR: { lat: 34.8021, lng: 38.9968, altitude: 1.2 }, // Center of Syria
            KHM: { lat: 12.5657, lng: 104.991, altitude: 1.2 }, // Center of Cambodia
            JOR: { lat: 30.5852, lng: 36.2384, altitude: 1.1 }, // Center of Jordan
            AZE: { lat: 40.1431, lng: 47.5769, altitude: 1.1 }, // Center of Azerbaijan
            AUT: { lat: 47.5162, lng: 14.5501, altitude: 1.0 }, // Center of Austria
            URY: { lat: -32.5228, lng: -55.7658, altitude: 1.1 }, // Center of Uruguay
            ARE: { lat: 23.4241, lng: 53.8478, altitude: 1.0 }, // Center of UAE
            CUB: { lat: 21.5218, lng: -77.7812, altitude: 1.1 }, // Center of Cuba
            NPL: { lat: 28.3949, lng: 84.124, altitude: 1.1 }, // Center of Nepal
            BGD: { lat: 23.685, lng: 90.3563, altitude: 1.0 }, // Center of Bangladesh
            TUN: { lat: 33.8869, lng: 9.5375, altitude: 0.9 }, // Center of Tunisia
            GRC: { lat: 39.0742, lng: 21.8243, altitude: 0.9 }, // Center of Greece
            NIC: { lat: 12.2658, lng: -85.2072, altitude: 1.0 }, // Center of Nicaragua
            PRK: { lat: 40.3399, lng: 127.5101, altitude: 1.0 }, // Center of North Korea
            MWI: { lat: -13.2543, lng: 34.3015, altitude: 1.0 }, // Center of Malawi
            ERI: { lat: 15.1794, lng: 39.7823, altitude: 0.9 }, // Center of Eritrea
            BEN: { lat: 9.3077, lng: 2.3158, altitude: 0.8 }, // Center of Benin
            HND: { lat: 15.2, lng: -86.2419, altitude: 0.8 }, // Center of Honduras
            LBR: { lat: 6.4281, lng: -9.4295, altitude: 0.8 }, // Center of Liberia
            BGR: { lat: 42.7339, lng: 25.4858, altitude: 0.8 }, // Center of Bulgaria
            SLE: { lat: 8.4606, lng: -11.7799, altitude: 0.7 }, // Center of Sierra Leone
            TGO: { lat: 8.6195, lng: 0.8248, altitude: 0.6 }, // Center of Togo
            ISL: { lat: 64.9631, lng: -19.0208, altitude: 0.8 }, // Center of Iceland
            LKA: { lat: 7.8731, lng: 80.7718, altitude: 0.7 }, // Center of Sri Lanka
        };

        // Get the country code from properties
        const isoCode =
            selectedCountry?.properties?.iso_a3 ||
            selectedCountry?.properties?.["ISO3166-1-Alpha-3"];

        if (isoCode && centers[isoCode]) {
            return centers[isoCode];
        }

        // Fallback to simple calculation if country not in predefined list
        return { lat: 0, lng: 0, altitude: 1.5 };
    };

    // Rotate globe to selected country
    useEffect(() => {
        if (selectedCountry && globeRef.current) {
            const { lat, lng, altitude } = getCountryCenter(
                selectedCountry.properties?.iso_a3 ||
                    selectedCountry.properties?.["ISO3166-1-Alpha-3"],
                selectedCountry.properties?.name
            );
            globeRef.current.pointOfView({ lat, lng, altitude }, 1200);
        }
    }, [selectedCountry]);

    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Courier New', monospace",
            }}
        >
            <h1
                style={{
                    color: "#00ff88",
                    textShadow: "0 0 20px #00ff88, 0 0 40px #00ff88",
                    fontSize: "2.5rem",
                    marginBottom: "2rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2rem",
                }}
            >
                ◉ PILOT GLOBE ◉
            </h1>
            {selectedCountry && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,255,255,0.1) 100%)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid #00ff88",
                        color: "#00ff88",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        fontSize: "1rem",
                        zIndex: 110,
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        boxShadow:
                            "0 0 30px rgba(0,255,136,0.3), inset 0 0 30px rgba(0,255,136,0.1)",
                        fontFamily: "'Courier New', monospace",
                        textShadow: "0 0 10px #00ff88",
                    }}
                >
                    <span>
                        SECTOR:{" "}
                        <strong style={{ color: "#00ffff" }}>
                            {selectedCountry.properties.name}
                        </strong>
                    </span>
                    <button
                        onClick={() => {
                            setSelectedCountry(null);
                            setModalOpen(false);
                        }}
                        style={{
                            background:
                                "linear-gradient(135deg, #ff0080 0%, #ff4000 100%)",
                            color: "#fff",
                            border: "1px solid #ff0080",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1rem",
                            boxShadow: "0 0 15px rgba(255,0,128,0.5)",
                        }}
                    >
                        DISCONNECT
                    </button>
                </div>
            )}
            <Globe
                ref={globeRef}
                globeImageUrl=""
                backgroundColor="rgba(0,0,0,0)"
                showGlobe={false}
                showAtmosphere={false}
                atmosphereColor="#00ff88"
                atmosphereAltitude={0.15}
                polygonsData={polygons}
                polygonCapColor={(polygon) => {
                    if (
                        selectedCountry &&
                        polygon.properties &&
                        polygon.properties.iso_a3 ===
                            selectedCountry.properties.iso_a3
                    ) {
                        return "rgba(0, 255, 255, 0.95)"; // Cyber cyan for selected - more opaque
                    }
                    return "rgba(0, 255, 136, 0.8)"; // Cyber green - much more opaque
                }}
                polygonSideColor={() => "rgba(0, 255, 136, 0.6)"}
                polygonStrokeColor={(polygon) => {
                    if (
                        selectedCountry &&
                        polygon.properties &&
                        polygon.properties.iso_a3 ===
                            selectedCountry.properties.iso_a3
                    ) {
                        return "#00ffff"; // Bright cyan for selected
                    }
                    return "#00ff88"; // Neon green borders
                }}
                onPolygonClick={(polygon) =>
                    handleCountryClick(polygon as CountryFeature)
                }
                polygonLabel={(polygon) =>
                    `${(polygon as CountryFeature).properties.name}`
                }
                width={800}
                height={800}
            />
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Country Info"
                style={{
                    content: {
                        maxWidth: 300,
                        minHeight: 120,
                        left: "50%",
                        top: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        background:
                            "linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,255,255,0.1) 100%)",
                        backdropFilter: "blur(15px)",
                        color: "#00ff88",
                        borderRadius: "12px",
                        padding: "1.5rem 2rem",
                        boxShadow:
                            "0 0 50px rgba(0,255,136,0.4), inset 0 0 50px rgba(0,255,136,0.1)",
                        textAlign: "center",
                        border: "1px solid #00ff88",
                        fontSize: "1rem",
                        zIndex: 100,
                        position: "fixed",
                        fontFamily: "'Courier New', monospace",
                        textShadow: "0 0 10px #00ff88",
                    },
                    overlay: {
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(5px)",
                        zIndex: 99,
                    },
                }}
            >
                {selectedCountry ? (
                    <div>
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: "1.5rem",
                                marginBottom: 12,
                                color: "#00ffff",
                                textTransform: "uppercase",
                                letterSpacing: "0.15rem",
                                textShadow: "0 0 20px #00ffff",
                            }}
                        >
                            ◉{" "}
                            {selectedCountry.properties.name ||
                                "UNKNOWN SECTOR"}{" "}
                            ◉
                        </div>
                        <div
                            style={{
                                fontSize: "1rem",
                                marginBottom: 20,
                                color: "#00ff88",
                            }}
                        >
                            <span style={{ color: "#888" }}>SECTOR CODE:</span>{" "}
                            <span
                                style={{ color: "#00ffff", fontWeight: "bold" }}
                            >
                                {selectedCountry.properties.iso_a3 || "N/A"}
                            </span>
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                background:
                                    "linear-gradient(135deg, #ff0080 0%, #ff4000 100%)",
                                color: "#fff",
                                border: "1px solid #ff0080",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1rem",
                                boxShadow: "0 0 20px rgba(255,0,128,0.5)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            CLOSE CONNECTION
                        </button>
                    </div>
                ) : (
                    <div>
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: "1.3rem",
                                marginBottom: 12,
                                color: "#ff4000",
                                textTransform: "uppercase",
                                letterSpacing: "0.15rem",
                            }}
                        >
                            ◉ NO SIGNAL ◉
                        </div>
                        <div
                            style={{
                                fontSize: "0.95rem",
                                marginBottom: 20,
                                color: "#888",
                            }}
                        >
                            Select a sector on the grid to establish connection.
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                background:
                                    "linear-gradient(135deg, #444 0%, #666 100%)",
                                color: "#fff",
                                border: "1px solid #666",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1rem",
                            }}
                        >
                            ABORT
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GlobePage;
