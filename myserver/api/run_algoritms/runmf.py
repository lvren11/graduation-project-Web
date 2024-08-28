import torch
import torchvision
import torch.nn as nn
from torch.autograd import Variable
import torch.utils.data as Data
import numpy as np
from random import sample
import matplotlib.pyplot as plt


def runmnistfi(nodes):
    acc =[]
    train_data_all = torchvision.datasets.MNIST(
        root='../data',
        train=True,
        transform=torchvision.transforms.ToTensor(),
        download=True
    )
    test_data_all = torchvision.datasets.MNIST(
        root='../data',
        train=False,
        transform=torchvision.transforms.ToTensor(),
        download=True
    )


    # 给每个参与方划分数据集，将每个参与方的数据集存入列表 train_data 中，这里是对每个参与方均匀划分
    # train_data[n] 对应第 n+1 个参与方的数据，每个参与方拥有的数据集大小相同

    # A=getassignment(len(train_data_all),len(node))
    train_data = []
    for n in range(0,nodes):
        temp, train_data_all = torch.utils.data.random_split(train_data_all, [60000//nodes,len(train_data_all)-60000//nodes])
        train_data.append(temp)
    return train_data,test_data_all
    