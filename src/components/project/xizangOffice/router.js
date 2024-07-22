export default [
  {
    path: "/xizangMeeting",
    name: "xizangMeeting",
    component: () => import("@/components/project/xizangOffice/xizangMeeting.vue")
  },
  {
    path: "/xizangInviteForm/:moduleId",
    name: "xizangInviteForm",
    component: () => import("@/components/project/xizangOffice/xizangInviteForm.vue")
  }
];