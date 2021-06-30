
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CachedIcon from "@material-ui/icons/Cached";
import BarChartIcon from "@material-ui/icons/BarChart";
// core components/views for Admin layout
import Board from "./pages/start/board";
import Fedminavg from "./pages/start/Fedminavg_nonIID";
import FedAvg from "./pages/start/FedAvg";
// import FedAvg_non from "./pages/start/FedAvg_non";
import procedure from "./pages/procedure/process";
import show from "./pages/result/show";
import shown from "./pages/result2/show";
import compare from "./pages/compare/compare";
import userprofile from "./pages/setting/userprofile";
import Fednoniid from "./pages/start/Fednoniid";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// // core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const boardRoutes = [
  {
    path: '/start/board',
    name: "异构IID数据",
    icon: Dashboard,
    component: Board,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/start/Fedminavg_nonIID',
    name: "异构Non-IID数据",
    icon: Dashboard,
    component: Fedminavg,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/start/FedAvg',
    name: "IID数据-FedAvg",
    icon: Dashboard,
    component: FedAvg,
    layout: "../layouts/Basiclayout"
  },
  // {
  //   path: '/start/FedAvg_non',
  //   name: "Non-IID数据-FedAvg",
  //   icon: Dashboard,
  //   component: FedAvg_non,
  //   layout: "../layouts/Basiclayout"
  // },
  {
    path: "/start/Fednoniid",
    name: "Non-IID数据-FedAvg",
    icon: Dashboard,
    component: Fednoniid,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/procedure/process',
    name: "算法训练过程",
    icon: CachedIcon,
    component: procedure,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/result/show',
    name: "IID数据结果展示",
    icon: BarChartIcon,
    component: show,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/result2/show',
    name: "Non_IID数据结果",
    icon: BarChartIcon,
    component: shown,
    layout: "../layouts/Basiclayout"
  },
  {
    path: '/compare/compare',
    name: "算法对比和前提",
    icon: BarChartIcon,
    component: compare,
    layout: "../layouts/Basiclayout"
  },
  {
    path: "/setting/userprofile",
    name: "用户资料",
    icon: Person,
    component: userprofile,
    layout: "../layouts/Basiclayout"
  }
];

export default boardRoutes;
