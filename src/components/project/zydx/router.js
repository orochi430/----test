export default [
    {
        path: "/zydx/news",
        name: "zydxnews",
        meta: {
            title: "新闻",
            keepAlive: true
        },
        component: () =>
            import ("@/components/project/zydx/news.vue")
    },
    {
        path: "/zydx/newsdetail",
        name: "zydxnewsdetail",
        meta: {
            title: "详情"
        },
        component: () =>
            import ("@/components/project/zydx/newsdetail.vue")
    },
    {
        path: "/zydx/filepreview",
        name: "zydxfilepreview",
        meta: {
            title: "附件预览",
        },
        component: () =>
            import ("@/components/project/zydx/filepreview.vue")
    },
    {
        path: "/zydx/mine",
        name: "zydxmine",
        meta: {
            title: "我的",
        },
        component: () =>import ("@/components/project/zydx/mine.vue")
    },
    {
        path: "/zydx/turnwsdx",
        name: "zydxturnwsdx",
        meta: {
            title: "跳转网上党校",
        },
        component: () =>import ("@/components/project/zydx/turnwsdx.vue")
    }
    // {
    //     path: "/zydx/test",
    //     name: "zydxtest",
    //     meta: {
    //         title: "测试",
    //     },
    //     component: () =>import ("@/components/project/zydx/test.vue")
    // }
]