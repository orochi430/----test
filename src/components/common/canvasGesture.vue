<template>
<div class="contentBox set_gesture">
    <van-nav-bar :title="title" @click-left="goBack">
        <template #left>
            <van-icon name="arrow-left" v-if="type == 'set'" /><span>{{type == 'check'?'':'返回'}}</span>
        </template>
        <template #right>
            <span v-if="type == 'set'" @click="goClear"><span>清除</span></span>
        </template>
    </van-nav-bar>
    <div class="gesture-wrap">
        <div class="text-center img_tip">
            <van-icon :name="tip_icon" size="1rem" :color="tip_color" />
            <span>{{ tip_mes }}</span>
        </div>
        <div style="width: 90%; margin: 20px auto">
            <gesture :gestureType="type" :isSet="true" @remind="remind(arguments)"></gesture>
        </div>
    </div>
</div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
import gesture from '@/components/common/gesture'
export default {
    name: "set_gesture",
    components: {
        gesture
    },
    data() {
        return {
            tip_mes: "", //提示信息
            tip_color: "", //提示信息的颜色css
            tip_type: '',
            type: '', //check set clear
            title: '',
            tip_icon: ''
        };
    },
    created() {
        this.type = 'set';
        if (this.$route.query.type) {
            this.type = this.$route.query.type
        }
        if (this.$route.params.type) {
            this.type = this.$route.params.type
        }
        switch (this.type) {
            case 'set':
                this.title = '设置手势密码';
                break;
            case 'check':
                this.title = '手势解锁';
                break;
            case 'clear':
                this.title = '清除手势密码';
                break;
        }
        if (dsf.util.loadLocalStore("gesture_pas") == null && this.type != 'set') {
            dsf.layer.alert({
                title: '温馨提示',
                message: '还未设置手势密码'
            }, () => {
                this.$router.go(-1);
            })
        }
    },
    mounted() {

    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goClear() {
            dsf.layer.alert({
                title: '温馨提示',
                message: '请输入手势密码完成清除'
            }, () => {
                this.$router.push("/canvasGesture/clear");
            })
        },
        remind(msg) {
            console.log(msg)
            this.tip_type = msg[0]
            this.tip_mes = msg[1]
            if (this.tip_type == 'success') {
                this.tip_color = '#627eed'
                this.tip_icon = 'checked'
            } else {
                this.tip_color = '#ff0000'
                this.tip_icon = 'clear'
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.van-nav-bar {
    @include font-theme('normal');

    .van-icon {
        @include font-theme('normal');
        @include font_5;
        margin-right: 3px;
    }
}

.logo_img {
    width: 100%;
}

.error_word {
    color: red;
}

.success_word {
    color: #67c23a;
}

.set_gesture {
    display: flex;
    height: 100vh;
    flex-direction: column;

    .gesture-wrap {
        flex: 1;
        background-color: #fff;
        margin-top: 16px;
    }
}

.text-center {
    height: 150px;
}

.img_tip {
    display: flex;
    position: relative;
    padding: 20px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: calc(var(--f7-navbar-height) + 50px) auto 0px;

    span {
        padding-top: 20px;
        font-size: var(--font_size_2);
    }
}
</style>
