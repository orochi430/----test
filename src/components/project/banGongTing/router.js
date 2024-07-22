export default   [
    {
        path: "/testDingdy",
        name: "testDingdy",
        component: () =>
            import("@/components/testDing"),
        meta: {
            title: "测试政务丁丁"
        }
    },
    {
        path: "/attndCheckRulesdy",
        name: "attndCheckRulesdy",
        meta: {
            title: "查看规则",
        },
        component: () =>
            import("@/components/attendance/checkRules.vue")
    },
  ]