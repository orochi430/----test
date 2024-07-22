export default [
    {
        path: "/hljServiceMap",
        name: "hljServiceMap",
        component: () =>
            import("@/components/project/heiLJmedicine/pad/hljServiceMap.vue")
    },
    {
        path: "/hljPadLogin",
        name: "hljPadLogin",
        component: () =>
            import("@/components/project/heiLJmedicine/pad/login.vue")
    },
    {
        path: "/hljPadIndex",
        name: "hljPadIndex",
        component: () =>
            import("@/components/project/heiLJmedicine/pad/index.vue"),
        meta: {
            title: "黑龙江医保一体化管理服务平台",
            keepAlive: true
        }
    },
    {
        path: "/hljPadKnowledgeBase",
        name: "hljPadKnowledgeBase",
        component: () =>
            import("@/components/project/heiLJmedicine/pad/knowledgeBase.vue"),
        meta: {
            title: "知识库查询",
            keepAlive: false
        }
    },
    {
        path: "/hljPadSpb",
        name: "hljPadSpb",
        component: () =>
            import("@/components/project/heiLJmedicine/pad/spb.vue"),
        meta: {
            title: "视频办",
            keepAlive: false
        }
    },
    {
        path: "/dw/:type",
        name: "dw",
        component: () =>
            import("@/components/project/heiLJmedicine/mobile/dw.vue"),
        meta: {
            title: "定位",
            keepAlive: false
        }
    },
]