import React,{ useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import router from 'umi/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import StorageHelper from '../../components/Storage';

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
    marginBottom:theme.spacing(1),
    width: '100%',
  }
}));

export default function Login() {
  const classes = useStyles();
  const initialStateValues = {
    email: "",
    password: "",
    showPassword:false,
  };
  const [values, setValues] = useState(initialStateValues);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const handleLogin = (data) => {
    console.log(data);
    axios.post('/hehe/api/login',{
            "email":data.email,
            "password":data.password
          }).then(function(response){
            if(response.data.code === 1000){
              StorageHelper.set('web_user_id', response.data.userid);
              StorageHelper.set('web_user', data);
              StorageHelper.set('x-auth-token', response.data.token);
              router.push('/start/board');
            }
          }).catch(function(error){
              console.log("error:",error)
          });
  };
  // const handlesubmit = () =>{
  //   return (state, dispatch) => {
  //     const errors = model.check({
  //       username: state.username,
  //       password: state.password,
  //       captcha: state.captcha,
  //     });
  
  //     const hasErrors =
  //       Object.values(errors).filter((error) => error.hasError).length > 0;
  
  //     dispatch({ type: "set", payload: { key: "errors", value: errors } });
  
  //     if (hasErrors) return;
  //     loginService.login(state);
  //   };
  // };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <ThemeProvider theme={theme}>
        <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
          <FormControl className={classes.textField} >
            <InputLabel htmlFor="input-with-icon-adornment">邮箱</InputLabel>
            <Input
              id="input-with-icon-adornment"
              name='email'
              value={values.email}
              onChange={handleChange('email')}
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
              type={values.showPassword ? 'text' : 'password'}
              placeholder="请输入密码"
              value={values.password}
              error={Boolean(errors.password)}
              onChange={handleChange('password')}
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
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password?.type === "minLength" && <FormHelperText id="standard-weight-helper-text">密码至少5位</FormHelperText>}
            {errors.password?.type === "maxLength" && <FormHelperText id="standard-weight-helper-text">密码最多15位</FormHelperText>}
            {errors.password?.type === "pattern" && <FormHelperText id="standard-weight-helper-text">密码只能由字母、数字、下划线、特殊字符组成</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登录
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/user/getpassword" variant="body2">
                忘记密码
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/register" variant="body2">
                {"没有账号？点击注册"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </ThemeProvider>
      </div>
    </Container>
  );
}
