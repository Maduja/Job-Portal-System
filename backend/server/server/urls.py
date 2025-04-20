
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers


# route = routers.DefaultRouter()
# route.register(r'job',Jobview,basename='jobview')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/',include(route.urls)),
    path('api/',include('job.urls')),
    path('api/',include('employer.urls')),
    path('api/',include('seeker.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
