

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
            email          = validated_data['email']

            username       = email.split('@')[0]

            

            try:
                otp = 123123
                send_otp_email(email, otp, username)

                
                request.session['email']        = email
                request.session['otp']        = otp
    
        

                return Response({'message': 'GENERATE_OTP_MESSAGE'},
                                status=status.HTTP_200_OK)

            except Exception as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                                )
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
                )



class VerifyOTP(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response({'message': 'OTP verified successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)
