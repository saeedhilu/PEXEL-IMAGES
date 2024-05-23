from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    create_time = models.DateTimeField(auto_now_add=True)
    


