"""dj_websocket URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.urls import re_path as url
from django.contrib import admin
from api import views
from django.conf.urls.static import static
from dj_websocket import settings

urlpatterns = [
    # path('admin/', admin.site.urls),
    url(r'^admin/', admin.site.urls),
    url(r'^api/login', views.LoginView.as_view()),
    url(r'^api/register', views.RegisterView.as_view()),
    url(r'^api/putpwd', views.pwdupdateView.as_view()),
    url(r'^api/flapiid', views.FlapiidView.as_view()),
    url(r'^api/fenminiid', views.FedminView.as_view()),
    url(r'^api/getdistriid/(.+)$', views.Getdistriid.as_view()),
    url(r'^api/fediid', views.FediidView.as_view()),
    url(r'^api/fednoniid', views.FednoniidView.as_view()),
    url(r'^api/getprocedure', views.Getprocedure),
    url(r'^api/getfiprocedure', views.Getfiprocedure),
    url(r'^api/getfnprocedure', views.Getfnprocedure),
    url(r'^api/getfeprocedure', views.Getfeprocedure),
    url(r'^api/getresult1/(.+)$', views.result_show1.as_view()),
    url(r'^api/getresult2/(.+)$', views.result_show2.as_view()),
    url(r'^api/getprofile/(.+)$', views.GetprofileView.as_view()),
    url(r'^api/putprofile', views.PutprofileView.as_view()),
    url(r'^api/order', views.ProOrderView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)