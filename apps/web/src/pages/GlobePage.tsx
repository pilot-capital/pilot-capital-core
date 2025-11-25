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

    // Continent interaction states
    const [hoveredContinent, setHoveredContinent] = useState<string | null>(
        null
    );
    const [selectedContinent, setSelectedContinent] = useState<string | null>(
        null
    );
    const [viewMode, setViewMode] = useState<"continent" | "country">(
        "continent"
    );
    const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(
        null
    );

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

    // Continent mapping - maps country codes to continents
    const continentMapping: { [key: string]: string } = {
        // North America
        USA: "North America",
        CAN: "North America",
        MEX: "North America",
        GTM: "North America",
        CUB: "North America",
        DOM: "North America",
        HTI: "North America",
        HND: "North America",
        BLZ: "North America",
        CRI: "North America",
        PAN: "North America",
        NIC: "North America",
        SLV: "North America",
        JAM: "North America",

        // South America
        BRA: "South America",
        ARG: "South America",
        PER: "South America",
        COL: "South America",
        BOL: "South America",
        VEN: "South America",
        CHL: "South America",
        ECU: "South America",
        URY: "South America",
        PRY: "South America",
        GUY: "South America",
        SUR: "South America",
        GUF: "South America",

        // Europe
        RUS: "Europe",
        FRA: "Europe",
        ESP: "Europe",
        SWE: "Europe",
        DEU: "Europe",
        FIN: "Europe",
        NOR: "Europe",
        POL: "Europe",
        ITA: "Europe",
        GBR: "Europe",
        GRC: "Europe",
        BGR: "Europe",
        HUN: "Europe",
        PRT: "Europe",
        AUT: "Europe",
        CZE: "Europe",
        SRB: "Europe",
        IRL: "Europe",
        LTU: "Europe",
        LVA: "Europe",
        EST: "Europe",
        SVK: "Europe",
        SVN: "Europe",
        HRV: "Europe",
        BIH: "Europe",
        ALB: "Europe",
        MKD: "Europe",
        MNE: "Europe",
        BEL: "Europe",
        NLD: "Europe",
        CHE: "Europe",
        DNK: "Europe",
        LUX: "Europe",
        MLT: "Europe",
        CYP: "Europe",
        ISL: "Europe",
        ROU: "Europe",
        MDA: "Europe",
        UKR: "Europe",
        BLR: "Europe",

        // Asia
        CHN: "Asia",
        IND: "Asia",
        KAZ: "Asia",
        SAU: "Asia",
        IDN: "Asia",
        IRN: "Asia",
        MNG: "Asia",
        PAK: "Asia",
        TUR: "Asia",
        AFG: "Asia",
        MMR: "Asia",
        THA: "Asia",
        UZB: "Asia",
        IRQ: "Asia",
        JPN: "Asia",
        VNM: "Asia",
        MYS: "Asia",
        NPL: "Asia",
        YEM: "Asia",
        KGZ: "Asia",
        LAO: "Asia",
        SYR: "Asia",
        KHM: "Asia",
        JOR: "Asia",
        AZE: "Asia",
        ARE: "Asia",
        TJK: "Asia",
        BGD: "Asia",
        LKA: "Asia",
        GEO: "Asia",
        KOR: "Asia",
        PRK: "Asia",
        OMN: "Asia",
        QAT: "Asia",
        KWT: "Asia",
        BHR: "Asia",
        ARM: "Asia",
        ISR: "Asia",
        LBN: "Asia",
        PSE: "Asia",
        BTN: "Asia",
        BRN: "Asia",
        SGP: "Asia",
        MDV: "Asia",
        TKM: "Asia",
        PHL: "Asia",
        TWN: "Asia",

        // Africa
        DZA: "Africa",
        COD: "Africa",
        SDN: "Africa",
        LBY: "Africa",
        TCD: "Africa",
        NER: "Africa",
        AGO: "Africa",
        MLI: "Africa",
        ZAF: "Africa",
        ETH: "Africa",
        MRT: "Africa",
        EGY: "Africa",
        TZA: "Africa",
        NGA: "Africa",
        NAM: "Africa",
        MOZ: "Africa",
        ZMB: "Africa",
        SOM: "Africa",
        CAF: "Africa",
        MDG: "Africa",
        BWA: "Africa",
        KEN: "Africa",
        CMR: "Africa",
        MAR: "Africa",
        UGA: "Africa",
        GHA: "Africa",
        BFA: "Africa",
        SEN: "Africa",
        TUN: "Africa",
        MLW: "Africa",
        ZWE: "Africa",
        BEN: "Africa",
        TGO: "Africa",
        SLE: "Africa",
        LBR: "Africa",
        CIV: "Africa",
        GIN: "Africa",
        GNB: "Africa",
        GAB: "Africa",
        GNQ: "Africa",
        COG: "Africa",
        RWA: "Africa",
        BDI: "Africa",
        DJI: "Africa",
        ERI: "Africa",
        GMB: "Africa",
        CPV: "Africa",
        COM: "Africa",
        MUS: "Africa",
        SYC: "Africa",
        STP: "Africa",
        LSO: "Africa",
        SWZ: "Africa",

        // Oceania
        AUS: "Oceania",
        PNG: "Oceania",
        NZL: "Oceania",
        FJI: "Oceania",
        NCL: "Oceania",
        SLB: "Oceania",
        VUT: "Oceania",
        PYF: "Oceania",
        WSM: "Oceania",
        KIR: "Oceania",
        FSM: "Oceania",
        TON: "Oceania",
        PLW: "Oceania",
        COK: "Oceania",
        NRU: "Oceania",
        TUV: "Oceania",
        MHL: "Oceania",
    };

    // Continent center points for focusing
    const continentCenters: {
        [key: string]: { lat: number; lng: number; altitude: number };
    } = {
        "North America": { lat: 45, lng: -100, altitude: 2.5 },
        "South America": { lat: -15, lng: -60, altitude: 2.5 },
        Europe: { lat: 50, lng: 10, altitude: 2.2 },
        Asia: { lat: 30, lng: 100, altitude: 3.0 },
        Africa: { lat: 0, lng: 20, altitude: 2.8 },
        Oceania: { lat: -25, lng: 140, altitude: 2.5 },
    };

    // Get continent for a country
    const getContinent = (countryCode: string): string | null => {
        return continentMapping[countryCode] || null;
    };

    // Handle hover (continent or country mode)
    const handlePolygonHover = (polygon: any) => {
        if (!polygon) {
            // Clear all hover states when no polygon
            setHoveredContinent(null);
            setHoveredCountry(null);
            return;
        }

        const countryCode =
            polygon?.properties?.iso_a3 ||
            polygon?.properties?.["ISO3166-1-Alpha-3"];
        const continent = getContinent(countryCode);

        if (viewMode === "continent") {
            setHoveredContinent(continent);
            setHoveredCountry(null);
        } else {
            // Country mode - set hovered country
            setHoveredCountry(polygon as CountryFeature);
            setHoveredContinent(null);
        }
    };

    // Handle continent click
    const handleContinentClick = (polygon: any) => {
        if (viewMode === "continent") {
            const countryCode =
                polygon?.properties?.iso_a3 ||
                polygon?.properties?.["ISO3166-1-Alpha-3"];
            const continent = getContinent(countryCode);
            if (continent) {
                setSelectedContinent(continent);
                setViewMode("country");
                // Focus on continent
                const center = continentCenters[continent];
                if (center && globeRef.current) {
                    globeRef.current.pointOfView(center, 1200);
                }
            }
        } else {
            // Country mode - existing country click behavior
            handleCountryClick(polygon);
        }
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
                height: "calc(100vh - 80px)",
                width: "100vw",
                position: "fixed",
                top: "80px",
                left: 0,
                right: 0,
                fontFamily: "'Courier New', monospace",
                overflow: "hidden",
            }}
        >
            {/* Optional title - positioned absolutely so it doesn't affect globe layout */}
            <h1
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#9d4edd",
                    textShadow: "0 0 20px #9d4edd, 0 0 40px #9d4edd",
                    fontSize: "1.5rem",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.2rem",
                    zIndex: 10,
                    pointerEvents: "none",
                }}
            >
                ◉ PILOT GLOBE ◉
            </h1>

            {/* Mode and continent info display */}
            <div
                style={{
                    position: "absolute",
                    top: "60px",
                    left: "20px",
                    color: "#9d4edd",
                    background: "rgba(0,0,0,0.8)",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: "1px solid #9d4edd",
                    zIndex: 15,
                    fontSize: "0.9rem",
                    maxWidth: "250px",
                }}
            >
                <div>
                    Mode:{" "}
                    <strong>
                        {viewMode === "continent"
                            ? "Continent Selection"
                            : "Country Selection"}
                    </strong>
                </div>
                {selectedContinent && (
                    <div>
                        Continent: <strong>{selectedContinent}</strong>
                    </div>
                )}
                {hoveredContinent && viewMode === "continent" && (
                    <div>
                        Hover: <strong>{hoveredContinent}</strong>
                    </div>
                )}
                <div
                    style={{
                        marginTop: "8px",
                        fontSize: "0.8rem",
                        opacity: 0.8,
                    }}
                >
                    {viewMode === "continent"
                        ? "Hover over continents, click to explore countries"
                        : "Click countries for details"}
                </div>
            </div>

            {/* Back button when in country mode */}
            {viewMode === "country" && (
                <button
                    onClick={() => {
                        setViewMode("continent");
                        setSelectedContinent(null);
                        setSelectedCountry(null);
                        // Reset globe view
                        if (globeRef.current) {
                            globeRef.current.pointOfView(
                                { lat: 0, lng: 0, altitude: 2.5 },
                                1200
                            );
                        }
                    }}
                    style={{
                        position: "absolute",
                        top: "60px",
                        right: "20px",
                        background:
                            "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
                        color: "#000",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        zIndex: 15,
                        boxShadow: "0 0 15px rgba(157,78,221,0.3)",
                    }}
                >
                    ← Back to Continents
                </button>
            )}

            {selectedCountry && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(135deg, rgba(157,78,221,0.1) 0%, rgba(199,125,255,0.1) 100%)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid #9d4edd",
                        color: "#9d4edd",
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
                        textShadow: "0 0 10px #9d4edd",
                    }}
                >
                    <span>
                        SECTOR:{" "}
                        <strong style={{ color: "#c77dff" }}>
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
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Globe
                    ref={globeRef}
                    globeImageUrl=""
                    backgroundColor="rgba(0,0,0,0)"
                    showGlobe={false}
                    showAtmosphere={false}
                    atmosphereColor="#9d4edd"
                    atmosphereAltitude={0.15}
                    polygonsData={polygons}
                    polygonCapColor={(polygon) => {
                        const countryCode =
                            polygon?.properties?.iso_a3 ||
                            polygon?.properties?.["ISO3166-1-Alpha-3"];
                        const continent = getContinent(countryCode);

                        if (viewMode === "continent") {
                            // Continent mode coloring - all same color unless hovered/selected
                            if (
                                hoveredContinent &&
                                continent === hoveredContinent
                            ) {
                                return "rgba(255, 107, 157, 0.9)"; // Bright pink for hovered continent
                            }
                            if (
                                selectedContinent &&
                                continent === selectedContinent
                            ) {
                                return "rgba(157, 78, 221, 0.8)"; // Purple for selected continent
                            }
                            // All continents same default color
                            return "rgba(199, 125, 255, 0.6)"; // Same purple for all continents
                        } else {
                            // Country mode coloring
                            if (
                                selectedCountry &&
                                polygon.properties &&
                                polygon.properties.iso_a3 ===
                                    selectedCountry.properties.iso_a3
                            ) {
                                return "rgba(199, 125, 255, 0.95)"; // Bright purple for selected country
                            }
                            if (
                                selectedContinent &&
                                continent === selectedContinent
                            ) {
                                return "rgba(157, 78, 221, 0.7)"; // Purple for countries in selected continent
                            }
                            return "rgba(120, 120, 120, 0.3)"; // Dim gray for other countries
                        }
                    }}
                    polygonSideColor={() => "rgba(157, 78, 221, 0.4)"}
                    polygonStrokeColor={(polygon) => {
                        const countryCode =
                            polygon?.properties?.iso_a3 ||
                            polygon?.properties?.["ISO3166-1-Alpha-3"];
                        const continent = getContinent(countryCode);

                        if (viewMode === "continent") {
                            if (
                                hoveredContinent &&
                                continent === hoveredContinent
                            ) {
                                return "#c77dff"; // Light purple border for hovered continent
                            }
                            return "#9d4edd"; // Purple borders for continents
                        } else {
                            if (
                                selectedCountry &&
                                polygon.properties &&
                                polygon.properties.iso_a3 ===
                                    selectedCountry.properties.iso_a3
                            ) {
                                return "#c77dff"; // Bright purple for selected country
                            }
                            return "#9d4edd"; // Purple borders for countries
                        }
                    }}
                    onPolygonClick={(polygon) => handleContinentClick(polygon)}
                    onPolygonHover={(polygon) => handlePolygonHover(polygon)}
                    polygonLabel={(polygon) => {
                        const countryCode =
                            (polygon as any)?.properties?.iso_a3 ||
                            (polygon as any)?.properties?.["ISO3166-1-Alpha-3"];
                        const countryName = (polygon as CountryFeature)
                            .properties.name;

                        if (viewMode === "continent") {
                            const continent = getContinent(countryCode);
                            return continent ? `${continent}` : countryName;
                        } else {
                            return countryName;
                        }
                    }}
                    width={window.innerWidth}
                    height={window.innerHeight - 80}
                />
            </div>
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
                        color: "#9d4edd",
                        borderRadius: "12px",
                        padding: "1.5rem 2rem",
                        boxShadow:
                            "0 0 50px rgba(0,255,136,0.4), inset 0 0 50px rgba(0,255,136,0.1)",
                        textAlign: "center",
                        border: "1px solid #9d4edd",
                        fontSize: "1rem",
                        zIndex: 100,
                        position: "fixed",
                        fontFamily: "'Courier New', monospace",
                        textShadow: "0 0 10px #9d4edd",
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
                                color: "#c77dff",
                                textTransform: "uppercase",
                                letterSpacing: "0.15rem",
                                textShadow: "0 0 20px #c77dff",
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
                                color: "#9d4edd",
                            }}
                        >
                            <span style={{ color: "#888" }}>SECTOR CODE:</span>{" "}
                            <span
                                style={{ color: "#c77dff", fontWeight: "bold" }}
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
