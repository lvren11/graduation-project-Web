import torch
import torchvision
import torch.nn as nn
import threading
from torch.autograd import Variable
import torch.utils.data as Data
import numpy as np
from random import sample
from api.run_algoritms.mnist_LeNet5 import *
from api.run_algoritms.mnist_VGG6 import *
from api.extensions.auth import JwtAuthorizationAuthentication
from api.utils.jwt_auth import create_token
from rest_framework.views import APIView
from dwebsocket.decorators import accept_websocket,require_websocket
from rest_framework.response import Response
from api import models
from api.run_algoritms.runmn import runmnist
from api.run_algoritms.runmf import runmnistfi
import os
import json
import argparse
from tqdm import tqdm
import torch.nn.functional as F
from torch import optim
from api.Model_fn import VGG6,LeNet_5
from api.clients import ClientsGroup, client
from api.Model_fn2 import VGG26,LeNet2_5
from api.clients2 import ClientsGroup2, client2
from api.Fedmin_new_algorithm import FedMin_Assignment
from api.blap_lenet_user import getassignment
import datetime
# 登陆视图
class LoginView(APIView):
    # 登陆界面不用做验证
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        user = request.data.get('email')
        pwd = request.data.get('password')

        # 查库返回Queryset类型对象
        user_object = models.User.objects.filter(email=user,password=pwd).first()

        if not user_object:
            return Response({'code':1001,'error':'用户名或密码错误'})
        
		# 根据用户信息生成token

        user_token = models.Usertoken.objects.filter(user=user_object).first()
        if not user_token:
            token = create_token({'id':user_object.id,'name':user_object.email})
            models.Usertoken.objects.create(user=user_object,token=token)
        else:
            token = user_token.token
        
        return Response({'code': 1000, 'token': token, 'userid' : user_object.id})

# 注册视图
class RegisterView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        user = request.data.get('email')
        pwd = request.data.get('password')
        
        user_object = models.User.objects.filter(email=user).first()

        if not user_object:
            user_object = models.User.objects.create(email=user,password=pwd)
        else:
             return Response({'code':1001,'error':'用户名重复'})

        return Response({'code': 1000, 'msg': 'success' , 'userid':user_object.id})
# 修改密码
class pwdupdateView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        user = request.data.get('email')
        pwd = request.data.get('password')

        user_object = models.User.objects.filter(email=user).first()

        if not user_object:
            return Response({'code':1001,'error':'用户名不存在'})
        else:
             models.User.objects.filter(email=user).update(password=pwd) 

        return Response({'code': 1000, 'msg': 'success'})
# 修改信息
class GetprofileView(APIView):

    def get(self,request,param1):
        userid = param1
        print(userid)
        user_object = models.User.objects.filter(id=userid).first()

        if not user_object:
            return Response({'code':1001,'error':'用户名不存在'})
        else:
             User_profile=models.Userprofile.objects.filter(userid=user_object).first()
             if not User_profile:
                 return Response({'code': 1000, 'msg': 'success','career':"未知",'name':'qinian','Intro':"暂未设置"})
             else:
                 return Response({'code': 1000, 'msg': 'success','career':User_profile.career,'name':User_profile.name,'Intro':User_profile.Intro})

        

class PutprofileView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        user = request.data.get('userid')
        name = request.data.get('name')
        phone = request.data.get('phone')
        career = request.data.get('career')
        city = request.data.get('city')
        country = request.data.get('country')
        remark = request.data.get('remark')
        Intro = request.data.get('Intro')

        user_object = models.User.objects.filter(id=user).first()

        if not user_object:
            return Response({'code':1001,'error':'用户名不存在'})
        else:
            User_profile=models.Userprofile.objects.filter(userid=user_object).first()
            if not User_profile:
                models.Userprofile.objects.create(userid=user_object,name=name,phone=phone,career=career,city=city,country=country,remark=remark,Intro=Intro) 
            else:
                models.Userprofile.objects.filter(userid=user_object).update(name=name,phone=phone,career=career,city=city,country=country,remark=remark,Intro=Intro) 

        return Response({'code': 1000, 'msg': 'success'})
#FLAP-IID视图
class Getdistriid(APIView):
    def get(self, request, param1):
        p=param1.split('&')
        A = getassignment(int(p[1]),p[0])
        print(A)
        return Response({'code': 1000, 'msg': 'success','result2':json.dumps(A)})

