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

def blap_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'blap_{0}/{1}'.format(instance.BLAP.id, filename)

class files(models.Model):
    id = models.AutoField(primary_key=True)
    BLAP = models.ForeignKey(BLAP, on_delete=models.CASCADE)
    pklFile = models.FileField(upload_to=blap_directory_path,null=False, blank=True)

class Node_blap(models.Model):
    id = models.AutoField(primary_key=True)
    BLAP = models.ForeignKey(BLAP, on_delete=models.CASCADE)
    nodeuser = models.CharField(u'nodeuser', max_length=50)
    nodenum = models.IntegerField(u'nodenum')
    # loss
    # acc
class result_aclo(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    BLAPid = models.ForeignKey(BLAP, on_delete=models.CASCADE)
    agg = models.IntegerField(u'agg')
    acc = models.CharField(u'acc', max_length=50)
    traintime = models.CharField(u'time', max_length=50)

class client(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    traintime = models.CharField(u'time', max_length=50)
    BLAPid = models.ForeignKey(BLAP, on_delete=models.CASCADE)

class result_BLAP(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    iter = models.IntegerField(u'iter')
    loss = models.CharField(u'local_loss', max_length=50)
    BLAPid = models.ForeignKey(BLAP, on_delete=models.CASCADE)


class FedAvg(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(u'dataset', max_length=50)
    datasize = models.IntegerField(u'datasize')
    network = models.CharField(u'network', max_length=50)
    aggregation = models.IntegerField(u'aggregation')
    iteration = models.IntegerField(u'iteration')
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)
    nodes = models.IntegerField(u'nodes')
    select_nodes = models.IntegerField(u'select_nodes')

def FedAvg_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'FedAvg_{0}/{1}'.format(instance.FedAvg.id, filename)

class FedAvgfiles(models.Model):
    id = models.AutoField(primary_key=True)
    FedAvg = models.ForeignKey(FedAvg, on_delete=models.CASCADE)
    pklFile = models.FileField(upload_to=FedAvg_directory_path,null=False, blank=True)

class firesult_aclo(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    FedAvgid = models.ForeignKey(FedAvg, on_delete=models.CASCADE)
    agg = models.IntegerField(u'agg')
    acc = models.CharField(u'acc', max_length=50)
    traintime = models.CharField(u'time', max_length=50)

class ficlient(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    traintime = models.CharField(u'time', max_length=50)
    FedAvgid = models.ForeignKey(FedAvg, on_delete=models.CASCADE)

class result_FedAvg(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    iter = models.IntegerField(u'iter')
    loss = models.CharField(u'local_loss', max_length=50)
    FedAvgid = models.ForeignKey(FedAvg, on_delete=models.CASCADE)

class FedAvgn(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(u'dataset', max_length=50)
    datasize = models.IntegerField(u'datasize')
    network = models.CharField(u'network', max_length=50)
    aggregation = models.IntegerField(u'aggregation')
    iteration = models.IntegerField(u'iteration')
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)
    nodes = models.IntegerField(u'nodes')
    select_nodes = models.IntegerField(u'select_nodes')
    group = models.IntegerField(u'group')

def FedAvgn_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'FedAvgniid_{0}/{1}'.format(instance.FedAvgn.id, filename)

class FedAvgnfiles(models.Model):
    id = models.AutoField(primary_key=True)
    FedAvgn = models.ForeignKey(FedAvgn, on_delete=models.CASCADE)
    pklFile = models.FileField(upload_to=FedAvgn_directory_path,null=False, blank=True)

class fnresult_aclo(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    FedAvgnid = models.ForeignKey(FedAvgn, on_delete=models.CASCADE)
    agg = models.IntegerField(u'agg')
    acc = models.CharField(u'acc', max_length=50)
    traintime = models.CharField(u'time', max_length=50)

class fnclient(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    traintime = models.CharField(u'time', max_length=50)
    FedAvgnid = models.ForeignKey(FedAvgn, on_delete=models.CASCADE)

class result_FedAvgn(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    iter = models.IntegerField(u'iter')
    loss = models.CharField(u'local_loss', max_length=50)
    FedAvgnid = models.ForeignKey(FedAvgn, on_delete=models.CASCADE)

class MinCost(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(u'dataset', max_length=50)
    datasize = models.IntegerField(u'datasize')
    network = models.CharField(u'network', max_length=50)
    aggregation = models.IntegerField(u'aggregation')
    iteration = models.IntegerField(u'iteration')
    userid = models.ForeignKey( to= User ,on_delete=models.CASCADE)
    group = models.IntegerField(u'group')

class Node_fedmin(models.Model):
    id = models.AutoField(primary_key=True)
    MinCost = models.ForeignKey(MinCost, on_delete=models.CASCADE)
    nodeuser = models.CharField(u'nodeuser', max_length=50)
    nodeclass = models.CharField(u'nodeclass',max_length=50)

class result_MinCost(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    Globalid = models.IntegerField(u'Globalid')
    clinet = models.CharField(u'client', max_length=50)
    iter = models.IntegerField(u'iter')
    loss = models.CharField(u'local_loss', max_length=50)
    MinCostid = models.ForeignKey(MinCost, on_delete=models.CASCADE)

class feresult_aclo(models.Model):
    id = models.AutoField(primary_key=True)
    # 结果数值
    MinCostid = models.ForeignKey(MinCost, on_delete=models.CASCADE)
    agg = models.IntegerField(u'agg')
    acc = models.CharField(u'acc', max_length=50)
    traintime = models.CharField(u'time', max_length=50)