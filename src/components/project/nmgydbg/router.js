export default [
    {
        path: "/staging",
        name: "staging",
        component: () =>
            import("@/components/project/nmgydbg/staging.vue"),
        meta: {
            title: "工作台",
            keepAlive:true
        }
    },
    {
        path: "/NmgLogin",
        name: "NmgLogin",
        component: () =>
            import("@/components/project/nmgydbg/nmglogin.vue"),
        meta: {
            title: "登录",
            
        }
    },
    {
        path:"/NmgsetTheme",
        name:"NmgsetTheme",
        component: () =>
            import("@/components/project/nmgydbg/nmgsetTheme.vue"),
        meta: {
            title:"主题颜色",
        }
    },
    {
        path:"/dianju/",
        name:"dianju",
        component: () =>
            import("@/components/project/nmgydbg/dianju.vue"),
    },
    {
        path:"/qingyuedu/",
        name:"qingyuedu",
        component: () =>
            import("@/components/project/nmgydbg/qingyuedu.vue"),
    }
]