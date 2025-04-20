from django.urls import path
from .views import create_job,get_jobs,get_job,update_job,get_latestjob,apply_job,get_applications,update_application_status,getAllJobs

urlpatterns = [
    path('job/createjob/',create_job,name='createjob'),
    path('jobs/<int:pk>',get_jobs,name='getjob'),
    path('job/<int:pk>',get_job,name='jobdetails'),
    path('job/update/<int:pk>',update_job,name='updatejob'),
    path('job/latestjob/',get_latestjob,name='latestjob'),
    path("job/apply/",apply_job, name="apply_job"),
    path("applications/<int:pk>",get_applications, name="get_applications"),
    path("applications/update/<int:pk>",update_application_status, name="update_application_status"),
    path('job/getAllJobs/', getAllJobs, name='getAllJobs'),
]