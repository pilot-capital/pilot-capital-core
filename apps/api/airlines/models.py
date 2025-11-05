from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import pycountry


class Airline(models.Model):
    # Basic Information
    name = models.CharField(max_length=200, help_text="Official airline name")
    iata_code = models.CharField(
        max_length=3, unique=True, help_text="IATA airline code (e.g., BA, AA, LH)"
    )
    icao_code = models.CharField(
        max_length=4, unique=True, help_text="ICAO airline code (e.g., BAW, AAL, DLH)"
    )
    callsign = models.CharField(max_length=50, help_text="Radio callsign")

    # Location & Operations
    country = models.CharField(max_length=3, help_text="ISO country code")
    headquarters = models.CharField(max_length=200)
    hub_airports = models.TextField(
        help_text="Main hub airports (comma-separated IATA codes)"
    )
    destinations = models.IntegerField(
        default=0, help_text="Number of destinations served"
    )

    # Fleet Information
    fleet_size = models.IntegerField(default=0, help_text="Total number of aircraft")
    fleet_types = models.TextField(
        help_text="Aircraft types in fleet (comma-separated)"
    )

    # Company Information
    founded_year = models.IntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2030)],
        help_text="Year the airline was founded",
    )
    website = models.URLField(blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True)

    # Employment & Career Information
    is_hiring = models.BooleanField(
        default=False, help_text="Currently hiring pilots/crew"
    )
    hiring_regions = models.TextField(
        blank=True,
        help_text="Regions where they're hiring (comma-separated country codes)",
    )

    # Pilot Information
    pilot_requirements = models.TextField(
        blank=True, help_text="Minimum requirements for pilots (licenses, hours, etc.)"
    )
    pilot_salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Minimum pilot salary (USD per year)",
    )
    pilot_salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Maximum pilot salary (USD per year)",
    )

    # Cabin Crew Information
    cabin_crew_requirements = models.TextField(
        blank=True, help_text="Requirements for cabin crew positions"
    )
    cabin_crew_salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Minimum cabin crew salary (USD per year)",
    )
    cabin_crew_salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Maximum cabin crew salary (USD per year)",
    )

    # Additional Information
    benefits = models.TextField(
        blank=True, help_text="Employee benefits (travel perks, insurance, etc.)"
    )
    training_programs = models.TextField(
        blank=True, help_text="Available training programs"
    )
    contact_hr = models.EmailField(blank=True, null=True, help_text="HR contact email")

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Airline"
        verbose_name_plural = "Airlines"

    def __str__(self):
        return f"{self.name} ({self.iata_code})"

    @property
    def country_name(self):
        """Get full country name from ISO code"""
        try:
            return pycountry.countries.get(alpha_2=self.country).name
        except:
            return self.country

    @property
    def hub_airports_list(self):
        """Convert comma-separated hub airports to list"""
        return [
            airport.strip()
            for airport in self.hub_airports.split(",")
            if airport.strip()
        ]

    @property
    def fleet_types_list(self):
        """Convert comma-separated fleet types to list"""
        return [
            aircraft.strip()
            for aircraft in self.fleet_types.split(",")
            if aircraft.strip()
        ]

    @property
    def hiring_regions_list(self):
        """Convert comma-separated hiring regions to list with country names"""
        regions = []
        for country_code in self.hiring_regions.split(","):
            code = country_code.strip()
            if code:
                try:
                    country_name = pycountry.countries.get(alpha_2=code).name
                    regions.append({"code": code, "name": country_name})
                except:
                    regions.append({"code": code, "name": code})
        return regions


class AirlineReview(models.Model):
    POSITION_CHOICES = [
        ("PILOT", "Pilot"),
        ("CABIN_CREW", "Cabin Crew"),
        ("GROUND_STAFF", "Ground Staff"),
        ("MAINTENANCE", "Maintenance"),
        ("MANAGEMENT", "Management"),
        ("OTHER", "Other"),
    ]

    RATING_CHOICES = [
        (1, "1 - Very Poor"),
        (2, "2 - Poor"),
        (3, "3 - Average"),
        (4, "4 - Good"),
        (5, "5 - Excellent"),
    ]

    airline = models.ForeignKey(
        Airline, on_delete=models.CASCADE, related_name="reviews"
    )
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    title = models.CharField(max_length=200)
    content = models.TextField()

    # Ratings
    overall_rating = models.IntegerField(choices=RATING_CHOICES)
    work_life_balance = models.IntegerField(
        choices=RATING_CHOICES, blank=True, null=True
    )
    compensation = models.IntegerField(choices=RATING_CHOICES, blank=True, null=True)
    management = models.IntegerField(choices=RATING_CHOICES, blank=True, null=True)
    career_growth = models.IntegerField(choices=RATING_CHOICES, blank=True, null=True)

    # Reviewer Info (anonymous)
    years_experience = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text="Years of experience in aviation",
    )
    employment_status = models.CharField(
        max_length=20,
        choices=[
            ("CURRENT", "Current Employee"),
            ("FORMER", "Former Employee"),
        ],
    )

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.airline.name} - {self.position} Review"
