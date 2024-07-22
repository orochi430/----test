export default [
  {
    path: "/effectivenessDetail",
    name: "effectivenessDetail",
    component: () =>
      import("@/components/project/chengduyitihua/effectivenessDetail.vue"),
    meta: {
      title: "办理效能详情",
      keepAlive: true,
    },
  },
  {
    path: "/infoPublications",
    name: "infoPublications",
    component: () =>
      import("@/components/project/chengduyitihua/infoPublications.vue"),
    meta: {
      title: "信息刊物",
      keepAlive: true,
    },
  },
  {
    path: "/allPublications",
    name: "allPublications",
    component: () =>
      import("@/components/project/chengduyitihua/allPublications.vue"),
    meta: {
      title: "",
    },
  },
  {
    path: "/officialDocumentEfficiency",
    name: "officialDocumentEfficiency",
    component: () =>
      import("@/components/project/chengduyitihua/officialDocumentEfficiency.vue"),
    meta: {
      title: "公文效能",
    },
  },
  {
    path: "/Subsection",
    name: "Subsection",
    component: () =>
      import("@/components/project/chengduyitihua/Subsection.vue"),
    meta: {
      title: "月度小结",
    },
  },
  {
    path: "/banjianDetail",
    name: "banjianDetail",
    component: () =>
      import("@/components/project/chengduyitihua/banjianDetail.vue"),
    meta: {
      title: "办件量详情",
    },
  },
  {
    path: "/tisulvDetail",
    name: "tisulvDetail",
    component: () =>
      import("@/components/project/chengduyitihua/tisulvDetail.vue"),
    meta: {
      title: "提速率分析详情",
    },
  },
  {
    path: "/daibanDetail",
    name: "daibanDetail",
    component: () =>
      import("@/components/project/chengduyitihua/daibanDetail.vue"),
    meta: {
      title: "待办件详情",
    },
  },
  {
    path: "/zongHeDetail",
    name: "zongHeDetail",
    component: () =>
      import("@/components/project/chengduyitihua/zongHeDetail.vue"),
    meta: {
      title: "综合效能指数评估详情",
    },
  },
  {
    path: "/superviseStatistic_cd",
    name: "superviseStatistic_cd",
    meta: {
      title: "督办统计"
    },
    component: () =>
      import("@/components/project/chengduyitihua/statistic.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () =>
      import("@/components/project/chengduyitihua/cdLogin.vue")
  },
  {
    path: "/reportGo",
    name: "reportGo",
    meta: {
      title: ""
    },
    component: () =>
      import("@/components/project/chengduyitihua/dubanReport/reportGo.vue")
  },
  {
    path: "/dbList",
    name: "dbList",
    meta: {
      title: "督办列表",
      keepAlive: true
    },
    component: () =>
      import("@/components/project/chengduyitihua/dubanReport/dbList.vue")
  },
  {
    path: "/globalSearchCD",
    name: "globalSearchCD",
    meta: {
      title: "全文检索",
      keepAlive: true
    },
    component: () =>
      // import("@/components/project/chengduyitihua/globalSearchCD.vue")
      import("@/components/common/globalSearch.vue")
  }
];
