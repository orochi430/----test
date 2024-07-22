// import { name } from "file-loader"
import Vue from "vue"
import Router from "vue-router"
import VuexStore from "../store"
// import Home from "@/components/Home";
// import DocumentCenter from "@/components/documentCenter/DocumentCenter";
// import ScheduleCenter from "@/components/schedule/ScheduleCenter";
// import announcement from "@/components/announcement/announcement";
// import announceDetail from "@/components/announcement/announceDetail";
// import Receipt from "@/components/Forms/Receipt";
// import PostFile from "@/components/Forms/PostFile";
// import Meeting from "@/components/Forms/Meeting";
// import Supervise from "@/components/Forms/Supervise";
// import Notice from "@/components/Forms/Notice";
// import todoFile from "@/components/todoFile";
// import MeetingDetail from "@/components/MeetingDetail";
// import MeetingApply from "@/components/meeting/MeetingApply";
// import MeetingCrew from "@/components/MeetingCrew";
// import InspectorCenter from "@/components/inspector/InspectorCenter";
// import Mform from "@/components/Forms/Mform";
// import SceneForm from "@/components/Forms/SceneForm";
// import DocumentExchange from "@/components/official/DocumentExchange";
// import Electronic from "@/components/newsCenter/Electronic";
// import selectPerson from "@/components/selectPerson/DsfSelectPerson";
// import selectPerson from "@/components/selectPerson/DsfSelectPerson";
// import SeparateRead from "@/components/selectPerson/SeparateRead";
// import addread from "@/components/selectPerson/addread";
// import DelayForm from "@/components/feedback/DelayForm";

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalGo = Router.prototype.go;
Router.prototype.go = function push(location) {
    VuexStore.commit("setCallRouterGo", true);
    return originalGo.call(this, location)
};
export default new Router({
    scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
        /* 		console.log(to) // to：要进入的目标路由对象，到哪里去
            console.log(from) // from：离开的路由对象，哪里来
            console.log(savePosition)  */ // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
        // 异步滚动操作
        if (savePosition && to.meta.keepAlive) {
            // return new Promise((resolve) => { setTimeout(() => { resolve(savePosition); }, 0); });
            return savePosition;

        } else {
            // ios 返回显示一部分白屏，随意滑动页面后，页面显示完整 问题临时解决(暂无法定位具体原因)
            return new Promise((resolve) => { setTimeout(() => { resolve({ x: 0, y: 0 }); }, 0); });
            // return {
            //     x: 0,
            //     y: 0
            // }
        }
    },
  routes: [{
    path: "/leaderSchedule",
      name: "leaderSchedule",
      meta: {
        title: "领导日程",
      },
      component: () =>
        import("@/components/leaderSchedule/index.vue")
  },{
    path: "/attendanceStatistics",
      name: "attendanceStatistics",
      meta: {
        title: "考勤统计",
      },
      component: () =>
        import("@/components/project/yanshi/attendanceStatistics.vue")
  },{
    path: "/applicationDetail/:pk?",
      name: "applicationDetail",
      meta: {
        title: "应用详情",
      },
      component: () =>
        import("@/components/appStore/detail.vue")
  },{
    path: "/myMenuSetting",
      name: "myMenuSetting",
      meta: {
        title: "应用设置",
      },
      component: () =>
        import("@/components/applicationCenter/applicationSetting.vue")
  },{
      path: "/pdgzt",
      name: "pdgzt",
      meta: {
        title: "工作台",
      },
      component: () =>
        import("@/components/project/yanshi/pdgzt.vue")
    },{
      path: "/voiceAssistant",
      name: "voiceAssistant",
      meta: {
        title: "智能语音助手",
      },
      component: () =>
        import("@/components/project/yanshi/voiceAssistant.vue")
    },{
        path: "/meetingTotal",
        name: "meetingTotal",
        meta: {
            title: "会议统计",
        },
        component: () =>
            import("@/components/project/yanshi/meetingTotal.vue")
    }, {
        path: "/potencyCenter",
        name: "potencyCenter",
        meta: {
            title: "效能中心",
        },
        component: () =>
            import("@/components/project/yanshi/potencyCenter.vue")
    }, {
        path: "/costTotal",
        name: "costTotal",
        meta: {
            title: "个人费用统计",
        },
        component: () =>
            import("@/components/project/yanshi/costTotal.vue")
    }, {
        path: "/taskTotal",
        name: "taskTotal",
        meta: {
            title: "任务待办处理",
        },
        component: () =>
            import("@/components/project/yanshi/taskTotal.vue")
    },

    {
        path: "/dutyTotal",
        name: "dutyTotal",
        meta: {
            title: "值班要情统计",
        },
        component: () =>
            import("@/components/project/yanshi/dutyTotal.vue")
    }, {
        path: "/costExecution",
        name: "costExecution",
        meta: {
            title: "费用执行统计",
        },
        component: () =>
            import("@/components/project/yanshi/costExecution.vue")
    }, {
        path: "/projectTotal",
        name: "projectTotal",
        meta: {
            title: "项目情况统计",
        },
        component: () =>
            import("@/components/project/yanshi/projectTotal.vue")
    }, {
        path: "/personnelTotal",
        name: "personnelTotal",
        meta: {
            title: "人员统计",
        },
        component: () =>
            import("@/components/project/yanshi/personnelTotal.vue")
    }, {
        path: "/suppliesTotal",
        name: "suppliesTotal",
        meta: {
            title: "办公用品分析",
        },
        component: () =>
            import("@/components/project/yanshi/suppliesTotal.vue")
    },
    {
        path: "/vehicle",
        name: "vehicle",
        meta: {
            title: "用车分析",
        },
        component: () =>
            import("@/components/project/yanshi/vehicle.vue")
    },
    {
        path: "/myLeave",
        name: "myLeave",
        meta: {
            title: "我的请假",
        },
        component: () =>
            import("@/components/project/yanshi/myLeave.vue")
    },
    {
        path: "/storeIndex",
        name: "storeIndex",
        meta: {
            title: "应用商城",
        },
        component: () =>
            import("@/components/appStore/index.vue")
    },
    {
        path: "/myApp",
        name: "myApp",
        meta: {
            title: "我的应用",
        },
        component: () =>
            import("@/components/appStore/myApp.vue")
    },
    {
        path: "/applyRecord",
        name: "applyRecord",
        meta: {
            title: "申请记录",
        },
        component: () =>
            import("@/components/appStore/applyRecord.vue")
    },
    {
        path: "/searchResult",
        name: "searchResult",
        meta: {
            title: "搜索结果",
        },
        component: () =>
            import("@/components/appStore/searchResult.vue")
    },
    {
        path: "/personStatistic",
        name: "personStatistic",
        meta: {
            title: "人事统计",
        },
        component: () =>
            import("@/components/project/yanshi/personStatistic.vue")
    },
    {
        path: "/officialStatistic",
        name: "officialStatistic",
        meta: {
            title: "公务接待统计",
        },
        component: () =>
            import("@/components/project/yanshi/officialStatistic.vue")
    },
    {
        path: "/dutyStatistics",
        name: "dutyStatistics",
        meta: {
            title: "值班统计",
        },
        component: () =>
            import("@/components/project/yanshi/dutyStatistics.vue")
    },


    {
        path: "/attndSummaryMore/:calcType/:btId?",
        name: "attndSummaryMore",
        meta: {
            title: "考勤汇总",
        },
        component: () =>
            import("@/components/attendance/summaryMore.vue")
    }, {
        path: "/attndIndex",
        name: "attndIndex",
        meta: {
            title: "考勤打卡",
            keepAlive: true
        },
        component: () =>
            import("@/components/attendance/index.vue")
    }, {
        path: "/attndCheckRules",
        name: "attndCheckRules",
        meta: {
            title: "查看规则",
        },
        component: () =>
            import("@/components/attendance/checkRules.vue")
    }, {
        path: "/attndApplications",
        name: "attndApplications",
        meta: {
            title: "我的申请",
        },
        component: () =>
            import("@/components/attendance/applications.vue")
    }, {
        path: "/attndAbnormalities",
        name: "attndAbnormalities",
        meta: {
            title: "异常记录",
        },
        component: () =>
            import("@/components/attendance/abnormalities.vue")
    }, {
        path: "/attndSigned/:ts",
        name: "attndSigned",
        meta: {
            title: "打卡成功",
        },
        component: () =>
            import("@/components/attendance/signed.vue")
    }, {
        path: "/attndSignIn",
        name: "attndSignIn",
        meta: {
            title: "签到打卡",
        },
        component: () =>
            import("@/components/attendance/signIn.vue")
    }, {
        path: "/wanHome",
        name: "wanHome",
        meta: {
            title: "工作台",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/wanzhengtong/framePage/index.vue")
    }, {
        path: "/wanSetting",
        name: "wanSetting",
        meta: {
            title: "设置",
        },
        component: () =>
            import("@/components/project/wanzhengtong/setting.vue")
    }, {
        path: "/wanError",
        name: "wanError",
        meta: {
            title: "错误提示",
        },
        component: () =>
            import("@/components/project/wanzhengtong/error.vue")
    }, {
        path: "/wanApplicationCenter",
        name: "wanApplicationCenter",
        meta: {
            title: "应用中心",
        },
        component: () =>
            import("@/components/project/wanzhengtong/applicationCenter.vue")
    }, {
        path: "/wanTestMap",
        name: "wanTestMap",
        meta: {
            title: "地图插件",
        },
        component: () =>
            import("@/components/project/wanzhengtong/map.vue")
    }, {
        path: "/zhuhaiMail",
        name: "zhuhaiMail",
        meta: {
            title: "邮件",
        },
        component: () =>
            import("@/components/project/zhuhai/mail/index.vue")
    }, {
        path: "/zhuhaiMailInfo",
        name: "zhuhaiMailInfo",
        meta: {
            title: "添加邮箱账号",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/zhuhai/mail/mailInfo.vue")
    }, {
        path: "/zhuhaiMailServer",
        name: "zhuhaiMailServer",
        meta: {
            title: "服务器设置",
        },
        component: () =>
            import("@/components/project/zhuhai/mail/server.vue")
    }, {
        path: "/logNameAutologin",
        name: "logNameAutologin",
        component: () =>
            import("@/components/common/logNameAutologin.vue")
    }, {
        path: "/zflogin",
        name: "zflogin",
        component: () =>
            import("@/components/project/zhongfu/zfLogin.vue")
    },
    {
        path: "/sdtChangeUser",
        name: "sdtChangeUser",
        meta: {
            title: "切换用户",
        },
        component: () =>
            import("@/components/project/shandongtong/changeUser.vue")
    },
    {
        path: "/jxdrc/asset/index",
        name: "JxdrcAssetIndex",
        meta: {
            title: "固定资产管理系统",
        },
        component: () =>
            import("@/components/project/JiangXiDRC/asset/index.vue")
    },
    {
        path: "/diskFile/:folderid?/:driveType?/:allowAdd?",
        name: "diskFile",
        component: () =>
            import("@/components/netDisk/diskfile.vue")
    },
    {
        path: "/xizangOffice",
        name: "xizangOffice",
        meta: {
            title: "工作台",
        },
        component: () =>
            import("@/components/project/xizangOffice/index.vue")
    },
    {
        path: "/joinMeeting",
        name: "joinMeeting",
        meta: {
            title: "加入会议",
        },
        component: () =>
            import("@/components/project/xizangOffice/joinMeeting.vue")
    },
    {
        path: "/assetInventory",
        name: "assetInventory",
        meta: {
            title: "资产",
        },
        component: () =>
            import("@/components/project/enshi/assetInventory.vue")
    }, {
        path: "/qixiangjuDingLogin", // 气象局钉钉单点登录
        name: "qixiangjuDingLogin",
        meta: {
            title: "登录"
        },
        component: () =>
            import("@/components/project/QiXiangJu/dingLogin.vue")
    }, {
        path: "/qixiangjuAutoLogin/:state", // 气象局钉钉单点登录
        name: "qixiangjuAutoLogin",
        meta: {
            title: "登录"
        },
        component: () =>
            import("@/components/project/QiXiangJu/dingLogin.vue")
    }, {
        path: "/qixiangjuLogin", // 气象局沙箱单点登录
        name: "qixiangjuLogin",
        meta: {
            title: "登录"
        },
        component: () =>
            import("@/components/signIn/qixiangjuLogin.vue")
    }, {
        path: "/qixiangjuformDetail",
        name: "qixiangjuformDetail",
        meta: {
            title: "详情"
        },
        component: () =>
            import("@/components/project/QiXiangJu/formDetail.vue")
    }, {
        path: "/qixiangjuFlow",
        name: "qixiangjuFlow",
        meta: {
            title: "流程记录"
        },
        component: () =>
            import("@/components/project/QiXiangJu/flow.vue")
    }, {
        path: "/qixiangjuOpinion",
        name: "qixiangjuOpinion",
        meta: {
            title: "意见"
        },
        component: () =>
            import("@/components/project/QiXiangJu/opinion.vue")
    }, {
        path: "/qixiangjuHome",
        name: "qixiangjuHome",
        meta: {
            title: "公文管理"
        },
        component: () =>
            import("@/components/project/QiXiangJu/home.vue")
    }, {
        path: "/PeopleDaily/Pre",
        name: "PeopleDailyPre",
        meta: {
            title: "",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/pre.vue")
    },
    {
        path: "/PeopleDaily/Login",
        name: "PeopleDailyLogin",
        meta: {
            title: "",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/autoLogin.vue")
    },
    {
        path: "/PeopleDaily/VisitQRCode/:paras",
        name: "PeopleDailyVisitQRCode",
        meta: {
            title: "访客登记单",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/visitQRCode.vue")
    },
    {
        path: "/PeopleDaily/VisitAuthCode/:code",
        name: "PeopleDailyVisitAuthCode",
        meta: {
            title: "访客码",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/visitAuthCode.vue")
    },
    {
        path: "/PeopleDaily/DocDelivery/:id",
        name: "PeopleDailyDocDelivery",
        meta: {
            title: "文件交接",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/docDelivery.vue")
    },
    {
        path: "/PeopleDaily/MyDocStatus/:id",
        name: "PeopleDailyMyDocStatus",
        meta: {
            title: "文件状态",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/myDocStatus.vue")
    },
    {
        path: "/PeopleDaily/DocStatus/:id",
        name: "PeopleDailyDocStatus",
        meta: {
            title: "文件状态",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/PeopleDaily/docStatus.vue")
    },
    {
        path: "/superviseStatistic",
        name: "superviseStatistic",
        meta: {
            title: "督办统计"
        },
        component: () =>
            import("@/components/supervise/statistic.vue")
    },
    {
        path: "/superviseAccept",
        name: "superviseAccept",
        meta: {
            title: "接收情况"
        },
        component: () =>
            import("@/components/supervise/superviseAccept.vue")
    },
    {
        path: "/superviseIdea",
        name: "superviseIdea",
        meta: {
            title: "反馈情况"
        },
        component: () =>
            import("@/components/supervise/superviseIdea.vue")
    },
    {
        path: "/jiangsuyancaoTableTabs/:key",
        name: "jiangsuyancaoTableTabs/:key",
        component: () =>
            import("@/components/project/jiangsuyancao/tableTabs.vue")
    }, {
        path: "/jiangsuyancaoNews",
        name: "jiangsuyancaoNews",
        meta: {
            title: "新闻",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/jiangsuyancao/news.vue")
    }, {
        path: "/jiangsuyancaoNewsList",
        name: "jiangsuyancaoNewsList",
        meta: {
            title: "新闻列表"
        },
        component: () =>
            import("@/components/project/jiangsuyancao/newsList.vue")
    }, {
        path: "/jiangsuyancaoNewsDetail",
        name: "jiangsuyancaoNewsDetail",
        meta: {
            title: "新闻详情"
        },
        component: () =>
            import("@/components/project/jiangsuyancao/newsDetail.vue")
    }, {
        path: "/collapseList/:key",
        name: "collapseList",
        meta: {
            title: "",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/jiangsuyancao/collapseList.vue")
    }, {
        path: "/jiangsuyancaoTable",
        name: "jiangsuyancaoTable",
        meta: {
            title: "",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/jiangsuyancao/table.vue")
    }, {
        path: "/jiangsuyancaoMail",
        name: "jiangsuyancaoMail",
        meta: {
            title: "邮箱",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/mail/index.vue")
    }, {
        path: "/jiangsuyancaoMailList",
        name: "jiangsuyancaoMailList",
        meta: {
            title: "邮箱列表",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/mail/list.vue")
    }, {
        path: "/jiangsuyancaoMailDetail",
        name: "jiangsuyancaoMailDetail",
        meta: {
            title: "邮件详情",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/mail/detail.vue")
    }, {
        path: "/jiangsuyancaoMailEdit",
        name: "jiangsuyancaoMailEdit",
        meta: {
            title: "邮件",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/mail/edit.vue")
    }, {
        path: "/userInfo",
        name: "userInfo",
        meta: {
            title: "员工信息查看",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/jiangsuyancao/userInfo/userInfo.vue")
    }, {
        path: "/cigaretteStructureAnalysis",
        name: "cigaretteStructureAnalysis",
        meta: {
            title: "全省卷烟结构分析",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/chart/cigaretteStructureAnalysis.vue")
    }, {
        path: "/cigaretteSalesAnalysis",
        name: "cigaretteSalesAnalysis",
        meta: {
            title: "全省卷烟销量分析",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/chart/cigaretteSalesAnalysis.vue")
    }, {
        path: "/priceSalesAnalysis",
        name: "priceSalesAnalysis",
        meta: {
            title: "全省分价位段销量分析",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/chart/priceSalesAnalysis.vue")
    }, {
        path: "/myFavorite/:folderid?",
        name: "myFavorite",
        meta: {
            title: "收藏",
        },
        component: () =>
            import("@/components/myFavorite/index.vue")
    }, {
        path: "/specialApplication",
        name: "specialApplication",
        meta: {
            title: "专用工作台",
        },
        component: () =>
            import("@/components/project/jiangsuyancao/specialApplication.vue")
    }, {
        path: "/errorPeopleCongress/:code",
        name: "errorPeopleCongress",
        meta: {
            title: "数字会务"
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/error.vue")
    }, {
        path: "/logonPeopleCongress/",
        name: "logonPeopleCongress",
        meta: {
            title: "数字会务"
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/autoLogin.vue")
    }, {
        path: "/prePeopleCongress",
        name: "prePeopleCongress",
        meta: {
            title: "数字会务",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/pre.vue")
    }, {
        path: "/peopleCongress/:key",
        name: "peopleCongress",
        meta: {
            title: "数字会务",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/index.vue")
    }, {
        path: "/peopleCongressNews/:meetingId",
        name: "peopleCongressNews",
        meta: {
            title: "消息",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/news.vue")
    }, {
        path: "/peopleCongressNewsDetail/:newsId",
        name: "peopleCongressNewsDetail",
        meta: {
            title: "消息详情",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/newsDetail.vue")
    }, {
        path: "/peopleCongressSch/:meetingId",
        name: "peopleCongressSch",
        meta: {
            title: "日程",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/schedule.vue")
    }, {
        path: "/peopleCongressFile/:meetingId/:folderid?",
        name: "peopleCongressFile",
        meta: {
            title: "文件",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/file.vue")
    }, {
        path: "/peopleCongressOpinion/:meetingId",
        name: "peopleCongressOpinion",
        meta: {
            title: "意见建议",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/opinion.vue")
    }, {
        path: "/peopleCongressFeedback/:meetingId/:id?",
        name: "peopleCongressFeedback",
        meta: {
            title: "意见建议",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/feedback.vue")
    }, {
        path: "/peopleCongressVenueSeats",
        name: "peopleCongressVenueSeats",
        meta: {
            title: "会场座位",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/venueSeats.vue")
    }, {
        path: "/peopleCongressBusinfo",
        name: "peopleCongressBusinfo",
        meta: {
            title: "乘车信息",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/businfo.vue")
    }, {
        path: "/peopleCongressHotelinfo",
        name: "peopleCongressHotelinfo",
        meta: {
            title: "住宿信息",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/hotelinfo.vue")
    }, {
        path: "/peopleCongressDiningInfo",
        name: "peopleCongressDiningInfo",
        meta: {
            title: "餐饮信息",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/diningInfo.vue")
    }, {
        path: "/peopleCongressDiningNotice",
        name: "peopleCongressDiningNotice",
        meta: {
            title: "餐饮信息",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/diningNotice.vue")
    }, {
        path: "/peopleCongressContact",
        name: "peopleCongressContact",
        meta: {
            title: "联系人",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/contact.vue")
    }, {
        path: "/peopleCongressScheduleDetail/:agendaId",
        name: "peopleCongressScheduleDetail",
        meta: {
            title: "日程详情",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/scheduleDetail.vue")
    }, {
        path: "/peopleCongressQrCode",
        name: "peopleCongressQrCode",
        meta: {
            title: "我的身份牌",
            // keepAlive: true
        },
        component: () =>
            import("@/components/project/JiangXiPeopleCongress/myQrCode.vue")
    }, {
        path: "/guide",
        name: "guide",
        component: () =>
            import("@/components/guide.vue")
    }, {
        path: "/checklogin",
        name: "checklogin",
        component: () =>
            import("@/components/project/fgw/checklogin.vue")
    }, {
        path: "/lxssologin",
        name: "lxssologin",
        component: () =>
            import("@/components/project/lanxin/lxLogin.vue")
    }, {
        path: "/personWrite",
        name: "personWrite",
        component: () =>
            import("@/components/project/banGongTing/personWrite.vue")
    }, {
        path: "/bgtlogin",
        name: "bgtlogin",
        component: () =>
            import("@/components/project/banGongTing/checklogin.vue")
    }, {
        path: "/testLogin",
        name: "testLogin",
        component: () =>
            import("@/components/testLogin.vue")
    }, {
        path: "/applogin",
        name: "testLogin",
        component: () =>
            import ("@/components/testLogin.vue")
    },{
        path: "/xzLogin",
        name: "xzLogin",
        component: () =>
            import("@/components/project/xizangOffice/xizangLogin.vue")
    },
    {
        path: "/autoLogin/:userid/:toPath/:random",
        name: "autoLogin",
        component: () =>
            import("@/components/signIn/autoLogin.vue")
    },
    {
        path: "/DingLogin",
        name: "DingLogin",
        component: () =>
            import("@/components/documentCenter/DingLogin.vue")
    },
    {
        path: "/moduleIndex",
        name: "ModuleIndex",
        component: () =>
            import("@/components/documentCenter/moduleIndex.vue")
    },
    {
        path: "/",
        name: "Home",
        component: () =>
            import("@/components/Home.vue"),
        meta: {
            title: "首页",
            keepAlive: true
        }
    },
    {
        path: "/index/:key?",
        name: "index",
        component: () =>
            import("@/components/framePage/index/homepage.vue"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/treeMenus",
        name: "treeMenus",
        component: () =>
            import("@/components/applicationCenter/treeMenus.vue"),
        meta: {
            keepAlive: false
        }
    },
    //全文检索
    {
        path: "/search",
        name: "Search",
        component: () =>
            import(
                /* webpackChunkName: "Search" */
                "@/components/retrieval/Search"
            ),
        meta: {
            title: "搜索"
        }
    },
    //公文检索
    {
        path: "/official",
        name: "official",
        component: () =>
            import(
                /* webpackChunkName: "official" */
                "@/components/retrieval/Official"
            ),
        meta: {
            title: "公文检索"
        }
    },
    //签收情况
    {
        path: "/signin",
        name: "signIn",
        component: () =>
            import( /* webpackChunkName: "signIn" */ "@/components/signIn/Index"),
        meta: {
            title: "签收情况",
            keepAlive: true
        }
    },
    //dingbtn
    {
        path: "/dingbtn",
        name: "dingbtn",
        component: () =>
            import( /* webpackChunkName: "dingbtn" */ "@/components/common/DingBtn")
    },
    {
        path: "/commontabs/:key",
        name: "commontabs",
        component: () =>
            import("@/components/common/commonTabs"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/ssoToOther',
        name: 'ssoToOther',
        component: () =>
            import("@/components/common/ssoToOther"),
    },
    //发文列表
    {
        path: "/postlist",
        name: "postlist",
        component: () =>
            import( /* webpackChunkName: "postlist" */ "@/components/documentCenter/PostList"),
        meta: {
            title: "发文列表"
        }
    },
    // 办文中心
    {
        path: "/documentCenter",
        name: "DocumentCenter",
        component: () =>
            import("@/components/documentCenter/DocumentCenter.vue"),
        meta: {
            title: "办文中心"
        }
    },
    // 办会中心
    {
        path: "/meetingCenter",
        name: "MeetingCenter",
        component: () =>
            import("@/components/meeting/MeetingCenter"),
        meta: {
            title: "会议中心",
            keepAlive: true
        }
    },
    // 测试政务丁丁
    {
        path: "/testDing",
        name: "testDing",
        component: () =>
            import("@/components/testDing"),
        meta: {
            title: "测试政务丁丁"
        }
    },
    // 测试政务丁丁
    {
        path: "/testwps",
        name: "testwps",
        component: () =>
            import("@/components/testshuke"),
        meta: {
            title: "测试"
        }
    },
    // 检查督办
    {
        path: "/inspectorCenter",
        name: "InspectorCenter",
        component: () =>
            import("@/components/inspector/InspectorCenter"),
        meta: {
            title: "检查督办"
        }
    },
    // 公文交换
    {
        path: "/documentExchange",
        name: "DocumentExchange",
        component: () =>
            import("@/components/official/DocumentExchange"),
        meta: {
            title: "公文交换"
        }
    },
    // 日程中心
    {
        path: "/scheduleCenter",
        name: "ScheduleCenter",
        component: () =>
            import("@/components/schedule/ScheduleCenter"),
        meta: {
            title: "日程中心"
        }
    },
    {
        path: "/announcement", //公告列表
        name: "announcement",
        component: () =>
            import("@/components/announcement/announcement"),
        meta: {
            title: "通知公告",
            keepAlive: true
        }
    },
    {
        path: "/announceDetail", //公告详情
        name: "announceDetail",
        component: () =>
            import("@/components/announcement/announceDetail"),
        meta: {
            title: "公告详情"
        }
    },
    {
        path: "/announcementStatus", //公告
        name: "announcementStatus",
        component: () =>
            import("@/components/announcement/announcementStatus"),
        meta: {
            title: "阅读情况"
        }
    },
    // {
    //     path: "/receipt", //收文
    //     name: "receipt",
    //     component: () =>
    //         import("@/components/Forms/Receipt"),
    //     meta: {
    //         title: "收文"
    //     }
    // },
    // {
    //     path: "/postfile", //发文
    //     name: "postfile",
    //     component: () =>
    //         import('@/components/Forms/PostFile'),
    //     meta: {
    //         title: "发文"
    //     }
    // },
    // {
    //     path: "/meeting", //会议
    //     name: "meeting",
    //     component: () =>
    //         import('@/components/Forms/Meeting'),
    //     meta: {
    //         title: "会议"
    //     }
    // },
    // {
    //     path: "/supervise", //督办
    //     name: "supervise",
    //     component: () =>
    //         import('@/components/Forms/Supervise'),
    //     meta: {
    //         title: "督办"
    //     }
    // },
    // {
    //     path: "/notice", //通知
    //     name: "notice",
    //     component: () =>
    //         import('@/components/Forms/Notice'),
    //     meta: {
    //         title: "通知"
    //     }
    // },
    {
        path: "/todoFile", //待办文件
        name: "todoFile",
        component: () =>
            import("@/components/todoFile"),
        meta: {
            title: "待办文件"
        }
    },
    {
        path: "/meetingdetail", //会议详情
        name: "MeetingDetail",
        component: () =>
            import("@/components/meeting/MeetingDetail"),
        meta: {
            title: "会议详情"
        }
    },
    {
        path: "/meetingcrew/:status", //会议详情  status：0 未开始  1:开始
        name: "MeetingCrew",
        component: () =>
            import("@/components/meeting/MeetingCrew"),
        meta: {
            title: "会议详情"
        }
    },
    {
        path: "/meetingvote", //会议表决
        name: "meetingvote",
        component: () =>
            import("@/components/newMeeting/meetingvote"),
        meta: {
            title: "表决统计",
            keepAlive: false
        }
    },
    {
        path: "/meetingcast", //会议表决--新
        name: "meetingcast",
        component: () =>
            import("@/components/newMeeting/meetingcast"),
        meta: {
            title: "表决统计",
            keepAlive: false
        }
    },
    {
        path: "/reserveMeeting", //预定会议室
        name: "reserveMeeting",
        component: () =>
            import("@/components/meeting/reserveMeeting"),
        meta: {
            title: "会议室预定"
        }
    },
    {
        path: "/mform", //会议详情
        name: "Mform",
        component: () =>
            import("@/components/Forms/Mform"),
        meta: {
            title: "会议详情"
        }
    },
    {
        path: "/sceneForm", //会议详情
        name: "SceneForm",
        component: () =>
            import("@/components/Forms/SceneForm"),
        meta: {
            title: "会议详情"
        }
    },
    // {
    //     path: "/sendFile", // 发送
    //     name: "sendFile",
    //     component: () =>
    //         import("@/components/todoFile/sendFile"),
    //     meta: {
    //         title: "发送"
    //     }
    // },
    {
        path: "/msgDisclosure", // 新聞中心信息公開
        name: "MsgDisclosure",
        meta: {
            title: "信息公开"
        },
        component: () =>
            import("@/components/newsCenter/MsgDisclosure")
    },
    {
        path: "/electronic", // 新聞中心電子刊物
        name: "Electronic",
        meta: {
            title: "电子刊物"
        },
        component: () =>
            import("@/components/newsCenter/Electronic")
    },
    {
        path: "/reserveNewMeeting", // 新会议室预定
        name: "reserveNewMeeting",
        component: () =>
            import("@/components/newMeeting/reserveMeeting"),
        meta: {
            title: "会议室预定",
            keepAlive: true
        }
    },
    {
        path: "/meetingView", // 会议查看
        name: "meetingView",
        component: () =>
            import("@/components/newMeeting/meetingView"),
        meta: {
            title: "会议查看",
            keepAlive: true
        }
    },
    {
        path: "/newMeeting/signup/status", // 会议报名情况
        name: "newMeetingSignUpStatus",
        component: () =>
            import("@/components/newMeeting/signUpStatus"),
        meta: {
            title: "会议报名情况"
        }
    },
    {
        path: "/newMeeting/addressList", // 会议通讯录
        name: "newMeetingAddressList",
        component: () =>
            import("@/components/newMeeting/addressList"),
        meta: {
            title: "会议通讯录"
        }
    },
    {
        path: "/newMeeting/topicsTab/:moduleId/:pk", // 会议议题tab
        name: "MeetingTab",
        component: () =>
            import("@/components/newMeeting/topicsTab"),
        meta: {
            title: "会议信息"
        }
    },
    {
        path: "/topicDetail", // 议题详情
        name: "topicDetail",
        component: () =>
            import("@/components/newMeeting/topicDetail"),
        meta: {
            title: "议题详情"
        }
    },
    {
        path: "/meetingPad/welcome",
        name: "meetingPadWelcome",
        meta: {
            title: "欢迎",
        },
        component: () =>
            import("@/components/meetingPad/welcome.vue")
    },


    {
        path: "/meetingPad/login", // 会务系统pad登录
        name: "meetingPadLogin",
        component: () =>
            import("@/components/meetingPad/login"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/meetingPad/front", // 会务系统pad置
        name: "meetingPadFront",
        component: () =>
            import("@/components/meetingPad/front"),
        meta: {
            title: "前置页"
        }
    },
    {
        path: '/meetingPad/search',
        component: () =>
            import('@/components/meetingPad/searchMeeting.vue'),
        name: 'meetingPadSearch',
        meta: {
            title: "搜索页面"
        },
    },
    {
        path: '/meetingPad/index',
        component: () =>
            import("@/components/meetingPad/layout/layoutIndex.vue"),
        redirect: '/meetingPad/index/appcenter',
        children: [{
            path: "/meetingPad/meetingPad/empty",
            name: "meetingPadEmpty",
            meta: {
                title: "空白页",
            },
            component: () =>
                import("@/components/meetingPad/empty.vue")
        }, {
            path: 'appcenter',
            component: () =>
                import('@/components/meetingPad/index.vue'),
            name: 'meetingPadAppcenter',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'zhindex',  // 无纸化会议首页珠海定制
            component: () =>
                import('@/components/project/zhuhaipad/index.vue'),
            name: 'zhindex',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'topic',
            component: () =>
                import('@/components/meetingPad/topic.vue'),
            name: 'meetingPadTopic',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'files',
            component: () =>
                import('@/components/meetingPad/files.vue'),
            name: 'meetingPadFiles',
            meta: {
                hasMeetingTop: true,
                keepAlive: false
            },
        }, {
            path: 'filePreview',
            component: () =>
                import('@/components/meetingPad/filePreview.vue'),
            name: 'meetingPadFilePreview',
            meta: {
                hasMeetingTop: false,
            },
        }, {
            path: 'memo',
            component: () =>
                import('@/components/meetingPad/memo.vue'),
            name: 'meetingPadMemo',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'memoEdit/:memoId?',
            component: () =>
                import('@/components/meetingPad/memoEdit.vue'),
            name: 'meetingPadMemoEdit',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'contacts',
            component: () =>
                import('@/components/meetingPad/contacts.vue'),
            name: 'meetingPadContacts',
            meta: {
                hasMeetingTop: true,
            },
        }, {
            path: 'signIn',
            component: () =>
                import('@/components/meetingPad/signIn.vue'),
            name: 'meetingPadSignIn',
            meta: {
                hasMeetingTop: false,
            },
        },
        {
            path: 'message',
            component: () =>
                import('@/components/meetingPad/message.vue'),
            name: 'meetingPadMessage',
            meta: {},
        },
        {
            path: 'notice',
            component: () =>
                import('@/components/meetingPad/notice.vue'),
            name: 'meetingPadNotice',
            meta: {},
        },
        {
            path: 'noticeDetail',
            component: () =>
                import('@/components/meetingPad/noticeDetail.vue'),
            name: 'meetingPadNoticeDetail',
            meta: {},
        }, {
            path: 'signDetail',
            component: () =>
                import('@/components/meetingPad/signDetail.vue'),
            name: 'meetingPadSignDetail',
            meta: {
                hasMeetingTop: true,
            },
        },
        {
            path: 'publish',
            component: () =>
                import('@/components/meetingPad/publish.vue'),
            name: 'meetingPadPublish',
            meta: {},
        },
        {
            path: 'publishEdit',
            component: () =>
                import('@/components/meetingPad/publishEdit.vue'),
            name: 'meetingPadPublishEdit',
            meta: {},
        },
        {
            path: "personal",
            name: "meetingPadPersonal",
            component: () =>
                import("@/components/meetingPad/personal"),
            meta: {
                title: "个人中心"
            }
        },
        {
            path: "changePwd",
            name: "meetingPadChangePwd",
            component: () =>
                import("@/components/meetingPad/changePwd"),
            meta: {
                title: "修改密码"
            }
        },
        {
            path: "setFontSize",
            name: "meetingPadSetFontSizePad",
            component: () =>
                import("@/components/meetingPad/setFontSize"),
            meta: {
                title: "字体大小设置"
            }
        }
        ]
    },
    {
        path: "/scheduleDetail/:id", // 新增个人日程
        name: "ScheduleDetail",
        component: () =>
            import("@/components/schedule/ScheduleAdd"),
        meta: {
            title: "日程详情"
        }
    },
    {
        path: "/scheduleAdd", // 新增个人日程
        name: "ScheduleAdd",
        component: () =>
            import("@/components/schedule/ScheduleAdd"),
        meta: {
            title: "新增日程"
        }
    },
    {
        path: "/holidayDuty", // 节假日值班
        name: "HolidayDuty",
        component: () =>
            import("@/components/onduty/HolidayDuty"),
        meta: {
            title: "节假日值班"
        }
    },
    {
        path: "/dayDuty", // 普通日值班
        name: "DayDuty",
        component: () =>
            import("@/components/onduty/DayDuty"),
        meta: {
            title: "日值班"
        }
    },
    {
        path: "/feedback", // 督办反馈
        name: "FeedBack",
        component: () =>
            import("@/components/feedback/FeedBack"),
        meta: {
            title: "督办反馈"
        }
    },
    {
        path: "/selectPerson", //选人
        name: "selectPerson",
        component: () =>
            import('@/components/selectPerson/DsfSelectPerson'),
        meta: {
            title: "选人"
        }
    },
    {
        path: "/SeparateRead", //分阅选人
        name: "SeparateRead",
        component: () =>
            import('@/components/selectPerson/SeparateRead'),
        meta: {
            title: "分阅选人"
        }
    },
    {
        path: "/commonForm/:moduleId/:pk?",
        name: "commonForm",
        component: () =>
            import('@/components/commonForm/commonForm'),
        meta: {
          // title: "移动表单"
        }
    },
    {
        path: "/commonForm/:moduleId/:pk/:isEnterTodo",
        name: "commonForm",
        component: () =>
            import('@/components/commonForm/commonForm'),
        meta: {
            // title: "移动表单"
        }
    },
    {
        path: "/TabCommonForm/:key/:tabIndex/:moduleId/:pk?/:forwardIds?/:replyId?",
        name: "TabCommonForm",
        component: () =>
            import('@/components/common/TabCommonForm'),
        meta: {
            title: "便笺"
        }
    },
    {
        path: "/delayform", //申请延期
        name: "DelayForm",
        component: () =>
            import("@/components/feedback/DelayForm"),
        meta: {
            title: "申请延期"
        }
    },
    {
        path: "/todoCenter", // 待办中心
        name: "TodoCenter",
        component: () =>
            import("@/components/todoCenter/TodoCenter"),
        meta: {
            title: "待办中心",
            keepAlive: true
        }
    },
    {
        path: "/meeting/signup/status", // 会议报名情况
        name: "MeetingSignUpStatus",
        component: () =>
            import("@/components/meeting/MeetingSignUpStatus"),
        meta: {
            title: "会议报名情况"
        }
    },
    {
        path: "/meetingSignupStatus", // 会议报名情况---县政钉
        name: "MeetingSignUpStatusXZD",
        component: () =>
            import("@/components/meeting/Meeting_signUp_status"),
        meta: {
            title: "会议报名情况"
        }
    },
    {
        path: "/meeting/book", // 会议预订
        name: "MeetingBook",
        component: () =>
            import("@/components/meeting/MeetingBook"),
        meta: {
            title: "会议预订"
        }
    },
    {
        path: "/meeting/apply", // 会议预订
        name: "MeetingApply",
        component: () =>
            import("@/components/meeting/MeetingApply"),
        meta: {
            title: "会议申请"
        }
    },
    {
        path: "/meeting/change", // 会议变更
        name: "MeetingChange",
        component: () =>
            import("@/components/meeting/MeetingBook"),
        meta: {
            title: "会议变更"
        }
    },
    {
        path: "/EnclosurePre/:fileUrl", // 附件预览
        name: "EnclosurePre",
        component: () =>
            import("@/components/enclosure/EnclosurePre")
    },
    {
        path: "/feedbackReadonly/:pk/:moduleId",
        name: "feedbackReadonly",
        component: () =>
            import("@/components/feedback/feedbackReadonly")
    },
    {
        path: "/opinionReceipt", // 意见回执
        name: "OpinionReceipt",
        component: () =>
            import("@/components/opinionReceipt/OpinionReceipt"),
        meta: {
            title: "意见回执"
        }
    },
    {
        path: "/opinionReceiptReadonly/:moduleId/:pk", // 意见回执
        name: "opinionReceiptReadonly",
        component: () =>
            import("@/components/Forms/ReadOnly/opinionReceiptReadonly"),
        meta: {
            title: "意见回执"
        }
    },
    {
        path: "/commonList/:listId/:moduleId", // 通用列表
        name: "commonList",
        component: () =>
            import("@/components/documentCenter/DefaultList"),
        meta: {
            title: "",
            keepAlive: true
        }
    },
    {
        path: "/commonList", // 通用列表
        name: "commonList",
        component: () =>
            import("@/components/documentCenter/DefaultList"),
        meta: {
            title: "",
            keepAlive: true
        }
    },
    {
        path: "/signinlist", // 已签收列表
        name: "SigninList",
        component: () =>
            import("@/components/signinList/SigninList"),
        meta: {
            title: "已签收"
        }
    },
    {
        path: "/rejectedSign", // 收文拒签
        name: "RejectedSign",
        component: () =>
            import("@/components/todoCenter/RejectedSign"),
        meta: {
            title: "拒签收"
        }
    },
    {
        path: "/meetingManage", // 会议-我管理的
        name: "meetingManage",
        component: () =>
            import("@/components/meeting/MeetingManage"),
        meta: {
            title: "会议管理",
            keepAlive: true
        }
    },
    {
        path: "/inspectorList", // 督查管理列表
        name: "InspectorList",
        component: () =>
            import("@/components/inspector/InspectorList"),
        meta: {
            title: "督办管理",
            keepAlive: true
        }
    },
    {
        path: "/inspectorCondition", // 督办情况
        name: "InspectorCondition",
        component: () =>
            import("@/components/inspector/InspectorCondition"),
        meta: {
            title: "督办情况"
        }
    },

    {
        path: "/InspectorConditionRB", // 督办情况
        name: "InspectorConditionRB",
        component: () =>
            import("@/components/inspector/InspectorConditionRB"),
        meta: {
            title: "督办情况"
        }
    },
    {
        path: "/InspectorConditionRBhuiyi", // 督办情况
        name: "InspectorConditionRBhuiyi",
        component: () =>
            import("@/components/inspector/InspectorConditionRBhuiyi"),
        meta: {
            title: "会议报名情况"
        }
    },

    {
        path: "/InspectorConditionRBqianshou", // 督办情况
        name: "InspectorConditionRBqianshou",
        component: () =>
            import("@/components/inspector/InspectorConditionRBqianshou"),
        meta: {
            title: "签收情况"
        }
    },
    {
        path: "/inspectorConditionXZD", // 督办情况
        name: "inspectorConditionXZD",
        component: () =>
            import("@/components/inspector/inspectorConditionXZD"),
        meta: {
            title: "督办情况"
        }
    },
    {
        path: "/meeting/tipssetting", // 应用提醒
        name: "TipsSetting",
        component: () =>
            import("@/components/meeting/TipsSetting"),
        meta: {
            title: "应用提醒"
        }
    },
    {
        path: "/iframe",
        name: "dsfIframe",
        component: () =>
            import("@/components/iframe/iframePage")
    },
    {
        path: "/inspectorFeedback", // 应用提醒
        name: "InspectorFeedback",
        component: () =>
            import("@/components/inspector/InspectorFeedback"),
        meta: {
            title: "督办反馈",
            keepAlive: false
        }
    },
    {
        path: "/signFile",
        name: "signFile",
        component: () =>
            import("@/components/todoFile/signFile"),
        meta: {
            title: "报名表单"
        }
    },
    {
        path: "/signFilePerson",
        name: "signFilePerson",
        component: () =>
            import("@/components/todoFile/signFilePerson"),
        meta: {
            title: "报名表单"
        }
    },
    {
        path: "/askLeave",
        name: "askLeave",
        component: () =>
            import("@/components/todoFile/AskLeave"),
        meta: {
            title: "请假表单"
        }
    },
    {
        path: "/salary",
        name: "salary",
        component: () =>
            import("@/components/salary/salary"),
        meta: {
            title: "工资"
        }
    },
    {
        path: "/salaryDetailCQCZ/:id",
        name: "salaryDetailCQCZ",
        component: () =>
            import("@/components/salary/salaryDetailCQCZ"),
        meta: {
            title: "工资明细"
        }
    },
    {
        path: "/scheduleLeader/:id", // 领导日程详细页
        name: "ScheduleLeader",
        component: () =>
            import("@/components/schedule/ScheduleLeader"),
        meta: {
            title: "领导日程"
        }
    },
    {
        path: "/openSchedule", // 开启视频会议
        name: "OpenSchedule",
        component: () =>
            import("@/components/schedule/OpenSchedule"),
        meta: {
            title: "视频会议"
        }
    },
    {
        path: "/inConstruction", // 建设中页面
        name: "InConstruction",
        component: () =>
            import("@/components/inConstruction/InConstruction"),
    },
    {
        path: "/formLayout",
        name: "formLayout",
        component: () =>
            import("@/components/commonForm/formLayout"),
    },
    {
        path: "/controlUser", //选人
        name: "controlUser",
        component: () =>
            import('@/components/commonForm/controls/controlUser'),
        meta: {
            title: "选人"
        }
    },
    {
        path: "/appSelect",
        name: "appSelect",
        component: () =>
            import("@/components/documentCenter/appSelect.vue"),
        meta: {
            title: "应用中心"
        }
    },
    {
        path: "/appMenuCenter",
        name: "appMenuCenter",
        component: () =>
            import("@/components/documentCenter/appMenuCenter.vue"),
        meta: {
            title: "应用中心"
        }
    },
    {
        path: "/homePage",
        name: "homePage",
        component: () =>
            import("@/components/EnterpriseServices/homePage.vue"),
        meta: {
            title: "上海企业服务器云"
        }
    },
    //上海中小企业-数据统计
    {
        path: "/dataAnalysis",
        name: "dataAnalysis",
        component: () =>
            import("@/components/EnterpriseServices/dataAnalysis.vue"),
    },
    //用车统计
    {
        path: "/carUseAnalysis",
        name: "carUseAnalysis",
        component: () =>
            import("@/components/EnterpriseServices/carUseAnalysis.vue"),
        meta: {
            title: "用车统计"
        }
    },
    //上海中小企业-专员信息
    {
        path: "/commissionerInfo",
        name: "commissionerInfo",
        component: () =>
            import("@/components/EnterpriseServices/commissionerInfo.vue"),
    },
    {
        path: "/appManageCenter",
        name: "appManageCenter",
        component: () =>
            import("@/components/documentCenter/appManageCenter.vue"),
        meta: {
            title: "应用管理中心"
        }
    },
    {
        path: "/customTabs/:Note",
        name: "customTabs",
        component: () =>
            import("@/components/common/customTabs.vue"),
        meta: {
            title: "便笺",
            keepAlive: true
        }
    },
    {
        path: "/mailDetail",
        name: "mailDetail",
        component: () =>
            import("@/components/mailList/mailDetail.vue")
    },
    {
        path: "/organization",
        name: "organization",
        component: () =>
            import("@/components/mailList/organization.vue")
    },
    {
        path: "/indexList",
        name: "indexList",
        component: () =>
            import("@/components/mailList/indexList.vue")
    },
    {
        path: "/mailList",
        name: "mailList",
        component: () =>
            import("@/components/mailList/index.vue"),
        meta: {
            title: "通讯录",
            keepAlive: true
        }
    },
    {
        path: "/mailListNew",
        name: "mailListNew",
        component: () =>
            import("@/components/mailList/mailListNew.vue"),
        meta: {
            title: "部门通讯录",
            keepAlive: true
        }
    },
    {
        path: "/mailListUser/:level/:value",
        name: "mailListUser",
        component: () =>
            import("@/components/mailList/mailListUser.vue"),
        meta: {
            title: "部门通讯录",
            keepAlive: true
        }
    },
    {
        path: "/mailDeptList",
        name: "mailDeptList",
        component: () =>
            import("@/components/mailDeptList/index.vue"),
        meta: {
            title: "通讯录",
            keepAlive: true
        }
    },
    // 督办统计
    {
        path: "/inspectorStatistics",
        name: "inspectorStatistics",
        component: () =>
            import("@/components/inspector/inspectorStatistics.vue"),
        meta: {
            title: "督办统计"
        }
    },
    // 公文统计
    {
        path: "/documentStatistics",
        name: "DocumentStatistics",
        component: () =>
            import("@/components/official/DocumentStatistics.vue"),
        meta: {
            title: "公文统计"
        }
    },
    // 统计报表
    {
        path: "/chatreport",
        name: "chatreport",
        component: () =>
            import("@/components/common/chatreport.vue"),
        meta: {
            title: "统计报表"
        }
    },
    {
        path: "/commonListWrap/:moduleType",
        name: "commonListWrap",
        component: () =>
            import("@/components/documentCenter/commonListWrap.vue")
    },
    { //公务助手
        path: "/assistant",
        name: "assistant",
        component: () =>
            import("@/components/official/assistant.vue")
    },
    {
        path: "/assistantStandard",
        name: "assistantStandard",
        component: () =>
            import("@/components/official/assistantStandard.vue")
    },
    {
        path: "/democracyList",
        name: "democracyList",
        component: () =>
            import("@/components/documentCenter/democracyList.vue")
    },
    {
        path: "/democracyAssess",
        name: "democracyAssess",
        component: () =>
            import("@/components/documentCenter/democracyAssess.vue")
    },
    {
        path: "/assistantPrice",
        name: "assistantPrice",
        component: () =>
            import("@/components/official/assistantPrice.vue")
    },
    {
        path: "/baiduMap",
        name: "baiduMap",
        component: () =>
            import("@/components/documentCenter/baiduMap.vue")
    },
    {
        path: "/baiduMap",
        name: "baiduMap",
        component: () =>
            import("@/components/documentCenter/baiduMap.vue"),
        meta: {
            title: "地图",
            keepAlive: true
        }
    },
    {
        path: "/middleRouter",
        name: "middleRouter",
        component: () =>
            import("@/components/specialPage/middleRouter.vue"),
    },
    {
        path: "/previewPage/:moduleId/:pk?",
        name: "previewPage",
        component: () =>
            import("@/components/common/previewPage.vue"),
    },
    //健康统计
    {
        path: "/healthStatistics",
        name: "healthStatistics",
        component: () =>
            import("@/components/healthStatistics/HealthStatistics.vue"),
        meta: {
            title: "健康统计",
            keepAlive: true
        }
    },
    //委托设置
    {
        path: "/entrustSetting",
        name: "entrustSetting",
        component: () =>
            import("@/components/entrustSetting/EntrustSetting.vue"),
        meta: {
            title: "委托设置"
        }
    },
    {
        path: "/commonSchedule/:key?",
        name: "commonSchedule",
        component: () =>
            import("@/components/schedule/common/commonSchedule.vue"),
        meta: {
            title: "日程管理"
        }
    },
    {
        path: "/myInfo",
        name: "myInfo",
        component: () =>
            import("@/components/common/myInfo.vue"),
        meta: {
            title: "我的"
        }
    },
    {
        path: "/setTheme",
        name: "setTheme",
        component: () =>
            import("@/components/common/setTheme.vue"),
        meta: {
            title: "设置主题"
        }
    },
    {
        path: "/setFontSize",
        name: "setFontSize",
        component: () =>
            import("@/components/common/setFontSize.vue"),
        meta: {
            title: "字体大小"
        }
    },
    {
        path: "/setFontSizeNew",
        name: "setFontSizeNew",
        component: () =>
            import("@/components/common/setFontSizeNew.vue"),
        meta: {
            title: "字体大小"
        }
    },
    {
        path: "/changePassWord",
        name: "changePassWord",
        component: () =>
            import("@/components/common/changePassWord.vue"),
        meta: {
            title: "修改密码"
        }
    },
    {
        path: "/userImgChange",
        name: "userImgChange",
        component: () =>
            import("@/components/mailLIst/userImgChange.vue"),
        meta: {
            title: "头像上传"
        }
    },
    {
        path: "/hasReadList",
        name: "hasReadList",
        component: () =>
            import("@/components/documentCenter/hasReadList.vue"),
        meta: {
            title: "已阅文件"
        }
    },
    // {
    //     path: "/setting",
    //     name: "setting",
    //     component: () =>
    //         import("@/components/setting/index.vue"),
    //     meta: {
    //         title: "设置"
    //     }
    // },
    // {
    //     path: "/globalConfig",
    //     name: "globalConfig",
    //     component: () =>
    //         import("@/components/setting/globalConfig.vue"),
    //     meta: {
    //         title: "设置"
    //     }
    // },
    {
        path: "/framePage",
        name: "framePage",
        component: () =>
            import("@/components/common/file.vue")
    },
    // {
    //     path: "/HandwrittenSign",
    //     name: "HandwrittenSign",
    //     component: () =>
    //         import("@/components/common/HandwrittenSign.vue")
    // },
    {
        path: "/canvasGesture",
        name: "canvasGesture",
        component: () =>
            import("@/components/common/canvasGesture.vue")
    },
    {
        path: "/canvasGesture/:type",
        name: "canvasGesture",
        component: () =>
            import("@/components/common/canvasGesture.vue")
    },
    {
        path: "/editMyInfo/:key",
        name: "editMyInfo",
        component: () =>
            import("@/components/common/editMyInfo.vue"),
        meta: {
            title: "修改信息"
        }
    },
    {
        path: "/myUUID",
        name: "myUUID",
        component: () =>
            import("@/components/common/myUUID.vue"),
        meta: {
            title: "获取设备信息"
        }
    },
    {
        path: "/LockPage",
        name: "LockPage",
        component: () =>
            import("@/components/common/LockPage.vue"),
        meta: {
            title: "设备锁定"
        }
    },
    {
        path: "/autoLoginToUrl/:token/:state/:random", //单点登录
        name: "autoLoginToUrl",
        component: () =>
            import("@/components/common/autoLoginToUrl.vue"),
        meta: {
            // title: "登录"
        }
    },
    {
        path: "/emergencyLogin", //应急管理部单点登录
        name: "emergencyLogin",
        component: () =>
            import("@/components/signIn/emergencyLogin.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/weekDutyPlan", //周值班安排
        name: "weekDutyPlan",
        component: () =>
            import("@/components/dutyPlan/weekDutyPlan.vue"),
        meta: {
            title: "值班安排"
        }
    },
    {
        path: "/total120", //周值班安排
        name: "total120",
        component: () =>
            import("@/components/chart/total120.vue"),
        meta: {
            title: "120转运统计"
        }
    },
    {
        path: "/checkRecord", //周值班安排
        name: "checkRecord",
        component: () =>
            import("@/components/middleware/checkRecord.vue"),
        meta: {
            title: "120转运统计"
        }
    },
    //平台
    {
        path: "/conferencePre",
        name: "conferencePre",
        meta: {
            title: "会务系统",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/platform/conference/pre.vue")
    },
    {
        path: "/conferenceIndex",
        name: "conferenceIndex",
        meta: {
            title: "我的会议",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/platform/conference/index.vue")
    },
    {
        path: "/connectUser/:id",
        name: "connectUser",
        meta: {
            title: "联系人"
        },
        component: () =>
            import("@/components/project/platform/conference/connectUser.vue")
    },
    {
        path: "/meetIngSignIn/:id",
        name: "meetIngSignIn",
        meta: {
            title: "签到",
        },
        component: () =>
            import("@/components/project/platform/conference/signIn.vue")
    },
    {
        path: "/meetIngSignManage",
        name: "meetIngSignManage",
        meta: {
            title: "签到管理",
        },
        component: () =>
            import("@/components/project/platform/conference/signManage.vue")
    },
    {
        path: "/scheduleDetails/:id",
        name: "scheduleDetails",
        meta: {
            title: "会议议程",
            keepAlive: false
        },
        component: () =>
            import("@/components/project/platform/conference/scheduleDetails.vue")
    },
    {
        path: "/meetingTopics/:id",
        name: "meetingTopics",
        meta: {
            title: "会议议题",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/platform/conference/meetingTopics.vue")
    },
    {
        path: "/conferenceDir/:meetingId/:folderid/:folderModuleId",
        name: "conferenceDir",
        meta: {
            title: "文件",
            keepAlive: true
        },
        component: () =>
            import("@/components/project/platform/conference/dir.vue")
    },
    {
        path: "/conference/memo",
        name: "conferenceMemo",
        meta: {
            title: "备忘录"
        },
        component: () =>
            import("@/components/project/platform/conference/memo.vue")
    },
    {
        path: "/conference/notice",
        name: "conferenceNotice",
        meta: {
            title: "通知公告"
        },
        component: () =>
            import("@/components/project/platform/conference/noticeDetail.vue")
    },
    {
        path: "/conference/signManage",
        name: "conferenceSignManage",
        meta: {
            title: "签到管理",
        },
        component: () =>
            import("@/components/project/platform/conference/signinManage.vue")
    },
    {
        path: "/officialReception", //浙政钉
        name: "zhezhengding",
        component: () =>
            import("@/components/project/zhezhengding/index.vue"),
        meta: {
            title: "接待安排"
        }
    },
    {
        path: "/wdztFileOpen", //山东烟草首页
        name: "wdztFileOpen",
        component: () =>
            import("@/components/commonForm/controls/wdztFileOpen.vue"),
        meta: {
            title: "文件"
        }
    },
    {
        path: "/clockInlogin", //皖政通
        name: "clockInlogin",
        component: () =>
            import("@/components/project/wanzhengtong/clockInLogin.vue")
    },
    {
        path: "/meetingEnter", //新会议报名情况页面
        name: "meetingEnter",
        component: () =>
            import("@/components/newMeeting/meetingEnter.vue"),
        meta: {
            title: "报名情况"
        }
    },
    {
        path: "/VisitorQR", //会议访客二维码
        name: "VisitorQR",
        component: () =>
            import("@/components/newMeeting/VisitorQR.vue"),
        meta: {
            title: "个人码"
        }
    },
    {
        path: "/topicFeedback", //议题征询反馈情况
        name: "topicFeedback",
        component: () =>
            import("@/components/newMeeting/topicFeedback.vue"),
        meta: {
            title: "反馈情况"
        }
    },
    {
        path: "/meetingSeat", //会议座位
        name: "meetingSeat",
        component: () =>
            import("@/components/project/platform/conference/meetingSeat.vue"),
        meta: {
            title: "会议座位"
        }
    },
    {
        path: "/bgtloginTrans", // 办公厅会议签到
        name: "bgtloginTrans",
        component: () =>
            import ("@/components/newMeeting/bgtloginTrans"),
        meta: {
            title: "会议签到"
        }
    },
    {
        path: "/taskDetail/:pk", //任务详情-IM内嵌页面
        name: "taskDetail",
        component: () =>
            import("@/components/taskManager/taskDetail.vue")
    },
    {
        path: "/addTask/:title/:pk?", //新建任务-IM内嵌页面
        name: "addTask",
        component: () =>
            import("@/components/taskManager/addTask.vue")
    },
    {
        path: "/collaboratorList/:pk/:isRecord", //协同人列表-IM内嵌页面
        name: "collaboratorList",
        component: () =>
            import("@/components/taskManager/collaboratorList.vue")
    },
    {
        path: "/filePreview/:fileId/:officeModuleId?", // 附件预览
        name: "filePreview",
        component: () =>
            import ("@/components/enclosure/filePreview")
    },
    {
        path: "/cloudDisk",
        name: "cloudDisk",
        meta: {
            keepAlive: true
        },
        component: () =>
            import ("@/components/cloudDisk/index")
    },
    {
        path: "/diskSearch",
        name: "diskSearch",
        meta: {
            keepAlive: false,
            title: "搜索"
        },
        component: () =>
            import ("@/components/cloudDisk/searchList")
    },
    {
        path: "/purviewManage/:fileId", //权限管理
        name: "purviewManage",
        component: () =>
            import ("@/components/cloudDisk/purviewManage")
    },
    {
        path: "/fileTrends",
        name: "fileTrends",
        component: () =>
            import ("@/components/cloudDisk/fileTrends"),
            meta: {
                title: "文件动态"
            }
    },
    {
        path: "/recycle",
        name: "recycle",
        meta: {
            title: "回收站"
        },
        component: () =>
            import ("@/components/cloudDisk/recycle"),
    },
    {
        path: "/outsideLink",
        name: "outsideLink",
        component: () =>
            import ("@/components/cloudDisk/outsideLink"),
    },
    {
        path: "/diskFileList/:fid?",
        name: "diskFileList",
        component: () =>
            import ("@/components/cloudDisk/diskFileList"),
    },
    {
        path: "/uploadList",
        name: "uploadList",
        component: () =>
            import ("@/components/cloudDisk/uploadList"),
            meta: {
                title: "上传列表"
            }
    },
    {
        path: "/building",
        name: "building",
        component: () =>
            import("@/components/error/building.vue")
    },
    {
        path: "/scheduleView",
        name: "scheduleView",
        meta: {
            title: "领导活动",
        },
        component: () =>
            import ("@/components/leaderSchedule/scheduleView.vue")
    },
    {
        path: "/scheduleRelease",
        name: "scheduleRelease",
        meta: {
            title: "领导活动",
        },
        component: () =>
            import ("@/components/leaderSchedule/scheduleRelease.vue")
    },
    {
        path: "/jxwscheduleView",
        name: "jxwscheduleView",
        meta: {
            title: "领导活动",
        },
        component: () =>
            import ("@/components/leaderSchedule/jxwscheduleView.vue")
    },
    {
        path: "/jxwscheduleRelease",
        name: "jxwscheduleRelease",
        meta: {
            title: "领导活动",
        },
        component: () =>
            import ("@/components/leaderSchedule/jxwscheduleRelease.vue")
    },
    {
        path: "/commonStatistic",
        name: "commonStatistic",
        meta: {
            title: "数据统计",
        },
        component: () =>
            import ("@/components/dataStatistic/commonStatistic.vue")
    },
    {
        path: "/departStatistic",
        name: "departStatistic",
        meta: {
            title: "数据统计",
        },
        component: () =>
            import ("@/components/dataStatistic/departStatistic.vue")
    },
    {
        path: "/testLoading/:listId/:moduleId",
        name: "testLoading",
        meta: {
            title: "测试速度",
        },
        component: () =>
            import("@/components/testLoading.vue")
    },
    {
        path: "/jinganAttendance", //静安一体化-考勤打卡
        name: "jinganAttendance",
        component: () =>
            import("@/components/project/jingan/attendance.vue")
    },
    {
        path: "/globalSearch",
        name: "globalSearch",
        meta: {
            title: "高级检索",
            keepAlive: true
        },
        component: () =>
            import("@/components/common/globalSearch.vue")
    },
    /*
    // 此处需特别注意置于最底部
    */
    {
        path: "*",
        redirect: "/404"
    },
    {
        path: "/404",
        name: "notFound",
        component: () =>
            import("@/components/error/404.vue")
    }
        // 此处不允许在下面再加路由，请加在404上面
        // 此处不允许在下面再加路由，请加在404上面
        // 此处不允许在下面再加路由，请加在404上面
    ]
});
