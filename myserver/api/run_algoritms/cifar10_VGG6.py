import torch
import torchvision
import torch.nn as nn
from torch.nn import functional as F
from torch.autograd import Variable
import torchsnooper
from torchsummary import summary

torch.manual_seed(1)

EPOCH = 1
BATCH_SIZE = 64
LR = 0.001
use_gpu = torch.cuda.is_available()

# @torchsnooper.snoop()
class VGG6(nn.Module):
    
    def __init__(self):
        super(VGG6, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.conv3 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1)
        self.conv4 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1)
        self.conv5 = nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3, stride=1, padding=1)
        #self.conv6 = nn.Conv2d(256, 256, 3)
        # self.conv7 = nn.Conv2d(256, 256, 3)
        # self.conv8 = nn.Conv2d(256, 512, 3)
        # self.conv9 = nn.Conv2d(512, 512, 3)
        # self.conv10 = nn.Conv2d(512, 512, 3)
        self.fc1 = nn.Linear(256*8*8, 10)

    def forward(self, x):
        x = F.selu(self.conv1(x))
        x = F.selu(self.conv2(x))
        x = F.max_pool2d(x,2)
        x = F.selu(self.conv3(x))
        x = F.selu(self.conv4(x))
        x = F.max_pool2d(x,2)
        x = F.selu(self.conv5(x))
        #x = F.selu(self.conv6(x))
        # x = F.selu(self.conv7(x))
        # x = F.max_pool2d(x, 2)
        # x = F.selu(self.conv8(x))
        # x = F.selu(self.conv9(x))
        # x = F.selu(self.conv10(x))
        # print(x.size())
        x = x.view(x.size(0), -1)
        # print(x.size())
        x = self.fc1(x)
        # print(x.size())
        return F.log_softmax(x, dim=1)

    # def load_state_dict(self, new_state):
    #     state = self.state_dict()
    #     for layer in state:
    #         if layer in new_state:
    #             if state[layer].size() == new_state[layer].size():
    #                 state[layer] = new_state[layer]
    #     super().load_state_dict(state)


model = VGG6()

# summary(model, (3, 32, 32), device='cpu')

if use_gpu:
    model = model.cuda()
    print('USE GPU')
else:
    print('USE CPU')
    
optimizer = torch.optim.Adam(model.parameters(), lr=LR)  
loss_func = nn.CrossEntropyLoss()  

# 初始化全局模型，将其存入文件中，模拟下发给参与方的过程
torch.save(model.state_dict(), 'VGG6_c_params_global.pkl')