import {useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ChartBar1 = props => {
    const {data = null, id = 'default-id', height = 200} = props;
    useEffect(() => {
        const option = {
            title: {
                text: '异构设备',
                subtext: '参与情况',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }, [data]);
    return (
        <div id={id} style={{height: height}}></div>
    );
};

export default ChartBar1;

