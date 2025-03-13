from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DeliveryPartnerViewSet,
    OrderViewSet,
    AssignmentViewSet,
    assignment_metrics,
    run_assignment_algorithm,   
)

router = DefaultRouter()
router.register(r'partners', DeliveryPartnerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'assignments', AssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('assignments-metrics/', assignment_metrics, name='assignment-metrics'),
    path('assignments-run/', run_assignment_algorithm, name='assignment-run'),
]