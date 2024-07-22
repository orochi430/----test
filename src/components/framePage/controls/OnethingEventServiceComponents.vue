<template>
    <div class="onethingserveice">
        <div class="onethingserveice_title">一件事服务</div>
        <main>
            <div class="onethingserveice_firstline">
                <div class="left" v-for="(v, i) in oneThingServiceOne" :key="i + v.ttle" @click="skito(v)">
                    <div class="left_title">{{
                        v.title }}</div>
                    <div class="left_subtitle">{{ v.title2 }}</div>
                </div>
                <div class="firstline_right">
                    <div :class="i == 0 ? 'right1' : 'right2'" v-for="(v, i) in oneThingServiceTwo" :key="i"
                        @click="skito(v)">
                        <div class="left_title">{{
                            v.title }}</div>
                        <div class="left_subtitle">{{ v.title2 }}</div>
                    </div>
                    <!-- <div class="right right2">
                        <div class="left_title left_title2" :style="{ color: `${oneThingServiceTop.rightData.rightBottomData.color}` }">
                            {{
                                oneThingServiceTop.rightData.rightBottomData.title }}</div>
                        <div class="left_subtitle">{{ oneThingServiceTop.rightData.rightBottomData.subTitle }}</div>
                    </div> -->
                </div>
            </div>
            <div class="onethingserveice_secondline" v-for="(item, index) in oneThingServiceThree" :key="index">
                <div :class="index == 0 ? 'secondline1' : 'secondline2'" @click="skito(item)">
                    <div class="left_title">{{ item.title }}</div>
                    <div class="left_subtitle">{{ item.title2 }}</div>
                </div>
            </div>

        </main>
    </div>
</template>

<script>
export default {
    name: "OnethingEventServiceComponents",
    components: {},
    props: ['itemdata'],
    data() {
        return {
            oneThingServiceOne: [],
            oneThingServiceTwo: [],
            oneThingServiceThree: [],

        }
    },
    created() { },
    mounted() {
        console.log('this.itemdata: ', this.itemdata);
        if (this.itemdata?.params) {
            for (let l = this.itemdata.params.quickOptionList.length; l < 5; l++) {
                this.itemdata.params.quickOptionList.push({ title: '', title2: '' })
            }
            this.oneThingServiceOne = this.itemdata.params.quickOptionList.slice(0, 1)
            this.oneThingServiceTwo = this.itemdata.params.quickOptionList.slice(1, 3)
            this.oneThingServiceThree = this.itemdata.params.quickOptionList.slice(3)
        }
    },
    methods: {
        skito(v) {
            if (v?.url) {
                this.$router.push({
                    path: "/iframe",
                    query: {
                        url: v.url,
                    }
                })
            } else {
                dsf.layer.toast('功能正在建设中。。。')
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.onethingserveice {
    background-image: linear-gradient(200deg, #F5FAFF 0%, #FFFFFF 12%);
    box-shadow: 0 1px 6px 0 rgba(80, 126, 170, 0.10);
    border-radius: 10px;
    padding: 9px;
    width: 94%;
    margin: 1.5vh auto;

    .onethingserveice_title {
        font-family: PingFangSC-Semibold;
        font-size: var(--font_size_1);
        color: #333333;
        font-weight: 600;
        position: relative;
        padding-left: 10px;
    }

    .onethingserveice_title::before {
        content: '';
        position: absolute;
        left: 0;
        height: 18px;
        width: 5px;
        // background-color: #3389E0;
        background-color: var(--normal);
        border-radius: 5px;
        top: 50%;
        transform: translateY(-50%);

    }

    main {
        margin-top: 12px;

        .onethingserveice_firstline {
            display: flex;
            justify-content: space-around;

            .left {
                width: 42%;
                height: 160px;
                background-position: 50% 50%;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-image: url(../../../../static/images/zydx/office_1.png);
                border-radius: 2px;

                .left_title {
                    font-family: PingFangSC-Medium;
                    font-size: var(--font_size_2);
                    font-weight: 700;
                    margin-top: 19px;
                    padding-left: 15px;
                    color: #00AE87,

                }

            }

            .firstline_right {
                width: 50%;
                height: 160px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .right1 {
                    width: 100%;
                    height: 75px;
                    background: url(../../../../static/images/zydx/office_2.png) no-repeat;
                    background-position: 50% 50%;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    border-radius: 2px;

                    .left_title {
                        font-family: PingFangSC-Medium;
                        font-size: var(--font_size_2);
                        color: #0082E5;
                        font-weight: 700;
                        margin-top: 10px;
                        padding-left: 15px;
                    }
                }

                .right2 {
                    width: 100%;
                    height: 75px;
                    background: url(../../../../static/images/zydx/office_3.png) no-repeat;
                    background-position: 50% 50%;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    border-radius: 2px;

                    .left_title {
                        font-family: PingFangSC-Medium;
                        font-size: var(--font_size_2);
                        color: #E86363;
                        font-weight: 700;
                        margin-top: 10px;
                        padding-left: 15px;
                    }
                }

            }
        }

        .onethingserveice_secondline {

            .secondline1 {
                width: 96%;
                height: 75px;
                background-position: 50% 50%;
                background-size: 100% 100%;
                margin: 0 auto;
                background-repeat: no-repeat;
                background-image: url(../../../../static/images/zydx/office_4.png);
                border-radius: 2px;

                .left_title {
                    font-family: PingFangSC-Medium;
                    font-size: var(--font_size_2);
                    font-weight: 700;
                    margin-top: 10px;
                    padding-left: 15px;
                    padding-top: 10px;
                    color: #0063C7
                }
            }

            .secondline2 {
                width: 96%;
                height: 75px;
                background-position: 50% 50%;
                background-size: 100% 100%;
                margin: 0 auto;
                background-repeat: no-repeat;
                background-image: url(../../../../static/images/zydx/office_5.png);
                border-radius: 2px;

                .left_title {
                    font-family: PingFangSC-Medium;
                    font-size: var(--font_size_2);
                    font-weight: 700;
                    margin-top: 10px;
                    padding-left: 15px;
                    padding-top: 10px;
                    color: #AF845A
                }
            }
        }


    }
}

.left_subtitle {
    font-family: PingFangSC-Regular;
    font-size: var(--font_size_4);
    color: #999999;
    margin-top: 10px;
    padding-left: 15px;
}
</style>
