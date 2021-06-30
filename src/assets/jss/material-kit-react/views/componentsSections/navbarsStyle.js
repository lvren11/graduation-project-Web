import { container, title } from "../../../material-kit-react";
import headerLinksStyle from "../../components/headerLinksStyle";

const navbarsStyle = theme => ({
  section: {
    paddingTop: "0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navbar: {
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0"
    }
  },
  navigation: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "120px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "0"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  ...headerLinksStyle(theme),
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  logo:{
    width: "50px",
    height: "50px",
  },
  imageDropdownButton: {
    padding: "0px",
    top: "4px",
    borderRadius: "50%",
    marginLeft: "5px"
  }
});

export default navbarsStyle;
