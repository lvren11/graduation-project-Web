import jwt
import datetime
from django.conf import settings

# 创建生成的token方法
def create_token(payload):

    salt = settings.SECRET_KEY
    
    # 构造header
    headers = {
        'typ': 'jwt',
        'alg': 'HS256'
    }
    
    # 构造payload
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
    
    # 构造signature即token
    token = jwt.encode(payload=payload, key=salt, algorithm="HS256", headers=headers).decode('utf-8')

    return token