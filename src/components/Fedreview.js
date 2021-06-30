import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  list:{
    marginLeft:'80.85px',
    marginTop:'10px',
    marginRight:'80.85px',
  },
  cardpa:{
    marginLeft:'80.85px',
    borderRadius: "6px",
    color: "rgba(" + "0,0,0" + ", 0.87)",
    background: 'white',
    width: "83%",
    boxShadow: "0 1px 4px 0 rgba(" + "0,0,0" + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    marginLeft:'165px'
  },
  title1: {
    marginTop: theme.spacing(2),
    marginLeft:'180px'
  },
  title2: {
    marginTop: theme.spacing(2),
    marginLeft:'140px'
  },
  margin:{
    marginLeft:'100px'
  },
  margin1:{
    marginLeft:'30px'
  },
  margin2:{
    marginLeft:'50px'
  },
  margin3:{
    marginLeft:'20px'
  }
}));

export default function Fedreview(props) {
  const classes = useStyles();
  const [checkedvalue, setCheckedvalue] = useState(props.checkedvalue);
  const [paramnavalue, setparanameter] = useState(props.paramnavalue);

  return (
    <React.Fragment>
      <div className={classes.cardpa}>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={5}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            数据集
          </Typography>
          <Typography gutterBottom className={classes.margin}>选择的为：<strong className={classes.margin1}>{checkedvalue === 1 ? 'MNIST':'CIFAR10'}</strong></Typography>
          <Typography gutterBottom className={classes.margin}>数据大小为<strong className={classes.margin1}>{checkedvalue === 1 ? '60':'50'}K</strong></Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={7}>
          <Typography variant="h6" gutterBottom className={classes.title1}>
            基本参数和网络
          </Typography>
          <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom className={classes.margin2}>网络结构为:<strong className={classes.margin1}>{paramnavalue.checkedA ? 'LeNet-5':'VGG6'}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className={classes.margin2}>全局聚合轮次:<strong className={classes.margin1}>{paramnavalue.aggregation}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className={classes.margin2}>本地迭代次数:<strong className={classes.margin1}>{paramnavalue.iteration}</strong></Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      </div>
      <div className={classes.cardpa}>
      <Grid container spacing={2}>
      <Grid item container direction="column" xs={12} sm={9}>
          <Typography variant="h6" gutterBottom className={classes.title2}>
          参与训练节点设置：
          </Typography>
          <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom className={classes.margin3}>参与方总量<strong className={classes.margin1}>{paramnavalue.nodes}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom className={classes.margin3}>每轮聚合选取的参与方数量<strong className={classes.margin1}>{paramnavalue.select_nodes}</strong></Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      </div>
    </React.Fragment>
  );
}