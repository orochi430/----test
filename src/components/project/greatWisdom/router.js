export default [
  {
    path: '/greatWisdomSingleLogin/:userId/:url', //首页
    name: 'greatWisdomSingleLogin',
    component: () => import('@/components/project/greatWisdom/singleLogin.vue'),
    meta: {
      title: '智慧人大登录',
    },
  },
  {
    path: '/wisdomIndex', //首页
    name: 'wisdomIndex',
    component: () => import('@/components/project/greatWisdom/index.vue'),
    meta: {
      title: '智慧人大首页',
      keepAlive: true,
    },
    // children: [
    //   {
    //     path: 'application', //首页
    //     name: 'application',
    //     component: () =>
    //       import('@/components/project/greatWisdom/application.vue'),
    //   },
    //   {
    //     path: 'address_list', //首页
    //     name: 'addressList',
    //     component: () =>
    //       import('@/components/project/greatWisdom/addressList.vue'),
    //   },
    // ],
  },
  {
    path: '/situationControl', //疫情防控
    name: 'situationControl',
    component: () =>
      import('@/components/project/greatWisdom/situationControl.vue'),
    meta: {
      title: '疫情防控',
      keepAlive: false,
    },
  },
  {
    path: '/greenCodeUpload',
    name: 'greenCodeUpload',
    component: () =>
      import('@/components/project/greatWisdom/greenCodeUpload.vue'),
    meta: {
      title: '健康管理',
      keepAlive: false,
    },
  },
  {
    path: '/messageSurvey',
    name: 'messageSurvey',
    component: () =>
      import('@/components/project/greatWisdom/messageSurvey.vue'),
    meta: {
      title: '信息监测',
      keepAlive: false,
    },
  },
  {
    path: '/wisdomForm', //表单附件
    name: 'wisdomForm',
    component: () =>
      import('@/components/project/greatWisdom/wisdomForm.vue'),
    meta: {
      title: '表单附件'
    },
  },
  {
    path: '/questionQuery',
    name: 'questionQuery',
    component: () =>
      import('@/components/project/greatWisdom/questionQuery.vue'),
    meta: {
      title: '议题征询',
      keepAlive: false,
    },
  }
]
