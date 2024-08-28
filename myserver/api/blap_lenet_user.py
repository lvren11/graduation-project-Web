# -*- coding: utf-8 -*-

import numpy as np
import json
#import matplotlib.pyplot as plt

# data size 数据大小
def getassignment(D,Node):
    # D = 600
    Arr = json.loads(Node)
    print(Arr)
    #性能分析器找到的特定于设备和模型的参数(模拟) 三个user
    k_1 = 1

    b_1 = - 1.3

    k_2 = 1.5

    b_2 = - 7

    k_3 = 0.46

    b_3 = 0.82

    k_4 = 9

    b_4 = 11.8
    t=[]
    for i in range(len(Arr)):
        if Arr[i].get('name') =='Nexus 6':
            t_1 = k_1*np.arange(1,D+1) + b_1
            t.append(t_1[1:])
        elif Arr[i].get('name') =='Mate10':
            t_2 = k_2*np.arange(1,D+1) + b_2
            t.append(t_2[1:])
        elif Arr[i].get('name') == 'Pixel2':
            t_3 = k_3*np.arange(1,D+1) + b_3
            t.append(t_3[1:])
        else :
            t_4 = k_4*np.arange(1,D+1) + b_4
            t.append(t_4[1:])
    # t_1 = k_1*np.arange(1,D+1) + b_1

    # t_2 = k_2*np.arange(1,D+1) + b_2

    # t_3 = k_3*np.arange(1,D+1) + b_3

    # t_4 = k_4*np.arange(1,D+1) + b_4

    min_value = 100000

    C = np.vstack(t)

    C_bar = C.copy()

    # 按升序对所有cost进行排序
    C_sorted = np.sort(C, axis=None)

    #二分法准备
    min_index = 0

    max_index = np.size(C_sorted)-1

    #初始化 median_index
    median_index = int((max_index - min_index+1)/2) + min_index

    #median_index = int((min_index + max_index) /2)
            
    i = 0
    #mdn = 0

    D = D - len(Arr)

    while (min_index+1<max_index):
        #查找阈值
        #C_opt = np.median(C_sorted[min_index:max_index])
        
        median_index = int((max_index - min_index+1)/2) + min_index
        C_opt = C_sorted[median_index]
        #将高于阈值的成本矩阵设置为零
        C_bar[C_bar > C_opt] = 0
    

        D_sum = 0
        #检查总数据绑定约束是否成立
        for j in range(0,3):
            D_sum += np.argmax(C_bar[j,:])
        #检查我们是否覆盖所有用户以及是否达到限制
        #相应地调整min_index和max_index
        if (D_sum < D):
            min_index = median_index
        else:
            max_index = median_index
        C_result = C_bar.copy()
        C_bar = C.copy()
    # mdn[i] = C_opt
        i = i + 1

    t2=[]
    for i in range(len(Arr)):
        t2.append(t[i][0])

    C_final = np.insert(C_result,0,t2,axis=1)
    C_opt = np.max(C_final)

    A=[]
    #print("Exhaustive Search:", min_value)

    print("BLAP Algorithm:", C_opt)

    for i in range(len(Arr)):
        if Arr[i].get('name') =='Nexus 6':
            A.append({'name':'Nexus 6','num':str(np.argmax(C_final[i,:]))})
        elif Arr[i].get('name') =='Mate10':
            A.append({'name':'Mate10','num':str(np.argmax(C_final[i,:]))})
        elif Arr[i].get('name') == 'Pixel2':
            A.append({'name':'Pixel2','num':str(np.argmax(C_final[i,:]))})
        else :
            A.append({'name':'p30','num':str(np.argmax(C_final[i,:]))})
    # print("Nexus 6:", np.argmax(C_final[0,:]))
    # A.append({'Nexus 6':np.argmax(C_final[0,:])})

    # print("Mate10:", np.argmax(C_final[1,:]))
    # A.append(np.argmax(C_final[1,:]))

    # print("Pixel2:", np.argmax(C_final[2,:]))
    # A.append(np.argmax(C_final[2,:]))

    analytical = (D + (b_1/k_1 + b_2/k_2 + b_3/k_3))/(1/k_1+1/k_2+1/k_3)
    
    return A
    '''

    print("Analytical:", analytical)

    print("Nexus 6:", round(analytical/k_1 - b_1/k_1))

    print("Mate10:", round(analytical/k_2 - b_2/k_2))

    print("Pixel2:", round(analytical/k_3 - b_3/k_3))

    print("Upper bound is:", analytical + np.max([k_1, k_2, k_3]))

    print("round off value:", np.min([t_1[round(analytical/k_1 - b_1/k_1)], t_2[round(analytical/k_2 - b_2/k_2)], t_3[round(analytical/k_3 - b_3/k_3)]]))


    '''















                
                
                
            
            
            
            