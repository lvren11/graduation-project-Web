from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(u'email', max_length=100)
    password = models.CharField(u'password',max_length=50)

class Usertoken(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(to='User', on_delete=models.CASCADE)
    token = models.CharField(max_length=1000)

class Userprofile(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(u'name', max_length=100,default='Qinian')
    phone = models.CharField(u'phone', max_length=50)
    userid = models.OneToOneField(User, on_delete=models.CASCADE)
    career = models.CharField(u'career', max_length=50)
    city = models.CharField(u'city', max_length=50)
    country = models.CharField(u'country', max_length=50)
    remark = models.CharField(u'remark', max_length=50)
    Intro = models.TextField(u'Intro', max_length=1000)

class BLAP(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(u'dataset', max_length=50)
    datasize = models.IntegerField(u'datasize')
    network = models.CharField(u'network', max_length=50)
    aggregation = models.IntegerField(u'aggregation')
    iteration = models.IntegerField(u'iteration')
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)

class Node_blap(models.Model):
    id = models.AutoField(primary_key=True)
    BLAP = models.ForeignKey(BLAP, on_delete=models.CASCADE)
    nodeuser = models.CharField(u'nodeuser', max_length=50)
    nodenum = models.IntegerField(u'nodenum')
    # loss
    # acc

class result_BLAP(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    BLAPid = models.OneToOneField(BLAP, on_delete=models.CASCADE)
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)

class MinCost(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(u'dataset', max_length=50)
    datasize = models.IntegerField(u'datasize')
    network = models.CharField(u'network', max_length=50)
    aggregation = models.IntegerField(u'aggregation')
    iteration = models.IntegerField(u'iteration')
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)

class result_MinCost(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    MinCostid = models.OneToOneField(MinCost, on_delete=models.CASCADE)
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)