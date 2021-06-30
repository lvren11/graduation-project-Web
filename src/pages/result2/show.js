// 准确率图
// 训练时间图
// 用户设备图
// 训练一次加一次 分为T1 操作记录 自己设置的 最佳的
// loss曲线
import CharBar1 from './ChartBar1';
import CharBar2 from './CharBar2';
// loss曲线
import CharBar3 from './ChartBar3';
import CharBar5 from './ChartBar5';
import CharBar4 from './CharBar4';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import StorageHelper from '../../components/Storage';

const Show = () => {
    const [showname, setshowname] = useState("");
    const [user ,setuser] = useState("");
    const [x ,setx] = useState("");
    const [y ,sety] = useState("");
    const [userf ,setuserf] = useState("");
    const [xf ,setxf] = useState("");
    const [yf ,setyf] = useState("");
    const [fi ,setfi] = useState("");
    const [fif ,setfif] = useState("");
    useEffect(() => {
        const fetchData = async () => {
        
            const result =  await axios.get('/hehe/api/getresult2/'+String(StorageHelper.get('web_user_id')), {
            headers: {'Authorization': 'jwt '+StorageHelper.get('x-auth-token')}//设置header信息
            });
            setshowname(JSON.parse(result.data.result1));
            setuser(JSON.parse(result.data.user));
            setx(JSON.parse(result.data.x));
            sety(JSON.parse(result.data.y));
            setuserf(JSON.parse(result.data.userf));
            setxf(JSON.parse(result.data.xf));
            setyf(JSON.parse(result.data.yf));
            setfi(JSON.parse(result.data.fi));
            setfif(JSON.parse(result.data.fif));
        }
            fetchData();
        },[]);
    return (
        <div>
        <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="success">
                <h4>异构Non_IID数据</h4>
                    <p>MinCost</p>
                </CardHeader>
                <CardBody>
                    <CharBar1 id="chart-bar" data={showname} width={"100vh"} height={"40vh"} />
                    <CharBar2 id="chart-bar2" user={user} x={x} y={y} width={"100vh"} height={"40vh"} />
                    <CharBar3 id="chart-bar3" fi={fi} width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="success">
                <h4>Non_IID数据</h4>
                    <p>FedAvg</p>
                </CardHeader>
                <CardBody>
                    <CharBar4 id="chart-bar4" user={userf} x={xf} y={yf} width={"100vh"} height={"40vh"} />
                    <CharBar5 id="chart-bar5" fi={fif} width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
        </GridContainer>
        </div>
    );
};

export default Show;
