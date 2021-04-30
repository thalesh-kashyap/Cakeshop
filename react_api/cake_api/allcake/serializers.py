from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class seriUser(serializers.ModelSerializer):
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def create(self,validate_data):
        user = User.objects.create_user(validate_data['username'],validate_data['email'],validate_data['password'])
        return user
    class Meta:
        model = User
        fields = ['id','email','username','password']

class seriImage(serializers.ModelSerializer):
    class Meta:
        model = Imagemodel
        fields = '__all__'

class seriCake(serializers.ModelSerializer):
    class Meta:
        model = cake
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        data['image'] = request.build_absolute_uri(seriImage(Imagemodel.objects.get(pk=data['image'])).data['image'])
        data['owner'] = seriUser(User.objects.get(pk=data['owner'])).data
        del data['owner']['password']
        return data

class seriCart(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = '__all__'

class seriOrder(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['cakes']=seriCart(cart.objects.filter(id__in = data['cakes']),many=True).data
        return data