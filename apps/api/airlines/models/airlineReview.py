from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .airline import Airline


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
