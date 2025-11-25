const API_BASE_URL = "/api";

export interface Airline {
    id: number;
    name: string;
    iata_code: string;
    icao_code: string;
    callsign: string;
    country: string;
    country_name: string;
    headquarters: string;
    hub_airports: string;
    hub_airports_list: string[];
    destinations: number;
    fleet_size: number;
    fleet_types: string;
    fleet_types_list: string[];
    founded_year: number;
    website?: string;
    logo_url?: string;
    is_hiring: boolean;
    hiring_regions: string;
    hiring_regions_list: Array<{ code: string; name: string }>;
    pilot_requirements?: string;
    pilot_salary_min?: number;
    pilot_salary_max?: number;
    cabin_crew_requirements?: string;
    cabin_crew_salary_min?: number;
    cabin_crew_salary_max?: number;
    benefits?: string;
    training_programs?: string;
    contact_hr?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    reviews?: AirlineReview[];
    average_rating?: number;
    review_count?: number;
}

export interface AirlineReview {
    id: number;
    airline: number;
    airline_name: string;
    position:
        | "PILOT"
        | "CABIN_CREW"
        | "GROUND_STAFF"
        | "MAINTENANCE"
        | "MANAGEMENT"
        | "OTHER";
    title: string;
    content: string;
    overall_rating: number;
    work_life_balance?: number;
    compensation?: number;
    management?: number;
    career_growth?: number;
    years_experience: number;
    employment_status: "CURRENT" | "FORMER";
    created_at: string;
    is_verified: boolean;
}

export interface AirlineFilters {
    search?: string;
    country?: string;
    is_hiring?: boolean;
    min_fleet_size?: number;
    max_fleet_size?: number;
    min_destinations?: number;
    max_destinations?: number;
    min_pilot_salary?: number;
    max_pilot_salary?: number;
    region?: string;
    ordering?: string;
}

export interface AirlineStats {
    total_airlines: number;
    hiring_airlines: number;
    countries: number;
    total_fleet_size: number;
    average_fleet_size: number;
    total_destinations: number;
}

class AirlineAPI {
    private async fetchWithAuth(url: string, options: RequestInit = {}) {
        console.log(`Making API request to: ${url}`);

        const response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        console.log(`API response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`API response data:`, data);
        return data;
    }

    async getAirlines(
        filters?: AirlineFilters
    ): Promise<{ results: Airline[]; count: number }> {
        const params = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString());
                }
            });
        }

        const url = `${API_BASE_URL}/airlines/${
            params.toString() ? `?${params.toString()}` : ""
        }`;
        return this.fetchWithAuth(url);
    }

    async getAirline(id: number): Promise<Airline> {
        return this.fetchWithAuth(`${API_BASE_URL}/airlines/${id}/`);
    }

    async getHiringAirlines(): Promise<Airline[]> {
        return this.fetchWithAuth(`${API_BASE_URL}/airlines/hiring/`);
    }

    async getAirlinesByCountry(country: string): Promise<Airline[]> {
        return this.fetchWithAuth(
            `${API_BASE_URL}/airlines/by_country/?country=${country}`
        );
    }

    async getAirlineReviews(airlineId: number): Promise<AirlineReview[]> {
        return this.fetchWithAuth(
            `${API_BASE_URL}/airlines/${airlineId}/reviews/`
        );
    }

    async getAirlineStats(): Promise<AirlineStats> {
        return this.fetchWithAuth(`${API_BASE_URL}/airlines/stats/`);
    }

    async createReview(review: Partial<AirlineReview>): Promise<AirlineReview> {
        return this.fetchWithAuth(`${API_BASE_URL}/reviews/`, {
            method: "POST",
            body: JSON.stringify(review),
        });
    }

    async getReviews(filters?: {
        airline_id?: number;
        position?: string;
        min_rating?: number;
    }): Promise<{ results: AirlineReview[]; count: number }> {
        const params = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString());
                }
            });
        }

        const url = `${API_BASE_URL}/reviews/${
            params.toString() ? `?${params.toString()}` : ""
        }`;
        return this.fetchWithAuth(url);
    }
}

export const airlineApi = new AirlineAPI();
