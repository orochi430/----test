<template>
    <div class="ds_funList">
        <div></div>
        <van-list ref="list" v-model="loading" :finished="finished" :immediate-check="false" :offset="10" class="list_wrap"
            @load="onLoad">
            <div v-if="list.length > 0" slot="default" class="item_box">
                <div v-for="(item, index) in list" :key="index" class="item flex jb">
                    <div style="width: 100%">
                        <!-- van-ellipsis -->
                        <!-- 根据模板显示 -->
                        <template v-if="currentTab.showTemplate">
                            <div class="title ">
                                <span class="point"></span>
                                <span>{{ transTemplate(currentTab.showTemplate.title, item[0]) }}</span>
                            </div>
                            <div class="info_box fontcolor fontsmallSize" v-for="(sch, idx) in item" :key="`sch_${idx}`"
                                @click="goForm(sch)">
                                <div v-for="(col, cIdx) in currentTab.showTemplate.content" :key="`col_${cIdx}`">
                                    {{ transTemplate(col, sch) }}
                                </div>
                            </div>
                        </template>
                        <!-- 默认显示 -->
                        <template v-else>
                            <div class="title ">
                                <span class="point"></span>
                                <span>{{ item[0].date }} {{ item[0].userName || item[0].attendant }}</span>
                            </div>
                            <div class="info_box fontcolor fontsmallSize" v-for="(sch, idx) in item" :key="`sch_${idx}`"
                                @click="goForm(sch)">
                                <div>
                                    {{ sch.time }} {{ sch.content }}
                                </div>
                                <div v-if="sch.place">
                                    地点：{{ sch.place }}
                                </div>
                                <div v-if="sch.attendant && !(currentTab.params && currentTab.params.type == 'leader')">
                                    参与人员：{{ sch.attendant }}
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </van-list>
        <commonempty v-if="list.length == 0 && finished"></commonempty>
    </div>
</template>

<script>
import dsf from "../../../common";
import date from "../../../common/date";

