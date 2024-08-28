
## 运行
```python
python manage.py migrate   # 创建表结构
python manage.py makemigrations # Django 模型变更
在settings里是数据库配置：
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # 数据库引擎
        'NAME': 'myweb', # 数据库名
        'USER': 'root', # 账号
        'PASSWORD': '', # 密码
        'HOST': '127.0.0.1', # HOST
        'POST': 3306, # 端口
    }
}
启动是8000端口 跟前端匹配
```