class FlapiidView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):

        dataset = request.data.get('dataset')
        datasize = int(request.data.get('datasize'))
        network = request.data.get('network')
        aggregation = request.data.get('aggregation')
        iteration = request.data.get('iteration')
        userid = request.data.get('userid')
        user_object = models.User.objects.filter(id=userid).first()

        models.BLAP.objects.create(dataset=dataset,datasize=datasize,network=network,aggregation=aggregation,iteration=iteration,userid=user_object)
        
        data =models.BLAP.objects.last()
        node = request.data.get('node')
        for i in range(0,len(node)):
            models.Node_blap.objects.create(BLAP=data,nodeuser=node[i].get('name'),nodenum=int(node[i].get('num')))
        
        return Response({'code': 1000, 'msg': 'success'})
# Min-Cost Non-IID视图
class FedminView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):

        dataset = request.data.get('dataset')
        datasize = int(request.data.get('datasize'))
        network = request.data.get('network')
        aggregation = request.data.get('aggregation')
        iteration = request.data.get('iteration')
        userid = request.data.get('userid')
        group = request.data.get('group')
        user_object = models.User.objects.filter(id=userid).first()
        models.MinCost.objects.create(dataset=dataset,datasize=datasize,network=network,aggregation=aggregation,iteration=iteration,userid=user_object,group=group)
        
        data =models.MinCost.objects.last()
        node = request.data.get('node')
        for i in range(0,len(node)):
            nodeclass = ','.join(node[i].get('num'))
            models.Node_fedmin.objects.create(MinCost=data,nodeuser=node[i].get('name'),nodeclass=nodeclass)
        
        return Response({'code': 1000, 'msg': 'success'})
# Fed-IID视图
class FediidView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):

        dataset = request.data.get('dataset')
        datasize = int(request.data.get('datasize'))
        network = request.data.get('network')
        aggregation = request.data.get('aggregation')
        iteration = request.data.get('iteration')
        nodes = request.data.get('nodes')
        select_nodes = request.data.get('select_nodes')
        userid = request.data.get('userid')
        user_object = models.User.objects.filter(id=userid).first()

        models.FedAvg.objects.create(dataset=dataset,datasize=datasize,network=network,aggregation=aggregation,iteration=iteration,userid=user_object,nodes=nodes,select_nodes=select_nodes)
        
        return Response({'code': 1000, 'msg': 'success'})
# Fed-NonIID视图
class FednoniidView(APIView):
    authentication_classes = []

    def post(self,request,*args,**kwargs):

        dataset = request.data.get('dataset')
        datasize = int(request.data.get('datasize'))
        network = request.data.get('network')
        aggregation = request.data.get('aggregation')
        iteration = request.data.get('iteration')
        nodes = request.data.get('nodes')
        select_nodes = request.data.get('select_nodes')
        userid = request.data.get('userid')
        group = request.data.get('group')
        user_object = models.User.objects.filter(id=userid).first()

        models.FedAvgn.objects.create(dataset=dataset,datasize=datasize,network=network,aggregation=aggregation,iteration=iteration,userid=user_object,nodes=nodes,select_nodes=select_nodes,group=group)
        
        return Response({'code': 1000, 'msg': 'success'})

# 算法过程
def subtime(date1, date2):
    date1 = datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")
    date2 = datetime.datetime.strptime(date2, "%Y-%m-%d %H:%M:%S")
    return date2 - date1

