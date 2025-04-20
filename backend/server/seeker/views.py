from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from .models import Seeker
from job.models import Job
from .serializers import SeekerSerializer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from job.models import Applications
from job.models import Job, Applications


def seekers_details(request, pk):
    try:
        seeker = get_object_or_404(Seeker, pk=pk)
        if request.method == 'GET':
            data = {
                'id': seeker.id,
                'firstname': seeker.firstname,
                'lastname': seeker.lastname,
                'phoneno': seeker.phoneno,
                'email': seeker.email,
            }
            return JsonResponse(data, safe=False)
        else:
            return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
@api_view(['POST'])
def register_seeker(request):
    data = request.data
    serializer = SeekerSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_seeker(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        seeker = Seeker.objects.get(email=email)

        
        if (password == seeker.password):
           return Response(
            {'message': 'Login successful', 'seeker_id': seeker.id},
            status=status.HTTP_200_OK
        )
        else:
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    except Seeker.DoesNotExist:
        return Response({'error': 'Employer not found'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def get_jobs_by_user(request, user_id):
    try:
        jobs = Job.objects.filter(user_id=user_id).values(
            'id', 'job_title', 'job_type', 'location', 'salary', 'description', 'job_category'
        )
        return JsonResponse(list(jobs), safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


