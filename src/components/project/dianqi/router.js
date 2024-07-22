export default [
  {
    path: "/elecHomePage",
    name: "elecHomePage",
    component: () => import("@/components/project/dianqi/elecHomePage.vue"),
    meta: {
      title: "",
    }
  },
  {
    path: "/elecIndex",
    name: "elecIndex",
    component: () => import("@/components/project/dianqi/index.vue"),
    meta: {
      title: "",
      keepAlive: true 
    }
  },
  {
    path: "/elecDetail",
    name: "elecDetail",
    component: () => import("@/components/project/dianqi/elecDetail.vue"),
    meta: {
      title: "",
    }
  },
  {
    path: "/myMenuSettingDQ",
    name: "myMenuSettingDQ",
    component: () => import("@/components/project/dianqi/components/workbench/applicationSetting.vue"),
    meta: {
      title: "应用设置",
    }
  },
  {
    path: "/dqCommonList/:listId/:moduleId",
    name: "dqCommonList",
    component: () => import("@/components/project/dianqi/dqDefaultList.vue"),
    meta: {
      title: "公文待办",
      keepAlive: true
    }
  },
  {
    path: "/dqForgetPassword",
    name: "dqForgetPassword",
    component: () => import("@/components/project/dianqi/dqForgetPassword.vue"),
    meta: {
      title: "找回密码"
    }
  },
  {
    path: "/topSearchMenu",
    name: "topSearchMenu",
    component: () => import("@/components/project/dianqi/topSearchMenu.vue"),
    meta: {
      title: "应用检索",
      keepAlive: true
    }
  }
];
