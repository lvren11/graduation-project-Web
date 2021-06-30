import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ChartBar3 = props => {
    const {id = 'default-id', width=100,height = 200} = props;
    useEffect(() => {
        var builderJson = {
            "charts": {
              "prop_lenet5_m": 0.991,
              "random_lenet5_m": 0.991,
              "FedAvg_lenet5-m": 0.991,
              "Fed-MinAvg_lenet5_m": 0.991,
              "prop_vgg6_m": 0.994,
              "random_vgg6_m": 0.994,
              "FedAvg_vgg6_m": 0.994,
              "Fed-MinAvg_vgg6_m": 0.994,
              "prop_lenet5_c":0.597,
              "random_lenet5_c": 0.595,
              "FedAvg_lenet5_c": 0.592,
              "Fed-MinAvg_lenet5_c":0.593,
              "prop_vgg6_c": 0.730,
              "random_vgg6_c": 0.733,
              "FedAvg_vgg6_c": 0.729,
              "Fed-MinAvg_vgg6_c": 0.729,
            },
          };
          
          var downloadJson = {
            "N6": 1,
            "Mate10": 1,
            "Pixel2": 1,
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
                  text: '测试一组使用设备',
                  left: '55%',
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
                  center: ['55%', '25%'],
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

export default ChartBar3;

