<template>
<div class="card">
    <div class="title showIcon"><span>办件情况</span></div>
    <div class="banjian">
        <div>
            <img src="../../../../static/images/taskManager/zczb.png" alt="">
            <div>
                <p>
                    <span style="color: #32C5FF;">203</span>
                    <span style="color: #32C5FF;">+1</span>
                </p>
                <p>
                    <span>正常在办(个)</span>
                    <span>今日</span>
                </p>
            </div>
        </div>
        <div>
            <img src="../../../../static/images/taskManager/jjdq.png" alt="">
            <div>
                <p>
                    <span style="color: #F7B500;">39</span>
                    <span style="color: #F7B500;">+15</span>
                </p>
                <p>
                    <span>即将到期(个)</span>
                    <span>今日</span>
                </p>
            </div>
        </div>
        <div>
            <img src="../../../../static/images/taskManager/cszb.png" alt="">
            <div>
                <p>
                    <span style="color: #FA6400;">451</span>
                    <span style="color: #FA6400;">+13</span>
                </p>
                <p>
                    <span>超时在办(个)</span>
                    <span>今日</span>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ShangGovBanjianComponents",
    components: {

    },
    data() {
        return {}
    },
    created() {
        console.log("ShangGovBanjianComponents");
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.card {
    background-color: #FFF;
    margin: 10px;
    border-radius: 6px;
    padding: 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);

    .showIcon {
        span:first-child {
            padding-left: 5px;
            border-left: 5px solid #fff;
            position: relative;

            &::before {
                content: ' ';
                position: absolute;
                height: 100%;
                width: 5px;
                top: 0;
                left: -5px;
                border-radius: 3px;
                @include background-theme("normal");
            }
        }
    }

    .title {
        padding: 2px 15px;
        box-sizing: border-box;
        position: relative;
        @include font_2;
        margin-bottom: 10px;

        span:first-child {
            font-size: var(--font_size_1);
            font-weight: bold;
            color: #333;
            margin-left: -5px;
        }

        .maxRowsMenu {
            display: flex;
            font-size: var(--font_size_3);
            color: rgb(102, 102, 102);
            align-items: center;
            float: right;
        }

    }

    .banjian {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 50% 50%;

        &>div {

            height: 60px;
            background: #FFFFFF;
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 10px;
            margin-bottom: 10px;
            align-items: center;

            &:nth-child(2n) {
                margin-left: 5px;
                margin-right: 10px;
            }

            &:nth-child(2n+1) {
                margin-right: 5px;
                margin-left: 10px;
            }

            &>img {
                width: 31px;
                height: 31px;
            }

            &>div {
                flex: 1;
                margin-left: 10px;
                display: flex;
                flex-direction: column;

                &>p:first-child {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    &>span:first-child {
                        font-size: var(--font_size_1);
                        font-weight: bold;
                    }

                    &>span:last-child {
                        font-size: var(--font_size_3);
                    }
                }

                &>p:last-child {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    &>span {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>
