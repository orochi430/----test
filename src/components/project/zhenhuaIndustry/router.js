export default [
    {
        path: "/zhenhuaNews/:active?",
        name: "zhenhuaNews",
        meta: {
            title: "新闻公告",
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/zhenhuaNews.vue"),
    },
    {
        path: "/personalMatters",
        name: "personalMatters",
        meta: {
            title: "个人事项卡片",
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/components/personalMatters.vue"),
    },
    {
        path: "/workerHeader",
        name: "workerHeader",
        meta: {
            title: "头部组件",
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/components/workerHeader.vue"),
    },
    {
        path: "/mobileNotice",
        name: "mobileNotice",
        meta: {
            title: "通知公告",
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/components/mobileNotice.vue"),
    },
    {
        path: "/dataViewPanel",
        name: "dataViewPanel",
        meta: {
            title: "数据看板",
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/components/dataViewPanel.vue"),
    },
    {
        path: "/servicesMenu",
        name: "servicesMenu",
        meta: {
            title: "办事"
        },
        component: () =>
            import("@/components/project/zhenhuaIndustry/components/servicesMenu.vue"),
    },
]