<template>
    <div class="signed-page">
        <div :style="{ minHeight: `calc(100vh - ${isShowAppHeader ? '11vh' : '4vh'})` }" class="container">
            <div class="content">
                <div class="content-img">
                    <img src="static/images/attendance/qd-dkcg.svg">
                </div>
                <div class="content-ts">
                    {{ timestamp | dateFormat }}
                </div>
                <div class="content-msg">
                    {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            timestamp: this.$route.params.ts,
            msg: "打卡成功",
            user: dsf.util.loadSessionStore("user")
        };
    },
    created() {
        let self = this;
        if (self.user.attnd) {
            self.user.attnd.faceAuth = 0;
        } else {
            self.user.attnd = { faceAuth: 0 };
        }
    },
    mounted() { },
    methods: {},
    filters: {
        //时间格式化
        dateFormat: function (val) {
            if (!val) return "";
            return dsf.date.format(new Date(Number(val)), "hh:ii");
        }
    },
    computed: {
        ...mapState({
            isShowAppHeader: state => state.isShowAppHeader
        })
    }
};
</script>

<style lang="scss" scoped>
.signed-page {
    .container {
        background-color: #fff;
        margin: 2vh;
        // padding: 16px;
        border-radius: 12px;

        // height: 96vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            margin-top: -10vh;
            text-align: center;

            &-img {
                img {
                    width: 3rem;
                    height: 3rem;
                }
            }

            &-ts {
                font-size: 1rem;
                color: #3389E0;
                margin-bottom: 0.16rem;
                margin-top: -0.5rem;
            }

            &-msg {
                font-size: 0.36rem;
            }
        }
    }
}
</style>
