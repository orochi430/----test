<template>
<div class="fgwDB" :class="{ 'verticalx': vertical }">
    <fgwheader></fgwheader>
    <div class="fcontain" :class="{ 'vertical': vertical }">
        <div class="wrabg">
            <div class="appcation">
                <div class="apps" v-for="(item,index) in list" :key="item.ID" @click="link(item)" :style="{'backgroundColor':colors[index%11]}">
                    <span class="title">{{item.APP_NAME}}</span>
                    <span class="icon"><img :src="item.ICON" alt="" srcset=""></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import fgwheader from './header.vue';
export default {
    name: 'fgwYY',
    components: {
        fgwheader
    },
    data() {
        return {
            colors: ["#86A1FF", "#617AFF", "#7A6FFF", "#503AD8", "#0044B4", "#619FFF", "#4797FF", "#2469DF", "#00A7E7", "#376BD8", "#3E4AE6"],
            list: [],
            vertical: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        checkScreen() {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            if (width > height) {
                this.vertical = false
            } else {
                this.vertical = true
            }
        },
        init() {
            dsf.http.post('/ctrl/developmentOffice/getApplicationData', {})
                .then(({
                    data
                }) => {
                    // console.log(data);
                    if (data.code == 200) {

                        if (data && data.data && data.data.length > 0) {
                            data.data.forEach((item) => {
                                // item.ICON = `http://${ip}:${port}`+item.ICON;
                            });
                            this.list = this.list.concat(data.data);
                        }

                    }
                })
                .catch(({
                    message
                }) => {
                    dsf.layer.toast(message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        link(data) {
            if (data.SSOURL == "qb") {
                this.$router.push({
                    name: "fgwPadQB"
                });
            } else if (data.SSOURL == "zb") {
                this.$router.push({
                    name: "fgwPadZB"
                });
            } else {
                this.$router.push({
                    name: "dsfIframe",
                    query: {
                        url: data.SSOURL,
                        title: data.APP_NAME,
                    },
                });
            }
        },
    },
    created() {},
    mounted() {
        this.init()
        this.checkScreen()
        window.addEventListener("resize", () => {
            this.checkScreen()
            // window.location.reload()
        })
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.fgwDB {
    width: 100vw;
    height: 100vh;
    background: url(../../../../static/images/project/fgwPad/body-bg.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px 30px 35px 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &.verticalx {
        padding: 20px 15px 15px 15px;
    }

    .fcontain {
        width: 100%;
        margin-top: 12px;
        height: calc(100vh - 122px);
        box-sizing: border-box;
        padding: 20px;

       

        .wrabg {
            width: 100%;
            height: 100%;
            background: rgba($color: #FFFFFF, $alpha: 0.3);
            border-radius: 10px;
            overflow: hidden;
            box-sizing: border-box;
            padding: 30px;
        }

        .appcation {
            width: 100%;
            height: auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 30px 30px;

            .apps {
                width: 100%;
                height: 108px;
                box-sizing: border-box;
                padding: 0 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;

                .title {
                    font-size: 24px;
                    color: #FFFFFF;
                    font-weight: bold;
                }

                .icon {
                    width: 62px;
                    height: 50px;
                    flex-shrink: 0;
                    margin-left: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        height: 50px;
                        width: auto;
                    }
                }
            }

        }

        &.vertical{
            padding: 20px 10px;
            .appcation{
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 20px 20px;
            }
            .wrabg{
                padding: 15px;
            }
        }
    }
}
</style>
