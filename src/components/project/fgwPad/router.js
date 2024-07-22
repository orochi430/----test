
export default [
  {
    path: "/fgwStaging",
    name: "fgwStaging",
    component: () => import("@/components/project/fgwPad/staging.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/deptNews",
    name: "deptNews",
    component: () => import("@/components/project/fgwPad/deptNews.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadDB",
    name: "fgwPadDB",
    component: () => import("@/components/project/fgwPad/fgwDB.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadZB",
    name: "fgwPadZB",
    component: () => import("@/components/project/fgwPad/fgwZB.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadQB",
    name: "fgwPadQB",
    component: () => import("@/components/project/fgwPad/fgwQB.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadYY",
    name: "fgwPadYY",
    component: () => import("@/components/project/fgwPad/fgwYY.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadNews",
    name: "fgwPadNews",
    component: () => import("@/components/project/fgwPad/fgwNews.vue"),
    meta: {
      title: "",
      keepAlive: true
    }
  },
  {
    path: "/fgwPadSM", //发改委涉密移动办公
    name: "fgwPadSM",
    component: () => import("@/components/project/fgwPad/leader/index.vue"),
    redirect: "/fgwPadSM/todo",
    children: [
      {
        path: "/fgwPadSM/todo",
        name: "fgwPadSMtodo",
        meta: {
          title: "待办",
          containView: false,
          keepAlive: false
        },
        component: () => import("@/components/project/fgwPad/leader/todo.vue")
      },
      {
        path: "/fgwPadSM/done",
        name: "fgwPadSMdone",
        meta: {
          title: "已办",
          containView: false,
          keepAlive: false
        },
        component: () => import("@/components/project/fgwPad/leader/done.vue")
      }
    ]
  }
]
