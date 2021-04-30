from django.db import models
from datetime import datetime
# Create your models here.
from django.contrib.auth.models import User

class Imagemodel(models.Model):
    image = models.ImageField(upload_to="images/")
    def __str__(self):
        return self.image.url


class cake(models.Model):
    cakeid = models.AutoField(primary_key=True)
    createdate = models.DateTimeField(default=datetime.now, blank=True)
    description = models.CharField(max_length=255)
    eggless = models.BooleanField(default=True)
    flavour = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    ingredients = models.CharField(max_length=255)
    image = models.OneToOneField(Imagemodel,on_delete=models.CASCADE)
    likes = models.IntegerField(null=True,blank=True)
    name = models.CharField(max_length=255)
    price = models.IntegerField(blank=True,null=True)
    ratings = models.IntegerField(blank=True,null=True)
    reviews = models.IntegerField(blank=True,null=True)
    weight = models.FloatField(blank=True,null=True)
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class cart(models.Model):
    cakeid = models.IntegerField()
    orderdate = models.DateTimeField(default=datetime.now, blank=True)
    image = models.CharField(max_length=100 )
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    quantity = models.IntegerField(default=1,blank=True,null=True)
    weight = models.FloatField()
    email = models.EmailField()
    ordered = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class order(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=12)
    orderdate = models.DateTimeField(default=datetime.now, blank=True)
    address = models.CharField(max_length=255)
    pincode = models.PositiveIntegerField()
    city = models.CharField(max_length=100)
    email = models.EmailField()
    price = models.IntegerField()
    pending = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)
    mode = models.CharField(default="Cash",max_length=20)
    cakes = models.ManyToManyField(cart)

    def __str__(self):
        return self.email

 