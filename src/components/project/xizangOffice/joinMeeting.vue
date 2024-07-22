<template>
    <div class="ds-user-dialog">
        <div class="__user_box">
            <div class="__user_box-body">
                <div class="box">
                    <van-field v-model="number" label="会议室号：" label-align="right" type="number" placeholder="请输入会议室号" />
                    <van-field v-model="pd" label="密　　码：" label-align="right" type="number" placeholder="请输入密码" />
                    
                </div>
                <div class="box">
                    <span class="tip">注：如会议无需密码可不填！</span>
                </div>
                <div style="margin-top:10px;">
                <div class="box">
                    <div class="p">
                      <span>开启麦克风</span> 
                      <van-switch v-model="checked" size="20px"/>
                   </div>
                    <div class="p">
                      <span class="justify">开启视频</span> 
                      <van-switch v-model="checked1" size="20px"/>
                    </div>
                </div>
                </div>
            </div>
            <div class="__user_box-footer">
                <van-button type="default" @click="goBack">返回</van-button>
                <van-button type="primary" @click="confirm" :disabled="checkComfirm">确定</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { joinMeetBefore } from "@/components/project/xizangOffice/joinMeetBefore.js"
export default {
    name: 'joinMeeting',
    components: {
    },
    data() {
        return {
            meetingData: {},
            number: "",
            pd: "",
            title: "加入会议",
            checked:false,
            checked1:false
        }
    },
    computed: {
        checkComfirm() {
            let isGo = true;
            if (this.number.length) {
                isGo = false
            }
            return isGo
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        },
        confirm() {
            let param = {
                meetingNum: this.number,
                password: this.pd,
                micMute: !this.checked,
                videoMute: !this.checked1,
                title: ""
            }
            console.log(param)
            dsf.http.post(`fn/vedioMeeting/judgeMeetingRoomAndPsd?meetingRoom=${this.number}&passWord=${this.pd}`).then(({data}) => {
                if (data.code!="200") {
                    dsf.layer.toast(data.message)
                    return
                }
                joinMeetBefore(param)
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

::v-deep .van-field__label {
  color: black !important;
}

::v-deep .van-switch {
    float: right;
}

::v-deep .van-field__control {
    text-align: right;
}

::v-deep .van-button {
    float: left;
    width: 50%;
}






.ds-user-dialog {
    background-color: #fff;
    height: inherit;
    

    // .van-field__label {
    //     color: #646566 !important;
    // }

    .__user_box {
        // padding: 10px;

        .__user_box-body {
             padding-bottom: 10px;
           

            .box {
                
                div {
                    @include font_3();

                   ::v-deep .van-field__label--right {
                       text-align: left;
                    }
                }

                .tip {
                    padding-left: 0.33rem;
                    color: red;
                }
                
            }

            .p{
                
                line-height: 30px;
                padding: 10px 16px 10px 16px;

                .justify{
                    display:inline-block;
                    width: 84px;
                    text-align-last: justify;
                }
            }

            
        }

        .__user_box-footer {
            padding: 5px 0 5px 0;
            text-align: center;
            background-color:white !important;
        }
    }

}
</style>
<style lang="sass">

</style>