export default [
  {
    path: "/agentLogin",
    name: "agentLogin",
    meta: {
      title: "登录",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/new/agentLogin.vue")
  }, {
    path: "/examination",
    name: "examination",
    meta: {
      title: "入场签到",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/shaobin/examination.vue")
  }, {
    path: "/faceRegister",
    name: "faceRegister",
    meta: {
      title: "人脸采集",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/new/faceRegister.vue")
  }, {
    path: "/passThrough",
    name: "passThrough",
    meta: {
      title: "正常通行",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/new/passThrough.vue")
  }, {
    path: "/newEpidemicPrevention",
    name: "newEpidemicPrevention",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/new/index.vue")
  }, {
    path: "/newEpidemicResult",
    name: "newEpidemicResult",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/new/result.vue")
  }, {
    path: "/total",
    name: "total",
    meta: {
      title: "疫情防控查询",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/total.vue")
  }, {
    path: "/street",
    name: "street",
    meta: {
      title: "疫情防控查询",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/street.vue")
  }, {
    path: "/area",
    name: "area",
    meta: {
      title: "疫情防控查询",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/area.vue")
  }, {
    path: "/dlist",
    name: "dlist",
    meta: {
      title: "疫情防控查询",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/dlist.vue")
  }, {
    path: "/epidemicPrevention",
    name: "epidemicPrevention",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/index.vue")
  },
  {
    path: "/epidemicResult",
    name: "epidemicResult",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/result2.vue")
  },
  {
    path: "/epidemicHistory",
    name: "epidemicHistory",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/history.vue")
  },
  {
    path: "/epidemicvaccin",
    name: "epidemicvaccin",
    meta: {
      title: "疫情防控查询",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/vaccin.vue")
  },
  {
    path: "/personStatistics",
    name: "personStatistics",
    meta: {
      title: "单位每日工作统计",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/personStatistics.vue")
  },
  {
    path: "/trendStatistics",
    name: "trendStatistics",
    meta: {
      title: "单位工作统计趋势",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/trend.vue")
  },
  {
    path: "/epidemictransfer",
    name: "epidemictransfer",
    meta: {
      title: "防疫权限中转",
    },
    component: () =>
      import("@/components/project/epidemicPrevention/transfer.vue")
  }, {
    path: "/verificationStatistics",
    name: "verificationStatistics",
    component: () =>
      import("@/components/project/epidemicPrevention/shaobin/statistics.vue")
  }, {
    path: "/deviceStatistics",
    name: "deviceStatistics",
    meta: {
      title: "设备访问记录",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/epidemicPrevention/shaobin/deviceStatistics.vue")
  }
]