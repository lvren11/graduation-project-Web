import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


// core components
import Header from "./Header/Header.js";

import CustomDropdown from "./CustomDropdown/CustomDropdown.js";
import Button from "./CustomButtons/Button.js";

import Logo from './logo';
import logo_new from '../assets/images/logo/logo_index.jpg';
import profileImage from "../assets/images/avatars/avatar_01.png";
import Tooltip from '@material-ui/core/Tooltip';
import styles from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div id="navbar" className={classes.navbar}>
        <div
          className={classes.navigation}
        >
          <Header
            // brand="Navbar with notifications"
            color="info"
            leftLinks={
              <Logo className={classes.logo} src={logo_new} />
            }
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="/start/board"
                    className={classes.navLink}
                    // onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    实验设置
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="/result/show"
                    className={classes.navLink}
                    // onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    实验结果
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                <Tooltip title="admin 2020jyh2020" arrow>
                  <Button
                    href="http://localhost:8000/admin/"
                    className={classes.navLink}
                    // onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    查看数据
                  </Button>
                  </Tooltip>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <CustomDropdown
                    left
                    caret={false}
                    hoverColor="black"
                    // dropdownHeader="用户中心"
                    buttonText={
                      <img
                        src={profileImage}
                        className={classes.img}
                        alt="profile"
                      />
                    }
                    buttonProps={{
                      className:
                        classes.navLink + " " + classes.imageDropdownButton,
                      color: "transparent"
                    }}
                    dropdownList={[
                      "退出登录"
                    ]}
                  />
                </ListItem>
              </List>
            }
          />

        </div>
      </div>
    </div>
  );
}
