import React from 'react';
import classNames from "classnames";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import MNIST from "../assets/images/cover-MNIST.png";
import CIFAR10 from "../assets/images/cover-CIFAR10.png";
import styles from "../assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

export default function Dataupload(props) {
  const [checked, setChecked] = React.useState([24, 22]);
  const classes = useStyles();
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      console.log(value);
      props.handledata(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
      <Grid container spacing={1}>
        <Grid item xs={1} sm={0}>
        </Grid>
          <Grid item xs={10} sm={5}>
            <Card className={classes.cardroot}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={MNIST}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                   MNIST
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  MNIST手写数字数据库的训练集为60,000个示例，测试集为10,000个示例。这些数字已进行尺寸规格化，并在固定尺寸的图像中居中。
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" href="http://yann.lecun.com/exdb/mnist/">
                  简介
                </Button>
                <Button size="small" color="primary" href="http://yann.lecun.com/exdb/mnist/">
                  下载
                </Button>
              </CardActions>
            </Card>
            <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    onClick={() => handleToggle(1)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{ checked: classes.checked }}
                  />
                }
                classes={{ label: classes.label }}
                label="选择MNIST数据集"
              />
            </div>
        </Grid>
        <Grid item xs={10} sm={5}>
        <Card className={classes.cardroot}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={CIFAR10}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  CIFAR10
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  CIFAR-10数据集包含10个类别的60000个32x32彩色图像，每个类别6000个图像。有50000张训练图像和10000张测试图像。
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" href="https://www.cs.toronto.edu/~kriz/cifar.html">
                  简介
                </Button>
                <Button size="small" color="primary" href="https://www.cs.toronto.edu/~kriz/cifar.html">
                  下载
                </Button>
              </CardActions>
            </Card>
        <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    onClick={() => handleToggle(2)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{ checked: classes.checked }}
                  />
                }
                classes={{ label: classes.label }}
                label="选择CIFAR10数据集"
              />
            </div>
        </Grid>
        <Divider />
      </Grid>
  );
}