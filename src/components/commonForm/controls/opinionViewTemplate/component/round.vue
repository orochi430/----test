<template>
<van-collapse v-model="activeNames" class="opinionContent">
    <van-collapse-item :title=key :name=index icon="play" v-for="(item, key, index) in opinion" :key="index">
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
import round from "./round.vue";
export default {
    name: "round",
    props: {
        opinion: {
            type: Object,
            default: {}
        }
    },
    components: {
        round,
    },
    data() {
        return {
            activeNames: [''],
        }
    },
    computed: {},
    mounted() {
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "../../../../../assets/styles/themes.scss";
@import "../../../../../assets/styles/mixin.scss";
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
