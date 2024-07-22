<template>
    <div style="height:100%;width:100%;flex: 1;">
        <iframe style="display:block" :src="url" frameborder="0" :id="item ? item.id : ''"></iframe>
    </div>
</template>

<script>
import urlJs from "@/common/url";
export default {
    name: "framePage",
    props: ["fileUrl", "item"],
    data() {
        return {
            // url: ''
        }
    },
    computed: {
        url() {
            return this.fileUrl || this.$route.query.url
        }
    },
    created() {
        // this.url = this.fileUrl||this.$route.query.url;
        this.$vuex.commit("setHistory", { url: this.$route.fullPath, historyCount: history.length })
        if (this.$route.query.title) {
            urlJs.setTitle(this.$route.query.title);
        }
    },
    methods: {
    }
}
</script>

<style lang="css" scoped>
iframe {
    width: 100% !important;
    height: 100% !important;
}
</style>
