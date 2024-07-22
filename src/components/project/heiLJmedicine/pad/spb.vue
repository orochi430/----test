<template>
    <div class="spb">
        <div class="contain">       
            <div class="top">
                <img src="../../../../../static/images/hljMedicine/bz4.png" alt="" srcset="">
            </div>
            <div class="con"  v-show="callState==0">
             <div class="zsy">
                   <div class="yb">
                    <div class=hlj v-for="(item,index) in citydata.top" :key="index" @click="callClick(item)">
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="city" v-for="(item,index) in citydata.middle" :key="index">
                    <div class="cs" v-for="(ele,index1) in item" :key="index1" @click="callClick(ele)">
                        <span>{{ele.name}}</span>
                    </div>
                </div>
                <div class="area">
                    <div class=dq v-for="(item,index) in citydata.foot" :key="index" @click="callClick(item)">
                        <span>{{item.name}}</span>
                    </div>
                </div>
             </div>
              
            </div>
            <div class="pj" v-show="callState==3">
                <div class="back">
                    <p>请为坐席服务做出评价</p>
                    <div class="nr">
                        <div class="nr_con">
                            <span class="list">单选列表项</span>
                            <div class="first">
                                <span class="very">非常满意</span>
                                <van-rate v-model="star.value1" allow-half void-icon="star" void-color="#eee"
                                    color="#ffb433" />
                                <!-- <img src="../../../../../static/images/hljMedicine/dh.png" alt=""> -->
                            </div>
                            <div class="first second">
                                <span class="very my">满</span><span class="not">意</span>
                                <van-rate v-model="star.value2" allow-half void-icon="star" void-color="#eee"
                                    color="#ffb433" />
                            </div>
                            <div class="first second">
                                <span class="very jbmy">基本满</span><span class="not">意</span>
                                <van-rate v-model="star.value3" allow-half void-icon="star" void-color="#eee"
                                    color="#ffb433" />
                            </div>
                            <div class="first second">
                                <span class="very bmy">不满</span><span class="not">意</span>
                                <van-rate v-model="star.value4" allow-half void-icon="star" void-color="#eee"
                                    color="#ffb433" />
                            </div>
                            <div class="first second">
                                <span class="very fcbmy">非常不满</span><span class="not">意</span>
                                <van-rate v-model="star.value5" allow-half void-icon="star" void-color="#eee"
                                    color="#ffb433" />
                            </div>
                            <div class="sub">
                                <div class="sub1" @click="noSubmit">
                                    <button class="btn">暂不评价</button>
                                </div>
                                <div class="sub2" @click="submit">
                                    <button class="btn">提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <call v-if="callState==1" @changeState="changeState"></call>
        <spth v-if="callState==2" @changeState="changeState"></spth>
    </div>
</template>

<script>
import call from '@/components/project/heiLJmedicine/pad/call.vue'
import spth from '@/components/project/heiLJmedicine/pad/spth.vue'
import sipJs from '@/components/project/heiLJmedicine/pad/sip.js'
export default {
    name: 'spb',
    components: {
        call,
        spth
    },
    data() {
        return {
            citydata: {},
            callState: 0,//0未拨打，1已拨打，2已接通，3已挂断
            value: 2.5,
            star: {
                value1: 0,
                value2: 0,
                value3: 0,
                value4: 0,
                value5: 0,
            },
            sipJs: sipJs,
            callNum: ""
        }
    },
    created() {
        let self = this
        self.citydata = dsf.config.hlj.citydata
        function isInclude(name) {
            var js = /js$/i.test(name);
            var es = document.getElementsByTagName(js ? 'script' : 'link');
            for (var i = 0; i < es.length; i++)
                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
            return false;
        }
        if (!isInclude("jssip.min.js")) {
            dsf.loadJs('static/js/heilongjiang/jcinvccbar-pure.min.js').then(() => {
                dsf.loadJs('static/js/heilongjiang/jssip.min.js').then(() => {
                    self.initSetting()
                })
            })
        } else {
            self.initSetting()
        }

    },
    methods: {
        noSubmit() {
            this.callState = 0
        },
        submit() {
            let self = this
            self.callState = 0
            // dsf.http.post("", {}).then((res) => {
            //     if (res.data.data.code = 200) {
            //         dsf.layer.toast("提交成功", () => {
            //             self.callState = 0
            //         })
            //     }
            // })
        },
        doCall() {
            this.sipJs.funDocall(this.callNum)
        },
        initSetting() {
            console.log(this.sipJs)
            this.sipJs.sipConfig = dsf.config.hlj.sipConfig
            let self = this
            let onConnected = () => {
                self.sipJs.SetSipCallStatus(SipCallSence.SIPCALL_CONNECTED);
                self.sipJs.DisplayStatus("呼叫接通1");
                self.callState = 2
            }
            let onDisConnected = () => {
                self.sipJs.DisplayStatus("呼叫结束1");
                self.sipJs.SetSipCallStatus(SipCallSence.SIPCALL_IDLE);
                // self.callState = self.callState == 2 ? 3 : 0
                self.callState = 0
            }
            this.sipJs.funDoRegister(onConnected, onDisConnected)//自动注册sip
        },
        callClick(item) {
            // alert(item.num)
            this.callNum = item.num
            if (item.num.length) {
                this.callState = 1
            }
            this.doCall()
        },
        changeState(state) {
            this.callState = state

            this.sipJs.funDisconnect()//取消
        }

    },
    beforeRouteLeave(to, from, next) {
        this.sipJs.funDoRegister()//离开页面时注销
        next();
    },
}
</script>

