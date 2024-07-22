export default [
    {
        path: "/jinboIndex",
        name: "jinboIndex",
        component: () =>
            import("@/components/project/jinbo/index.vue"),
        meta: {
            title: "进博随申",
            keepAlive: true
        }
    }, {
        path: "/jinboNews",
        name: "jinboNews",
        component: () =>
            import("@/components/project/jinbo/newsList.vue"),
        meta: {
            title: "追新闻"
        }
    }, {
        path: "/jinboNewsDetail/:id",
        name: "jinboNewsDetail",
        component: () =>
            import("@/components/project/jinbo/newsDetail.vue"),
        meta: {
            title: "新闻详情"
        }
    }, {
        path: "/jinboFood",
        name: "jinboFood",
        component: () =>
            import("@/components/project/jinbo/food.vue"),
        meta: {
            title: "品美食"
        }
    }, {
        path: "/jinboService",
        name: "jinboService",
        component: () =>
            import("@/components/project/jinbo/enjoyServices.vue"),
        meta: {
            title: "享服务"
        }
    }
]