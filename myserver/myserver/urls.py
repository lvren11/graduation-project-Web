"""myserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, url
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from api import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    url(r'^api/login', views.LoginView.as_view()),
    url(r'^api/register', views.RegisterView.as_view()),
    url(r'^api/putpwd', views.pwdupdateView.as_view()),
    url(r'^api/flapiid', views.FlapiidView.as_view()),
    url(r'^api/getprocedure', views.Getprocedure),
    url(r'^api/order', views.ProOrderView.as_view()),
]
