<template>
<van-collapse v-model="activeNames" class="opinionContent">
    <van-collapse-item :title=key :name=index icon="play" v-for="(item, key, index) in dataTree" :key="index">
        <template v-for="(it, i) in item">
            <round v-if="Object.keys(it.customMap).length > 0" :opinion="it.customMap"></round>
            <div class="opiniondiv" v-else>
                <p class="opinionText">{{ it.opinionContent }}</p>
                <span class="opinionTime">
                    {{ it.muserName + ' ' + it.lastUpdataDateShow }}
                </span>
            </div>
        </template>
    </van-collapse-item>
    
</van-collapse>
</template>

<script>
import round from "./component/round.vue";
export default {
    props: ["metaData", "parameters"],
    components: {
        round,
    },
    data() {
        return {
            activeNames: [''],
            dataTree: []
        }
    },
    computed: {

    },
    mounted() {
        console.log(this.parameters);
        this.opinion()
    },
    methods: {
        opinion() {
            let self = this
            dsf.http
                .post("/ctrl/czjSw/getCustomOpinons", {
                    moduleId: this.parameters.moduleId,
                    formId: '230612143037vi20jAuOfGo5QYtW6GK',
                    pk: this.parameters.pk,
                    isZb: this.metaData.label == '协办部门意见' ? '0' : '1',
                })
                .then(function (res) {
                    console.log(res.data.data);
                    if (res.status == "200") {
                        self.dataTree = res.data.data
                    }
                });
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/themes.scss";
@import "../../../../assets/styles/mixin.scss";
.opinionContent {
    /deep/.van-cell {
        min-height: 40px !important;
    }

    /deep/.van-collapse-item__content {
        padding-right: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    /deep/.van-cell__title {
        display: flex;
        align-items: center;
        
    }

    /deep/.van-cell__right-icon {
        padding-top: 10px;
    }

    /deep/.van-collapse-item__wrapper {
        min-height: 40px !important;
    }
    /deep/.van-icon-play{
        margin-top: 8px;
        padding-left: 15px;
        font-size: var(--font_size_4);
        @include font-theme("normal");
    }
    .opiniondiv{
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
    }
    .opinionText {
        padding-top: 10px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: var(--font_size_1);
        font-weight: 600;
        text-align: left;
        padding-bottom: 12px;
    }

    .opinionTime {
        font-size: var(--font_size_4);
        color: #333;
        text-align: right;
    }
}
</style>
