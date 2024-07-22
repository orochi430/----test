<template>
    <div class="dataviewpanel" v-if="checkShowBool">
        <div class="dataviewpanel_title">数据看板</div>
        <main>
            <iframe :src="iframeParams.Url" frameborder="0" width="100%" :style="{ height: iframeParams.height }"></iframe>
        </main>
    </div>
</template>

<script>
export default {
    name: "ZhzgMobileDataViewPanelComponents",
    components: {},
    props: ['itemdata'],
    data() {
        return {
            iframeParams: {
                Url: '',
                height: '',
                showPrivilege: ''
            },
            // 当前登录用户的权限:
            privileges: dsf.util.loadSessionStore("user")?.privileges || [],
            checkShowBool: true
        }
    },
    created() { },
    mounted() {
        console.log(this.itemdata)
        this.iframeParams.Url = this.itemdata.params.dataViewUrl
        this.iframeParams.height = this.itemdata.params.dataViewHeight
        this.iframeParams.showPrivilege = this.itemdata.params.showPrivilege
        console.log('this.iframeParams.showPrivilege: ', this.iframeParams.showPrivilege);
        this.checkShow()
    },
    methods: {
        checkShow() {
            let self = this
            return self.checkShowBool =
                !self.iframeParams.showPrivilege ||
                self.privileges.some((privilege) =>
                    privilege.name == this.iframeParams.showPrivilege
                );

        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.dataviewpanel {
    padding: 12px;
    margin: 1.5vh auto;

    .dataviewpanel_title {
        font-family: PingFangSC-Semibold;
        font-size: var(--font_size_1);
        color: #333333;
        font-weight: 600;
        position: relative;
        padding-left: 10px;
    }

    main {
        margin-top: 12px;
    }
}
</style>
