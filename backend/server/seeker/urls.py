from django.urls import path
from .views import register_seeker,login_seeker,seekers_details,get_jobs_by_user

urlpatterns = [
    path('seeker/register/',register_seeker,name='registerseeker'),
    path('seeker/login/',login_seeker,name='loginseeker'),
    path('seeker/<int:pk>',seekers_details,name='seekerdetails'),
    path('jobs/user/<int:user_id>/', get_jobs_by_user, name='get_jobs_by_user'),
]