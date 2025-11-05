import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { airlineApi } from "../api/airlineApi";
import type { Airline, AirlineReview } from "../api/airlineApi";
import "./AirlineDetailPage.css";

export const AirlineDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [airline, setAirline] = useState<Airline | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<
        "overview" | "careers" | "reviews"
    >("overview");

    useEffect(() => {
        if (id) {
            loadAirline(parseInt(id));
        }
    }, [id]);

    const loadAirline = async (airlineId: number) => {
        try {
            setLoading(true);
            const data = await airlineApi.getAirline(airlineId);
            setAirline(data);
        } catch (err) {
            setError("Failed to load airline details");
            console.error("Error loading airline:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Not specified";
        if (min && max)
            return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (min) return `From $${min.toLocaleString()}`;
        if (max) return `Up to $${max.toLocaleString()}`;
    };

    const renderStars = (rating: number) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    if (loading) {
        return (
            <div className="airline-detail-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading airline details...</p>
                </div>
            </div>
        );
    }

    if (error || !airline) {
        return (
            <div className="airline-detail-page">
                <div className="error-container">
                    <h2>Airline Not Found</h2>
                    <p>
                        {error || "The requested airline could not be found."}
                    </p>
                    <Link to="/airlines" className="back-button">
                        ← Back to Airlines
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="airline-detail-page">
            <div className="airline-hero">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <div className="airline-header">
                        <div className="airline-logo">
                            {airline.logo_url ? (
                                <img
                                    src={airline.logo_url}
                                    alt={`${airline.name} logo`}
                                />
                            ) : (
                                <div className="logo-placeholder">✈️</div>
                            )}
                        </div>
                        <div className="airline-info">
                            <h1>{airline.name}</h1>
                            <div className="airline-meta">
                                <span className="codes">
                                    {airline.iata_code} • {airline.icao_code}
                                </span>
                                <span className="callsign">
                                    "{airline.callsign}"
                                </span>
                            </div>
                            <div className="location">
                                📍 {airline.headquarters},{" "}
                                {airline.country_name}
                            </div>
                            {airline.is_hiring && (
                                <div className="hiring-status">
                                    🟢 Currently Hiring
                                </div>
                            )}
                        </div>
                        <div className="airline-stats">
                            <div className="stat">
                                <div className="stat-number">
                                    {airline.fleet_size}
                                </div>
                                <div className="stat-label">Aircraft</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">
                                    {airline.destinations}
                                </div>
                                <div className="stat-label">Destinations</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">
                                    {airline.founded_year}
                                </div>
                                <div className="stat-label">Founded</div>
                            </div>
                        </div>
                    </div>

                    <div className="navigation-tabs">
                        <button
                            className={`tab ${
                                activeTab === "overview" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab ${
                                activeTab === "careers" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("careers")}
                        >
                            Careers
                        </button>
                        <button
                            className={`tab ${
                                activeTab === "reviews" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews ({airline.review_count || 0})
                        </button>
                    </div>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === "overview" && (
                    <div className="overview-tab">
                        <div className="info-grid">
                            <div className="info-card">
                                <h3>✈️ Fleet Information</h3>
                                <div className="info-item">
                                    <span className="label">Fleet Size:</span>
                                    <span className="value">
                                        {airline.fleet_size} aircraft
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="label">
                                        Aircraft Types:
                                    </span>
                                    <div className="aircraft-list">
                                        {airline.fleet_types_list.map(
                                            (type, index) => (
                                                <span
                                                    key={index}
                                                    className="aircraft-tag"
                                                >
                                                    {type}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="info-card">
                                <h3>🌍 Operations</h3>
                                <div className="info-item">
                                    <span className="label">Hub Airports:</span>
                                    <div className="hub-list">
                                        {airline.hub_airports_list.map(
                                            (hub, index) => (
                                                <span
                                                    key={index}
                                                    className="hub-tag"
                                                >
                                                    {hub}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="label">Destinations:</span>
                                    <span className="value">
                                        {airline.destinations} locations
                                        worldwide
                                    </span>
                                </div>
                            </div>

                            <div className="info-card">
                                <h3>🏢 Company Info</h3>
                                <div className="info-item">
                                    <span className="label">Founded:</span>
                                    <span className="value">
                                        {airline.founded_year}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Headquarters:</span>
                                    <span className="value">
                                        {airline.headquarters},{" "}
                                        {airline.country_name}
                                    </span>
                                </div>
                                {airline.website && (
                                    <div className="info-item">
                                        <span className="label">Website:</span>
                                        <a
                                            href={airline.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="website-link"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "careers" && (
                    <div className="careers-tab">
                        <div className="careers-grid">
                            <div className="career-card pilot-card">
                                <h3>👨‍✈️ Pilot Positions</h3>
                                <div className="salary-range">
                                    <span className="salary-label">
                                        Salary Range:
                                    </span>
                                    <span className="salary-value">
                                        {formatSalary(
                                            airline.pilot_salary_min,
                                            airline.pilot_salary_max
                                        )}
                                    </span>
                                </div>
                                {airline.pilot_requirements && (
                                    <div className="requirements">
                                        <h4>Requirements:</h4>
                                        <div className="requirements-text">
                                            {airline.pilot_requirements
                                                .split("\n")
                                                .map((req, index) => (
                                                    <p key={index}>{req}</p>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="career-card cabin-crew-card">
                                <h3>👩‍✈️ Cabin Crew Positions</h3>
                                <div className="salary-range">
                                    <span className="salary-label">
                                        Salary Range:
                                    </span>
                                    <span className="salary-value">
                                        {formatSalary(
                                            airline.cabin_crew_salary_min,
                                            airline.cabin_crew_salary_max
                                        )}
                                    </span>
                                </div>
                                {airline.cabin_crew_requirements && (
                                    <div className="requirements">
                                        <h4>Requirements:</h4>
                                        <div className="requirements-text">
                                            {airline.cabin_crew_requirements
                                                .split("\n")
                                                .map((req, index) => (
                                                    <p key={index}>{req}</p>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {airline.benefits && (
                            <div className="benefits-card">
                                <h3>🎁 Benefits & Perks</h3>
                                <div className="benefits-content">
                                    {airline.benefits
                                        .split("\n")
                                        .map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="benefit-item"
                                            >
                                                <span className="benefit-icon">
                                                    ✓
                                                </span>
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {airline.training_programs && (
                            <div className="training-card">
                                <h3>🎓 Training Programs</h3>
                                <div className="training-content">
                                    {airline.training_programs
                                        .split("\n")
                                        .map((program, index) => (
                                            <p key={index}>{program}</p>
                                        ))}
                                </div>
                            </div>
                        )}

                        {airline.hiring_regions_list.length > 0 && (
                            <div className="hiring-regions-card">
                                <h3>🌍 Hiring Regions</h3>
                                <div className="regions-list">
                                    {airline.hiring_regions_list.map(
                                        (region, index) => (
                                            <span
                                                key={index}
                                                className="region-tag"
                                            >
                                                {region.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {airline.contact_hr && (
                            <div className="contact-card">
                                <h3>📧 Contact HR</h3>
                                <a
                                    href={`mailto:${airline.contact_hr}`}
                                    className="contact-button"
                                >
                                    {airline.contact_hr}
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="reviews-tab">
                        {airline.average_rating && (
                            <div className="reviews-summary">
                                <div className="average-rating">
                                    <div className="rating-number">
                                        {airline.average_rating}
                                    </div>
                                    <div className="rating-stars">
                                        {renderStars(
                                            Math.round(airline.average_rating)
                                        )}
                                    </div>
                                    <div className="rating-count">
                                        Based on {airline.review_count} reviews
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="reviews-list">
                            {airline.reviews && airline.reviews.length > 0 ? (
                                airline.reviews.map((review: AirlineReview) => (
                                    <div
                                        key={review.id}
                                        className="review-card"
                                    >
                                        <div className="review-header">
                                            <h4>{review.title}</h4>
                                            <div className="review-meta">
                                                <span className="position">
                                                    {review.position}
                                                </span>
                                                <span className="separator">
                                                    •
                                                </span>
                                                <span className="experience">
                                                    {review.years_experience}{" "}
                                                    years
                                                </span>
                                                <span className="separator">
                                                    •
                                                </span>
                                                <span className="status">
                                                    {review.employment_status}
                                                </span>
                                                <div className="rating">
                                                    {renderStars(
                                                        review.overall_rating
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            <p>{review.content}</p>
                                        </div>
                                        {(review.work_life_balance ||
                                            review.compensation ||
                                            review.management ||
                                            review.career_growth) && (
                                            <div className="detailed-ratings">
                                                {review.work_life_balance && (
                                                    <div className="rating-item">
                                                        <span>
                                                            Work-Life Balance:
                                                        </span>
                                                        <span>
                                                            {renderStars(
                                                                review.work_life_balance
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {review.compensation && (
                                                    <div className="rating-item">
                                                        <span>
                                                            Compensation:
                                                        </span>
                                                        <span>
                                                            {renderStars(
                                                                review.compensation
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {review.management && (
                                                    <div className="rating-item">
                                                        <span>Management:</span>
                                                        <span>
                                                            {renderStars(
                                                                review.management
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {review.career_growth && (
                                                    <div className="rating-item">
                                                        <span>
                                                            Career Growth:
                                                        </span>
                                                        <span>
                                                            {renderStars(
                                                                review.career_growth
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="review-date">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-reviews">
                                    <h3>No reviews yet</h3>
                                    <p>Be the first to review this airline!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="back-to-airlines">
                <Link to="/airlines" className="back-button">
                    ← Back to Airlines
                </Link>
            </div>
        </div>
    );
};
