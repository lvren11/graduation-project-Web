from api.extensions.auth import JwtAuthorizationAuthentication
from api.utils.jwt_auth import create_token
from rest_framework.views import APIView
from dwebsocket.decorators import accept_websocket,require_websocket
from rest_framework.response import Response
from api import models

# from run_algoritms_m import runmnist

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

        return Response({'code': 1000, 'mag': 'success' , 'userid':user_object.id})
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

        return Response({'code': 1000, 'mag': 'success'})
# 修改信息
Node = []
# FLAP-IID视图
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
        print(data)
        node = request.data.get('node')
        Node = node
        for i in range(0,len(node)):
            models.Node_blap.objects.create(BLAP=data,nodeuser=node[i].get('name'),nodenum=int(node[i].get('num')))
        
        return Response({'code': 1000, 'mag': 'success'})
# Min-Cost Non-IID视图

# Fed-IID视图

# Fed-NonIID视图

# 算法过程

@accept_websocket
def Getprocedure(request):
    if request.is_websocket():
        while 1:
            time.sleep(1) ## 向前端发送时间
            dit = {
                'time':time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
            }
            request.websocket.send(json.dumps(dit))

# class Getprocedure(APIView):
#     def get(self, request, *args, **kwargs):

#         algorithm = kwargs.get('al_id')

#         if algorithm == 1:
            
#             data = models.BLAP.objects.last()
            
#             return Response({'code': 1000, 'mag': 'success'})
# # 算法结果返回

# 测视视图
class ProOrderView(APIView):
    def get(self, request, *args, **kwargs):
        print(request.user)
        return Response('订单列表')

