import React, { useState, useRef } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import Stepper from '@material-ui/core/Stepper';
import router from 'umi/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Button from "../../components/CustomButtons/Button.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Dataupload from "../../components/dataupload";
import Fednpara from "../../components/Fednpara";
import Fednreview from "../../components/Fednreview";
import StorageHelper from '../../components/Storage';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  stepper: {
    padding: theme.spacing(3, 0, 6),
  },
  btn:{
    float:'right',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function getSteps() {
  return ['选择数据集', '节点设置和具体参数设置', '检查并提交'];
}



export default function FedAvg() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [checkedvalue, setCheckedvalue] = useState(0);
  const [paramnavalue, setparanameter] = useState({});
  const fedpara = useRef();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
      setOpen(false);
    };
  const handleToggle = () => {
      setOpen(!open);
    };
  const handledata = (e) => {
    console.log('调用当前子组件的方法',e)   //e的值为 aaa
    setCheckedvalue(e);
  };
  const getVals = () => {
    const val = fedpara.current.getvalue() || '';
    console.log(val);
    setparanameter(val);
  }
  function SimpleBackdrop() {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  const getStepContent =(step) => {
    switch (step) {
      case 0:
        return <Dataupload handledata={handledata}/>;
      case 1:
        return <Fednpara cRef={fedpara}/>;
      case 2:
        return <Fednreview checkedvalue={checkedvalue} paramnavalue={paramnavalue}/>;
      case 3:
        return <SimpleBackdrop />
      default:
        throw new Error('Unknown step');
    }
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === 1){
      getVals();
    };
    if(activeStep == 2){
      // post数据过去返回设置延迟 跳转
      var dataset='';
      var datasize='';
      var network='';
      if(checkedvalue === 1){
        dataset='MNIST';
        datasize='60000';
      }else{ dataset='CIFAR10';datasize='50000'; }
      if(paramnavalue.checkedA){
        network='LeNet';
      }else{
        network='VGG6';
      }
      console.log(paramnavalue);
      console.log(dataset);
      handleToggle();
      axios.post('/hehe/api/fednoniid',{
        "dataset":dataset,
        "datasize":datasize,
        "network":network,
        "aggregation":paramnavalue.aggregation,
        "iteration":paramnavalue.iteration,
        "userid":StorageHelper.get('web_user_id'),
        "nodes":paramnavalue.nodes,
        "select_nodes":paramnavalue.select_nodes,
        "group":paramnavalue.group,
      }).then(function(response){
        if(response.data.code === 1000){
          //  window.location.href="/procedure/process";
            handleClose();
            router.push({
              pathname:'/procedure/process',
              algorithm:'FedAvg',
              datac:'Non-IID',
              dataset:dataset,
              datasize:datasize,
              network:network,
              aggregation:paramnavalue.aggregation,
              iteration:paramnavalue.iteration,
              nodes:paramnavalue.nodes,
              select_nodes:paramnavalue.select_nodes,
              group:paramnavalue.group,
              type:2,
            });
        }
      }).catch(function(error){
          console.log("error:",error)
      });      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={1} md={1}>
        </GridItem>
        <GridItem xs={12} md={10}>
        <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>FedAvg算法-NonIID数据</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={1} md={1}>
                </GridItem>
                <GridItem xs={12} md={10}>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                  </Stepper>
                </GridItem>
                  <GridItem xs={12} md={12}>
                {getStepContent(activeStep)}
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} color="primary" round >
                      返回
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNext}
                    className={classes.btn}
                    round
                  >
                    {activeStep === steps.length - 1 ? '提交' : '下一步'}
                  </Button>
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}