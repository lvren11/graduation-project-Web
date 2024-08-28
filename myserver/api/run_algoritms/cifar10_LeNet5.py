import torch
import torchvision
import torch.nn as nn
from torch.nn import functional as F
from torch.autograd import Variable
import torchsnooper

torch.manual_seed(1)

EPOCH = 1
BATCH_SIZE = 64
LR = 0.001
use_gpu = torch.cuda.is_available()

class LeNet5(nn.Module):
    def __init__(self):
        super(LeNet,self).__init__()
        # 卷积层1：输入图像深度=3，输出图像深度=16，卷积核大小=5*5，卷积步长=1;16表示输出维度，也表示卷积核个数
        self.conv1 = nn.Conv2d(in_channels=3,out_channels=16,kernel_size=5,stride=1)
        # 池化层1：采用最大池化，区域集大小=2*2.池化步长=2
        self.pool1 = nn.MaxPool2d(kernel_size=2,stride=2)
        # 卷积层2
        self.conv2 = nn.Conv2d(in_channels=16,out_channels=32,kernel_size=5,stride=1)
        # 池化层2
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2)
        # 全连接层1：输入大小=32*5*5，输出大小=120
        self.fc1 = nn.Linear(32*5*5,120)
        # 全连接层2
        self.fc2 = nn.Linear(120,84)
        # 全连接层3
        self.fc3 = nn.Linear(84,10)

    def forward(self,x):
        x = F.relu(self.conv1(x))  # input(3, 32, 32) output(16, 28, 28)
        x = self.pool1(x)  # output(16, 14, 14)
        x = F.relu(self.conv2(x))  # output(32, 10, 10)
        x = self.pool2(x)  # output(32, 5, 5)
        x = x.view(-1, 32 * 5 * 5)  # output(32*5*5)
        x = F.relu(self.fc1(x))  # output(120)
        x = F.relu(self.fc2(x))  # output(84)
        x = self.fc3(x)  # output(10)
        return x

model = LeNet5()
if use_gpu:
    model = model.cuda()
    print('USE GPU')
else:
    print('USE CPU')
    
optimizer = torch.optim.Adam(model.parameters(), lr=LR)  
loss_func = nn.CrossEntropyLoss()  

# 初始化全局模型，将其存入文件中，模拟下发给参与方的过程
torch.save(model.state_dict(), 'lenet5_c_params_global.pkl')