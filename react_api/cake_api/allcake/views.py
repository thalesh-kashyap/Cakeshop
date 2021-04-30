from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import *
from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string


class resetPassword(APIView):
    def post(self,request):
        try:
            u = User.objects.get(email=request.data['email'])
            u.set_password(request.data['password'])
            u.save()
            u.auth_token.delete()
            return Response({"message":"success"},status=status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid detals"},status=status.HTTP_400_BAD_REQUEST)


class recoverpass(APIView):
    def post(self,request):
        try:
            user = User.objects.get(email=request.data['email'])
            token, created = Token.objects.get_or_create(user=user)
            link = 'Use this token for Reset Password : '+str(token)
            print(token)
            res = send_mail("Roshan chaudhari",
                            link, 
                            settings.EMAIL_HOST_USER, 
                            [request.data['email']],
                            fail_silently=False)
            if res:
                return Response({"message": "Token Sent to your email","token":str(token)})
            else:
                return Response({"message": "No Such Email exists"})
 
        except:
            return Response({"message": "No Such Email exists"},status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "No Such Email exists"})


class Logout(APIView):
    permission_classes =[IsAuthenticated]
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        print("logout success")
        return Response(status=status.HTTP_200_OK)


class placeorder(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        if request.method == 'POST':
            data1 =request.data
            temp =[]
            for cake in data1['cakes']:
                temp.append(cake['id'])
            data1['cakes']=temp
            serialize = seriOrder(data=data1,context={"request":request})
            if serialize.is_valid():
                serialize.save()
                queryset = cart.objects.filter(email=request.data['email']).update(ordered=True)
                return Response({"message": "order placed","order":serialize.data},status=status.HTTP_200_OK)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

class myorders(ListAPIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        queryset = order.objects.filter(email=request.data['email'])
        serialize = seriOrder(queryset,context={"request":request},many=True)
        return Response({"cakeorders":serialize.data},status=status.HTTP_200_OK)


class showcart(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        queryset = cart.objects.filter(email=request.data['email'],ordered=False)
        serialized = seriCart(queryset,context={"request":request},many=True)
        data = {
                "message" : "CartItems loaded successfully..",
                "data" : serialized.data,
        }
        return Response(data,status=status.HTTP_200_OK)


class removefromcart(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        print("remove item",id,request.data['email'])
        queryset = cart.objects.filter(cakeid=request.data['cakeid'],email=request.data['email']).delete()
        return Response({"message":"Removed  item from cart"},status=status.HTTP_200_OK)



class searchitems(APIView):
    def get(self,request,cakes):
        if request.method == 'GET':
            queryset = cake.objects.filter(name__icontains=cakes)
            serializer = seriCake(queryset,context={'request':request},many=True)
            return Response({"data":serializer.data},status=status.HTTP_201_CREATED)


class addtocart(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        if request.method == 'POST':
            print(request.data)
            serialized = seriCart(data=request.data,context={"request":request})
            if serialized.is_valid():
                serialized.save()
                return Response({"data":serialized.data,"errorMessage":"null", "message": "Added to  cart"},status=status.HTTP_201_CREATED)
            return Response({"errorMessage":serialized.errors, "message": "null"})


class cakes(APIView):
    def get(self,request,pk):
        if request.method == 'GET':
            cakedata = cake.objects.get(cakeid=pk)
            serialized = seriCake(cakedata,context={"request":request})
            data = {
                "message" : "Item loaded successfully..",
                "data" : serialized.data,
            }
            return Response(data,status=status.HTTP_200_OK)


class addcakes(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
            if request.method == 'POST':
                data = request.data       
                serializer = seriCake(data=data,context={"request":request})
                if serializer.is_valid():
                    serializer.save()
                    return Response({"data":serializer.data,"errorMessage":"null", "message": "Success"},status=status.HTTP_201_CREATED)
                return Response({"errorMessage":serializer.errors, "message": "null"},status=status.HTTP_400_BAD_REQUEST)


class allcakes(APIView):
    def get(self,request):
        if request.method == 'GET':
            data = cake.objects.all()
            serializer = seriCake(data,context={"request": request},many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)


class Upload_image(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        if request.method == 'POST':
            print("request.data............",request.data)
            serialized = seriImage(data=request.data,context={"request":request})
            if serialized.is_valid():
                serialized.save()
                return Response({"message": "Image uploaded successfully..","imageUrl":serialized.data['image'],"id":serialized.data['id']})
            return Response(serialized.errors,status=status.HTTP_400_BAD_REQUEST)    


@api_view(['POST'])
def user_register(request):
    if request.method == 'POST':
        serialized = seriUser(data=request.data)
        if serialized.is_valid():
            user = serialized.save()
            if user:
                data ={}
                data['message']="User Registered"
                return Response(data, status=status.HTTP_201_CREATED)
        return Response({'message':"User Already Exist!!"})


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.id,
            'email': user.email,
            'username':user.email
        })