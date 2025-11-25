from django.contrib.auth.models import AbstractUser
from django.db import models
import pycountry


class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    role = models.CharField(
        max_length=50,
        choices=[("user", "User"), ("moderator", "Moderator"), ("admin", "Admin")],
        default="user",
    )
    website = models.URLField(blank=True, null=True)

    COUNTRY_CHOICES = sorted(
        [(country.alpha_2, country.name) for country in pycountry.countries],
        key=lambda x: x[1],
    )
    country = models.CharField(
        max_length=2, choices=COUNTRY_CHOICES, blank=True, null=True
    )


class UserSettings(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    receive_newsletter = models.BooleanField(default=True)
    dark_mode = models.BooleanField(default=False)