clients = []
acc=[]
@accept_websocket
def Getprocedure(request):
    if request.is_websocket():
        lock = threading.RLock()
        try:
            lock.acquire()
            clients.append(request.websocket)
            for message in request.websocket:
                if not message:
                    break
                for client in clients:
                    data = models.BLAP.objects.last()
                    Node = models.Node_blap.objects.filter(BLAP=data).values_list('nodenum',flat=True)
                    Node = list(Node)
                    train_data,test_data_all=runmnist(list(Node))
                    use_gpu = torch.cuda.is_available()
                    if data.network == 'LeNet':
                        model = LeNet5()
                    elif data.network == 'VGG6':
                        model = Vgg66()

                    if use_gpu:
                        model = model.cuda()
                        print('USE GPU')
                    else:
                        print('USE CPU')
                    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)  
                    loss_func = nn.CrossEntropyLoss()  

                    # 初始化全局模型，将其存入文件中，模拟下发给参与方的过程
                    torch.save(model.state_dict(), '{}_BLAP_{}.pkl'.format(data.network,data.id))
                    #开始联邦学习, 共 nodes 个参与方，全局聚合 aggregation 轮
                    for i in range(1,data.aggregation+1):
                        client.send(str('第{}轮:'.format(i)).encode('utf-8'))
                        # client.send(str('{}'.format(i)).encode('utf-8'))
                        startdate = datetime.datetime.now() # 获取当前时间
                        startdate = startdate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                        # 服务器端
                        # 用循环来模拟各个参与方各自的本地更新，这里因为都是在自己主机里运行，所以不存在各客户端运算速度的差异
                        # 模型参数是以字典格式存储的，将所有参与方本地更新后的模型参数存入列表 params 中
                        # params[n] 对应第 n+1 个参与方的本第更新后的模型参数
                        params = []
                        for p in range(0,len(Node)):
                            
                            clstartdate = datetime.datetime.now() # 获取当前时间
                            clstartdate = clstartdate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                            model.load_state_dict(torch.load('{}_BLAP_{}.pkl'.format(data.network,data.id))) # 加载当前的全局模型，模拟从服务器获取全局模型的过程
                            train_loader = Data.DataLoader(train_data[p], batch_size=64)
                            iter = 0
                            while iter<data.iteration:
                                train_loss = 0
                                for step, (x, y) in enumerate(train_loader): 
                                    if use_gpu:
                                        x , y = x.cuda(), y.cuda() 
                                    b_x = Variable(x)
                                    b_y = Variable(y)
                                    output = model(b_x)
                                    loss = loss_func(output, b_y)
                                    optimizer.zero_grad()
                                    loss.backward()
                                    optimizer.step()
                                    # 记录误差
                                    train_loss += loss.item()
                                    
                                iter += 1

                                client.send(str('第{}用户本地第{}轮:loss为{}'.format(p+1,iter,(train_loss / len(train_data)))).encode('utf-8'))
                                models.result_BLAP.objects.create(BLAPid=data,Globalid=i,clinet='client'+str(p+1),iter=iter,loss=(train_loss / len(train_data)))
                                # client.send(str('{}'.format(p+1)).encode('utf-8'))
                                # client.send(str('{}'.format(iter)).encode('utf-8'))
                                # client.send(str('{}'.format((train_loss / len(train_data))).encode('utf-8'))
                            clenddate = datetime.datetime.now() # 获取当前时间
                            clenddate = clenddate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                            # 计算训练时长
                            client.send(str('clinet computation Time:{}'.format(subtime(clstartdate,clenddate))).encode('utf-8')) # enddate > startdate
                            models.client.objects.create(BLAPid=data,Globalid=i,clinet='client'+str(p+1),traintime=str(subtime(clstartdate,clenddate)))
                            params.append(model.state_dict())
                        # 服务器端做平均聚合，这里将所有参与方的数据集大小都设置为了相同大小
                        # 对本地模型参数平均，是一种与梯度平均等价的方法
                        p_sum = params[0]
                        for a in range(1,len(Node)):
                            temp = params[a]
                            for key in temp.keys():
                                p_sum[key] = p_sum[key] + temp[key]
                        p_avg = {}
                        for key in p_sum.keys():
                            p_avg[key] = p_sum[key]/len(Node)  
                        enddate = datetime.datetime.now() # 获取当前时间
                        enddate = enddate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                        # 计算训练时长
                        client.send(str('computation Time per global update:{}'.format(subtime(startdate,enddate))).encode('utf-8')) # enddate > startdate
                        # 测试当前全局模型的精度
                        model.load_state_dict(p_avg)
                        test_loader = Data.DataLoader(test_data_all, batch_size=128)
                        model.eval()
                        with torch.no_grad():
                            correct = 0
                            total = 0
                            for images, labels in test_loader:
                                if use_gpu:
                                    images , labels = images.cuda(), labels.cuda() 
                                outputs = model(images)
                                _, predicted = torch.max(outputs.data, 1)
                                total += labels.size(0)
                                correct += (predicted == labels).sum().item()
                            Accuracy_global = 100 * correct / total
                            client.send(str('Global Accuracy: {} %'.format(Accuracy_global)).encode('utf-8'))
                        
                        print("------------------------------------------------------")
                        acc.append(Accuracy_global)
                        models.result_aclo.objects.create(BLAPid=data,agg=i,acc=Accuracy_global,traintime=str(subtime(startdate,enddate)))
                        # 将新一轮全局模型存入文件，模拟下发新的全局模型的过程
                        torch.save(model.state_dict(), '{}_BLAP_{}.pkl'.format(data.network,data.id))
                    # torch.save(model.state_dict(), finaly_PATH)
        finally:
            clients.remove(request.websocket)
            lock.release()


