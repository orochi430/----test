export default [
    {
        path: "/monthduty",
        name: "monthduty",
        meta: {
            title: "月日程",
        },
        component: () =>
            import ("@/components/project/tangshan/MonthDuty/MonthDuty.vue")
      },
      {
        path: "/weekduty",
        name: "weekduty",
        meta: {
            title: "周日程",
        },
        component: () =>
            import ("@/components/project/tangshan/weekDuty/weekDuty.vue")
      }
]