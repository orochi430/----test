<template>
<div>
    <van-sticky  :offset-top="dsf.util.getOffsetTop()" >
        <!-- <van-nav-bar title="本周" left-text="上一周" right-text="下一周" @click-left="onClickLeft" @click-right="onClickRight" /> -->
        <div data-v-6d90827a="" class="van-nav-bar van-hairline--bottom">
            <div class="van-nav-bar__content">
                <div class="van-nav-bar__left">
                    <span :class="{true:'van-nav-bar__text nav-bar-active',false:'van-nav-bar__text'}[navBtnActiveIndex==1]" @click="onClickLeft()">上一周</span>
                    </div>
                    <div :class="{true:'van-nav-bar__title van-ellipsis nav-bar-active',false:'van-nav-bar__title van-ellipsis'}[navBtnActiveIndex==0]"  @click="onClickCenter();">本周</div>
                    <div class="van-nav-bar__right">
                        <span :class="{true:'van-nav-bar__text nav-bar-active',false:'van-nav-bar__text'}[navBtnActiveIndex==2]" @click="onClickRight();">下一周</span>
                    </div>
            </div>
        </div>
    </van-sticky>
      <div class='time-line' v-for='(item,index) in timelineList' :key="index" :id="index+'_'+item.date">
        <div class='time-line-div'>
            <p class="time-line-date">{{item.dateshow}}</p>
            <p :class="item.istoday?'time-line-circular-active':'time-line-circular'" ref='circular'></p>
            <div class="rightContainer">
                <div class="line-inner-box">
                    <span :class="item.isweekend?'time-line-calendar-active':'time-line-calendar'">
                        <van-icon name="calendar-o" class="iconCalendar" /></span>
                    <span :class="item.isweekend?'time-line-title active':'time-line-title'">{{item.weekday}}</span>
                    <span class="time-line-rightline">
                        <hr />
                    </span>
                </div>
                <div class="time-line-content">
                    <div class="time-line-item">带班领导：{{item.title}}</div>
                    <div class="time-line-item">值班人员：{{item.content}}</div>
                </div>
            </div>
        </div>
        <div class='img-dotted' ref='dotted'></div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "weekDutyPlan",
    data() {
        return {
            navBtnActiveIndex:0,
            timelineList: [],
            weekType: "now",
            user: dsf.util.loadSessionStore("user"),
            begindate: "",
            enddate: "",
            dateNow: new Date()
        }
    },
    mounted() {
        //this.$refs.dotted.style.left = this.$refs.circular[0].offsetLeft - 12 + 'px'
    },
    created() {
        this.loadData()
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    methods: {
        getWeekay(d){
            var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            return weekday[d.getDay()];
        },
        loadData() {
            let that = this;
            let dateWeek = dsf.date.getMonthWeekDate(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());


            that.begindate = dsf.date.format(dateWeek.list[0].date, "yyyy-mm-dd")
            that.enddate = dsf.date.format(dateWeek.list[dateWeek.list.length - 1].date, "yyyy-mm-dd")
           //console.log('that.enddate',that.enddate);
            //参数userId - 值班人员ID,  weekType:  pre-上周，now-本周， next-下周
            let params = {
                //userId: that.user.user_id,
                // weekType: that.weekType
                begindate: that.begindate,
                enddate: that.enddate
            };
            that.timelineList = []
            //初始化一个星期的日期；
            let bdate=new Date(that.begindate);
            let edate=new Date(that.enddate);
            for (let i = bdate; i <=edate; i.setDate(bdate.getDate()+1)) {
                let datef=dsf.date.format(i, "yyyy-mm-dd");
                that.timelineList.push(
                    {
                        id: "",
                        date: datef,
                        dateshow: datef.substring(5),
                        title: "",
                        content:"",
                        weekday:that.getWeekay(i),
                        isweekend:that.getWeekay(i)=='星期六'||that.getWeekay(i)=='星期日',
                        istoday:false
                    })
                    //{date: dsf.date.format(i, "yyyy-mm-dd"),dateshow:dsf.date.format(i, "yyyy-mm-dd").substring(5)});
            }
            //return;
            dsf.http.post("/fn/sx/schedule/showSchedule", params).then(function (data) {
                data = data.data;
                if (data.code == "200") {
                    if (data.data.length) {
                        let todayObj=null
                        data.data.forEach((element,index) => {
                            if (element.istoday=="1"&&!todayObj) {
                                todayObj=element
                                todayObj.index=index
                            }
                            //console.log("element.istoday",element.istoday)
                            let tempData=that.timelineList.find(item=>item.date==element.start)
                            if (tempData) {
                                if(!tempData.id){
                                    tempData.id=element.id
                                    tempData.title=element.personType=="ld"?element.person:"",
                                    tempData.content=(element.personType=="zb")?element.person:"", //||element.personType=="fb" 只显示主班的信息
                                    tempData.istoday=element.istoday > 0
                                }else{
                                    switch (element.personType) {
                                        case "ld":
                                            tempData.title += (tempData.title.length?"、":"")+ element.person.replace(/,/g,"、")
                                            break;
                                        case "zb":
                                            tempData.content += (tempData.content.length?"、":"")+ element.person.replace(/,/g,"、")
                                            break;
                                        case "fb":
                                            break;
                                    }
                                }
                            }
                            // else{
                            //     that.timelineList.push({
                            //         id: element.id,
                            //         date: element.start,
                            //         dateshow: element.start.substring(5),
                            //         title: element.personType=="ld"?element.person:"",
                            //         content: (element.personType=="zb"||element.personType=="fb")?element.person:"",
                            //         weekday: element.weekDay,
                            //         isweekend:element.weekDay=='星期六'||element.weekDay=='星期日',
                            //         istoday: element.istoday > 0
                            //     });
                            // }
                        });
                        if (todayObj) {
                            that.$nextTick(function () {
                                document.getElementById(`${todayObj.index}_${todayObj.start}`).scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                });
                            })
                        }
                    } else {
                        dsf.layer.toast("暂无数据");
                    }
                } else {
                    dsf.layer.toast("获取数据失败！");
                }
            });
        },
        onClickLeft() {
            this.navBtnActiveIndex=1;
            this.dateNow = dsf.date.getBeforDate(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate(), 7)
            this.loadData()
        },
        onClickRight() {
            this.navBtnActiveIndex=2;
            this.dateNow = dsf.date.getBeforDate(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate(), -7)
            this.loadData()
        },
        onClickCenter(){
            this.navBtnActiveIndex=0;
            this.dateNow =new Date()
            this.loadData()
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep.van-nav-bar {
    background-color: whitesmoke !important;
    font-weight: bold;

    .van-nav-bar__title {
        color: #999999 ;
        font-weight: bold !important;
    }
    .nav-bar-active{
        color: #317ef3 !important;
    }
    .van-nav-bar__left {
        .van-nav-bar__text {
            color: #999999 ;
            font-weight: bold !important;
            font-size: var(--font_size_2);
        }
    }

    .van-nav-bar__right {
        .van-nav-bar__text {
            color: #999999 ;
            // color: #317ef3 !important;
            font-weight: bold !important;
            font-size: var(--font_size_2);
        }
    }
}

ul.timeline-wrapper {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* 时间线 */
.timeline-item {
    position: relative;

    .timeline-box {
        text-align: center;
        position: absolute;

        .out-circle {
            width: 16px;
            height: 16px;
            background: rgba(14, 116, 218, 0.1);
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            /*opacity: 0.1;*/
            border-radius: 50%;
            display: flex;
            align-items: center;

            .in-circle {
                width: 8px;
                height: 8px;
                margin: 0 auto;
                background: rgba(14, 116, 218, 1);
                border-radius: 50%;
                box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            }
        }

        .long-line {
            width: 2px;
            height: 98px;
            background: rgba(14, 116, 218, 1);
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            opacity: 0.1;
            margin-left: 8px;
        }
    }

    .timeline-content {
        box-sizing: border-box;
        margin-left: 20px;
        height: 106px;
        padding: 0 0 0 20px;
        text-align: left;
        margin-bottom: 30px;

        .timeline-title {
            font-size: var(--font_size_3);
            word-break: break-all;
            margin-bottom: 16px;
            color: #333;
            font-weight: 500;
            /*display: inline;*/
        }

        .timeline-date {
            font-size: var(--font_size_2);
            color: #333;
            font-weight: 500;
            margin-bottom: 16px;
        }

        .timeline-desc {
            font-size: var(--font_size_3);
            color: #999999;
        }
    }

}

.timeline-item:last-of-type .timeline-content {
    margin-bottom: 0;
}

//------------
.time h2 {
    color: #FF6600;
    margin: 20px auto 30px auto;
}

.time-line {
    position: relative;
    width: 100%;
    background: #ffffff;
    //margin:0 auto;
}

.time-line-div {
    // position:relative;
    // min-height:95px;
    display: -webkit-flex;
    /* Safari */
    display: flex;

    .time-line-date {
        padding: 10px 5px 5px 5px;
        width: 48px;
        font-weight: 600;
        font-style: oblique;
        text-align:center;
    }

    .time-line-circular {
        margin-top: 5px;
        width: 18px;
        height: 18px;
        border: 2px solid #d4d4d4;
        background: #ffffff;
        border-radius: 50%;
        z-index: 10;
    }

    .time-line-circular-active {
        margin-top: 5px;
        width: 18px;
        height: 18px;
        border: 2px solid #d4d4d4;
        background: #fffb00;
        border-radius: 50%;
        z-index: 10;
    }

    .time-line-content {
        width: 100%;
        font-weight: 500;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 5px;

        .time-line-item {
            line-height: 25px;
        }
    }

    .rightContainer {
        flex: 1;
        padding-left: 15px;

        .line-inner-box {
            display: -webkit-flex;
            /* Safari */
            display: flex;
            margin: 5px;

            // margin-left: 15px;
            .time-line-calendar {
                width: 35px;
                height: 30px;
                text-align: center;
                vertical-align: middle;
                padding-top: 5px;
                // padding-left: 5px;
                // padding-right: 5px;
                // padding-bottom: 5px;
                background: #317EF3;
                font-size: .4rem;
                color: #fff;
                border-radius: 50%;
            }

            .time-line-calendar-active {
                width: 35px;
                height: 30px;
                text-align: center;
                vertical-align: middle;
                padding-top: 5px;
                // padding-left: 5px;
                // padding-right: 5px;
                // padding-bottom: 5px;
                background: #ff0342;
                font-size: .4rem;
                color: #fff;
                border-radius: 50%;
            }

            .time-line-title {
                font-weight: bold;
                padding: 10px;
                color: #317EF3;
            }

            .active {
                color: #fd2648;
            }

            .time-line-rightline {
                width: 60%;

                hr {
                    width: 100%;
                    margin-top: 20px;
                    color: red;
                    background-color: #b5b5b5;
                    height: 1px;
                    size: 1px;
                    border: 0;
                }
            }
        }
    }
}

.img-dotted {
    position: absolute;
    top: 30px;
    width: 2px;
    height: 85%;
    background: rgba(14, 116, 218, 1);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    opacity: 0.1;
    margin-left: 68px;
}

.time-line-detail>p {
    margin-left: 30px;
    margin-bottom: 10px;
}
</style>
