import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import emailjs from "emailjs-com";
import router from 'umi/router';
import { makeStyles, withStyles,createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EmailOutlined  from '@material-ui/icons/EmailOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import apiKeys from './apiKeys';
import axios from 'axios';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(45deg, #0081ff, #1cbbb4);',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(45deg, #39b54a, #8dc63f);',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <EmailOutlined />,
    2: <SendIcon />,
    3: <LockOpenIcon />,
    4: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const theme = createMuiTheme({
  overrides: {
    MuiPaper: { 
      root: { 
        backgroundColor:'rgba(0,0,0,0)',
        }
      },
    }
});

const useStyles = makeStyles((theme) => ({
    
  root: {
    // margin: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
  },
  container:{
      margin:theme.spacing(25),
  },
  root1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    width: '100%',
  },
  root2: {
    display: 'flex',
    justifyContent:'center',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return ['请输入您的邮箱', '请输入验证码', '请输入重设密码','成功'];
}


export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const initialStateValues = {
    email: "",
    password: "",
    repassword:"",
    code:"",
    code0:""
  };
  const [values, setValues] = useState(initialStateValues);

  const steps = getSteps();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleNext = () => {
    if(activeStep === 0){
    var code1=Math.random().toString().substr(2, 4);
    setValues({ ...values, ['code0']: code1 });
    var para={'code':code1,'email':values.email}
    emailjs.send(apiKeys.SERVICR_ID,apiKeys.TEMPLATE_ID,para,apiKeys.USER_ID)
    .then(
      result => {
        console.log(result.text);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      },
      error => {
        console.log(error.text)
      }
    );
    }
    if(activeStep === 1){
          if(values.code0 === values.code){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }else{console.log("验证码错误");}
    }
    if(activeStep === 2){
      if(values.password === values.repassword){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if(activeStep === 3){
      console.log(values);
      axios.post('/hehe/api/putpwd',{
        "email":values.email,
        "password":values.password
      }).then(function(response){
        if(response.data.code === 1000){
           router.push('/user/login');
        }
        else{
          console.log("用户不存在");
        }
      }).catch(function(error){
          console.log("error:",error)
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TextField id="email-basic" label="请输入您的邮箱" variant="outlined" value={values.email} onChange={handleChange('email')}/>;
      case 1:
        return <TextField id="char-basic" label="请输入您的验证码" variant="outlined" value={values.code} onChange={handleChange('code')}/>;
      case 2:
        return <Grid container spacing={3}>
        <Grid item xs={6}><TextField variant="outlined" required fullWidth name="password" label="密码" type="password" id="password" autoComplete="current-password" value={values.password} onChange={handleChange('password')}/></Grid>
        <Grid item xs={6}><TextField variant="outlined" required fullWidth name="repassword" label="确认密码" type="password" id="repassword" autoComplete="current-password" value={values.repassword} onChange={handleChange('repassword')}/></Grid>
               </Grid>;
      // case 3:
      //   return '';
      // default:
      //   return '';
    }
  }

  return (
    <div className={classes.root}>
     <div className={classes.container}>
     <ThemeProvider theme={theme}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </ThemeProvider>
      <div className={classes.root1}>
        {activeStep === steps.length ? (
          <Link href="/user/login" />
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div className={classes.root2}>
              <Button onClick={handleBack} className={classes.button} href={activeStep === 0 ? '/user/login' : ''}>
                返回
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                href={activeStep === steps.length - 1 ? '/user/login' : ''}
              >
                {activeStep === steps.length - 1 ? '完成' : '下步'}
              </Button>
            </div>
          </div>
        )}
      </div>
     </div>
    </div>
  );
}
