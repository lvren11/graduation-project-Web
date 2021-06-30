// 准确率图
// 训练时间图
// 用户设备图
// 训练一次加一次 分为T1 操作记录 自己设置的 最佳的
// loss曲线
import CharBar1 from './CharBar1';
import CharBar2 from './CharBar2';
import CharBar3 from './CharBar3';
import CharBar4 from './CharBar4';
import CharBar5 from './CharBar5';
import CharBar6 from './CharBar6';
import CharBar7 from './CharBar7';
import CharBar8 from './CharBar8';
import CharBar9 from './CharBar9';
import CharBar10 from './CharBar10';
import CharBar11 from './CharBar11';
import CharBar12 from './CharBar12';
import CharBar13 from './CharBar13';
import CharBar14 from './CharBar14';
import CharBar15 from './CharBar15';
import CharBar16 from './CharBar16';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import React,{useEffect,useState} from 'react'

const Show = () => {
    return (
        <div>
        <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="primary">
                </CardHeader>
                <CardBody>
                    <CharBar1 id="chart-bar" width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="primary">
                </CardHeader>
                <CardBody>
                    <CharBar2 id="chart-bar2" width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="rose">
                <h4>异构IID数据</h4>
                </CardHeader>
                <CardBody>
                    <CharBar6 id="chart-bar6" width={"100vh"} height={"40vh"} />
                    <CharBar7 id="chart-bar7" width={"100vh"} height={"40vh"} />
                    <CharBar8 id="chart-bar8" width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="rose">
                <h4>异构Non_IID数据</h4>
                </CardHeader>
                <CardBody>
                    <CharBar3 id="chart-bar3" width={"100vh"} height={"40vh"} />
                    <CharBar4 id="chart-bar4" width={"100vh"} height={"40vh"} />
                    <CharBar5 id="chart-bar5" width={"100vh"} height={"40vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="info">
                <h4>异构IID数据</h4>
                </CardHeader>
                <CardBody>
                    <CharBar9 id="chart-bar9" width={"75vh"} height={"60vh"} />
                    <CharBar10 id="chart-bar10" width={"75vh"} height={"60vh"} />
                    <CharBar11 id="chart-bar11" width={"75vh"} height={"60vh"} />
                    <CharBar12 id="chart-bar12" width={"75vh"} height={"60vh"} />
                </CardBody>
                <CardFooter chart>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
            <Card chart>
                <CardHeader color="info">
                <h4>异构Non_IID数据</h4>
                </CardHeader>
                <CardBody>
                    <CharBar13 id="chart-bar13" width={"75vh"} height={"60vh"} />
                    <CharBar14 id="chart-bar14" width={"75vh"} height={"60vh"} />
                    <CharBar15 id="chart-bar15" width={"75vh"} height={"60vh"} />
                    <CharBar16 id="chart-bar16" width={"75vh"} height={"60vh"} />
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
