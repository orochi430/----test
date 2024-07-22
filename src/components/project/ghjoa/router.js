export default [
  {
    path: "/lawIndex",
    name: "lawIndex",
    component: () => import("@/components/project/ghjoa/lawIndex.vue"),
    meta: {
      title: "法律法规库",
      keepAlive: true
    }
  },
  {
      path: "/questionOnline",
      name: "questionOnline",
      component: () =>
          import("@/components/project/ghjoa/questionOnline.vue"),
      meta: {
          title: "智能在线问题",
      },
  },
  {
    path: "/opinion",
    name: "opinion",
    component: () => import("@/components/project/ghjoa/opinion.vue"),
    meta: {
      title: "智能在线问题",
    }
  },
  {
    path: "/catalogSearch",
    name: "catalogSearch",
    component: () =>
      import("@/components/project/ghjoa/catalogSearch.vue"),
    meta: {
      title: "查询结果",
      keepAlive: true
    }
  },
  {
    path: "/contentDetail",
    name: "contentDetail",
    component: () =>
      import("@/components/project/ghjoa/contentDetail.vue"),
    meta: {
      title: "法律法规库",
    }
  }
];
