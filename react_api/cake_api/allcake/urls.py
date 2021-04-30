# from django.contrib import admin
# from django.urls import path
# from . import views

from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
from django.contrib.auth import views as auth_views
from django.conf.urls import url


urlpatterns = [
    path('api/allcakes/', views.allcakes.as_view()),
    path('api/cakes/<int:pk>', views.cakes.as_view()),
    path('api/addcake/',views.addcakes.as_view()),
    path('api/register/',views.user_register),
    path('api/login/',views.CustomAuthToken.as_view()),
    path('api/uploadimg/',views.Upload_image.as_view()),
    path('api/addcaketocart/',views.addtocart.as_view()),
    path('api/cart/',views.showcart.as_view()),
    path('api/removefromcart/',views.removefromcart.as_view()),
    url(r'^api/searchcakes/(?P<cakes>[a-zA-Z]+)$',views.searchitems.as_view()),
    path('api/placeorder/',views.placeorder.as_view()),
    path('api/myorders/',views.myorders.as_view()),
    path('api/logout/', views.Logout.as_view()),
	]
	