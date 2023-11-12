
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      exact:true,
      component: '../layouts/Userlayout',
      routes: [
        { path:'/', component:'../pages/user/login' },
        ]
    },
    {
      path: '/user',
      component: '../layouts/Userlayout',
      routes: [
        { path: '/user/login', component: '../pages/user/login' },
        { path: '/user/register', component: '../pages/user/register'},
        { path: '/user/getpassword', component: '../pages/user/getpassword'}
        ]
    },
    {
      path: '/setting',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/setting/userprofile', component: '../pages/setting/userprofile'},
        ]
    },
    {
      path: '/start',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/start/board', component: '../pages/start/board'},
        { path: '/start/FedAvg', component: '../pages/start/FedAvg'},
        { path: '/start/Fednoniid', component: '../pages/start/Fednoniid'},
        { path: '/start/Fedminavg_nonIID', component: '../pages/start/Fedminavg_nonIID'},
       ]
    },
    {
      path: '/procedure',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/procedure/process', component: '../pages/procedure/process'},
       ]
    },
    {
      path: '/result',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/result/show', component: '../pages/result/show'},
       ]
    },
    {
      path: '/result2',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/result2/show', component: '../pages/result2/show'},
       ]
    },
    {
      path: '/compare',
      component: '../layouts/Basiclayout',
      routes: [
        { path: '/compare/compare', component: '../pages/compare/compare'},
       ]
    },
    // {
    //   path: '/404',
    //   // component: '../layouts/Basiclayout',
    //   routes: [
    //     { path: '/404/404', component: '../pages/404/404'},
    //    ]
    // }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'myweb',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/hehe': {
      target: 'http://127.0.0.1:8000',
      pathRewrite: { '^/hehe': '' },
      changeOrigin: true
    }
  },
}
