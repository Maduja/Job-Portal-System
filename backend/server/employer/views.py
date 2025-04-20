from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from .models import Employer
from job.models import Job
from seeker.models import Seeker
from .serializers import EmployerSerializer
from job.serializers import JobSerializer

@api_view(['POST'])
def register_employer(request):
    data = request.data
    serializer = EmployerSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def employer_details(request,pk):
    employer = Employer.objects.get(pk=pk)
    serializerData = EmployerSerializer(employer).data
    return Response(serializerData)


@api_view(['POST'])
def login_employer(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        employer = Employer.objects.get(email=email)
        if (password == employer.password):
           return Response(
            {'message': 'Login successful', 'employer_id': employer.id},
            status=status.HTTP_200_OK
        )
        else:
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    except Employer.DoesNotExist:
        return Response({'error': 'Employer not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_count(request):
    job_count = Job.objects.count()
    company_count = Employer.objects.count()
    user_count = Seeker.objects.count()
    return Response({'jobs':job_count,'companies':company_count,'users':user_count})