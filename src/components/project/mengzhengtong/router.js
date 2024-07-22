export default [
    {
        path: "/mztSignIn",
        name: "mztSignIn",
        meta: {
            title: "签到情况",
        },
        component: () =>
            import("@/components/project/mengzhengtong/mztSignIn.vue")
    },
    {
        path: "/mztLogin",
        name: "mztLogin",
        meta: {
            title: "证书登录",
        },
        component: () =>
            import("@/components/project/mengzhengtong/mztLogin.vue")
    },
    {
        path: "/mzt_changePassWord",
        name: "mzt_changePassWord",
        component: () =>
            import("@/components/project/mengzhengtong/mzt_changePassWord.vue"),
    },
    {
        path: "/mzt_LogOut",
        name: "mzt_LogOut",
        component: () =>
            import("@/components/project/mengzhengtong/mzt_LogOut.vue"),
    }
]