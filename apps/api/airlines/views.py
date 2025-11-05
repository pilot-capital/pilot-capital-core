from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Avg
from .models import Airline, AirlineReview
from .serializers import (
    AirlineSerializer,
    AirlineListSerializer,
    AirlineDetailSerializer,
    AirlineReviewSerializer,
)


class AirlineViewSet(viewsets.ModelViewSet):
    queryset = Airline.objects.filter(is_active=True)
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name", "iata_code", "icao_code", "country", "headquarters"]
    ordering_fields = ["name", "founded_year", "fleet_size", "destinations"]
    ordering = ["name"]

    # Filtering
    filterset_fields = {
        "country": ["exact"],
        "is_hiring": ["exact"],
        "fleet_size": ["gte", "lte"],
        "destinations": ["gte", "lte"],
        "founded_year": ["gte", "lte"],
    }

    def get_serializer_class(self):
        if self.action == "list":
            return AirlineListSerializer
        elif self.action == "retrieve":
            return AirlineDetailSerializer
        return AirlineSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filter by hiring status
        hiring = self.request.query_params.get("hiring", None)
        if hiring == "true":
            queryset = queryset.filter(is_hiring=True)

        # Filter by salary range
        min_salary = self.request.query_params.get("min_pilot_salary", None)
        max_salary = self.request.query_params.get("max_pilot_salary", None)

        if min_salary:
            queryset = queryset.filter(pilot_salary_min__gte=min_salary)
        if max_salary:
            queryset = queryset.filter(pilot_salary_max__lte=max_salary)

        # Filter by region
        region = self.request.query_params.get("region", None)
        if region:
            queryset = queryset.filter(
                Q(country__icontains=region) | Q(hiring_regions__icontains=region)
            )

        return queryset

    @action(detail=False, methods=["get"])
    def hiring(self, request):
        """Get airlines that are currently hiring"""
        airlines = self.get_queryset().filter(is_hiring=True)
        serializer = AirlineListSerializer(airlines, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def by_country(self, request):
        """Get airlines grouped by country"""
        country = request.query_params.get("country")
        if not country:
            return Response(
                {"error": "Country parameter required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        airlines = self.get_queryset().filter(country=country)
        serializer = AirlineListSerializer(airlines, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def reviews(self, request, pk=None):
        """Get reviews for a specific airline"""
        airline = self.get_object()
        reviews = AirlineReview.objects.filter(airline=airline, is_active=True)
        serializer = AirlineReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def stats(self, request):
        """Get airline statistics"""
        queryset = self.get_queryset()

        stats = {
            "total_airlines": queryset.count(),
            "hiring_airlines": queryset.filter(is_hiring=True).count(),
            "countries": queryset.values_list("country", flat=True).distinct().count(),
            "total_fleet_size": sum(airline.fleet_size for airline in queryset),
            "average_fleet_size": queryset.aggregate(Avg("fleet_size"))[
                "fleet_size__avg"
            ],
            "total_destinations": sum(airline.destinations for airline in queryset),
        }

        return Response(stats)

    @action(detail=False, methods=["get"])
    def health(self, request):
        """Health check endpoint for debugging"""
        from django.utils import timezone

        return Response(
            {
                "status": "ok",
                "timestamp": timezone.now(),
                "airline_count": self.get_queryset().count(),
                "message": "Airlines API is working",
                "cors_origin": request.META.get("HTTP_ORIGIN", "No origin header"),
            }
        )


class AirlineReviewViewSet(viewsets.ModelViewSet):
    queryset = AirlineReview.objects.filter(is_active=True)
    serializer_class = AirlineReviewSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ["created_at", "overall_rating"]
    ordering = ["-created_at"]

    filterset_fields = {
        "airline": ["exact"],
        "position": ["exact"],
        "overall_rating": ["gte", "lte"],
        "employment_status": ["exact"],
    }

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filter by airline
        airline_id = self.request.query_params.get("airline_id", None)
        if airline_id:
            queryset = queryset.filter(airline_id=airline_id)

        # Filter by minimum rating
        min_rating = self.request.query_params.get("min_rating", None)
        if min_rating:
            queryset = queryset.filter(overall_rating__gte=min_rating)

        return queryset
