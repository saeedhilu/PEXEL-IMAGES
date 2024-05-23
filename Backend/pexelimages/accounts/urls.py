from django.urls import path
from .views import LoginWithEmailOTP, VerifyOTP

urlpatterns = [
    path('login/', LoginWithEmailOTP.as_view(), name='login'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify_otp'),
]