ficlients = []
fiacc=[]
@accept_websocket
def Getfiprocedure(request):
    if request.is_websocket():
        lock = threading.RLock()
        try:
            lock.acquire()
            ficlients.append(request.websocket)
            for message in request.websocket:
                if not message:
                    break
                for client in ficlients:
                    data = models.FedAvg.objects.last()
                    train_data,test_data_all=runmnistfi(data.nodes)
                    use_gpu = torch.cuda.is_available()
                    if data.network == 'LeNet':
                        model = LeNet5()
                    elif data.network == 'VGG6':
                        model = Vgg66()
                    if use_gpu:
                        model = model.cuda()
                        print('USE GPU')
                    else:
                        print('USE CPU')
                    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)  
                    loss_func = nn.CrossEntropyLoss()  

                    # 初始化全局模型，将其存入文件中，模拟下发给参与方的过程
                    torch.save(model.state_dict(), '{}_FedAvg_{}.pkl'.format(data.network,data.id))
                    #开始联邦学习, 共 nodes 个参与方，全局聚合 aggregation 轮
                    for i in range(1,data.aggregation+1):
                        client.send(str('第{}轮:'.format(i)).encode('utf-8'))
                        # client.send(str('{}'.format(i)).encode('utf-8'))
                        startdate = datetime.datetime.now() # 获取当前时间
                        startdate = startdate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                        s_nodes = sample(train_data, data.select_nodes) # 随机抽取select_nodes个参与方加入本轮训练
                        # 服务器端
                        # 用循环来模拟各个参与方各自的本地更新，这里因为都是在自己主机里运行，所以不存在各客户端运算速度的差异
                        # 模型参数是以字典格式存储的，将所有参与方本地更新后的模型参数存入列表 params 中
                        # params[n] 对应第 n+1 个参与方的本第更新后的模型参数

                        params = []
                        for p in range(0,data.select_nodes):
                            
                            clstartdate = datetime.datetime.now() # 获取当前时间
                            clstartdate = clstartdate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                            model.load_state_dict(torch.load('{}_FedAvg_{}.pkl'.format(data.network,data.id))) # 加载当前的全局模型，模拟从服务器获取全局模型的过程
                            train_loader = Data.DataLoader(s_nodes[p], batch_size=64)
                            iter = 0
                            while iter<data.iteration:
                                train_loss = 0
                                for step, (x, y) in enumerate(train_loader): 
                                    if use_gpu:
                                        x , y = x.cuda(), y.cuda() 
                                    b_x = Variable(x)
                                    b_y = Variable(y)
                                    output = model(b_x)
                                    loss = loss_func(output, b_y)
                                    optimizer.zero_grad()
                                    loss.backward()
                                    optimizer.step()
                                    # 记录误差
                                    train_loss += loss.item()
                                    
                                iter += 1

                                client.send(str('第{}用户本地第{}轮:loss为{}'.format(p+1,iter,(train_loss / len(train_data)))).encode('utf-8'))
                                models.result_FedAvg.objects.create(FedAvgid=data,Globalid=i,clinet='sl_client'+str(p+1),iter=iter,loss=(train_loss / len(train_data)))
                                # client.send(str('{}'.format(p+1)).encode('utf-8'))
                                # client.send(str('{}'.format(iter)).encode('utf-8'))
                                # client.send(str('{}'.format((train_loss / len(train_data))).encode('utf-8'))
                            clenddate = datetime.datetime.now() # 获取当前时间
                            clenddate = clenddate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                            # 计算训练时长
                            client.send(str('clinet computation Time:{}'.format(subtime(clstartdate,clenddate))).encode('utf-8')) # enddate > startdate
                            models.ficlient.objects.create(FedAvgid=data,Globalid=i,clinet='sl_client'+str(p+1),traintime=str(subtime(clstartdate,clenddate)))
                            params.append(model.state_dict())
                        # 服务器端做平均聚合，这里将所有参与方的数据集大小都设置为了相同大小
                        # 对本地模型参数平均，是一种与梯度平均等价的方法
                        p_sum = params[0]
                        for a in range(1,data.select_nodes):
                            temp = params[a]
                            for key in temp.keys():
                                p_sum[key] = p_sum[key] + temp[key]
                        p_avg = {}
                        for key in p_sum.keys():
                            p_avg[key] = p_sum[key]/data.select_nodes  
                        enddate = datetime.datetime.now() # 获取当前时间
                        enddate = enddate.strftime("%Y-%m-%d %H:%M:%S") # 当前时间转换为指定字符串格式
                        # 计算训练时长
                        client.send(str('computation Time per global update:{}'.format(subtime(startdate,enddate))).encode('utf-8')) # enddate > startdate
                        # 测试当前全局模型的精度
                        model.load_state_dict(p_avg)
                        test_loader = Data.DataLoader(test_data_all, batch_size=128)
                        model.eval()
                        with torch.no_grad():
                            correct = 0
                            total = 0
                            for images, labels in test_loader:
                                if use_gpu:
                                    images , labels = images.cuda(), labels.cuda() 
                                outputs = model(images)
                                _, predicted = torch.max(outputs.data, 1)
                                total += labels.size(0)
                                correct += (predicted == labels).sum().item()
                            Accuracy_global = 100 * correct / total
                            client.send(str('Global Accuracy: {} %'.format(Accuracy_global)).encode('utf-8'))
                        
                        print("------------------------------------------------------")
                        fiacc.append(Accuracy_global)
                        models.firesult_aclo.objects.create(FedAvgid=data,agg=i,acc=Accuracy_global,traintime=str(subtime(startdate,enddate)))
                        # 将新一轮全局模型存入文件，模拟下发新的全局模型的过程
                        torch.save(model.state_dict(), '{}_FedAvg_{}.pkl'.format(data.network,data.id))
                    # torch.save(model.state_dict(), finaly_PATH)
        finally:
            ficlients.remove(request.websocket)
            lock.release()

