from django.urls import path
from .views import register_employer,employer_details,login_employer,get_count

urlpatterns = [
    path('employer/register/',register_employer,name='registeremployer'),
    path('employer/<int:pk>',employer_details,name='employerdetails'),
    path('employer/login/',login_employer,name='loginemployer'),
    path('count/',get_count,name='getcount'),

]