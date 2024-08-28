import torch
from run_algoritms.mnist_LeNet5 import *
from run_algoritms.mnist_VGG6 import *
def transfer(dataset,network,id):
# pytorch环境中
    if dataset == 'MNIST':
        model = LeNet5()# 搭建网络
    else :
        model = VGG6()

    model.load_state_dict(torch.load('{}_BLAP_{}.pkl'.format(network,id))) # 加载参数
    model.eval() # 模型设为评估模式

    # 1张3通道224*224的图片
    input_tensor = torch.rand(1, 1, 28, 28) # 设定输入数据格式

    mobile = torch.jit.trace(model, input_tensor) # 模型转化
    mobile.save('mobile_pt_{}_BLAP_{}.pt'.format(network,id)) # 保存文件

if __name__=="__main__":

    transfer('MNIST','LeNet',1)