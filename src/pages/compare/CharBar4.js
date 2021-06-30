import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ChartBar4 = props => {
    const {id = 'default-id', width=100,height = 200} = props;
    useEffect(() => {
        var builderJson = {
            "charts": {
            "prop_lenet5_m": 0.961,
            "random_lenet5_m": 0.958,
            "FedAvg_lenet5-m": 0.957,
            "Fed-MinAvg_lenet5_m": 0.954,
            "prop_vgg6_m": 0.960,
            "random_vgg6_m": 0.976,
            "FedAvg_vgg6_m": 0.953,
            "Fed-MinAvg_vgg6_m": 0.974,
            "prop_lenet5_c":0.464,
            "random_lenet5_c": 0.480,
            "FedAvg_lenet5_c": 0.469,
            "Fed-MinAvg_lenet5_c":0.475,
            "prop_vgg6_c": 0.653,
            "random_vgg6_c": 0.661,
            "FedAvg_vgg6_c": 0.655,
            "Fed-MinAvg_vgg6_c": 0.641,
            },
          };
          
          var downloadJson = {
            "N6": 2,
            "Mate10": 2,
            "Pixel2": 1,
            "p30":1
          };
          
          var waterMarkText = 'FL';
          
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = canvas.height = 100;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = 0.08;
          ctx.font = '20px Microsoft Yahei';
          ctx.translate(50, 50);
          ctx.rotate(-Math.PI / 4);
          ctx.fillText(waterMarkText, 0, 0);
          
          const option = {
              backgroundColor: {
                  type: 'pattern',
                  image: canvas,
                  repeat: 'repeat'
              },
              tooltip: {},
              title: [{
                  text: '精度对比',
                  left: '25%',
                  textAlign: 'center'
              }, {
                  text: '测试二组使用设备',
                  left: '60%',
                  textAlign: 'center'
              },],
              grid: [{
                  top: 50,
                  width: '50%',
                  bottom: '10%',
                  left:0,
                  containLabel: true
              }],
              xAxis: [{
                  type: 'value',
                  max: builderJson.all,
                  splitLine: {
                      show: false
                  }
              }],
              yAxis: [{
                  type: 'category',
                  data: Object.keys(builderJson.charts),
                  axisLabel: {
                      interval: 0,
                      rotate: 30
                  },
                  splitLine: {
                      show: false
                  }
              }],
              series: [{
                  type: 'bar',
                  stack: 'chart',
                  z: 3,
                  label: {
                      position: 'right',
                      show: true
                  },
                  data: Object.keys(builderJson.charts).map(function (key) {
                      return builderJson.charts[key];
                  })
              }, {
                  type: 'bar',
                  stack: 'chart',
                  silent: true,
                  itemStyle: {
                      color: '#eee'
                  },
                  data: Object.keys(builderJson.charts).map(function (key) {
                      return builderJson.all - builderJson.charts[key];
                  })
              },{
                  type: 'pie',
                  radius: [0, '30%'],
                  center: ['60%', '30%'],
                  data: Object.keys(downloadJson).map(function (key) {
                      return {
                          name: key.replace('.js', ''),
                          value: downloadJson[key]
                      };
                  })
              }]
          };
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [id]);
    return (
        <div id={id} style={{width:width,height: height}}></div>
    );
};

export default ChartBar4;

