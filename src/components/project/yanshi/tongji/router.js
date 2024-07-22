export default [
    {
        path: "/submitter",
        name: "submitter",
        meta: {
            title: "得分统计列表",
        },
        component: () =>
            import("@/components/project/yanshi/tongji/SubmitterEchartsBox.vue")
    },{
        path: "/editor",
        name: "editor",
        meta: {
            title: "得分统计列表",
        },
        component: () =>
            import("@/components/project/yanshi/tongji/EditorEchartsBox.vue")
    },
   
]