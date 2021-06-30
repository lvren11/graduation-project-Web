import React, {useState,useReducer} from 'react';
import emailjs from "emailjs-com";
import router from 'umi/router';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import apiKeys from './apiKeys';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: { 
      root: { 
        fontSize:'1.1rem',
        }
      },
    MuiFormHelperText:{
      root:{
        color:'red',
      }
    }
    }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(15),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(1.5),
    width: '100%',
  }
}));

export default function SignUp() {

  const classes = useStyles();
  const initialStateValues = {
    email: "",
    password: "",
  };
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const [values, setValues] = useState(initialStateValues);
  const [showPassword,setshowpwd] = useState(false);
  const [showrePassword,setshowrepwd] = useState(false);
  const [repassword,setrepassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [switchstatus, setswitchstatus] = useState(false);
  const [code,setcode] = useState('');
  const [code0,setcode0] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [coderight,setcoderight] = useState(false);
  // const [pwdright,setpwdright] = useState(false);

  const handlecChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const pwdachange = (event) => {
    setrepassword(event.target.value);
    // var pwd = event.target.value;
    // if(pwd.length === password.length && pwd === password){
    //   setpwdright(true);c
    //   console.log('1111');
    // }
  };
  const handleClickShowPassword = () => {
    setshowpwd(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlereChange = (event) => {
    setrepassword(event.target.value);
  };

  const handleClickShowrePassword = () => {
    setshowrepwd(!showrePassword);
  };

  const handleMouseDownrePassword = (event) => {
    event.preventDefault();
  };
  const handleChange = () => {
    setChecked((prev) => !prev);
    var code1=Math.random().toString().substr(2, 4);
    setcode(code1);
    var para={'code':code1,'email':values.email}
    emailjs.send(apiKeys.SERVICR_ID,apiKeys.TEMPLATE_ID,para,apiKeys.USER_ID)
    .then(
      result => {
        console.log(result.text)
      },
      error => {
        console.log(error.text)
      }
    );
    setTimeout(() => {
      setswitchstatus(true);
    }, 100);
  };

  const codechange = (event) => {
    var codeinput=event.target.value;
    setcode0(codeinput);
  };

  const handleClickrefresh = () => {
    setChecked(false);
    setswitchstatus(false);
    setcode0("");
  }

  const handleRegister = (data) => {
    if(repassword === values.password){
        if(code0 === code){
          console.log(code);
          console.log(data);
          axios.post('/hehe/api/register',{
            "email":data.email,
            "password":data.password
          }).then(function(response){
            if(response.data.code === 1000){
              router.push('/user/login');
            }
          }).catch(function(error){
              console.log("error:",error)
          });
          }
        }
    } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <ThemeProvider theme={theme}>
        <form className={classes.form} onSubmit={handleSubmit(handleRegister)}>
          <FormControl className={classes.textField} >
            <InputLabel htmlFor="input-with-icon-adornment">邮箱</InputLabel>
            <Input
              id="input-with-icon-adornment"
              name='email'
              value={values.email}
              onChange={handlecChange('email')}
              placeholder="请输入邮箱"
              error={Boolean(errors.email)}
              inputRef={register({ required: true, pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ })}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            {errors.email ? 
            <FormHelperText id="standard-weight-helper-text">邮箱格式不正确</FormHelperText>
             : null }
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
            <Input
              id="standard-adornment-password"
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder="请输入密码"
              value={values.password}
              error={Boolean(errors.password)}
              onChange={handlecChange('password')}
              inputRef={register({ 
                required: true, 
                minLength: 5, 
                maxLength: 15,
                pattern: /^[a-zA-Z0-9_.@#$^&*]+$/ ,
              })}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password?.type === "minLength" && <FormHelperText id="standard-weight-helper-text">密码至少5位</FormHelperText>}
            {errors.password?.type === "maxLength" && <FormHelperText id="standard-weight-helper-text">密码最多15位</FormHelperText>}
            {errors.password?.type === "pattern" && <FormHelperText id="standard-weight-helper-text">密码只能由字母、数字、下划线、特殊字符组成</FormHelperText>}
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-repassword">再次输入密码</InputLabel>
            <Input
              id="standard-adornment-repassword"
              name='repassword'
              type={showrePassword ? 'text' : 'password'}
              placeholder="请再次输入密码"
              value={repassword}
              error={Boolean(errors.repassword)}
              onChange={handlereChange}
              inputRef={register({ 
                required: true, 
                minLength: 5, 
                maxLength: 15,
                pattern: /^[a-zA-Z0-9_.@#$^&*]+$/ ,
              })}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repassword visibility"
                    onClick={handleClickShowrePassword}
                    onMouseDown={handleMouseDownrePassword}
                  >
                    {showrePassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.repassword?.type === "minLength" && <FormHelperText id="standard-weight-helper-text">密码至少5位</FormHelperText>}
            {errors.repassword?.type === "maxLength" && <FormHelperText id="standard-weight-helper-text">密码最多15位</FormHelperText>}
            {errors.repassword?.type === "pattern" && <FormHelperText id="standard-weight-helper-text">密码只能由字母、数字、下划线、特殊字符组成</FormHelperText>}
          </FormControl>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Switch checked={checked} onChange={handleChange} disabled={switchstatus} />}
              label="发送验证码"
            />
            <IconButton
                    aria-label="refresh"
                    onClick={handleClickrefresh}
                  >
                <RefreshIcon />
            </IconButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              {
                checked ? 
                <Input placeholder="请输入验证码" inputProps={{ 'aria-label': 'description' }} value={code0} onChange={codechange}/>
                : null
              }
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            注册
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/login" variant="body2">
                已经拥有账号？登录
              </Link>
            </Grid>
          </Grid>
        </form>
        </ThemeProvider>
      </div>
    </Container>
  );
}
