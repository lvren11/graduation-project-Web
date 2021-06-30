import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const CharBar2 = props => {
    const {user = null, id = 'default-id', height = 200 ,x = null ,y = null,width = 200} = props;
    useEffect(() => {
        const option = {
            title: {
                text: '用户loss'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: user
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x
            },
            yAxis: {
                type: 'value'
            },
            series: y
        };        
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [user,x,y]);
    return (
        <div id={id} style={{wdth:width,height: height}}></div>
    );
};

export default CharBar2;

