export default [
    {
        path: "/womanHomePage",
        name: "womanHomePage",
        component: () =>
            import("@/components/project/pudongFulian/womanHomePage.vue"),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/partiCulars",
        name: "partiCulars",
        component: () =>
            import("@/components/project/pudongFulian/partiCulars.vue"),
        meta: {
            title: "详情"
        }
    }
]