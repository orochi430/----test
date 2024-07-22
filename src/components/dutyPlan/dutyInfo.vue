<template>
<div class="ds-notice">
    <div class="notice">
        <van-notice-bar :scrollable="isScroll" background="#ffffff" left-icon="static/images/shanxi/dutyyq.png" @click="goRoute(newestDutyInfo)">
            <span class="clamp" style="color:#0073CA;line-height:0.5rem;overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
">{{ newestDutyInfo.caption }}</span> 
            <template #right-icon>
                <van-icon name="arrow" color="#0073CA"/>
            </template>
        </van-notice-bar>
    </div>
</div>
</template>

<script>
export default {
    name: "dutyInfo",
    data() {
        return {
            unread: true,
            isScroll: false,
            noticeText: "",
            dutyInfoList: [],
            newestDutyInfo:{}
        };
    },
    created() {
        this.getDutyInfoList();
    },
    methods: {
        // 获取首页最新的值班要情;
        //ctrl/sx/schedule/showScheduleYq。参数：userId, isnew=1取最新一条
        getDutyInfoList() {
            var params = {
                userId: dsf.util.loadSessionStore("user").user_id,
                isnew: 1
            };
            dsf.http
                .post("fn/sx/schedule/showScheduleYq", params)
                .then(res => {
                    if (res.data.code == "200") {
                        // 通知公告;
                        this.dutyInfoList = res.data.data;
                        this.dutyInfoList.forEach((item, index) => {
                            this.newestDutyInfo=item;
                        });
                    } else {
                        this.dsf.layer.toast(res.message);
                    }
                })
                .error(res => {
                    this.dsf.layer.toast(res.message);
                })
                .always(() => {
                    this.unread = Boolean(dsf.util.loadLocalStore("isRead"));
                });
        },
        // 路由跳转;
        goRoute(item) {
            if(item&&item.pk){
                let params={pk:item.pk,type:"yq"}
                dsf.http.post("fn/sx/schedule/makeRead", params).then(res => {
                    if (res.data.code == "200"){
                        console.log("makeread")
                    }
                });

                this.$router.push({path: `/commonForm/220303113130omuV4PLAr9v5Th2d34D/${item.fid}?listId=220216130055y1ZVwKmTeaAyZyW7QeU&validateByList=1&method=view`});
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ds-notice {
    // width: 100%;
    box-shadow: 0px 0px 20px 9px rgba(193,193,193,0.5);
    border-radius: 8px;
    margin: -10px 10px 0;
    overflow: hidden;
    .notice {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        // color: #f96a0e;
        padding: 18px 0px;
        border-radius: 8px;

        .van-notice-bar {
            height: 45px;
            padding: 0px 15px;
            font-size: var(--font_size_2);
            // color: #ff6a00;
            >>>.van-notice-bar__left-icon{
                font-size: 0.82rem
            }
            >>>.van-notice-bar__content{
                padding-left: 10px;
                white-space: initial;
            }
            >>>.van-ellipsis {
                white-space: initial;
            }
        }
        
        .my-icon {
            position: absolute;
            left: 24px;
            top: 20px;
            z-index: 100;
        }

        .van-icon-icontongzhi-o::before {
            content: "\e606";
        }

        .ds-Unread {
            position: absolute;
            right: 5px;
            top: 24px;
            width: 8px;
            height: 8px;
            background: #ff3b30;
            border-radius: 50%;
        }
    }
}
</style>