def test_mkdir(path):
    if not os.path.isdir(path):
        os.mkdir(path)

fnclients = []
fnacc=[]
@accept_websocket
def Getfnprocedure(request):
    if request.is_websocket():
        lock = threading.RLock()
        try:
            lock.acquire()
            fnclients.append(request.websocket)
            for message in request.websocket:
                if not message:
                    break
                for cl in fnclients:
                    fn = models.FedAvgn.objects.last()
                    test_mkdir(str('./pkl'))
                    os.environ['CUDA_VISIBLE_DEVICES'] = '0'
                    dev = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

                    net = None
                    if fn.network == 'LeNet':
                        net = LeNet_5()
                    elif fn.network == 'VGG6':
                        net = VGG6()

                    if torch.cuda.device_count() > 1:
                        print("Let's use", torch.cuda.device_count(), "GPUs!")
                        net = torch.nn.DataParallel(net)
                    net = net.to(dev)

                    loss_func = F.cross_entropy
                    opti = optim.SGD(net.parameters(), lr=0.01)
                    myClients = ClientsGroup(fn.dataset,0, fn.nodes,fn.group,dev)
                    testDataLoader = myClients.test_data_loader

                    num_in_comm = fn.select_nodes

                    global_parameters = {}
                    for key, var in net.state_dict().items():
                        global_parameters[key] = var.clone()

                    for i in range(fn.aggregation):
                        print("communicate round {}".format(i+1))
                        cl.send(str("全局迭代第 {}轮".format(i+1)).encode('utf-8'))
                        order = np.random.permutation(fn.nodes)
                        clients_in_comm = ['client{}'.format(i) for i in order[0:num_in_comm]]

                        print(clients_in_comm)
                        cl.send(str(clients_in_comm).encode('utf-8'))
                        sum_parameters = None
                        for client in tqdm(clients_in_comm):
                            local_parameters = myClients.clients_set[client].localUpdate(fn.iteration, 64, net,
                                                                                        loss_func, opti, global_parameters,cl,client,fn,i)
                            if sum_parameters is None:
                                sum_parameters = {}
                                for key, var in local_parameters.items():
                                    sum_parameters[key] = var.clone()
                            else:
                                for var in sum_parameters:
                                    sum_parameters[var] = sum_parameters[var] + local_parameters[var]

                        for var in global_parameters:
                            global_parameters[var] = (sum_parameters[var] / num_in_comm)

                        with torch.no_grad():
                            net.load_state_dict(global_parameters, strict=True)
                            correct = 0
                            total = 0
                            for data, label in testDataLoader:
                                data, label = data.to(dev), label.to(dev)
                                preds = net(data)
                                preds = torch.argmax(preds, dim=1)
                                total += label.size(0)
                                correct += (preds == label).sum().item()
                            print('accuracy: {}%'.format(100 * correct / total))
                            cl.send(str('accuracy: {}%'.format(100 * correct / total)).encode('utf-8'))
                            models.fnresult_aclo.objects.create(FedAvgnid=fn,agg=i,acc=(100 * correct / total),traintime='noget')
                        torch.save(net, os.path.join(str('./pkl'),
                                                        '{}_FedAvgn_{}.pkl'.format(fn.network,fn.id)))
        finally:
            ficlients.remove(request.websocket)
            lock.release()


