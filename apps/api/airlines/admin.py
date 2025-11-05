from django.contrib import admin
from .models import Airline, AirlineReview


@admin.register(Airline)
class AirlineAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "iata_code",
        "icao_code",
        "country",
        "fleet_size",
        "destinations",
        "is_hiring",
        "is_active",
    ]
    list_filter = ["country", "is_hiring", "is_active", "founded_year"]
    search_fields = ["name", "iata_code", "icao_code", "headquarters"]
    ordering = ["name"]

    fieldsets = (
        (
            "Basic Information",
            {"fields": ("name", "iata_code", "icao_code", "callsign")},
        ),
        (
            "Location & Operations",
            {"fields": ("country", "headquarters", "hub_airports", "destinations")},
        ),
        ("Fleet Information", {"fields": ("fleet_size", "fleet_types")}),
        ("Company Information", {"fields": ("founded_year", "website", "logo_url")}),
        (
            "Employment Information",
            {
                "fields": (
                    "is_hiring",
                    "hiring_regions",
                    "pilot_requirements",
                    "pilot_salary_min",
                    "pilot_salary_max",
                    "cabin_crew_requirements",
                    "cabin_crew_salary_min",
                    "cabin_crew_salary_max",
                )
            },
        ),
        (
            "Additional Information",
            {"fields": ("benefits", "training_programs", "contact_hr")},
        ),
        ("Status", {"fields": ("is_active",)}),
    )


@admin.register(AirlineReview)
class AirlineReviewAdmin(admin.ModelAdmin):
    list_display = [
        "airline",
        "position",
        "overall_rating",
        "employment_status",
        "years_experience",
        "created_at",
        "is_verified",
        "is_active",
    ]
    list_filter = [
        "position",
        "overall_rating",
        "employment_status",
        "is_verified",
        "is_active",
        "created_at",
    ]
    search_fields = ["airline__name", "title", "content"]
    ordering = ["-created_at"]

    fieldsets = (
        ("Review Information", {"fields": ("airline", "position", "title", "content")}),
        (
            "Ratings",
            {
                "fields": (
                    "overall_rating",
                    "work_life_balance",
                    "compensation",
                    "management",
                    "career_growth",
                )
            },
        ),
        ("Reviewer Information", {"fields": ("years_experience", "employment_status")}),
        ("Status", {"fields": ("is_verified", "is_active")}),
    )
