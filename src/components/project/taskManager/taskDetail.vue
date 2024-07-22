<template>
<div class="taskDetail">
    <div class="taskTop">
        <div class="header">
            <div class="heaer_left">
                <span class="title">任务详情</span>
                <span class="subTitle">(我负责的)</span>
            </div>
            <div class="heaer_right">
                <van-icon name="edit" />
                <van-icon name="bulb-o" />
                <van-icon name="share-o" />
                <van-icon name="delete-o" />
                <van-icon name="cross" />
            </div>
        </div>
        <div class="mytask">
            <div class="mytask_title">
                <van-icon name="label" />
                <span>我负责的-已中止 0</span>
            </div>
            <div class="mytak_schedule">
                <span class="mytak_schedule_status">进行中</span>
                <van-progress stroke-width="10" :percentage="50" color="#1064CD" track-color="#F5F5F5" :show-pivot="false"/>
                <span class="mytak_schedule_percent">15%</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'taskDetail',
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.taskTop {
    background-image: linear-gradient(180deg, #D6E9FF 0%, #FFFFFF 35%);
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 20px;
    overflow: hidden;

    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .heaer_left {
            .title {
                font-size: var(--font_size_2);
                color: #333;
            }

            .subTitle {
                font-size: var(--font_size_2);
                color: #999;
                margin-left: 10px;
            }
        }

        .heaer_right {
            display: flex;
            align-items: center;

            .van-icon {
                margin-left: 10px;
                font-size: var(--font_size_2);
                color: #666;
            }
        }
    }
    .mytask{
        width: 100%;
        height: auto;
        .mytask_title{
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            .van-icon{
                font-size: var(--font_size_2);
                color: #0091FF;
            }
            span{
                font-size: 18px;
                color: #333;
            }
        }
        .mytask_schedule{
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .van-progress{
                flex: 1;
                margin: 0 20px;
            }
            .mytask_schedule_status{
                font-size: var(--font_size_3);
                color: #0091FF;
            }
        }
    }

    
}
</style>