const groupBy = require("lodash/groupBy.js"); //以后lodash函数按需引入,减少打包体积
export default {
    name: "ScheduleList",
    props: {
        selectedDate: {
            type: String,
            default: "",
        },
        week: {
            type: Array,
            default: () => [],
        },
        month: {
            type: Array,
            default: () => [],
        },
        currentTab: {
            type: Object,
            default: () => { },
        },
        hasSch: {
            type: Array,
            default: () => [],
        },
        selectLeaderList: {
            type: Array,
            default: () => [],
        },
        showType: {
            type: String,
            default: "week",
        },
        leaderWeek: {
            type: Array,
            // default: "current",
        },
        curyear: {
            type: Number
        },
        curmonth: {
            type: Number
        },
    },
    data() {
        return {
            finished: false,
            loading: false,
            refreshing: false,
            class: null,
            allClass: null,
            list: [],
            pageConfig: {
                pageNum: 1,
                pageSize: 20,
            },
            screenHeight: "auto",
            previewUrl: "",
            hasRefresh: true,
            types: ["personal", "leader"],
            leaderWeekLIst: []
        };
    },
    computed: {
        dateRange() {
            return this.showType == "week" ? this.week : this.month
        }
    },
    watch: {
        currentTab: {
            handler(val) {
                //this.selectLeaderList=[];
                if (val.type == "leader") {
                    if (!this.selectLeaderList.length) {
                        this.list = [];
                        this.finished = true;
                    } else {
                        this.initfn(this.leaderWeek[0], this.leaderWeek[1]);
                    }

                } else {
                    if (this.showType == "week") {
                        this.initfn(this.week[0].date, this.week[6].date);
                    } else {
                        this.initfn(moment(`${this.curyear}-${this.curmonth + 1}`).startOf('month').format("YYYY-MM-DD"), moment(`${this.curyear}-${this.curmonth + 1}`).endOf('month').format("YYYY-MM-DD"))
                    }
                    // let tempArr = this.week.filter((item) => item.isToday);
                    //if (tempArr.length && this.currentTab.getDataType == "day") return;

                }
            },
            deep: true,
            // immediate: true
        },
        selectLeaderList(val) {
             if(dsf.config.homePage.schedule.defaultToday && this.firstTabdata.scheduleShowPerson) return
            if (!val.length) {
                this.list = [];
                this.finished = true;
            } else {
                this.initfn(this.leaderWeek[0], this.leaderWeek[1]);
            }
        },
        leaderWeek: {
            handler(val) {
                if(dsf.config.homePage.schedule.defaultToday && this.firstTabdata.scheduleShowPerson) return
                if (!this.selectLeaderList.length) {
                    this.list = [];
                    this.finished = true;
                } else {
                    this.initfn(val[0], val[1], 'leaderWeek');
                }
            },
        },
        // week(val) {
        //   if (this.showType != "week") return;
        //   //let tempArr = val.filter(item => item.isToday);
        //   //if (tempArr.length && this.currentTab.getDataType == 'day') return;
        //   this.initfn(val[0].date, val[6].date);
        // },
        // month(val) {
        //   if (this.showType != "month") return;
        //   // let flag = false;
        //   // val.forEach(item => {
        //   // 	item.forEach(itm => {
        //   // 		if (itm.isToday) {
        //   // 		flag = true;
        //   // 		}
        //   // 	})
        //   // })
        //   // if (flag && this.currentTab.getDataType == 'day') return;
        //   this.initfn(val[0][0].date, val[val.length - 1][6].date);
        // },
        dateRange(val) {
            if (this.showType == "week") {
                this.initfn(val[0].date, val[6].date)
            } else {
                let tempdate = moment(dsf.date.format(new Date(this.curyear, this.curmonth, 1), "yyyy-mm-dd"))
                this.initfn(tempdate.startOf('month').format("YYYY-MM-DD"), tempdate.endOf('month').format("YYYY-MM-DD"))
            }
        },
        showType(val) {
            // if (val == 'week') {
            // 	this.initfn(this.week[0].date, this.week[6].date);
            // } else {
            // 	this.initfn(this.month[0][0].date, this.month[this.month.length - 1][6].date);
            // }
        },
    },
    activated() {
        /* if (this.selectedDate) {
          this.initfn(this.week[0].date, this.week[6].date);
        } else {
          this.initfn(this.selectedDate);
        } */
    },
    created() {
        // console.log('this.currentTab', this.currentTab)
        // console.log(this.month)
        // 事件总线的日程刷新事件监听
        this.$eventBus.OnRefreshSchedule(this, () => {
            if (!this.selectedDate) {
                this.initfn(this.week[0].date, this.week[6].date);
            } else {
                this.initfn(this.selectedDate);
            }
        });
        console.log(8465444);
    },
    methods: {
        onLoad(isrefresh) {
            // if (!isrefresh) {
            //   this.pageConfig.pageNum++;
            //   this.initfn(this.week[0].date, this.week[6].date, true);
            // } else {
            //   this.initfn(this.keyword, false);
            // }
        },
        goForm(item) {
            //目前只支持进入个人日程表单
            if (item.moduleId != "180719094152MnF6C2hEPtqIvhjJIxo") return;
            console.log(item);
            if (item.sourceModuleId) {
                this.$router.push({


                    // name: "commonForm",
                    // params: {
                    // //     pk: item.agendaId || item.id || item.pk,
                    //     moduleId: item.sourceModuleId,
                    //      listId: item.listId,
                    //     method: item.method,
                    //     type:item.type,
                    //     validateByList:item.validateByList
                    // },
                    path: `/commonForm/${item.sourceModuleId}/${item.sourceInfoId}`,
                    query: {
                        listId: item.listId,
                        method: item.method,
                        type: item.type,
                        validateByList: item.validateByList
                    },


                });
                console.log(item.validateByList);

            }
            else if (item.agendaId || item.id || item.pk) {
                if (this.currentTab.params && this.currentTab.params.type == 'personal') {
                    this.$router.push({
                        name: "commonForm",
                        params: {
                            pk: item.agendaId || item.id || item.pk,
                            moduleId: item.moduleId,
                        },
                    });
                } else {
                    this.$router.push({
                        path: `/commonForm/${item.moduleId}/${item.agendaId || item.id || item.pk}`,
                        query: {
                            method: 'info',
                            listId: '1807311741357weRO9ArLPr1orXgSB8',
                        },
                    });
                }
            }
        },
        initfn(sdate, edate, scrollType) {
            // 当月和当周 只获取当天之后的数据
            //无需此逻辑  直接读取本月或本周数据，不然页面显示会有bug
            //一下代码先放开，不然查询日程会把过期的日程查询出来，平台后期整体改造 2023年3月3日
            if ((this.showType == 'week' && sdate == moment().startOf('week').add(1, 'd').format("YYYY-MM-DD")) ||
                (this.showType == 'month' && sdate == moment().startOf('month').format("YYYY-MM-DD"))) {
                if (sdate != edate &&!dsf.config.homePage.schedule?.allWeekOrMonth) {//当时间不相等时才触发该规则，因为点击某一天查询的时候时间相等所以不走此逻辑
                    sdate = moment().format("YYYY-MM-DD")
                }
            }
            //console.log(moment().startOf('month').format("YYYY-MM-DD"))
            if (!edate) {
                edate = sdate
            }
            this.$user ? "" : (this.$user = dsf.util.loadLocalStore("user"));
            if (!this.$user && !dsf.util.loadSessionStore("user")) {
                this.dsf.layer.toast("用户丢了, 快去登录");
                return;
            }
            if (!sdate && !edate) {
                return;
            }
            //console.log(this.$user)
            let param = {};
            if (this.currentTab.type == "leader" || (this.currentTab.params && this.currentTab.params.type == "other")) {
                param = {
                    sdate: sdate,
                    edate: edate,
                    leaderIds: this.selectLeaderList.join(","),
                };
            } else {
                param = {
                    sdate: sdate,
                    edate: edate,
                    unitId: this.$user.unitId,
                    requestEnv: "mobile",
                    MODULE_ID: this.currentTab.params.MODULE_ID,
                    type: this.currentTab.params.type,
                    leaderId: 0,
                    dept: "",
                };
            }
            this.loadData(param, scrollType);
        },
        loadData(param, scrollType) {
            this.list = [];
            this.loading = true;
            this.finished = false;
            //console.log(param);
            let url = this.currentTab.url;
            if (this.currentTab.type == "leader") {
                // 选择人员的日程
                url = this.currentTab.dataUrl;
                param.userIds = param.leaderIds;
                // param.sdate = moment(new Date()).format("YYYY-MM-DD");
                // param.edate = moment(new Date()).add(7, "days").format("YYYY-MM-DD");
                this.list = [];
                this.getData(url, param, scrollType)
            } else if (this.currentTab.params && this.currentTab.params.type == "other") {
                // 他人日程中根据日期查询所有人员
                url = this.currentTab.url;
                param.userIds = param.leaderIds;
                this.list = [];
                this.getData(url, param, scrollType)
            } else {
                this.getData(url, param, scrollType)
            }
        },
        getData(url, param, scrollType) {
            return dsf.http.post(url, param)
                .then(args => {
                    if (args.data.type === "success") {
                        const data = args.data.data;
                        let hasSch = [];
                        this.list = [];
                        data.forEach((item) => {
                            if (item.schedule && item.schedule.length > 0) {
                                let arr = []
                                hasSch.push(item.date);
                                item.schedule.map((sch) => {
                                    sch.date = moment(item.date).format("MM-DD");
                                    sch.sdate = item.date;
                                    sch.edate = item.date;
                                });
                                if (this.currentTab.params && this.currentTab.params.type == 'leader') {
                                    arr = groupBy(item.schedule, function (val) {
                                        return val.attendant
                                    })
                                } else {
                                    arr = groupBy(item.schedule, function (val) {
                                        return val.userName
                                    })
                                }
                                if (this.isWeekOrMonth() && this.selectedDate) {
                                    /* let arr = item.schedule.filter(
                                        (today) => today.sdate == this.selectedDate
                                    );
                                    self.list.push(...arr); */
                                    this.list.push(...Object.values(arr));

                                } else {
                                    this.list.push(...Object.values(arr));
                                }
                                //console.log('tag', self.list.length);
                            }
                        });
                        if (param.sdate !== param.edate && this.currentTab.type == 'date') {
                            this.$emit("update:hasSch", hasSch);
                        }
                        this.refreshing = false;
                        this.finished = true;
                        this.loading = false;
                        setTimeout(() => {
                            if (scrollType == "leaderWeek") {
                                window.scroll(0, document.getElementById('select-leader').offsetHeight)
                            } else if (this.currentTab.type == "date") {
                                window.scroll(0, 0)
                            }
                        }, 50)
                    } else {
                        this.finished = true;
                        this.dsf.layer.toast("数据请求失败，请稍后再试");
                    }
                })
                .catch((error) => {
                    this.finished = true;
                    console.log(`接口请求失败 错误码:${error}`);
                })
                .always(() => {
                    this.refreshing = false;
                    this.loading = false;
                    if (this.list.length == 0) {
                        this.screenHeight = document.documentElement.clientHeight - 180;
                    }
                });
        },
        isWeekOrMonth() {
            let flag = false;
            if (this.showType == "week") {
                let tempArr = this.week.filter((item) => item.isToday);
                if (tempArr.length && this.currentTab.getDataType == "day") {
                    flag = true;
                }
            } else {
                this.month.forEach((item) => {
                    item.forEach((itm) => {
                        if (itm.isToday) {
                            flag = true;
                        }
                    });
                });
            }
            return flag;
        },
        transTemplate(str, dataObj) {
            return dsf.util.getReplaceUrl(str, dataObj);
        }
    },
};
</script>

