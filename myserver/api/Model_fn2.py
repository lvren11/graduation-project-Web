import torch
import torch.nn as nn
import torch.nn.functional as F

from torchsummary import summary
class VGG26(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=64, kernel_size=3,stride=1, padding=2)
        
        self.conv2 = nn.Conv2d(in_channels=64, out_channels=64, kernel_size=3,stride=1, padding=2)
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.conv3 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3,stride=1, padding=2)
        
        self.conv4 = nn.Conv2d(in_channels=128, out_channels=128, kernel_size=3,stride=1, padding=2)
        self.pool4 = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.conv5 = nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3,stride=1, padding=2)
        
        self.fc1 = nn.Linear(256*13*13, 10)

    def forward(self, inputs):
        tensor = inputs.view(-1, 1, 28, 28)
        tensor = F.relu(self.conv1(tensor))
        
        tensor = F.relu(self.conv2(tensor))
        tensor = self.pool2(tensor)
        tensor = F.relu(self.conv2(tensor))
        
        tensor = F.relu(self.conv3(tensor))
        
        tensor = F.relu(self.conv4(tensor))
        tensor = self.pool4(tensor)
        tensor = F.relu(self.conv5(tensor))

        tensor = tensor.view(-1, 256*13*13)
        tensor = F.relu(self.fc1(tensor))
        return tensor
        
class LeNet2_5(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=6, kernel_size=5, padding=2)
        self.pool1 = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.conv2 = nn.Conv2d(in_channels=6, out_channels=16, kernel_size=5)
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = nn.Linear(16*5*5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, inputs):
        tensor = inputs.view(-1, 1, 28, 28)
        tensor = F.relu(self.conv1(tensor))
        tensor = self.pool1(tensor)
        tensor = F.relu(self.conv2(tensor))
        tensor = self.pool2(tensor)
        tensor = tensor.view(-1, 16*5*5)
        tensor = F.relu(self.fc1(tensor))
        tensor = F.relu(self.fc2(tensor))
        tensor = self.fc3(tensor)
        return tensor