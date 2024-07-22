<template>
    <div>
        <div class="fileBody" v-if="relationList.length > 0">
            <div class="fileList" v-for="(item, index) in relationList" :key="index" @click="goForm(item)">
                <div class="fileBody1 flex1">
                    <div class="fileTitle flex ac">
                        <img src="static/images/platform/relation.png" alt="">
                        <span class="ellipsis" style="flex: 1">{{ item.relaBt }}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="showForm" position="bottom" :style="{ height: '100%' }" :get-container="'#app'">
            <van-nav-bar v-if="showForm" :title="relaForm.relaBt" @click-left="showForm = false">
                <template #left>
                    <van-icon name="arrow-left" /><span>返回</span>
                </template>
            </van-nav-bar>
            <common-form v-if="showForm" :_moduleId="relaForm.moduleId" :_pk="relaForm.pk" :_params="relaForm.params || {}"
                :isPop="true"></common-form>
        </van-popup>
    </div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: "extraPageNotInitView",
    mixins: [propMixin],
    props: ["parameters"],
    components: {
        commonForm: () => import('@/components/commonForm/commonForm'),
    },
    data() {
        return {
            controlData: {},
            showForm: false,
            relaForm: {}
        };
    },
    computed: {
        relationList() {
            let relationList = []
            if (this.metaData.extra?.extraPageList?.length > 0) {
                this.metaData.extra.extraPageList.forEach(item => {
                    if (item.relationList && item.relationList.length > 0) {
                        relationList = relationList.concat(item.relationList)
                    }
                });
            }
            return relationList
        }
    },
    mounted() {
        console.log(this.metaData)
    },
    methods: {
        goForm(item) {
            this.showForm = true
            this.relaForm = {
                moduleId: item.relaModuleId,
                pk: item.relaId,
                relaBt: item.relaBt,
                params: {
                    relaId: item.relaId,
                    isShowRela: true
                }
            }
            // this.$router.replace({
            //     path: `/commonForm/${item.relaModuleId}/${item.relaId}`,
            //     query: {},
            // });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.fileBody {
    flex: 1;
    margin-right: 11px;

    .fileBody1 {
        flex: 1;
        margin-right: 11px;

        /deep/ img {
            width: 30px;
            height: 30px;
            display: inline-block;
            margin-right: 15px;
        }
    }

    .fileTitle {
        width: 100%;
        font-size: 15px;
        color: #171A1D;
        line-height: 24px;
    }

    .fileList {
        padding-top: 10px;

        .fileTitle {
            font-size: var(--font_size_2);

            .iconfont {
                color: #999999;
                font-size: var(--font_size_2);
            }
        }

        .fileModule {
            display: flex;
            color: #999;
            padding-top: 10px;

            .fileBtn {
                flex: 1;
            }
        }
    }

    .fileBtn {
        text-align: right;

        .fileButton {
            display: inline-block;
            // width:48px;
            margin: 0 0.04rem;
            text-align: center;
            border-radius: 0.48rem;
            border: 1px solid #e5e5e5;
            white-space: nowrap;
            padding: 0 0.2rem;
            font-size: var(--font_size_4);
            line-height: 0.42rem;
        }
    }
}
</style>
