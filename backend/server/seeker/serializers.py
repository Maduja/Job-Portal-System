from rest_framework import serializers
from .models import Seeker
from django.contrib.auth.hashers import make_password

class SeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seeker
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data['password'])
    #     return super().create(validated_data)    
      