from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AirlineViewSet, AirlineReviewViewSet

router = DefaultRouter()
router.register(r"airlines", AirlineViewSet)
router.register(r"reviews", AirlineReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
