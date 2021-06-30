import React , {useEffect, useState}from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import avatar from "../../assets/images/avatars/avatar_01.png";
import axios from 'axios';
import StorageHelper from '../../components/Storage';

const styles = {
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
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontFamily: "sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const Userprofile = () => {
  const classes = useStyles();

  const initialStateValues = {
    name : "",
    phone : "",
    userid : "",
    career : "",
    city : "",
    country : "",
    remark : "",
    Intro : "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [showname, setshowname] = useState("");
  const [showcareer, setshowcareer] = useState("");
  const [showIntro, setshowIntro] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      
        const result =  await axios.get('/hehe/api/getprofile/'+String(StorageHelper.get('web_user_id')), {
        headers: {'Authorization': 'jwt '+StorageHelper.get('x-auth-token')}//设置header信息
        });
        setshowname(result.data.name);
        setshowcareer(result.data.career);
        setshowIntro(result.data.Intro);
    }
        fetchData();
        console.log('执行了')
    },[]);

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
  const updateprofile = () =>{
    console.log(values);
    axios.post('/hehe/api/putprofile',{
      "name" : values.name,
      "phone" : values.phone,
      "userid" : StorageHelper.get('web_user_id'),
      "career" : values.career,
      "city" : values.city,
      "country" : values.country,
      "remark" : values.remark,
      "Intro" : values.Intro,
    }).then(function(response){
      if(response.data.code === 1000){
        setshowname(values.name);
        setshowcareer(values.career);
        setshowIntro(values.Intro);
      }
    }).catch(function(error){
        console.log("error:",error)
    });
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>编辑资料</h4>
              <p className={classes.cardCategoryWhite}>完善个人资料</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="昵称"
                    id="name"
                    inputProps={{
                    value:values.name,
                    onChange:handleChange('name')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="手机号码"
                    id="phone"
                    inputProps={{
                    value:values.phone,
                    onChange:handleChange('phone')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="职业"
                    id="career"
                    inputProps={{
                    value:values.career,
                    onChange:handleChange('career')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="城市"
                    id="city"
                    inputProps={{
                    value:values.city,
                    onChange:handleChange('city')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="国家"
                    id="country"
                    inputProps={{
                    value:values.country,
                    onChange:handleChange('country')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="备注"
                    id="remark"
                    inputProps={{
                    value:values.remark,
                    onChange:handleChange('remark')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>个人简介</InputLabel>
                  <CustomInput
                    id="Intro"
                    inputProps={{
                    multiline: true,
                    rows: 5,
                    value:values.Intro,
                    onChange:handleChange('Intro')
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={updateprofile}>更新个人资料</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h5 className={classes.cardCategory}>职业: <strong>{showcareer}</strong></h5>
              <h4 className={classes.cardTitle}>昵称:<strong>{showname}</strong></h4>
              <p className={classes.description}>
                个人简介:
              </p>
              <p className={classes.description}>
                {showIntro}
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Userprofile;