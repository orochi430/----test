<template>
    <div class="call">
        <div class="call_con">
            <div class="tran">
                <!-- <img src="../../../../../static/images/hljMedicine/transform.png" alt=""> -->
            </div>
            <img src="../../../../../static/images/hljMedicine/character2.png" alt="" class="charact">
            <span>视频呼叫中···</span>
            <div class="tu">
                <div class="t">
                    <!-- <button class="button">Default</button> -->
                    <!-- <button class="middle"></button> -->
                    <img src="../../../../../static/images/hljMedicine/source.png" alt="" />
                    <img src="../../../../../static/images/hljMedicine/video.png" alt="">
                    <img src="../../../../../static/images/hljMedicine/sy.png" alt="">
                </div>
            </div>
            <img src="../../../../../static/images/hljMedicine/gd.png" alt="" class="gd" @click="disConnect()">
        </div>
    </div>
</template>

<script>
export default {
    name: "call",
    created() {
    },
    mounted() {
    },
    methods: {
        disConnect() {
            this.$emit("changeState", 0)
        }
    },
}
</script> 
     

<style lang="scss" scoped>
.call {
    position: fixed;
    z-index: 99;
    overflow: hidden;
    background: url('../../../../../static/images/hljMedicine/bg-close.png') no-repeat;
    background-size: 100% 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .call_con {
        width: 100%;
        height: 100%;

        .tran {
            width: 100px;
            height: 12%;
            img {
                width: 100px;
                height: 100px;
                //    box-sizing:border-box;
                //    padding-left:20px;
            }
        }

        .charact {
            width:20%;
            height: 25%;
            margin: 0 auto;
            margin-bottom:2%;
        }

        span {
            font-family: AlibabaPuHuiTi-Medium;
            font-size: 21px;
            color: #FFFFFF;
            margin-bottom:5%;
            text-align: center;
            display: block;
        }

        .tu {
            width: 100%;
            height:20%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom:4%;
            box-sizing:border-box;
            padding:0 100px;
            .t {
                width:100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width:16%;
                    height: 100%;
                }
            }
        }

        .gd {
            width:11%;
            height:17%;
            margin: 0 auto;
        }

        .button {
            padding: 5px 16px;
            color: #000000d9;
            border: 1px solid #ed0505;
            background-color: transparent;
            border-radius: 2px;
            line-height: 1.4;
            box-shadow: 0 2px #00000004;
            cursor: pointer;
            transition: .3s;
        }

        .button:hover {
            color: #ed0505;
            border-color: #000000d9;
        }

        .button::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            opacity: 0.4;
            transition: .3s;
            opacity: 0;
            box-shadow: 0 0 0 6px var(--primary-color);
            transition: .3s;
        }

        /*点击*/
        .button:active::after {
            box-shadow: none;
            opacity: 0.4;
            transition: 0s;
            /*取消过渡*/
        }
    }
}
</style>