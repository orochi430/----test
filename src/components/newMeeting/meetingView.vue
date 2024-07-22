<template>
<div class="reserve-meeting" :style="{ 'top': dsf.util.getOffsetTop() }">
    <van-tabs v-model="active">
        <van-tab title="周查看">
            <div class="tabWrap">
                <time-picker @onConfirm="onConfirm" :able="true" @showSearchAction="showSearchAction"></time-picker>
                <div class="_contents" v-if="meetingData.length > 0" :style="{ height: `calc(100vh - 200px - ${$store.state.isShowAppHeader ? '0.92rem' : ''} ` }">
                    <div v-for="item in meetingData" :key="item.id" class="_content">
                        <div class="_item">
                            <div class="_right" @click="imageClick(item)">
                                <van-image :src="item.images | urlFilter" fit="cover" lazy-load>
                                    <template v-slot:error>
                                        <img src="../../assets/imgs/meetingRoom.jpg" />
                                    </template>
                                </van-image>
                            </div>
                            <div class="_left">
                                <div class="_title ds_font4">
                                    {{ item.bame }} {{ item.name }}
                                    <span v-if="item.number" class="num-span">{{ item.number }}</span>
                                </div>
                                <div class="_shebei ds_font6" v-if="item.resource">
                                    <div v-for="res in item.resource.split(',')" :key="res">{{ res }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="time-process">
                            <ul>
                                <li v-for="(ele, i) in item.monthDayArr" :key="i">
                                    <div class="process-box" @click.stop="goList(item, i)">
                                        <div class="process-top" :class="{ '__0': item.occupyArr[i].find(occ => occ.morning) || item.lockArr[i].find(occ => occ.morning) }">
                                        </div>
                                        <div class="process-bottom" :class="{ '__0': item.occupyArr[i].find(occ => occ.afternoon) || item.lockArr[i].find(occ => occ.afternoon) }">
                                        </div>
                                        <div class="span">
                                            <span>{{ item.weekArr[i] }}</span>
                                            <span>{{ ele }}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <commonempty v-if="!meetingData.length"></commonempty>
            </div>

        </van-tab>
        <van-tab title="日查看">
            <div class="tabWrap">
                <time-picker @onConfirm="onConfirm" :able="false" @showSearchAction="showSearchAction"></time-picker>
                <div class="_contents" v-if="ListData.length > 0" :style="{ height: `calc(100vh - 200px - ${$store.state.isShowAppHeader ? '0.92rem' : ''} ` }">
                    <div v-for="item in ListData" :key="item.id">
                        <div class="com-tit">
                            <span>{{ item.name }}</span>
                            <van-switch v-model="item.checked" size="20px" />
                        </div>
                        <ul class="list-ul" v-show="item.checked">
                            <li v-for="(el, index) in item.occupydate" :key="index">
                                <p>{{ el.bt }}</p>
                                <div>
                                    <span><i class="icon iconfont iconren"></i><label>{{ el.createName }}</label></span>
                                    <span><i class="icon iconfont iconshijian"></i><label>{{ el.timeFormat }}</label></span>
                                    <span v-if="el.mobile"><i class="icon iconfont iconshouji"></i><label @click="goMobile(el.mobile)">{{ el.mobile }}</label></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <commonempty v-if="!ListData.length"></commonempty>
            </div>
        </van-tab>
    </van-tabs>
    <!-- 显示会议信息 -->
    <van-popup class="class-popup" v-model="showList" position="bottom" :style="{ height: '100%' }">
        <div class="in-box" v-if="showList">
            <div class="back" v-if="showAppTopMenu">
                <div @click="back()">
                    <van-icon name="arrow-left" />
                    <span>返回</span>
                </div>
                <span>会议信息</span>
            </div>
            <div class="content" :class="{ 'noMenu': !showAppTopMenu }">
                <default-list :params="occList"></default-list>
            </div>
        </div>
    </van-popup>
    <van-action-sheet v-model="showFilter" class="searchSheet" position="bottom" round>
        <van-nav-bar title="筛选" />
        <div class="sheetBox flex1">
            <div class="itemSheet">
                <p>会议室</p>
                <van-field v-model="locFilter" placeholder="请输入会议室" />
            </div>
            <div class="itemSheet" v-if="active == '1'">
                <p>会议名称</p>
                <van-field v-model="nameFilter" placeholder="请输入会议名称" />
            </div>
        </div>
        <div class="btnBox disfr jsb">
            <van-button class="flex1" @click="returnFilter">清空</van-button>
            <van-button class="flex1" type="info" @click="filterConfirm">确定</van-button>
        </div>
    </van-action-sheet>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import util from "../../common/util";
import dsfFab from "@/components/dsfFab/dsfFab";
import timePicker from "./timePick.vue";
import controlTextBox from "@/components/commonForm/controls/controlTextBox";
import {
    Slider
} from "vant";
import Vue from "vue";
import dsf from "../../common";
import {
    ImagePreview
} from "vant";
Vue.use(Slider);
export default {
    name: "meetingView",
    components: {
        dsfFab,
        timePicker,
        controlTextBox
    },
    filters: {
        emptyFilter(str, tips) {
            if (str && str.length > 0) {
                return str;
            }
            return tips;
        },
        urlFilter(str) {
            return str.indexOf("ctrl/") > -1 || str.indexOf("fn/") > -1 ?
                dsf.config.assetsRoot + str :
                dsf.url.getServerUrl("/fn/file/downloadImage?fileName=" + str);
        },
    },
    data() {
        let now = new Date();
        console.log(now);
        console.log(now.toISOString().slice(0, 10));
        return {
            active: 0,
            meetingData: [],
            ListData: [],
            moduleId: dsf.config.meetingConfig.reserveModuleId,
            reserveMeeting: dsf.config.meetingConfig.reserveMeeting,
            showAppTopMenu: dsf.config.appTopMenu.value,
            showFilter: false,
            starDate: dsf.date.format(new Date(), "yyyy-mm-dd"),
            endDate: now.toISOString().slice(0, 10),
            nameFilter: '',
            locFilter: '',
            showList: false,
            occList: {
                listId: "2401241430018GcJm52Bgn8KJ9RMUOl",
                moduleId: "21070914173377CK6e9OttviLpv0zaN",
                name: "会议信息",
                params: {
                    moduleId: "21070914173377CK6e9OttviLpv0zaN",
                    listId: "2401241430018GcJm52Bgn8KJ9RMUOl",
                    roomId: '',
                    startTime: '',
                    endTime: '',
                },
            },
        };
    },
    computed: {
        ...mapState({
            isShowAppFooter: (state) => state.isShowAppFooter,
            isShowAppHeader: (state) => state.isShowAppHeader,
        }),
    },
    watch: {
        active(val) {
            this.nameFilter = ''
            this.locFilter = ''
        },
    },
    beforeCreate() {
        this.$options.components.DefaultList =
            require("../documentCenter/DefaultList.vue").default;
    },
    created() {},
    mounted() {},
    activated() {},
    methods: {
        showSearchAction() {
            this.showFilter = true;
        },
        filterConfirm() {
            this.showFilter = false;
            this.getData()
        },
        returnFilter() {
            this.nameFilter = ''
            this.locFilter = ''
        },
        onConfirm(date, end) {
            this.starDate = dsf.date.format(date, "yyyy-mm-dd");
            this.endDate = dsf.date.format(end, "yyyy-mm-dd");
            this.getData()
        },
        goMobile(str) {
            return
            window.location.href = `tel:${str}`
        },
        imageClick(data) {
            let images = [];
            if (!data.images) return;
            images.push(
                dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${data.images}`)
            );
            ImagePreview({
                images: images,
                startPosition: 0,
            });
        },
        goList(data, i) {
            if (data.occupyArr[i].length > 0) {
                let nowTime = moment(data.startDate.substr(0, 10)).add(i, 'days').format('YYYY-MM-DD')
                this.occList.params.roomId = data.id
                this.occList.params.startTime = nowTime + ' 00:00:00'
                this.occList.params.endTime = nowTime + ' 23:59:59'
                this.showList = true;
                this.$emit("closeCallback", "");
            } else if (data.lockArr[i].length > 0) {
                dsf.layer.toast("锁定原因：" + data.lockArr[i][0].lockReason || '');
            }
        },
        getData() {
            if (this.active == '0' && !this.endDate) {
                return
            }
            if (this.active == '0' && this.endDate) {
                this.meetingData = [];
            }
            dsf.http
                .post("fn/meeting/meetingRoomJTwoVersion", {
                    viewType: this.active == '0' ? '1' : '2', // 1周查看,2日查看
                    startDate: this.starDate,
                    endDate: this.active == '0' ? this.endDate : '',
                    hydd: this.locFilter,
                    hymc: this.nameFilter,
                })
                .then((res) => {
                    this.returnFilter()
                    if (res.data.code == 200) {
                        if (this.active == '0') {
                            this.meetingData = res.data.data
                            this.meetingData.forEach(ele => {
                                ele['occupyArr'] = new Array();
                                ele['lockArr'] = new Array();
                                for (let i = 0; i < 7; i++) {
                                    ele['occupyArr'].push([])
                                    ele['lockArr'].push([])
                                }
                                if (ele.occupydate.length > 0) {
                                    ele.occupydate.forEach(it => {
                                        let hour1 = it.starttime.substr(11, 2)
                                        let hour2 = it.endtime.substr(11, 2)
                                        if (hour1 < 12) {
                                            if (hour2 < 12 || hour2 == 12) {
                                                this.$set(it, 'morning', true)
                                                this.$set(it, 'afternoon', false)
                                            } else {
                                                this.$set(it, 'morning', true)
                                                this.$set(it, 'afternoon', true)
                                            }
                                        } else {
                                            this.$set(it, 'morning', false)
                                            this.$set(it, 'afternoon', true)
                                        }
                                        this.$set(it, 'timePicker', [it.starttime.substr(5, 5), it.endtime.substr(5, 5)])
                                    })
                                }
                                if (ele.lockdate.length > 0) {
                                    ele.lockdate.forEach(it => {
                                        let hour1 = it.starttime.substr(11, 2)
                                        let hour2 = it.endtime.substr(11, 2)
                                        if (hour1 < 12) {
                                            if (hour2 < 12 || hour2 == 12) {
                                                this.$set(it, 'morning', true)
                                                this.$set(it, 'afternoon', false)
                                            } else {
                                                this.$set(it, 'morning', true)
                                                this.$set(it, 'afternoon', true)
                                            }
                                        } else {
                                            this.$set(it, 'morning', false)
                                            this.$set(it, 'afternoon', true)
                                        }
                                        this.$set(it, 'lockdatePicker', [it.starttime.substr(5, 5), it.endtime.substr(5, 5)])
                                    })
                                }
                                ele.monthDayArr.forEach((it, i) => {
                                    let levTime = new Date(it)
                                    if (ele.occupydate.length > 0) {
                                        ele.occupydate.forEach(occ => {
                                            let star = new Date(occ.timePicker[0])
                                            let end = new Date(occ.timePicker[1])
                                            if ((levTime.getTime() > star.getTime() || levTime.getTime() == star.getTime()) && (levTime.getTime() < end.getTime() || levTime.getTime() == end.getTime())) {
                                                ele.occupyArr[i].push(occ)
                                            }
                                        })
                                    }
                                    if (ele.lockdate.length > 0) {
                                        ele.lockdate.forEach(occ => {
                                            let star = new Date(occ.lockdatePicker[0])
                                            let end = new Date(occ.lockdatePicker[1])
                                            if ((levTime.getTime() > star.getTime() || levTime.getTime() == star.getTime()) && (levTime.getTime() < end.getTime() || levTime.getTime() == end.getTime())) {
                                                ele.lockArr[i].push(occ)
                                            }
                                        })
                                    }
                                })
                                // ele.monthDayArr.forEach((it, i) => {
                                //   ele.occupyArr[i] = new Array();
                                //   ele.occupydate.forEach(occ => {
                                //     let star = moment(occ.starttime).unix();
                                //     let end = moment(occ.endtime).unix();
                                //     if(star <= moment(it).unix() && end >= moment(it).unix()) {
                                //       ele.occupyArr[i].push(occ)
                                //     }
                                //   })
                                // })
                            })
                        } else {
                            this.ListData = res.data.data;
                            this.ListData = this.ListData.filter(el => {
                                this.$set(el, 'checked', false)
                                if (el.occupydate?.length > 0) {
                                    this.$set(el, 'checked', true)
                                    el.occupydate.forEach(occ => {
                                        occ['timeFormat'] = '';
                                        if (moment(occ.starttime).format("YYYY-MM-DD") != moment(occ.endtime).format("YYYY-MM-DD")) {
                                            occ['timeFormat'] = moment(occ.starttime).format("YYYY-MM-DD HH:mm ~ ") + moment(occ.endtime).format("YYYY-MM-DD HH:mm");
                                        } else {
                                            occ['timeFormat'] = moment(occ.starttime).format("YYYY-MM-DD HH:mm-") + moment(occ.endtime).format("HH:mm");
                                        }
                                    })
                                    return el
                                }
                            })
                        }
                    }
                });
        },
        back() {
            this.showList = false;
            this.$emit("closeCallback", "");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.reserve-meeting {
    display: flex;
    flex-direction: column;
    flex-flow: column;
    width: 100%;
    @include font_4();
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    /deep/ .van-tabs{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .van-tabs__wrap{
            flex-shrink: 0;
        }
        .van-tabs__content{
            flex: 1;
            overflow: hidden;
            box-sizing: border-box;
            .van-tab__pane{
                width: 100%;
                height: 100%;
                overflow: hidden;
                .tabWrap{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    .leaderDuty{
                        flex-shrink: 0;
                    }
                    ._contents{
                        flex: 1;
                        overflow-y: auto;
                        padding-bottom: 20px;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }
    ._time {
        height: 50px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        position: relative;

        z-index: 100;

        i {
            margin-right: 5px;
        }

        span {
            color: $fontColor_main;
        }

        .filter {
            margin-right: 0.32rem;
        }
    }

    ._contents {
        flex: 1;
        overflow-y: auto;
        padding: 0 11px;
        background: #f4f4f4;

        // height: calc(100vh - 250px);
        ._content {
            position: relative;
            box-sizing: border-box;
            margin-top: 15px;
            padding: 15px 10px 10px;
            display: flex;
            flex-flow: column;
            background: #ffffff;
            border: 1px solid rgba(230, 230, 230, 1);
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
            border-radius: 3px;

            ._item {
                display: flex;
                justify-content: space-between;
                min-height: 100px;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(213, 213, 213, 0.78);

                ._left {
                    flex: 1;

                    ._title {
                        font-size: var(--font_size_1);
                        color: #333333;
                        margin-right: 5px;
                        font-weight: bold;

                        span {
                            position: absolute;
                            top: 0;
                            right: -1px;
                            display: inline-block;
                            width: 64px;
                            height: 24px;
                            border-radius: 3px;
                            padding-left: 40px;
                            font-size: var(--font_size_4);
                            color: #4a74c2;
                            font-weight: bold;
                            line-height: 24px;
                            background: url("../../assets/imgs/roomnum.png") no-repeat;
                            background-size: 100% 100%;
                            box-sizing: border-box;
                        }
                    }

                    ._shebei {
                        margin: 10px 0;
                        color: #666666;
                        display: flex;
                        flex-wrap: wrap;

                        div {
                            height: 22px;
                            padding: 0 7px;
                            margin: 0 5px 5px 0;
                            font-size: 13px;
                            color: #333333;
                            text-align: center;
                            line-height: 22px;
                            background: #ffffff;
                            border: 1px solid rgba(151, 151, 151, 0.35);
                            border-radius: 12px;

                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }

                    ._num {
                        display: flex;
                        align-items: center;
                        margin-bottom: 19px;

                        span {
                            color: #666666;
                            margin-left: 5px;
                        }
                    }
                }

                ._right {
                    width: 110px;
                    height: 82px;
                    margin-right: 7px;

                    .van-image {
                        border-radius: 5px;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                }
            }
        }
    }

    .time-process {
        width: 100%;
        box-sizing: border-box;
        height: 44px;
        // margin: 15px 0;
        position: relative;

        ul {
            width: 100%;
            height: 100%;
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            &::-webkit-scrollbar-thumb {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #065465;
            }

            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
            }

            li {
                margin-right: 10px;
                width: 50px;
                height: 44px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                background: #fff;
                border-radius: 3px;

                .process-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 50px;
                    height: 100%;
                    border-radius: 3px;
                    overflow: hidden;

                    .span {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-size: var(--font_size_3);
                        color: rgba(51, 51, 51, 0.5);
                        font-weight: bold;
                        z-index: 10;

                        span {
                            font-size: var(--font_size_3);
                            color: #666;

                            &:first-child {
                                font-weight: bold;
                            }
                        }
                    }

                    .process-top {
                        width: 50%;
                        height: 100%;
                        border-radius: 3px 0 0 3px;
                        border: 1px solid #e8e8e8;
                        border-right: none !important;
                    }

                    .process-bottom {
                        width: 50%;
                        height: 100%;
                        border-radius: 0 3px 3px 0;
                        border: 1px solid #e8e8e8;
                        border-left: none !important;
                    }

                    div {
                        &.__0 {
                            // 被占用2
                            background-color: #e8e8e8;
                            border: none;
                        }
                    }
                }
            }
        }
    }

    /*._status{
    @include font_6();
    color: #666;
    &-item{
      line-height: 1.4em;
      margin-bottom: 0.5em;
    }
  }*/
    ::v-deep .van-dropdown-menu__bar {
        box-shadow: none;
    }

}

.searchSheet {
    height: auto;

    .van-nav-bar {
        border-bottom: 5px solid #f1f2f4;
    }

    .disfr {
        display: flex;
    }

    .flex1 {
        flex: 1;
    }

    .jsb {
        justify-content: space-between;
    }

    .sheetBox {
        padding: 15px;
        font-size: var(--font_size_3);

        .itemSheet {
            display: flex;
            flex-direction: column;
            font-size: var(--font_size_2);
        }

        ::v-deep .van-cell {
            padding: 0.2rem 0;
        }

        ::v-deep .van-field__body {
            border-radius: 5px;
            overflow: hidden;
        }

        ::v-deep .van-field__control {
            height: 36px;
            border: 1px solid #ebedf0;
            border-radius: 2px;
            padding-left: 10px;
        }
    }

    .btnBox {
        padding: 15px;

        button {
            margin: 0 6px;
        }
    }
}

::v-deep .van-action-sheet__content {
    display: flex;
    flex-direction: column;

    .van-cell::after {
        border: none;
    }
}

::v-deep .van-field__left-icon {
    display: flex;
    align-items: center;

    .van-icon-search {
        font-size: var(--font_size_2);
    }
}

.com-tit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;

    span {
        position: relative;
        /* padding-left: 5px; */
        font-weight: bold;
        display: flex;
        align-items: center;

        &::before {
            content: '';
            /* position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%); */
            width: 5px;
            height: 15px;
            background: #0086D9;
            margin-right: 5px;
        }
    }
}

.list-ul {
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;

    li {
        padding: 10px 10px 0;
        font-size: var(--font_size_3);

        p {
            padding: 5px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &:last-child {
            div {
                border: 0;
            }
        }

        div {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding-right: 10px;
            border-bottom: 1px solid #E6E6E6;

            span {
                display: flex;
                align-items: center;
                padding: 8px 0;
                width: 50%;

                label {
                    margin-left: 3px;
                    font-size: var(--font_size_4);
                    color: #666;
                }
            }
        }

    }
}

.in-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5000 !important;
    overflow: hidden;
}

.back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #fff;

    >div {
        position: absolute;
        top: 15px;
        left: 14px;
        display: flex;
        align-items: center;

        .van-icon {
            @include font-theme("normal");
            @include font_5;
            margin-right: 3px;
        }

        >span {
            @include font-theme("normal");
            @include font_5;
        }
    }

    >span {
        color: #323233;
        font-weight: 500;
        font-size: var(--font_size_2);
    }
}

.content {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    /* transform: translate(0, -50%); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 250px;
    background: #fff;
    overflow: auto;

    &.noMenu {
        top: 0 !important;
    }

    .ds-signinlist {
        width: 100%;

        .van-pull-refresh {
            height: calc(100% - 54px) !important;
        }
    }
}
</style>
