<template>
<div class="myApp" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <common-card title='全部应用' :type="type" :cardHeight="`calc(100vh - ${dsf.util.getOffsetTop()} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'} - 20px)`"></common-card>
</div>
</template>

<script>
import CommonCard from './commonCard.vue'
export default {
    name: 'myApp',
    components: {
        CommonCard
    },
    props: {},
    data() {
        return {
            type: this.$route.query.type,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.myApp {
    width: 100%;
    // max-height: 100vh;
    padding: 10px;
    box-sizing: border-box;

    .common-card {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;
        // max-height: 100vh;
        overflow: auto;

        .card-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // padding: 10px 0;
            margin-bottom: 10px;

            p {
                display: flex;
                align-items: center;

                img {
                    width: 5px;
                    height: 18px;
                    margin-right: 5px;
                }

                span {
                    font-size: var(--font_size_1);
                    color: #333333;
                    font-weight: 600;
                }
            }

            .more {
                width: 15px;
                height: 15px;
            }
        }

        .list-box {
            // width: 100%;
            // height: auto;

            // li {
            width: 100%;
            // height: 72px;
            background: #FFFFFF;
            border: 0.5px solid rgba(216, 216, 216, 0.72);
            border-radius: 2px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;

            &:last-child {
                margin: 0;
            }

            .top-content {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .app-info {
                    display: flex;

                    img {
                        width: 34px;
                        height: 34px;
                        margin-right: 10px;
                    }

                    &>div {
                        p {
                            font-size: var(--font_size_3);
                            color: #333333;
                            font-weight: 500;
                        }

                        span {
                            font-size: 10px;
                            color: #666666;
                            font-weight: 400;
                        }
                    }
                }

                .van-rate {
                    margin-top: 5px;
                }
            }

            .bottom-content {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 5px;

                span {
                    font-size: 10px;
                    color: #666666;
                    font-weight: 400;
                }
            }

            // }
        }
    }
}
</style>
