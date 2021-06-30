import React , { useState, useImperativeHandle }from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';


export default function Fednpara(props) {
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    aggregation:'100',
    iteration:'5',
    nodes:'100',
    select_nodes:'5',
    group:'200',
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handlec = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  useImperativeHandle(props.cRef, () => ({
        getvalue:() => {
            return state
        }
  }));
  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={1} md={1}></Grid>
        <Grid item xs={12} md={10}>
        <Typography variant="h6" gutterBottom>
          基本参数：
        </Typography>        
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={1} md={1} />
        <Grid item xs={3} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">全局聚合轮次</InputLabel>
          <OutlinedInput
            id="outlined-adornment-aggregation"
            value={state.aggregation}
            name="aggregation"
            onChange={handlec('group')}
            startAdornment={<InputAdornment position="start">NUM</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
        <FormControl fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">本地迭代次数</InputLabel>
          <OutlinedInput
            id="outlined-adornment-iteration"
            value={state.iteration}
            name='iteration'
            onChange={handlec('group')}
            startAdornment={<InputAdornment position="start">NUM</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
        <FormControl fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Non-IID数据分片</InputLabel>
          <OutlinedInput
            id="outlined-adornment-group"
            value={state.group}
            name='group'
            onChange={handlec('group')}
            startAdornment={<InputAdornment position="start">NUM</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        </Grid>
      </Grid>
    <Grid container spacing={1}>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={3} md={3}>
      <Typography variant="h6" gutterBottom>
        选择网络模型:
      </Typography>
      </Grid>
        <Grid item xs={3} md={3}>
          {/* {props.checkedvalue} */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="LeNet-5"
            />
        </Grid>
        <Grid item xs={3} md={3}>
          {/* {props.checkedvalue} */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="VGG-6"
            />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
      <Grid item xs={1} md={1}></Grid>
        <Grid item xs={12} md={10}>
        <Typography variant="h6" gutterBottom>
          参与训练节点设置：
        </Typography>        
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={1} md={1} />
        <Grid item xs={5} md={5}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">参与方总量</InputLabel>
          <OutlinedInput
            id="outlined-adornment-nodes"
            value={state.nodes}
            onChange={handlec('nodes')}
            startAdornment={<InputAdornment position="start">NUM</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        </Grid>
        <Grid item xs={5} md={5}>
        <FormControl fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">每轮聚合选取的参与方数量</InputLabel>
          <OutlinedInput
            id="outlined-adornment-select_nodes"
            value={state.select_nodes}
            onChange={handlec('select_nodes')}
            startAdornment={<InputAdornment position="start">NUM</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        </Grid>
      </Grid>
      </>
  );
}