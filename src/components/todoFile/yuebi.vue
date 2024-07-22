<template>
<div class="yuebi">
    <van-popup v-model="isShow" position="bottom" get-container="#app" round>
        <van-nav-bar title="填写意见" left-text="取消" @click-left="Show()">
        </van-nav-bar>
        <van-cell-group class="_file">
            <van-field ref="editOpinion" :error-message="errorMessage" v-model="value" type="textarea" rows="10" autofocus autosize placeholder="请输入意见" />
        </van-cell-group>
        <van-goods-action>
            <debounce-click>
                <van-goods-action-button type="theme" @click="btnYueBi()" text="阅毕" />
            </debounce-click>
        </van-goods-action>
    </van-popup>
</div>
</template>

<script>
import DebounceClick from '@/components/common/debounceClick.jsx'
export default {
    name: 'yuebi',
    components: {
        DebounceClick
    },
	props: {
			formData: {
				type: Object,
				default: () => {
					return {};
				},
			}
		},
    data() {
        return {
            isShow: false,
            value: "",
            errorMessage: "",
        }
    },
    created() {
    },
    computed: {},
    watch: {
        value(nv) {
            if (nv.length > 0) {
                this.errorMessage = ""
            }
        }
    },
    mounted() {},
    methods: {
        btnYueBi() {
            var self = this;
            const afterReadingFn = params => dsf.http.post("fn/mobileToReadOperation/readed", params); //阅毕
            let buttonParams = {
                infoIds: self.formData.main.A0001.value,
                distribIds: self.formData.distribId,
				        shareContent:self.value
            }
            afterReadingFn(buttonParams).then(({
                data
            }) => {
                const {
                    message,
                    result,
                    type
                } = data;
                if (type === "success" || result) {}
              dsf.layer.toast(message);
                console.log(self)
                // self.$eventBus.refresh(self);
                // self.$router.go(-1);
                self.$emit("golist")
            }).error((message) => {
                dsf.layer.toast(message);
            })
        },
        Show() {
            this.isShow = !this.isShow
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.yuebi {
    width: 100%;
}

.opinionRequired {
    border: 1px solid #ef8e8e;
}

::v-deep .van-field__value {
    padding: 5px;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 9px !important;
}

::v-deep ._file_log {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    min-height: 50px;
    max-height: 150px;
    overflow-y: auto;
    padding: 0.2rem;

    .van-tag--medium {
        @include font_6;
        @include font-theme("normal");
        @include lighter-background-theme('normal', true);
    }

}

._file_tags {
    margin-right: 8px;
    margin-bottom: 8px;
}

._file_icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .iconfont {
        @include font-theme("normal");
        @include font_4;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }
}

.van-goods-action {
    padding: 10px;
    position: relative;

    .van-button {
        border-radius: 0 !important;
        margin: 0 !important;
        border: 1px solid;
        @include border-color-theme("normal");
        border-right: 0;
    }
}
</style>
