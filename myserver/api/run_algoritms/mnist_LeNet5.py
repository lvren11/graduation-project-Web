# 搭建一个简单的MNIST模型，自行扩展到其他的模型
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

# class cnn(nn.Module):
#     def __init__(self):
#         super(cnn, self).__init__()
#         self.conv1 = nn.Sequential(  
#             nn.Conv2d(
#                 in_channels=1,  
#                 out_channels=16, 
#                 kernel_size=5,  
#                 stride=1,  
#                 padding=2, 
#             ),  
#             nn.ReLU(), 
#             nn.MaxPool2d(kernel_size=2),  
#         )
#         self.conv2 = nn.Sequential(  
#             nn.Conv2d(16, 32, 5, 1, 2),  
#             nn.ReLU(),  
#             nn.MaxPool2d(2),  
#         )
#         self.out = nn.Linear(32 * 7 * 7, 10)

#     def forward(self, x):
#         x = self.conv1(x)
#         x = self.conv2(x)
#         x = x.view(x.size(0), -1)
#         output = self.out(x)
#         return output
 
# @torchsnooper.snoop()

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


model = LeNet5()
if use_gpu:
    model = model.cuda()
    print('USE GPU')
else:
    print('USE CPU')
    
optimizer = torch.optim.Adam(model.parameters(), lr=LR)  
loss_func = nn.CrossEntropyLoss()  

# 初始化全局模型，将其存入文件中，模拟下发给参与方的过程
torch.save(model.state_dict(), 'lenet5_m_params_global.pkl')