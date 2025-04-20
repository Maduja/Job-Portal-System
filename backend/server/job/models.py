from django.db import models

from django.db import models
from seeker.models import Seeker

class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('Full-Time', 'Full-Time'),
        ('Part-Time', 'Part-Time'),
    ]

    JOB_CATEGORY_CHOICES = [
        ('Healthcare', 'Healthcare'),
        ('IT', 'IT'),
        ('Finance', 'Finance'),
        ('Engineering', 'Engineering'),
        ('Education', 'Education'),
        ('Other', 'Other'),
    ]

    # image = models.ImageField(upload_to='uploads/images',null=False,blank=False)
    job_title = models.CharField(max_length=150, null=False, blank=False)
    job_type = models.CharField(
        max_length=50,
        choices=JOB_TYPE_CHOICES,
        null=False,
        blank=False
    )
    location = models.CharField(max_length=150, null=False, blank=False)  
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)  
    description = models.TextField(null=False, blank=False) 
    job_category = models.CharField(
        max_length=100,
        choices=JOB_CATEGORY_CHOICES,
        null=False,
        blank=False
    )  
    user_id = models.IntegerField(blank=False,null=False)

    def __str__(self):
        return self.job_title

class Applications(models.Model):
    seeker_id = models.IntegerField(blank=False, null=False)  
    job_id = models.IntegerField(blank=False, null=False)     
    applied_at = models.DateTimeField(auto_now_add=True)  
    status = models.CharField(max_length=50, blank=False)  
    employer_id = models.IntegerField(blank=False, null=False)  

