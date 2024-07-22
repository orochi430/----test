<template>
<div id="sign-form">
    <div class="content">
        <!-- <iframe ref="currentFile" v-if="currentFile"
            :src="dsf.config.setting['SYS-MOBILE-ATTACH-0006'] == '1' ? currentFile.handwritingUrl : currentFile.url"
            frameborder="0" :key="currentFile.url">
        </iframe> -->

        <div v-if="currentFile">
            <enclosure-preview v-if="dsf.config.commonForm.LocalDocPreview" :file="currentFile" :isPreview="false" :form-info="fileData" ref="tabEnclosurePreview" :formMeta="formMeta" :isTabType="true"></enclosure-preview>
            <iframe ref="currentFile" v-if="!dsf.config.commonForm.LocalDocPreview" :src="dsf.config.setting['SYS-MOBILE-ATTACH-0006'] == '1' ? currentFile.handwritingUrl : currentFile.url" frameborder="0" :key="currentFile.url">
            </iframe>
        </div>
        <commonempty v-else description="暂无签批文件" />
    </div>
    <!-- <vue-fab v-if="handWrittenFile.length>1" icon="menu" size="normal" class="file-list" :scrollAutoHide="false" :globalOptions="{ spacing: 50, delay: 0.05 }" mainBtnColor="#3296FA">

<fab-item @clickItem="selectFile(item)" v-for="(item, idx) in handWrittenFile" :idx="idx" :key="idx" :title="item.title" :color="item.color" :icon="item.icon" />

</vue-fab> -->
</div>
</template>

<script>
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    name: 'SignForm',
    props: {
        formData: {
            type: Object,
            default: () => {}
        },
        formMeta: {
            type: Object,
            default: () => {}
        },
        allFile: {
            type: Array,
            default: () => []
        },
        handWrittenFile: {
            type: Array,
            default: () => []
        }
    },
    components: {
        'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
    },
    data() {
        return {
            url: '',
            currentFile: null,
            fileData: null
        }
    },
    created() {
        //this.handWrittenFile = this.allFile.filter(it=>it.isHandwrite=="1");
        this.currentFile = this.handWrittenFile.length ? this.handWrittenFile[0] : null;

        this.$eventBus.OnQuanyue(this, () => {
            this.currentFile.url += "&temp" + Math.random()
        });
        this.fileData = {
            info_id: this.$route.params.pk || this.formMeta.parameters.pk || this.formData.main['A0001'].value || "",
            moduleId: this.$route.params.moduleId || this.formMeta.parameters.moduleId,
            nodeId: this.formMeta.parameters.nodeId || '',
            nodeName: this.formMeta.parameters.nodeName || '',
            flowId: this.formMeta.parameters.flowId || '',
            pId: this.formMeta.parameters.pId || '',
            pnId: this.formMeta.parameters.pnId || '',
            uploadAttach: this.formMeta.parameters.uploadAttach || ''
        }
    },
    mounted() {

    },
    methods: {
        selectFile(item) {
            this.currentFile = item;
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/themes.scss';
@import '../../../assets/styles/mixin.scss';

#sign-form {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;

    iframe {
        width: 100% !important;
        height: 100% !important;
    }
}

.file-list {
    transform: translateY(-70px);
}
</style>
