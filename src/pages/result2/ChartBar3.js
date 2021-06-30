import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// var data = [['global1', 98.22], ['global2', 98.63], ['global3', 98.43], ['global4', 98.69], ['global5', 99.01], ['global6', 98.83], ['global7', 98.95], ['global8', 98.9], ['global9', 98.85], ['global10', 98.72], ['global11', 98.64], ['global12', 98.9], ['global13', 98.92], ['global14', 99.16], ['global15', 99.12], ['global16', 99.12], ['global17', 99.11], ['global18', 99.11], ['global19', 99.11], ['global20', 99.11]]

// var dateList = data.map(function (item) {
//     return item[0];
// });
// var valueList = data.map(function (item) {
//     return item[1];
// });

const CharBar3 = props => {
    const {fi=null,id = 'default-id', height = 200 ,width = 200} = props;
    useEffect(() => {
        if(fi !== null){
            var dateList =[];
            var valueList=[];
            for(var i = 0;i<fi.length;i++){
                dateList.push(fi[i][0]);
                valueList.push(fi[i][1]);
            }
        }
        const option = {

            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 80,
                min: 80,
                max: 100
            }],
        
        
            title: [{
                left: 'center',
                text: '全局模型精度'
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: [{
                min: 'dataMin' 
            }],
            grid: [{
                bottom: '30%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data:valueList
            }]
        };
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [fi]);
    return (
        <div id={id} style={{wdth:width,height: height}}></div>
    );
};

export default CharBar3;

