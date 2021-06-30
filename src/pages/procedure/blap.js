import React, { useEffect, useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import LinearProgress from '@material-ui/core/LinearProgress';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import Tablelist from '../../components/Listtable';
const useStyles1 = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: 'center',
  },
  cardbodyfont: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  btn:{
    float:'right',
  },
  progress:{
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
  },
  msgs:{
    height: '448px',
    width: '100%',
    marginTop:'10px',
    border: 'solid 1px #000',
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    },
}));


export default function Process(props) {
  const classes=useStyles();
  const classes1=useStyles1();

  const [msg,setmsg] = useState([]);
  let websocket, lockReconnect = false;
  //关闭连接
  let closeWebSocket=()=> {
      websocket && websocket.close();
  }
  const begin = () =>{
    let url="ws://127.0.0.1:8000/api/getprocedure";//服务端连接的url
    websocket = new WebSocket(url);
    websocket.onopen = function () {
        console.log('WebSocket open');//成功连接上Websocket
        websocket.send('blap');
    }
    websocket.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    var a=[];
    websocket.onmessage = function (event) {
        // console.log(event.data);//打印服务端返回的数据
        a.push(event.data);
        setmsg([...a]);
        //event 为服务端传输的消息，在这里可以处理
    }
  }
  const end = () =>{
    closeWebSocket();
  }

//   useEffect(()=>{
//     // let url="ws://127.0.0.1:8000/echo";//服务端连接的url
//     // createWebSocket(url);
//     //在组件卸载的时候，关闭连接
//      return ()=>{
//         closeWebSocket();
//     }
//     })
  return (
    <div>
      <GridContainer>
        {/* <GridItem xs={1} md={1}>
        </GridItem> */}
        <GridItem xs={2} md={2}>
            
        <Card>
            <CardHeader color="rose">
              <h3 className={classes.cardTitleWhite}>实验台</h3>
            </CardHeader>
            <CardBody>
                <h4 className={classes.cardbodyfont}>算法：<strong>{props.location.algorithm}</strong></h4>
                <h4 className={classes.cardbodyfont}>数据集：<strong>{props.location.dataset}</strong></h4>
                <h4 className={classes.cardbodyfont}>数据大小：<strong>{props.location.datasize}</strong></h4>
                <h4 className={classes.cardbodyfont}>数据类型：<strong>{props.location.datac}</strong></h4>
                <h4 className={classes.cardbodyfont}>网络结构：<strong>{props.location.network}</strong></h4>
                <h4 className={classes.cardbodyfont}>全局迭代次数：<strong>{props.location.aggregation}</strong></h4>
                <h4 className={classes.cardbodyfont}>本地聚合次数：<strong>{props.location.iteration}</strong></h4>
                <Button className={classes1.red} onClick={begin}>开始</Button>
                <Button className={classes1.red} onClick={end}>关闭</Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={5} md={5}>
        <Card>
          <CardHeader color="info">
              <h3 className={classes.cardTitleWhite}>参与设备</h3>
          </CardHeader>
          <CardBody>
            <Tablelist parametervalue={props.location.node} lable='FLAP' />
          </CardBody>
        </Card>
        </GridItem>
        <GridItem xs={5} md={5}>
        <Card>
            <CardHeader color="success">
              <h3 className={classes.cardTitleWhite}>实验过程</h3>
            </CardHeader>
            <CardBody>
            <div className={classes.progress}>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
            <div className={classes.msgs}>
              {msg.map((item, index) => {
                  return (
                    <h4 key={index}>
                      {item}
                    </h4>
                  );
                })}
            </div>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}