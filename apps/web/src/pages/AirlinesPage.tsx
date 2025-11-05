import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { airlineApi } from "../api/airlineApi";
import type { Airline, AirlineFilters, AirlineStats } from "../api/airlineApi";
import "./AirlinesPage.css";

export const AirlinesPage: React.FC = () => {
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [stats, setStats] = useState<AirlineStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<AirlineFilters>({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            // First test the health endpoint
            console.log("Testing health endpoint...");
            const healthResponse = await fetch("/api/airlines/health/");
            const healthData = await healthResponse.json();
            console.log("Health check result:", healthData);

            const [airlinesData, statsData] = await Promise.all([
                airlineApi.getAirlines(filters),
                airlineApi.getAirlineStats(),
            ]);

            // Handle both paginated and non-paginated responses
            console.log("Airlines API Response:", airlinesData);
            console.log("Stats API Response:", statsData);

            const airlines = airlinesData?.results || airlinesData || [];
            setAirlines(airlines);
            setStats(statsData || null);

            console.log("Set airlines count:", airlines.length);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to load airlines data";
            setError(`Failed to load airlines data: ${errorMessage}`);
            setAirlines([]); // Ensure airlines is always an array
            console.error("Error loading airlines:", err);
            console.error("Error details:", {
                message: errorMessage,
                stack: err instanceof Error ? err.stack : undefined,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, search: searchTerm });
    };

    const handleFilterChange = (key: keyof AirlineFilters, value: any) => {
        setFilters({ ...filters, [key]: value });
    };

    const clearFilters = () => {
        setFilters({});
        setSearchTerm("");
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Not specified";
        if (min && max)
            return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (min) return `From $${min.toLocaleString()}`;
        if (max) return `Up to $${max.toLocaleString()}`;
    };

    console.log(
        "AirlinesPage render - Loading:",
        loading,
        "Error:",
        error,
        "Airlines count:",
        airlines.length
    );

    if (loading) {
        return (
            <div className="airlines-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading airlines data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="airlines-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={loadData} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="airlines-page">
            <div className="airlines-header">
                <h1>✈️ Aviation Careers Hub</h1>
                <p>Discover opportunities with airlines worldwide</p>
            </div>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">
                            {stats.total_airlines}
                        </div>
                        <div className="stat-label">Airlines</div>
                    </div>
                    <div className="stat-card hiring">
                        <div className="stat-number">
                            {stats.hiring_airlines}
                        </div>
                        <div className="stat-label">Currently Hiring</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.countries}</div>
                        <div className="stat-label">Countries</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">
                            {Math.round(stats.average_fleet_size || 0)}
                        </div>
                        <div className="stat-label">Avg Fleet Size</div>
                    </div>
                </div>
            )}

            <div className="filters-section">
                <div className="search-container">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search airlines, codes, or locations..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            🔍 Search
                        </button>
                    </form>
                </div>

                <div className="filter-grid">
                    <select
                        value={filters.is_hiring?.toString() || ""}
                        onChange={(e) =>
                            handleFilterChange(
                                "is_hiring",
                                e.target.value === "true"
                                    ? true
                                    : e.target.value === "false"
                                    ? false
                                    : undefined
                            )
                        }
                        className="filter-select"
                    >
                        <option value="">All Airlines</option>
                        <option value="true">Currently Hiring</option>
                        <option value="false">Not Hiring</option>
                    </select>

                    <select
                        value={filters.ordering || ""}
                        onChange={(e) =>
                            handleFilterChange(
                                "ordering",
                                e.target.value || undefined
                            )
                        }
                        className="filter-select"
                    >
                        <option value="">Sort by Name</option>
                        <option value="fleet_size">Fleet Size</option>
                        <option value="-fleet_size">Fleet Size (Desc)</option>
                        <option value="destinations">Destinations</option>
                        <option value="-destinations">
                            Destinations (Desc)
                        </option>
                        <option value="founded_year">Founded Year</option>
                        <option value="-founded_year">
                            Founded Year (Desc)
                        </option>
                    </select>

                    <div className="filter-inputs">
                        <input
                            type="number"
                            placeholder="Min Fleet Size"
                            value={filters.min_fleet_size || ""}
                            onChange={(e) =>
                                handleFilterChange(
                                    "min_fleet_size",
                                    e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                )
                            }
                            className="filter-input"
                        />
                        <input
                            type="number"
                            placeholder="Min Salary (USD)"
                            value={filters.min_pilot_salary || ""}
                            onChange={(e) =>
                                handleFilterChange(
                                    "min_pilot_salary",
                                    e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                )
                            }
                            className="filter-input"
                        />
                    </div>

                    {Object.keys(filters).length > 0 && (
                        <button
                            onClick={clearFilters}
                            className="clear-filters"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            <div className="airlines-grid">
                {airlines &&
                    airlines.length > 0 &&
                    airlines.map((airline) => (
                        <div
                            key={airline.id}
                            className={`airline-card ${
                                airline.is_hiring ? "hiring" : ""
                            }`}
                        >
                            <div className="airline-header">
                                <div className="airline-logo">
                                    {airline.logo_url ? (
                                        <img
                                            src={airline.logo_url}
                                            alt={`${airline.name} logo`}
                                        />
                                    ) : (
                                        <div className="logo-placeholder">
                                            ✈️
                                        </div>
                                    )}
                                </div>
                                <div className="airline-info">
                                    <h3>{airline.name}</h3>
                                    <div className="airline-codes">
                                        {airline.iata_code} •{" "}
                                        {airline.icao_code}
                                    </div>
                                    <div className="airline-location">
                                        📍 {airline.headquarters},{" "}
                                        {airline.country_name}
                                    </div>
                                </div>
                                {airline.is_hiring && (
                                    <div className="hiring-badge">
                                        🟢 HIRING
                                    </div>
                                )}
                            </div>

                            <div className="airline-details">
                                <div className="detail-row">
                                    <span className="detail-label">
                                        Fleet Size:
                                    </span>
                                    <span className="detail-value">
                                        {airline.fleet_size} aircraft
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        Destinations:
                                    </span>
                                    <span className="detail-value">
                                        {airline.destinations} locations
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        Founded:
                                    </span>
                                    <span className="detail-value">
                                        {airline.founded_year}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        Pilot Salary:
                                    </span>
                                    <span className="detail-value">
                                        {formatSalary(
                                            airline.pilot_salary_min,
                                            airline.pilot_salary_max
                                        )}
                                    </span>
                                </div>
                                {airline.hub_airports_list &&
                                    airline.hub_airports_list.length > 0 && (
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Hubs:
                                            </span>
                                            <span className="detail-value">
                                                {airline.hub_airports_list
                                                    .slice(0, 3)
                                                    .join(", ")}
                                                {airline.hub_airports_list
                                                    .length > 3 &&
                                                    ` +${
                                                        airline
                                                            .hub_airports_list
                                                            .length - 3
                                                    } more`}
                                            </span>
                                        </div>
                                    )}
                            </div>

                            <div className="airline-actions">
                                <Link
                                    to={`/airlines/${airline.id}`}
                                    className="view-details-button"
                                >
                                    View Details
                                </Link>
                                {airline.website && (
                                    <a
                                        href={airline.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="website-button"
                                    >
                                        🌐 Website
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {(!airlines || airlines.length === 0) && !loading && (
                <div className="empty-state">
                    <h3>No airlines found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
};
