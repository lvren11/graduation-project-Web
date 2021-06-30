import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ChartBar1 = props => {
    const {id = 'default-id', width=100,height = 200} = props;
    useEffect(() => {
        const option = {
            title:{
                text:'LeNet_5-3K samples(5%)'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['计算时间', 'WIFI通讯时间', 'LTE通讯时间']
            },
            grid: {
                left: '10%',
                right: '38%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Nexus 6', 'Mate10', 'Pixel2', 'P30 Pro']
                }
            ],
            yAxis: [
                {
                    name: '时间(s)',
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#91CC75'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} s'
                    }
                }
            ],
            series: [
                {
                    name: '计算时间',
                    type: 'bar',
                    stack: 'a',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [32, 43, 22, 18]
                },
                {
                    name: 'WIFI通讯时间',
                    type: 'bar',
                    stack: 'a',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [3, 2.5, 1.8, 1.6]
                },
                {
                    name: 'LTE通讯时间',
                    type: 'bar',
                    stack: 'a',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [1 ,0.8, 0.7,0.6]
                },
            ]
        };
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [id]);
    return (
        <div id={id} style={{width:width,height: height}}></div>
    );
};

export default ChartBar1;

