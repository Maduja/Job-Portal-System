from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
class Seeker(models.Model):
    firstname = models.CharField(max_length=50,blank=False)
    lastname  = models.CharField(max_length=50,blank=False)
    phoneno   = models.CharField(max_length=10,blank=False)
    email     = models.EmailField(unique=True,blank=False)
    password  = models.CharField(max_length=128,blank=False)

    def __str__(self):
        return self.email
  
