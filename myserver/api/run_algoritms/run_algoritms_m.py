# 只是简单地实现了联邦学习的算法，采用联邦平均做模型聚合
# 无数据异构（non-iid）、无系统异构（运算速度存在差异）的最简单情况，但可以根据需要扩展

import torch
import torchvision
import torch.nn as nn
from torch.autograd import Variable
import torch.utils.data as Data
import numpy as np
from random import sample
import matplotlib.pyplot as plt
from mnist_LeNet5 import *


def runmnist(dataset,network,aggregation,iteration,userid,node):
    acc =[]
    # 加载训练和测试数据集
        train_data_all = torchvision.datasets.MNIST(
            root='../../data',
            train=True,
            transform=torchvision.transforms.ToTensor(),
            download=True
        )
        test_data_all = torchvision.datasets.MNIST(
            root='../../data',
            train=False,
            transform=torchvision.transforms.ToTensor(),
            download=True
        )


    # 给每个参与方划分数据集，将每个参与方的数据集存入列表 train_data 中，这里是对每个参与方均匀划分
    # train_data[n] 对应第 n+1 个参与方的数据，每个参与方拥有的数据集大小相同

    A=getassignment(len(train_data_all),len(node))
    train_data = []
    for n in range(0,len(node)):
        # print(6000//3)
        # print(train_data_all)
        temp, train_data_all = torch.utils.data.random_split(train_data_all, [int(node[n].get('num')),len(train_data_all)-int(node[n].get('num'))])
        train_data.append(temp)
    # sum=0
    # train_loader = Data.DataLoader(train_data[1], batch_size=64)
    # for step, (x, y) in enumerate(train_loader): 
    #     b_y = Variable(y)
    #     sum+=b_y.numpy().tolist().count(1)
    # print(sum)
    # 问题是要求每个user保留所有的标签，不同标签的样本之间的比例是相等的
    # 开始联邦学习, 共 nodes 个参与方，全局聚合 aggregation 轮
    for i in range(1,aggregation+1):
        print('第{}轮:'.format(i))
        
        # 服务器端把3个参与方加入本轮训练
        # s_nodes = sample(train_data, select_nodes)  
        # print(s_nodes)
        # 用循环来模拟各个参与方各自的本地更新，这里因为都是在自己主机里运行，所以不存在各客户端运算速度的差异
        # 模型参数是以字典格式存储的，将所有参与方本地更新后的模型参数存入列表 params 中
        # params[n] 对应第 n+1 个参与方的本第更新后的模型参数
        params = []
        for p in range(0,len(node)):
            model.load_state_dict(torch.load('lenet5_m_params_global.pkl')) # 加载当前的全局模型，模拟从服务器获取全局模型的过程
            train_loader = Data.DataLoader(train_data[p], batch_size=64)
            iter = 0
            while iter<iteration:
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
                iter += 1
            params.append(model.state_dict())
        
        # 服务器端做平均聚合，这里将所有参与方的数据集大小都设置为了相同大小
        # 对本地模型参数平均，是一种与梯度平均等价的方法
        p_sum = params[0]
        for a in range(1,len(node)):
            temp = params[a]
            for key in temp.keys():
                p_sum[key] = p_sum[key] + temp[key]
        p_avg = {}
        for key in p_sum.keys():
            p_avg[key] = p_sum[key]/len(node) 
        
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
            print('Global Accuracy: {} %'.format(Accuracy_global))
        print("------------------------------------------------------")
        acc.append(Accuracy_global)
        
        # 将新一轮全局模型存入文件，模拟下发新的全局模型的过程
        torch.save(model.state_dict(), 'lenet5_m_params_global.pkl')
