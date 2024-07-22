export default [
  {
    path: "/sdycLogin",
    name: "sdycLogin",
    component: () => import("@/components/project/shandongyancao/sdycLogin.vue")
  },
  {
    path: "/shouye", //山东烟草首页
    name: "shouye",
    component: () => import("@/components/project/shandongyancao/shouye.vue"),
  },
  {
    path: "/SDYCsystem",
    name: "SDYCsystem",
    meta: {
      title: "制度文件"
    },
    component: () => import("@/components/project/shandongyancao/system.vue")
  },
  {
    path: "/SDYCdutyTable",
    name: "SDYCdutyTable",
    meta: {
      title: "日常值班表"
    },
    component: () =>
      import("@/components/project/shandongyancao/duty/dutyTable.vue")
  },
  {
    path: "/SDYChandoverTable",
    name: "SDYChandoverTable",
    meta: {
      title: "值班交接情况"
    },
    component: () =>
      import("@/components/project/shandongyancao/duty/handoverTable.vue")
  },
  {
    path: "/SDYCsignIn",
    name: "SDYCsignIn",
    meta: {
      title: "签到"
    },
    component: () =>
      import("@/components/project/shandongyancao/duty/signIn.vue")
  },
  {
    path: "/SDYChandover",
    name: "SDYChandover",
    meta: {
      title: "交班"
    },
    component: () =>
      import("@/components/project/shandongyancao/duty/handover.vue")
  },
  {
    path: "/SDYCNews",
    name: "SDYCNews",
    meta: {
      title: "新闻",
      keepAlive: true
    },
    component: () => import("@/components/project/shandongyancao/news.vue")
  },
  {
    path: "/SDYCNewsList",
    name: "SDYCNewsList",
    meta: {
      title: "新闻列表"
    },
    component: () => import("@/components/project/shandongyancao/newsList.vue")
  },
  {
    path: "/SDYCNewsDetail",
    name: "SDYCNewsDetail",
    meta: {
      title: "新闻详情"
    },
    component: () =>
      import("@/components/project/shandongyancao/newsDetail.vue")
  },
  {
    path: "/SDYCObserve/:id",
    name: "SDYCObserve",
    meta: {
      title: "我的观摩"
    },
    component: () => import("@/components/project/shandongyancao/observe.vue")
  },
  {
    path: "/SDYCSignDetail/:id",
    name: "SDYCSignDetail",
    meta: {
      title: "签到详情"
    },
    component: () =>
      import("@/components/project/shandongyancao/signDetail.vue")
  },
  {
    path: "/SDYCConnectUser/:id",
    name: "SDYCConnectUser",
    meta: {
      title: "联系人"
    },
    component: () =>
      import("@/components/project/shandongyancao/connectUser.vue")
  },
  {
    path: "/SDYCMeeting/:id",
    name: "SDYCMeeting",
    meta: {
      title: "我的会议",
      keepAlive: false
    },
    component: () => import("@/components/project/shandongyancao/meeting.vue")
  },
  {
    path: "/SDYCFriends/:id",
    name: "SDYCFriends",
    meta: {
      title: "现场宣传"
    },
    component: () => import("@/components/project/shandongyancao/friends.vue")
  },
  {
    path: "/SDYCConferencePre",
    name: "SDYCConferencePre",
    meta: {
      title: "会务系统",
      keepAlive: false
    },
    component: () =>
      import("@/components/project/shandongyancao/conference/pre.vue")
  },
  {
    path: "/SDYCConferenceED/:pk?",
    name: "SDYCConferenceED",
    meta: {
      title: "防疫申报",
      keepAlive: false
    },
    component: () =>
      import(
        "@/components/project/shandongyancao/conference/epidemicDeclare.vue"
      )
  },
  {
    path: "/SDYCConferenceIndex/:id",
    name: "SDYCConferenceIndex",
    meta: {
      title: "会务系统",
      keepAlive: false
    },
    component: () =>
      import("@/components/project/shandongyancao/conference/index.vue")
  },
  {
    path: "/SDYCConferenceDir/:meetingId/:folderId",
    name: "SDYCConferenceDir",
    meta: {
      title: "",
      keepAlive: false
    },
    component: () =>
      import("@/components/project/shandongyancao/conference/dir.vue")
  },
  {
    path: "/SDYCConferenceFile/:meetingId/:folderId",
    name: "SDYCConferenceFile",
    meta: {
      title: "",
      keepAlive: false
    },
    component: () =>
      import("@/components/project/shandongyancao/conference/file.vue")
  },
  {
    path: "/sdycTodo",
    name: "sdycTodo",
    component: () =>
      import("@/components/project/shandongyancao/sdycTodo.vue")
  },

  {
    path: "/SDYCManuscriptPre",
    name: "SDYCManuscriptPre",
    meta: {
      title: "",
      keepAlive: false
    },
    component: () =>
      import("@/components/project/shandongyancao/gaojian/manuscriptPre.vue")
  }
];
