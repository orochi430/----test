<template>
<div class="ds-meeting-center">
    <!--会议室-->
    <div class="__meeting-room">
        <div class="__title">会议室</div>
        <div class="__data">
            <div class="__data-item">
                <div class="__data-item-num" style="color: #0089FF;">{{ status.meeting }}</div>
                <div class="__data-item-name">会议室</div>
            </div>
            <div class="__data-item">
                <div class="__data-item-num" style="color: #67C23B;">{{ status.used }}</div>
                <div class="__data-item-name">使用中</div>
            </div>
            <div class="__data-item">
                <div class="__data-item-num" style="color: #F66C6C;">{{ status.conflict }}</div>
                <div class="__data-item-name">冲突</div>
            </div>
        </div>
        <div class="__footer">
            <!--        <van-button type="default" @click="$router.push({path: '/meetingManage'})">管理</van-button>-->
            <van-button type="primary" @click="$router.push({path: '/reserveMeeting'})">预订</van-button>
        </div>
    </div>
    <van-tabs v-model="active" animated sticky>
        <van-tab title="我参与的">
            <meeting-join />
        </van-tab>
        <van-tab title="我管理的">
            <meeting-manage />
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import MeetingJoin from './MeetingJoin';
import MeetingManage from './MeetingManage';
import urlJs from "@/common/url";

export default {
    name: 'MeetingCenter',
    components: {
        MeetingJoin,
        MeetingManage
    },
    data() {
        return {
            active: 0,
            status: {
                meeting: 0,
                used: 0,
                conflict: 0
            },
            meetingCountUrl: dsf.config.meetingConfig.meetingCountUrl,
        }
    },
    deactivated() {
        if (this.$route.name != "commonForm" && this.$route.name != "reserveMeeting") {
            //this.$destroy();
            this.$deleteCache(this);
        }
    },
    activated() {
        this.postCount('meeting');
        this.postCount('used');
        this.postCount('conflict');
    },
    created() {
        this.docTitle = this.$route.query.title || this.$route.meta.title || "移动办公";
        this.setTitle();
    },
    methods: {
        setTitle() { //修改钉钉的内置浏览器title
            urlJs.setTitle(this.docTitle);
        },
        post(url, params, callback, loading = true) {
            let _loading = loading ? dsf.layer.loading() : null;
            params['x-auth-token'] = dsf.util.loadSessionStore("loginToken");
            dsf.http.post(url, params)
                .done(callback)
                .error(() => {
                    dsf.layer.toast('请求异常');
                })
                .always(() => {
                    _loading && dsf.layer.closeLoading(_loading);
                });
        },
        /*************请求****************/
        // 办会中心3个数字接口
        postCount(type) {
            this.post(this.meetingCountUrl, {
                type
            }, ({
                count
            }) => {
                this.$set(this.status, type, count);
            });
        }
    }
}
</script>
