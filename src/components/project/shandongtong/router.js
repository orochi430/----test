export default [
    {
        path: "/meetingPreview",
        name: "meetingPreview",
        component: () =>
            import("@/components/project/shandongtong/PaperlessMeeting/previewFile.vue"),
        meta: {
            title: "预览"
        }
    }
]