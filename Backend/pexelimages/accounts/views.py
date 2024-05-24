

import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import  User
from accounts.utils import (
    send_otp_email,
    
)
from .serializers import (
    GenerateEmailSerializer,VerifyOTPSerializer
)


class LoginWithEmailOTP(APIView):
    """
    API endpoint to generate and send OTP via email for user registration.
    """
    serializer_class = GenerateEmailSerializer

    def post(self, request):
        """
        Generate OTP and send it to the provided email address.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            email = validated_data['email']
            username = email.split('@')[0]
            try:
                otp = random.randint(1000, 9999)
                send_otp_email(email, otp, username)

                # Create user instance if not exists
                user, created = User.objects.get_or_create(email=email, defaults={'username': username})

                # Save OTP and email to session
                request.session['email'] = email
                request.session['otp'] = otp
                print(otp)

                return Response({'message': 'GENERATE_OTP_MESSAGE'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTP(APIView):
    """
    This view handles the OTP verifying.
    """
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            print('OTP verification successful')

            return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
        else:
            print('OTP verification unsuccessful')

            return Response({'message': 'Invalid OTP', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
