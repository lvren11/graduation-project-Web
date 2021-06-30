import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ChartBar10 = props => {
    const {id = 'default-id', width=100,height = 200} = props;
    useEffect(() => {
        var labelOption = {
            show: true,
            position: 'insideBottom',
            distance: '15',
            align: 'left',
            verticalAlign: 'middle',
            rotate: '90',
            formatter: '{name|{a}}',
            fontSize: 16,
            rich: {
                name: {
                }
            }
        };
        
        const option = {
            title:{
                text:'MNIST-VGG6'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Prop', 'Random', 'FedAvg', 'FedBLAP']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: ['测试1', '测试2', '测试3']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name:'每轮全局更新所花时间',
                    // data: [0.9000, 0.9200, 0.9400, 0.9600, 0.9800, 1.0000],// 只有type为category时才有效
                    axisLabel: {
                        formatter: function (value, index) {
                            return value + "s";
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Random',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: [5000,50000, 15000]
                },
                {
                    name: 'Prop',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: [1500, 70000, 25000]
                },
                {
                    name: 'FedAvg',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: [2000, 60000, 21000]
                },
                {
                    name: 'FedBLAP',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: [1000, 1500, 1300]
                }
            ]
        };
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [id]);
    return (
        <div id={id} style={{width:width,height: height}}></div>
    );
};

export default ChartBar10;