def list_dic(list1,list2):
    '''
    two lists merge a dict,a list as key,other list as value
    :param list1:key
    :param list2:value
    :return:dict
    '''
    dic = dict(map(lambda x,y:[x,y], list1,list2))
    return dic

feclients = []
feacc=[]
@accept_websocket
def Getfeprocedure(request):
    if request.is_websocket():
        lock = threading.RLock()
        try:
            lock.acquire()
            feclients.append(request.websocket)
            for message in request.websocket:
                if not message:
                    break
                for cl in feclients:
                    fe = models.MinCost.objects.last()
                    test_mkdir(str('./pkl'))
                    os.environ['CUDA_VISIBLE_DEVICES'] = '0'
                    dev = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
                    Nodeuser = models.Node_fedmin.objects.filter(MinCost=fe).values_list('nodeuser',flat=True)
                    Nodeclass = models.Node_fedmin.objects.filter(MinCost=fe).values_list('nodeclass',flat=True)
                    Node=list_dic(Nodeuser,Nodeclass)
                    A,min_values = FedMin_Assignment(Node)
                    net = None
                    if fe.network == 'LeNet':
                        net = LeNet2_5()
                    elif fe.network == 'VGG6':
                        net = VGG26()

                    if torch.cuda.device_count() > 1:
                        print("Let's use", torch.cuda.device_count(), "GPUs!")
                        net = torch.nn.DataParallel(net)
                    net = net.to(dev)

                    loss_func = F.cross_entropy
                    opti = optim.SGD(net.parameters(), lr=0.01)
                    myClients = ClientsGroup2(fe.dataset,0, A,500,dev)
                    testDataLoader = myClients.test_data_loader

                    global_parameters = {}
                    for key, var in net.state_dict().items():
                        global_parameters[key] = var.clone()

                    for i in range(fe.aggregation):
                        print("communicate round {}".format(i+1))
                        cl.send(str("全局迭代第 {}轮".format(i+1)).encode('utf-8'))

                        clients_in_comm = ['client{}'.format(i) for i in range(len(A))]

                        print(clients_in_comm)
                        cl.send(str(clients_in_comm).encode('utf-8'))
                        sum_parameters = None
                        for client in tqdm(clients_in_comm):
                            local_parameters = myClients.clients_set[client].localUpdate(fe.iteration, 64, net,
                                                                                        loss_func, opti, global_parameters,cl,client,fe,i)
                            if sum_parameters is None:
                                sum_parameters = {}
                                for key, var in local_parameters.items():
                                    sum_parameters[key] = var.clone()
                            else:
                                for var in sum_parameters:
                                    sum_parameters[var] = sum_parameters[var] + local_parameters[var]

                        for var in global_parameters:
                            global_parameters[var] = (sum_parameters[var] /len(A))

                        with torch.no_grad():
                            net.load_state_dict(global_parameters, strict=True)
                            correct = 0
                            total = 0
                            for data, label in testDataLoader:
                                data, label = data.to(dev), label.to(dev)
                                preds = net(data)
                                preds = torch.argmax(preds, dim=1)
                                total += label.size(0)
                                correct += (preds == label).sum().item()
                            print('accuracy: {}%'.format(100 * correct / total))
                            cl.send(str('accuracy: {}%'.format(100 * correct / total)).encode('utf-8'))
                            models.feresult_aclo.objects.create(MinCostid=fe,agg=i,acc=(100 * correct / total),traintime='noget')
                        torch.save(net, os.path.join(str('./pkl'),
                                                        '{}_FedMin_{}.pkl'.format(fe.network,fe.id)))
        finally:
            ficlients.remove(request.websocket)
            lock.release()
