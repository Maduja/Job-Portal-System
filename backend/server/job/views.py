from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Job,Applications
from .serializers import JobSerializer,ApplicationSerializer
from seeker.models import Seeker

@api_view(['GET'])
def get_jobs(request,pk):
    jobs = Job.objects.filter(user_id=pk)
    # jobs = Job.objects.all()
    serializerData = JobSerializer(jobs,many=True).data
    return Response(serializerData)


@api_view(['GET'])
def get_job(request,pk):
    jobs = Job.objects.get(pk=pk)
    serializerData = JobSerializer(jobs).data
    return Response(serializerData)

@api_view(['GET'])
def get_latestjob(request):
    jobs = Job.objects.order_by('-id')[:5]
    serializerData = JobSerializer(jobs,many=True).data
    return Response(serializerData)

@api_view(['GET'])
def getAllJobs(request):
        jobs = Job.objects.all()
        serializerData = JobSerializer(jobs, many=True).data
        return Response(serializerData, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_job(request):
    data = request.data
    serializer = JobSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  


@api_view(['PUT','DELETE'])
def update_job(request,pk):
    try:
        job = Job.objects.get(pk=pk)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    elif request.method == 'PUT':
        data = request.data
        serializer = JobSerializer(job,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def apply_job(request):
    data = request.data
    seeker_id = data.get('seeker_id')
    job_id = data.get('job_id')
    if Applications.objects.filter(seeker_id=seeker_id, job_id=job_id).exists():
        return Response(
            {"error": "You have already applied for this job."},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = ApplicationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_applications(request, pk):
    try:
        applications = Applications.objects.filter(employer_id=pk)

        data = []
        for application in applications:
            seeker = Seeker.objects.filter(id=application.seeker_id).first()  
            job = Job.objects.filter(id=application.job_id).first()  

            data.append({
                "application_id": application.id,
                "user_name": seeker.firstname if seeker else "Unknown",  
                "job_title": job.job_title if job else "Unknown",  
                "apply_date": application.applied_at.strftime('%Y-%m-%d'),
                "status": application.status,
            })

        
        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
def update_application_status(request, pk):
    try:
        new_status = request.data.get("status")
        application = Applications.objects.get(pk=pk)

        if not new_status:
            return Response({"error": "Status is required."}, status=status.HTTP_400_BAD_REQUEST)

        application.status = new_status
        application.save() 

        return Response({"message": "Application status updated successfully."}, status=status.HTTP_200_OK)

    except Applications.DoesNotExist:
        return Response({"error": "Application not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

