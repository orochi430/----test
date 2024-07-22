export default [
    {
        path: "/nyncbIndex",
        name: "nyncbIndex",
        component: () =>
            import("@/components/project/nyncb/nyncbIndex.vue"),
        meta: {
            title: "工作台",
            keepAlive: true
        }
    }
]