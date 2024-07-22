export default [
  {
    path: "/fangyiDetail/:id",
    name: "fangyiDetail",
    component: () => import("@/components/project/mzb/fangyiDetail.vue"),
  },
  {
    path: "/fangyiIndex",
    name: "fangyiIndex",
    component: () => import("@/components/project/mzb/fangyiIndex.vue"),
    meta: {
      keepAlive: true
    }
  }
];
