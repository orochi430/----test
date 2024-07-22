<template>
    <div>
        <div id='wpsOffice' class='wps_office'></div>
    </div>
</template>
<script>
export default {
  props: ['wdztParams'],
    data() {
        return {
            data: {},
            jssdk: null,
            wpsData: {}
        };
    },
    created() {
        this.data = this.wdztParams || this.$route.query;
        // dsf.url.setTitle(this.data.fileName)
    },
    mounted() {
        dsf.loadJs('static/js/webOffice/web-office-sdk-v1.1.19.umd.js').then(() => {
            this.getWpsUrl();
            this.$nextTick(() => {
                let wps_office = document.getElementsByClassName('wps_office');
                if (wps_office.length > 1) {
                    window.location.reload()
                }
            })
        })
    },
    methods: {
        getWpsUrl() {
            let url = this.data.edit == 'edit' ? 'fn/sdtongSSO/getEditUrl' : 'fn/sdtongSSO/getPreviewUrl';
            this.getWdztUrl(this.data, url);
        },
        getWdztUrl(data, url) {
            dsf.http.post(url, { fileId: data.fileId, fileName: data.fileName, infoId: data.infoId, moduleId: data.moduleId, pnId: data.pnId, pId: data.pId }).then(res => {
                if (res.data.code == '200') {
                    this.wpsOpens(res.data.data.url)
                }
            })
        },
        async wpsOpens(wpsUrl) {
            let wpsOffice = document.getElementById('wpsOffice');
            this.jssdk = WebOfficeSDK.config({
                url: wpsUrl,
                mount: wpsOffice,
            })
            this.jssdk.iframe.style.height = document.body.clientHeight - document.querySelector("#appTop").clientHeight + 'px';
            if (this.wpsData.isRevise) {
                await this.jssdk.ready();
                const app = this.jssdk.Application;
                // 将当前文档的编辑状态切换成修订模式
                let trackRevisions = dsf.config.commonForm.wdzt && dsf.config.commonForm.wdzt.trackRevisions ? dsf.config.commonForm.wdzt.trackRevisions : false
                app.ActiveDocument.TrackRevisions = trackRevisions;
            }
        }
    },
};
</script>
<style scoped>
.wps_office {
    height: calc(100vh - 0.92rem);
}
</style>
