import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
// core components
import SectionNavbars from '../components/BoardNavBar';
import BoardSideBar from '../components/BoardSideBar';
// import Navbar from "components/Navbars/Navbar.js";
// import Footer from "components/Footer/Footer.js";
// import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../assets/images/backimages/bg2.jpg";
import logo from "../assets/images/logo/logo.png";


// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//          return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//     })}
//     {/* <Redirect from="/start" to="/start/Board" /> */}
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default function Basiclayout(props) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleImageClick = image => {
  //   setImage(image);
  // };
  // const handleColorClick = color => {
  //   setColor(color);
  // };
  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // initialize and destroy the PerfectScrollbar plugin
  return (
    <div className={classes.wrapper}>
      <BoardSideBar
        routes={routes}
        logoText={"联邦学习"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...props}
      />
      <div className={classes.mainPanel}>
        <SectionNavbars
        />
          <div className={classes.content}>
            <div className={classes.container}>{props.children}</div>
          </div>
        {/* {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