# class Getprocedure(APIView):
#     def get(self, request, *args, **kwargs):

#         algorithm = kwargs.get('al_id')

#         if algorithm == 1:
            
#             data = models.BLAP.objects.last()
            
#             return Response({'code': 1000, 'mag': 'success'})
# # 算法结果返回

class result_show1(APIView):
    def get(self, request,param1):
        userid = param1
        user_object = models.User.objects.filter(id=userid).first()

        data1 = models.BLAP.objects.filter(userid=user_object).last()

        Nodeuser = models.Node_blap.objects.filter(BLAP=data1).values_list('nodeuser',flat=True)
        Nodenum = models.Node_blap.objects.filter(BLAP=data1).values_list('nodenum',flat=True)
        Nodeuser = list(Nodeuser)
        Nodenum = list(Nodenum)
        A=[]
        for i in range(len(Nodeuser)):
             A.append({'name':Nodeuser[i],'value':int(Nodenum[i])})
        B=[]
        C=[]
        for i in range(len(Nodeuser)):
             client = models.result_BLAP.objects.filter(BLAPid=data1,clinet='client'+str(i+1)).values_list('loss',flat=True)
             B.append({"name":Nodeuser[i],"type":'line',"data":list(client)})
        iter = models.result_BLAP.objects.filter(BLAPid=data1,clinet='client1').values_list('iter',flat=True)
        gl = models.result_BLAP.objects.filter(BLAPid=data1,clinet='client1').values_list('Globalid',flat=True)
        iter = list(iter)
        gl = list(gl)
        for j in range(len(iter)):
                C.append(str(gl[j])+'-'+str(iter[j]))
        # Nodeuser = models.Node_blap.objects.filter(BLAP=data1).values_list('nodeuser',flat=True)
        # all = []
        # all.append({"user":Nodeuser,"x":C,"y":B})
        acc = models.result_aclo.objects.filter(BLAPid=data1).values_list('acc',flat=True)
        agg = models.result_aclo.objects.filter(BLAPid=data1).values_list('agg',flat=True)
        acc=list(acc)
        agg=list(agg)
        finaly=[]
        for k in range(len(acc)):
            finaly.append(["global"+str(agg[k]),float(acc[k])])


        data2 = models.FedAvg.objects.filter(userid=user_object).last()
        Bf=[]
        Cf=[]
        U=[]
        for i in range(data2.select_nodes):
             client = models.result_FedAvg.objects.filter(FedAvgid=data2,clinet='sl_client'+str(i+1)).values_list('loss',flat=True)
             Bf.append({"name":'client'+str(i+1),"type":'line',"data":list(client)})
             U.append('client'+str(i+1))
        iterf = models.result_FedAvg.objects.filter(FedAvgid=data2,clinet='sl_client1').values_list('iter',flat=True)
        glf = models.result_FedAvg.objects.filter(FedAvgid=data2,clinet='sl_client1').values_list('Globalid',flat=True)
        iterf = list(iterf)
        glf = list(glf)
        for j in range(len(iter)):
                Cf.append(str(glf[j])+'-'+str(iterf[j]))
        # Nodeuser = models.Node_blap.objects.filter(BLAP=data1).values_list('nodeuser',flat=True)
        # all = []
        # all.append({"user":Nodeuser,"x":C,"y":B})
        accf = models.firesult_aclo.objects.filter(FedAvgid=data2).values_list('acc',flat=True)
        aggf = models.firesult_aclo.objects.filter(FedAvgid=data2).values_list('agg',flat=True)
        accf=list(accf)
        aggf=list(aggf)
        finalyf=[]
        for k in range(len(accf)):
            finalyf.append(["global"+str(aggf[k]),float(accf[k])])

        return Response({'code': 1000, 'mag': 'success','result1':json.dumps(A),'user':json.dumps(Nodeuser),'x':json.dumps(C),'y':json.dumps(B),'fi':json.dumps(finaly),'userf':json.dumps(U),'xf':json.dumps(Cf),'yf':json.dumps(Bf),'fif':json.dumps(finalyf)})

