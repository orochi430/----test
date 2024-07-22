<template>
<div class="yingyong">
    <div class="box">
        <van-loading type="spinner" v-if="loading" />
        <div class="info" v-for="item in list" :key="item.ID" @click="link(item)">
            <div class="tubiao">
                <img :src="item.ICON" />
                <p class="num" v-if="item.COUNT>0">{{item.COUNT}}</p>
            </div>
            <p>{{item.APP_NAME}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "yingyong",
    components: {},
    data() {
        return {
            list: [],
            loading: true
        };
    },
    computed: {},
    watch: {},
    methods: {
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
            this.$router.push({
                name: "dsfIframe",
                query: {
                    url: data.SSOURL,
                    title: data.APP_NAME,
                },
            });
        },
    },
    created() {
        this.init();
    },
    mounted() {},
    destroyed() {},
};
</script>

<style lang="scss" scoped>
.yingyong {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 82px;
    padding-left: 126px;

    .box {
        display: flex;

        .info {
            width: 185px;
            height: 200px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .tubiao {
                position: relative;
                width: 148px;
                height: 99px;

                img {
                    width: 100%;
                    height: 100%;
                }

                .num {
                    width: 42px;
                    height: 28px;
                    position: absolute;
                    top: -5px;
                    right: 0;
                    background-image: linear-gradient(180deg, #f26a51 2%, #ff3b30 98%);
                    border-radius: 14px 14px 14px 0;
                }
            }

            p {
                font-size: 22px;
                color: #ffffff;
                text-align: center;
                text-shadow: 0 1.5px 2px #00407a;
                flex-grow: 1;
                width: 148px;
            }
        }

        .youxiang {
            background-image: linear-gradient(180deg, #4cc5ff 0%, #1c8cf6 100%);
            box-shadow: 0 5px 0 0 #00407a, inset 0 2px 5px 0 rgba(255, 255, 255, 0.58);
        }

        .shipin {
            background-image: linear-gradient(180deg, #f7c04a 0%, #fa8911 100%);
            box-shadow: 0 5px 0 0 #703200,
                inset 0 2px 5px 0 rgba(255, 255, 255, 0.58);
            margin: 0 40px;
        }

        .renshi {
            background-image: linear-gradient(180deg, #a796ff 3%, #554fe7 99%);
            box-shadow: 0 5px 0 0 #211e82,
                inset 0 2px 5px 0 rgba(255, 255, 255, 0.58);
        }
    }
}
</style>
