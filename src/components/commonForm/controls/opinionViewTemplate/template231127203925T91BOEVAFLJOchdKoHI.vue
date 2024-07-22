<template>
    <!--[中央党校]简单意见显示-不显示节点和部门-党校定制-->
    <div class="controlOpinionView">
        <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
            <div class="opinionContent">
                <div class="opinionText">{{ item.opinionContent }}</div>
                <div v-if="item.opinionFiles">
                    <div class="opinionFile ellipsis" v-for="(itm, inx) in item.opinionFiles" :key="inx"
                        @click="priview(itm)">
                        <img :src="dsf.util.getFileTypeIcon(itm.fileName)">
                        <div class="info">
                            <p class="elps">{{ itm.fileName }}</p>
                            <p class="sub">{{ dsf.util.filesizeTostr(itm.fileSize) }}</p>
                        </div>
                    </div>
                </div>
                <div class="opinionTime">
                    <span>{{ item.userName }}</span>
                    <span>{{ item.time.split(" ")[0] }}</span>
                </div>
            </div>
        </div>
        <enclosurePopup ref="enclosurePopup"></enclosurePopup>
    </div>
</template>

<script>
import enclosurePopup from "@/components/todoFile/attachPreivewPop.vue";
export default {
    components: { enclosurePopup },
    props: ["parameters", "metaData"],
    data() {
        return {}
    },
    computed: {
        opinion() {
            let self = this;
            let tempOpinion = []
            if (self.metaData.extra.list) {
                tempOpinion = self.metaData.extra.list;
                tempOpinion.opinionFiles?.forEach(item => {
                    item.priviewUrl = dsf.url.getServerUrl(
                        `fn/office/openMobileOffice?fileId=${item.id}&moduleId=${self.$route.params.moduleId}&nodeId=${element.nodeId}&&flowId=${self.parameters.flowId}&x-auth-token=${loginToken}`
                    )
                    item.navtiveUrl = item.filePath;
                    item.initUrl = `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${self.$route.params.moduleId}&fileName=${item.fileName}&x-auth-token=${loginToken}`

                    if (item.fileName.toLowerCase().includes(".png") || item.fileName.toLowerCase().includes(".jpg")) {
                        item.priviewUrl = dsf.url.getServerUrl(
                            `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${self.$route.params.moduleId}&fileName=${item.fileName}`
                        )
                    } else if (item.fileName.toLowerCase().includes(".mp4")) {
                        item.priviewUrl = dsf.url.getServerUrl(
                            `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${self.$route.params.moduleId}&fileName=${item.fileName}`
                        )
                    }
                })
            }
            console.log("opinion ->", tempOpinion);
            return tempOpinion;
        }
    },
    methods: {

        priview(data) {
            let file = {
                "fileName": data.fileName,
                "isNew": true,
                "moduleId": this.parameters.moduleId,
                "officeModuleId": "",
                "nodeId": "-1",
                "flowId": "0",
                "fileId": data.infoId,
                "id": data.id,
                "isHandwrite": "0"
            }
            this.$refs.enclosurePopup.open(file);
        },
    }
}
</script>

<style lang="scss" scoped>
.controlOpinionView {

    .opinionBox {
        &:not(:first-child)::before {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 0;
            top: -5px;
            left: 0;
            border-bottom: 1px solid #ebedf0;
        }

        position: relative;
        color: #333;
        margin: 0.2rem 0 0.1rem;

        .opinionContent {

            // padding: 3px 0;
            .opinionText {
                padding-bottom: 0.24rem;
            }

            .opinionTime {
                text-align: right;
            }

            .opinionFile {
                margin: 6px 0;
                padding: 9px 6px;
                background-color: #eee;
                display: flex;
                align-items: center;
                border-radius: 3px;

                img {
                    width: 32px;
                    height: 32px;
                    margin-right: 6px;
                    object-fit: contain;
                }

                .info {
                    flex: 1;
                    overflow: hidden;
                    font-size: var(--font_size_3);

                    .sub {
                        font-size: var(--font_size_4);
                    }
                }
            }
        }
    }
}
</style>