<template>
<div class="side">
    <div class="side-top">
        <div class="item avatar" @click="personalClick">
            <img :onerror="default_avatar" :src="photo" alt="" />
            <div class="user-name">{{ userName }}</div>
        </div>
        <div class="item" @click="back()">
            <img src="static/images/meetingPad/slide4.png" alt="" />
            <div>返回</div>
        </div>
        <div class="item" @click="search()">
            <img src="static/images/meetingPad/slide5.png" alt="" />
            <div>搜索</div>
        </div>
    </div>
    <div class="side-bottom">
        <div class="item" @click="guid()">
            <img src="static/images/meetingPad/slide6.png" alt="" />
            <div>指南</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            default_avatar: 'this.src="' + require("static/images/meetingPad/avatar.png") + '"',
            userName: dsf.util.loadSessionStore("user").name,
            photo: dsf.util.loadSessionStore("user").photo
        };
    },
    created() {},
    methods: {
        back() {
            this.$router.back();
        },
        search() {
            this.$router.push("/meetingPad/search");
        },
        guid() {
            dsf.layer.toast("功能开发中！");
        },
        personalClick() {
            this.$router.push({
                name: "meetingPadPersonal"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.side {
    padding-right: 40px;
    margin: 20px 0;
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user-name {
        max-width: 3rem;
    }

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            margin-bottom: 10px;
            width: 70px;
        }

        &:not(:last-child) {
            padding-bottom: 60px;
        }

        &:active {
            animation: pulsate-bck 0.2s ease-in-out;
        }
    }

    .avatar {
        img {
            width: 112px;
            border-radius: 10px;
        }
    }

    @keyframes pulsate-bck {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        50% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
}
</style>
