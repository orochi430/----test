export default [
    {
        path: "/attndFaceIdentify",
        name: "attndFaceIdentify",
        meta: {
            title: "人脸识别",
        },
        component: () =>
            import ("@/components/project/wanzhengtong/components/faceIdentify.vue")
      }
]