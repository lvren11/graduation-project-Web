from django.contrib import admin

# Register your models here.
from api.models import BLAP, Node_blap,result_aclo ,client,result_BLAP,FedAvg,firesult_aclo,ficlient,result_FedAvg,FedAvgn,fnresult_aclo,fnclient,result_FedAvgn,MinCost,Node_fedmin,result_MinCost,feresult_aclo
  
admin.site.site_header = '后台训练数据查看'  # 设置header
admin.site.site_title = 'OS'          # 设置title
admin.site.index_title = "后台主页"
admin.site.register([BLAP, Node_blap,result_aclo ,client,result_BLAP,FedAvg,firesult_aclo,ficlient,result_FedAvg,FedAvgn,fnresult_aclo,fnclient,result_FedAvgn,MinCost,Node_fedmin,result_MinCost,feresult_aclo])  