<style lang="scss" scoped>
.spb {
    position: fixed;
    z-index: 99;
    overflow: hidden;
    background: url('../../../../../static/images/hljMedicine/bg-close.png') no-repeat;
    background-size: 100% 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .contain {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding:2%;

        .top {
            height:8%;

            img {
                height:40px;
                width: auto;
            }
        }
       
        .con {
            width: 100%;
            box-sizing: border-box;
            height: calc(100vh - 80px);
            margin-top:1%;
            background: url('../../../../../static/images/hljMedicine/bg.png') no-repeat;
            background-size: 100% 100%;
            padding-top:4%;
            .zsy{
                width:100%;
                height:100%;
                .yb {
                height:18%;
                max-height:220px;
                box-sizing: border-box;
                padding: 0 9%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom:4%;

                .hlj {
                     width:32%;
                     height:100%;
                    background: rgba(77, 155, 207, 0.8);
                    border-radius: 16px;
                    text-align: center;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                    span {
                        font-size: 21.5px;
                        font-weight: bold;
                        color: #FFFFFF;
                    }
                }
            }

            .city {
                height:15%;
                max-height:180px;
                box-sizing: border-box;
                padding: 0 11%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom:2%;

                .cs {
                   width:22%;
                   height:100%;
                    background: rgba(77, 155, 207, 0.8);
                    border-radius: 16px;
                    text-align: center;
                       display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                    span {
                        font-family: AlibabaPuHuiTi-Bold;
                        font-size: 21.5px;
                        font-weight: bold;
                        color: #FFFFFF;
                    }
                }
            }

            .area {
                height:15%;
                max-height:180px;
                display: flex;
                align-items: center;
                justify-content: center;

                .dq {
                     width:22%;
                     height:100%;
                    background: rgba(77, 155, 207, 0.8);
                    border-radius: 16px;
                    text-align: center;
                        display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                    span {
                        font-family: AlibabaPuHuiTi-Bold;
                        font-size: 21.5px;
                        font-weight: bold;
                        color: #FFFFFF;
                    }
                }
            }
            }
            
        }

        .pj {
            width: 100%;
            box-sizing: border-box;
            height: calc(100vh - 100px);
            margin-top: 20px;
            background: url('../../../../../static/images/hljMedicine/bg.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .back {
                width: 508px;
                background-image: linear-gradient(192deg, #FFFFFF 62%, #C8E7FF 100%);
                box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.07);
                border-radius: 32px;

                p {
                    display: block;
                    height: 81px;
                    text-align: center;
                    line-height: 85px;
                    font-size: 25px;
                    font-weight: bold;
                    color: #333333;
                }

                .nr {
                    box-sizing: border-box;
                    padding: 0 55px;

                    .nr_con {
                        width: 100%;
                        border-top: 1px solid rgb(234, 234, 234);
                        margin-bottom: 20px;

                        .list {
                            display: block;
                            font-size: 18px;
                            color: #666666;
                            margin-bottom: 18px;
                            box-sizing: border-box;
                            padding-top: 8px;
                        }

                        .first {
                            height: 40px;
                            border-bottom: 1px solid rgb(234, 234, 234);
                            display: flex;
                            box-sizing: border-box;
                            padding-left: 50px;
                            margin-bottom: 8px;

                            .very {
                                height: 100%;
                                font-size: var(--font_size_2);
                                color: #666666;
                                letter-spacing: 12px;
                            }

                            img {
                                width: 25px;
                                height: 25px;
                                margin-left: 30px;

                            }
                        }

                        .second {
                            border-bottom: none;
                            height: 26px !important;
                            margin-bottom: 30px;

                            .my {
                                letter-spacing: 66px;
                                line-height: 26px;
                            }

                            .jbmy {
                                letter-spacing: 12px;
                                line-height: 26px;
                            }

                            .bmy {
                                letter-spacing: 25px;
                                line-height: 26px;
                            }

                            .fcbmy {
                                letter-spacing: 5px;
                                line-height: 26px;
                            }

                            .not {
                                font-size: 18px;
                                color: #666666;
                                letter-spacing: 9px;
                            }
                        }

                        .sub {
                            margin-top: 50px;
                            display: flex;
                            box-sizing: border-box;
                            padding-left: 30px;

                            .sub1 {
                                width: 140px;
                                height: 50px;
                                background: #BFC9D6;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                .btn {
                                    font-family: AlibabaPuHuiTi-Medium;
                                    font-size: 15px;
                                    color: #666666;
                                    letter-spacing: 0;
                                    background-color: #bfc9d6;
                                    text-align: center;
                                }
                            }

                            .sub2 {
                                width: 140px;
                                height: 50px;
                                background: #3E8BEC;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-left: 20px;

                                .btn {
                                    font-family: AlibabaPuHuiTi-Medium;
                                    font-size: 15px;
                                    color: #FFFFFF;
                                    letter-spacing: 0;
                                    text-align: center;
                                    background-color: #3e8bec;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}
</style>
