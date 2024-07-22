<template>
<div :style="{height: `calc(100vh - ${dsf.util.getOffsetTop()})`}" class="ds-iframe">
    <dsf-iframe :src="url"></dsf-iframe>
</div>
</template>

<script>
import { mapState } from "vuex";
import dsfIframe from "./dsfIframe";
import urlJs from "@/common/url";
export default {
    name: "iframePage",
    components: {
        dsfIframe
    },
    props: ["fileUrl"],
    data() {
        return {
            url: "",
            title: this.$route.query.title || this.$route.params.title
        };
    },
    computed: {
        ...mapState({
            isShowAppHeader: state => state.isShowAppHeader
        }),
    },
    created: function () {
        this.$vuex.commit("setHistory", { url: this.$route.fullPath, historyCount: history.length })
        let url = this.fileUrl || this.$route.params.url || this.$route.query.url || "";
        if (this.$route.query.encode) {
            this.url = dsf.base64.decode(url);
        } else {
            this.url = url;
        }
        if (this.title) {
            urlJs.setTitle(this.title);
        }
    },
    mounted: function () {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.dsf-iframe {
    position: relative;
    width: 100%;
    overflow: hidden;
}
</style>
