from rest_framework import serializers
from .models import Airline, AirlineReview


class AirlineSerializer(serializers.ModelSerializer):
    country_name = serializers.ReadOnlyField()
    hub_airports_list = serializers.ReadOnlyField()
    fleet_types_list = serializers.ReadOnlyField()
    hiring_regions_list = serializers.ReadOnlyField()

    class Meta:
        model = Airline
        fields = [
            "id",
            "name",
            "iata_code",
            "icao_code",
            "callsign",
            "country",
            "country_name",
            "headquarters",
            "hub_airports",
            "hub_airports_list",
            "destinations",
            "fleet_size",
            "fleet_types",
            "fleet_types_list",
            "founded_year",
            "website",
            "logo_url",
            "is_hiring",
            "hiring_regions",
            "hiring_regions_list",
            "pilot_requirements",
            "pilot_salary_min",
            "pilot_salary_max",
            "cabin_crew_requirements",
            "cabin_crew_salary_min",
            "cabin_crew_salary_max",
            "benefits",
            "training_programs",
            "contact_hr",
            "created_at",
            "updated_at",
            "is_active",
        ]


class AirlineListSerializer(serializers.ModelSerializer):
    """Simplified serializer for airline list view"""

    country_name = serializers.ReadOnlyField()
    hub_airports_list = serializers.ReadOnlyField()
    fleet_types_list = serializers.ReadOnlyField()
    hiring_regions_list = serializers.ReadOnlyField()

    class Meta:
        model = Airline
        fields = [
            "id",
            "name",
            "iata_code",
            "icao_code",
            "country",
            "country_name",
            "headquarters",
            "hub_airports_list",
            "fleet_size",
            "fleet_types_list",
            "destinations",
            "is_hiring",
            "hiring_regions_list",
            "pilot_salary_min",
            "pilot_salary_max",
            "logo_url",
        ]


class AirlineReviewSerializer(serializers.ModelSerializer):
    airline_name = serializers.CharField(source="airline.name", read_only=True)

    class Meta:
        model = AirlineReview
        fields = [
            "id",
            "airline",
            "airline_name",
            "position",
            "title",
            "content",
            "overall_rating",
            "work_life_balance",
            "compensation",
            "management",
            "career_growth",
            "years_experience",
            "employment_status",
            "created_at",
            "is_verified",
        ]
        read_only_fields = ["created_at", "is_verified"]


class AirlineDetailSerializer(AirlineSerializer):
    """Extended serializer with reviews for detail view"""

    reviews = AirlineReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta(AirlineSerializer.Meta):
        fields = AirlineSerializer.Meta.fields + [
            "reviews",
            "average_rating",
            "review_count",
        ]

    def get_average_rating(self, obj):
        reviews = obj.reviews.filter(is_active=True)
        if reviews.exists():
            return round(
                sum(review.overall_rating for review in reviews) / len(reviews), 1
            )
        return None

    def get_review_count(self, obj):
        return obj.reviews.filter(is_active=True).count()
