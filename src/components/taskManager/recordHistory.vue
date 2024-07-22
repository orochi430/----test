<template>
<div class="recordHistory">
    <div class="lists">
        <!-- <div class="line"></div> -->
        <div class="records">
            <div :class="{'record_list':true, 'active':(recordData.length > 0 && index==0)}" v-for="(item,index) in list" :key="index">
                <!--当数量大于1 的时候的第一条添加 active-->
                <div class="line"></div>
                <span class="porcent">{{item.totalPercentage}}%</span>
                <span class="circle"></span>
                <p class="right">
                    <span class="texts">{{item.propelContent}}</span>
                    <span class="timer">{{item.createTime}}</span>
                </p>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'recordHistory',
    components: {},
    props: {
        recordData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        };
    },
    computed: {
        list() {
            this.recordData.forEach(item => {
                item.createTime = moment(new Date(item.createTime)).format("MM-DD HH:mm")
            });
            return this.recordData
        }
    },
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.recordHistory {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 15px;

    .lists {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: relative;

        // .line {
        //     position: absolute;
        //     left: 45.5px;
        //     top: 5px;
        //     bottom: 0;
        //     width: 1px;
        //     border-left: 1PX solid #D6E9FF;
        //     z-index: 0;
        // }

        .records {
            width: 100%;
            display: flex;
            flex-direction: column;

            .record_list {
                display: flex;
                justify-content: space-between;
                padding-bottom: 30px;
                position: relative;

                .line {
                    position: absolute;
                    left: 45px;
                    top: 5px;
                    bottom: -5px;
                    width: 1px;
                    border-left: 1PX solid #D6E9FF;
                    z-index: 0;
                }

                .circle {
                    background: #FFFFFF;
                    border: 1PX solid rgba(231, 231, 231, 1);
                    width: 8PX;
                    height: 8PX;
                    border-radius: 50%;
                    top: 5px;
                    position: absolute;
                    z-index: 3;
                    left: 40px;
                    box-sizing: content-box !important;
                }

                .porcent {
                    width: 40px;
                    font-size: var(--font_size_3);
                    color: #333;
                    flex-shrink: 0;
                    line-height: 24px;
                    text-align: right;
                    padding-right: 10px;
                    box-sizing: border-box;
                }

                .right {
                    display: flex;
                    justify-content: space-between;
                    flex: 1;
                    margin-left: 20px;

                    .timer {
                        font-size: var(--font_size_4);
                        color: #999999;
                        line-height: 24px;
                    }

                    .texts {
                        flex: 1;
                        font-size: var(--font_size_3);
                        color: #333333;
                        margin-right: 10px;
                        line-height: 24px;
                    }
                }

                &.active {
                    .line {
                        position: absolute;
                        left: 45px;
                        top: 5px;
                        bottom: -5px;
                        width: 1px;
                        border-left: 1PX solid #0091FF;
                        z-index: 0;
                    }

                    .circle {
                        background: #0091FF;
                        border: 3PX solid rgba(231, 231, 231, 1);
                        left: 39px;
                    }

                    // &::before {
                    //     width: 1PX;
                    //     position: absolute;
                    //     top: 10px;
                    //     bottom: -5px;
                    //     left: 51px;
                    //     background: #0091FF;
                    //     content: '';
                    // }

                    .porcent {
                        color: #0091FF;
                        font-size: var(--font_size_3);
                    }

                    .texts {
                        color: #0091FF;
                        font-size: var(--font_size_3);
                    }

                    .timer {
                        color: #0091FF;
                        font-size: var(--font_size_4);
                    }
                }
            }

        }
    }
}
</style>
