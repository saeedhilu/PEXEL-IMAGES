


from django.core.mail import send_mail
from rest_framework import serializers

from accounts.models import User
"""
importing constant messages from constant file
"""




class GenerateEmailSerializer(serializers.Serializer):
    """
    Serializer for generating email OTP and user registration.
    """ 
    email        = serializers.EmailField()
    def create(self, validated_data):
        """
        Create user instance using the email as username.
        """
        email = validated_data['email']
        
        # Create the user instance
        user = User.objects.create_user(
            email=email,
            )

        return user

class VerifyOTPSerializer(serializers.Serializer):
    """
    Serializer for verifying OTP.
    """
    otp = serializers.IntegerField()

    def validate(self, data):
        """
        Validate OTP.
        """
        otp = data.get('otp')
        print('OTP received:', otp)
        
        email = self.context['request'].session.get('email')
        pre_otp = self.context['request'].session.get('otp')

        if not email:
            raise serializers.ValidationError("Email not found in session")
        
        if pre_otp != otp:
            raise serializers.ValidationError("Invalid OTP")

        return data