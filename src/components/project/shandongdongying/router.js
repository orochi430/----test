export default [
    {
        path: "/SDDYNewsDetail",
        name: "SDDYNewsDetail",
        component: () =>
            import("@/components/project/shandongdongying/newsDetail.vue"),
        meta: {
            title: "新闻详情"
        }
    },
    {
        path: "/sddyIndex",
        name: "sddyIndex",
        meta: {
            title: "“一键通”数智督查系统",
        },
        component: () =>
            import("@/components/project/shandongdongying/index.vue")
    },
    {
        path: "/dyEachModule",//东营市委
        name: "dyEachModule",
        meta: {
            title: "经济运行指标",
        },
        component: () =>
            import ("@/components/project/shandongdongying/dyEachModule.vue")
    },
    {
        path:"/blogroll",  //东营  友情链接
        name:"blogroll",
        meta:{
            title:"友情链接",
        },
        component: () =>
            import ("@/components/project/shandongdongying/blogroll.vue")
    },
    {
        path: "/dyProjectConstrut",//东营市委
        name: "dyProjectConstrut",
        meta: {
            title: "项目建设",
        },
        component: () =>
            import ("@/components/project/shandongdongying/dyProjectConstrut.vue")
    },
    {
        path: "/dyProjectVideoandImg",//东营市委
        name: "dyProjectVideoandImg",
        meta: {
            title: "项目建设",
        },
        component: () =>
            import ("@/components/project/shandongdongying/dyProjectVideoandImg.vue")
    },
    {
        path: "/dyProjectImg",//东营市委
        name: "dyProjectImg",
        meta: {
            title: "项目建设",
        },
        component: () =>
            import ("@/components/project/shandongdongying/dyProjectImg.vue")
    },
    {
        path:"/tasklist", // 督察任务数量列表
        name:"tasklist",
        meta: {
            title:"督察列表"
        },
        component: () =>
            import ("@/components/project/shandongdongying/tasklist.vue")
    },
]