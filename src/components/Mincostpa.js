import React , { useState }from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Mincost_device from './Mincost_device';


export default function Mincostpa(props) {
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    aggregation:'20',
    iteration:'3',
    group:'500',
  });
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked);
  };
  const handlec = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  
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
            onChange={handlec}
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
            onChange={handlec}
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
            onChange={handlec}
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
        <Grid item xs={12} md={5}>
        <Typography variant="h6" gutterBottom>选择参与的异构设备:</Typography>
        </Grid>
      </Grid>
        <Mincost_device {...props} another={state}/>
      </>
  );
}