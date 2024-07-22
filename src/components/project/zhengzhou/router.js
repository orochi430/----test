export default [
  {
    path: "/zhengzhouLogin",
    name: "zhengzhouLogin",
    component: () => import("@/components/project/zhengzhou/zhengzhouLogin.vue")
  },
  {
    path: "/zhengzhouIndex",
    name: "zhengzhouIndex",
    component: () => import("@/components/project/zhengzhou/zhengzhouIndex.vue"),
    meta: {
      keepAlive: true
    },
  }
];