# 搭建一个简单的MNIST模型，自行扩展到其他的模型
import torch
import torchvision
import torch.nn as nn
from torch.nn import functional as F
from torch.autograd import Variable
import torchsnooper

torch.manual_seed(1)

class LeNet5(nn.Module):
    def __init__(self):
        '''构造函数，定义网络的结构'''
        super().__init__()
        #定义卷积层，1个输入通道，6个输出通道，5*5的卷积filter，外层补上了两圈0, padding=2保证输入输出尺寸相同
        self.conv1 = nn.Conv2d(1, 6, 5, padding=2)
        #第二个卷积层，6个输入，16个输出，5*5的卷积filter 
        self.conv2 = nn.Conv2d(6, 16, 5)

        #最后是三个全连接层
        self.fc1 = nn.Linear(16*5*5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        '''前向传播函数'''
        #先卷积，然后调用relu激活函数，再最大值池化操作
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        #第二次卷积+池化操作
        x = F.max_pool2d(F.relu(self.conv2(x)), (2, 2))
        #重新塑形,将多维数据重新塑造为二维数据，256*400
        x = x.view(-1, self.num_flat_features(x))
        #print('size', x.size())
        #第一个全连接
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def num_flat_features(self, x):
        #x.size()返回值为(256, 16, 5, 5)，size的值为(16, 5, 5)，256是batch_size
        size = x.size()[1:]        #x.size返回的是一个元组，size表示截取元组中第二个开始的数字
        num_features = 1
        for s in size:
            num_features *= s
        return num_features 
