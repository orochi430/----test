<template>
    <div class="video">
        <div class="video_con">
            <div class="head">
                <!-- <img src="../../../../../static/images/hljMedicine/transform.png" alt=""> -->
                <img src="../../../../../static/images/hljMedicine/character.png" alt="">
            </div>
            <div class="tu">
                <div class="t">
                    <img src="../../../../../static/images/hljMedicine/source1.png" alt="">
                    <img src="../../../../../static/images/hljMedicine/video1.png" alt="">
                    <img src="../../../../../static/images/hljMedicine/sy1.png" alt="">
                </div>
            </div>
            <img src="../../../../../static/images/hljMedicine/gd.png" alt="" class="gd" @click="change()" />
        </div>
    </div>
</template>

<script>
export default {
    name: "spth",
    created() {
    },
    mounted() {
    },
    methods: {
        change() {
            this.$emit("changeState", 0)
        }
    },
}
</script> 

<style lang="scss" scoped>
.video {
    position: fixed;
    z-index: 99;
    overflow: hidden;
    background: url('../../../../../static/images/hljMedicine/bg-open.png') no-repeat;
    background-size: 100% 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .video_con {
        width: 100%;
        height: 100%;

        .head {
            box-sizing: border-box;
            padding: 0 2%;
            height: 40%;;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            margin-bottom:10%;

            img:first-child {
                width: 100px;
                height: 100px;
            }

            img:last-child {
                width:22%;
                height: 100%;
                box-sizing: border-box;
                padding:2% 2%;
            }
        }

        .tu {
            width: 100%;
            height:20%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom:3%;
            box-sizing:border-box;
            padding:0 12%;
            .t {
                width:100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width:16%;
                    height:100%;
                }
            }
        }

        .gd {
            width: 11%;
            height: 17%;
            margin: 0 auto;
        }
    }
}
</style>