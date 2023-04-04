from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from jwt import exceptions


# 自定义基于BaseAuthentication的认证方法
class JwtQueryParamsAuthentication(BaseAuthentication):
    """
    用户需要在url中通过参数进行传输token，例如：
    http://www.pythonav.com?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM1NTU1NzksInVzZXJuYW1lIjoid3VwZWlxaSIsInVzZXJfaWQiOjF9.xj-7qSts6Yg5Ui55-aUOHJS4KSaeLq5weXMui2IIEJU
    """
    def authenticate(self, request):
        # 获取token并判断token的合法性，query_params可以获取url中的参数，默认是Queryset对象
        token = request.query_params.get('token')
        salt = settings.SECRET_KEY

        # 1.切割
        # 2.解密第二段/判断过期
        # 3.验证第三段合法性

        try:
            # 解密token
            payload = jwt.decode(token, salt, True)
        except exceptions.ExpiredSignatureError:
            raise AuthenticationFailed({'code':1003,'error':"token已失效"})
        except jwt.DecodeError:
            raise AuthenticationFailed({'code':1004,'error':"token认证失败"})
        except jwt.InvalidTokenError:
            raise AuthenticationFailed({'code':1005,'error':"非法的token"})

        # 三种操作
        # 1.抛出异常，后续不再执行
        # 2.return一个元祖（1，2），认证通过；并将其分别赋值给request.user和request.auth
        # 3.None
        return(payload,token)
    
    
class JwtAuthorizationAuthentication(BaseAuthentication):
    """
    用户需要通过请求头的方式来进行传输token，例如：
    Authorization:jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM1NTU1NzksInVzZXJuYW1lIjoid3VwZWlxaSIsInVzZXJfaWQiOjF9.xj-7qSts6Yg5Ui55-aUOHJS4KSaeLq5weXMui2IIEJU
    """
    def authenticate(self, request):

        # 非登录页面需要校验token
        authorization = request.META.get('HTTP_AUTHORIZATION', '')
        auth = authorization.split()
        print(auth)
        if not auth:
            raise exceptions.AuthenticationFailed({'error': '未获取到Authorization请求头', 'status': False})
        if auth[0].lower() != 'jwt':
            raise exceptions.AuthenticationFailed({'error': 'Authorization请求头中认证方式错误', 'status': False})

        if len(auth) == 1:
            raise exceptions.AuthenticationFailed({'error': "非法Authorization请求头", 'status': False})
        elif len(auth) > 2:
            raise exceptions.AuthenticationFailed({'error': "非法Authorization请求头", 'status': False})

        token = auth[1]
        result = ({'token':token,'status':True})
        if not result['status']:
            raise exceptions.AuthenticationFailed(result)

        # 如果想要request.user等于用户对象，此处可以根据payload去数据库中获取用户对象。
        return (result, token)