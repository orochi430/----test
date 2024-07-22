<template>
<div class="login">
    <div class="success" v-if="TabNum == 1">
        <img src="../../../static/images/meeting/success.png" alt="">
        <span>会议签到成功</span>
    </div>
    <div class="success" v-if="TabNum == 2">
        <img src="../../../static/images/meeting/warning.png" alt="">
        <p>
            <span>会议签到失败</span>
            <span>请使用<label for="">"随申办政务云"APP扫一扫</label></span>
        </p>

    </div>
</div>
</template>

<script>
export default {
    name: "login",
    components: {},
    data() {
        return {
            avatar: "",
            userInfo: '',
            TabNum: 0,
            ifSure: ''
        };
    },
    computed: {},
    watch: {
        active(val) {},
    },
    methods: {
        signIn() {
            dsf.http
                .post(`fn/meetingNoticeSfb/meetingQd`, {
                    noticeId: this.$route.query.noticeId,
                    ifSure: this.ifSure
                })
                .done((res) => {
                    console.log(res);
                    if (res.code == '200') {
                        this.TabNum = 1
                    } else if (res.code == '400') {
                        dsf.layer.confirm({
                            message: res.message,
                            confirmButtonText: '确认'
                        }, () => {
                            this.ifSure = 1
                            this.signIn()
                        })
                    } else {
                        dsf.layer.toast(res.message);
                        this.TabNum = 2
                    }
                });
        }
    },
    created() {},
    mounted() {
        this.signIn()
    },
    destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.login {
    width: 100%;

    .success {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        img {
            padding-top: 100px;
            padding-bottom: 30px;
            width: 100px;
        }

        p {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        span {
            padding-bottom: 10px;
            color: #666;
            font-size: var(--font_size_1);

            label {
                font-size: var(--font_size_1);
                @include font-theme("normal");
            }
        }
    }
}
</style>