class result_show2(APIView):
    def get(self, request,param1):
        userid = param1
        user_object = models.User.objects.filter(id=userid).first()

        data1 = models.MinCost.objects.filter(userid=user_object).last()
        Nodeuser = models.Node_fedmin.objects.filter(MinCost=data1).values_list('nodeuser',flat=True)
        Nodeclass = models.Node_fedmin.objects.filter(MinCost=data1).values_list('nodeclass',flat=True)
        Node=list_dic(Nodeuser,Nodeclass)
        As,min_values = FedMin_Assignment(Node)
        Nodeuser = list(Nodeuser)
        A=[]
        for i in range(len(Nodeuser)):
             A.append({'name':Nodeuser[i],'value':int(As[i])})
        B=[]
        C=[]
        for i in range(len(Nodeuser)):
             client = models.result_MinCost.objects.filter(MinCostid=data1,clinet='client'+str(i)).values_list('loss',flat=True)
             B.append({"name":Nodeuser[i],"type":'line',"data":list(client)})
        iter = models.result_MinCost.objects.filter(MinCostid=data1,clinet='client0').values_list('iter',flat=True)
        gl = models.result_MinCost.objects.filter(MinCostid=data1,clinet='client0').values_list('Globalid',flat=True)
        iter = list(iter)
        gl = list(gl)
        for j in range(len(iter)):
                C.append(str(gl[j]+1)+'-'+str(iter[j]+1))
        # Nodeuser = models.Node_blap.objects.filter(BLAP=data1).values_list('nodeuser',flat=True)
        # all = []
        # all.append({"user":Nodeuser,"x":C,"y":B})
        acc = models.feresult_aclo.objects.filter(MinCostid=data1).values_list('acc',flat=True)
        agg = models.feresult_aclo.objects.filter(MinCostid=data1).values_list('agg',flat=True)
        acc=list(acc)
        agg=list(agg)
        finaly=[]
        for k in range(len(acc)):
            finaly.append(["global"+str(agg[k]+1),float(acc[k])])


        data2 = models.FedAvgn.objects.filter(userid=user_object).last()
        Bf=[]
        Cf=[]
        U=[]
        center = []
        an=np.zeros(shape=(data2.select_nodes,data2.aggregation*data2.select_nodes))
        print(an)
        for i in range(data2.select_nodes):
            for j in range(data2.aggregation):
                client = models.result_FedAvgn.objects.filter(FedAvgnid=data2,Globalid=j).values_list('loss',flat=True)
                center = np.array(list(client)).reshape(data2.select_nodes,data2.select_nodes)
                for k in range(data2.select_nodes):
                    for z in range(data2.select_nodes):
                        an[k][j*data2.select_nodes+z]=center[k][z]
            Bf.append({"name":'client'+str(i+1),"type":'line',"data":an[i].tolist()})
            U.append('client'+str(i+1))

        for j in range(data2.aggregation):
            for k in range(data2.select_nodes):
                Cf.append(str(j+1)+'-'+str(k+1))
        # Nodeuser = models.Node_blap.objects.filter(BLAP=data1).values_list('nodeuser',flat=True)
        # all = []
        # all.append({"user":Nodeuser,"x":C,"y":B})
        accf = models.fnresult_aclo.objects.filter(FedAvgnid=data2).values_list('acc',flat=True)
        aggf = models.fnresult_aclo.objects.filter(FedAvgnid=data2).values_list('agg',flat=True)
        accf=list(accf)
        aggf=list(aggf)
        finalyf=[]
        for k in range(len(accf)):
            finalyf.append([str(aggf[k]+1),float(accf[k])])
        return Response({'code': 1000, 'mag': 'success','result1':json.dumps(A),'user':json.dumps(Nodeuser),'x':json.dumps(C),'y':json.dumps(B),'fi':json.dumps(finaly),'userf':json.dumps(U),'xf':json.dumps(Cf),'yf':json.dumps(Bf),'fif':json.dumps(finalyf)})
class result_compare(APIView):
    def get(self, request,param1):
        userid = param1
        user_object = models.User.objects.filter(id=userid).first()

# 测视视图
class ProOrderView(APIView):
    def get(self, request, *args, **kwargs):
        print(request.user)
        return Response('111')

