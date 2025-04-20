from django.db import models


class Employer(models.Model):
    email = models.EmailField(blank=False,unique=True)
    password = models.CharField(max_length=50,blank=False)
    role = models.CharField(blank=False,max_length=10)
    company_name = models.CharField(blank=False,max_length=50)
    phone_no = models.CharField(max_length=10,blank=False)
    website = models.URLField(blank=False)
    location = models.CharField(blank=False,max_length=50)

    def __str__(self):
        return self.company_name
