<template>
<div>
    <div class="file" @click="link">
        <div class="typeIcon">
            <img :src="typeClass" alt="" />
            <van-badge v-if="file.isNew" dot />
        </div>
        <div class="info">
            <div v-if="file.type == 'folder'">
                <div class="title">{{ file.folderName }}</div>
                <div v-if="isShowCount" class="num">{{ file.filesCount }}个文件</div>
            </div>
            <div v-else>
                <div class="title">{{ file.fileName }}</div>
                <!-- <div v-if="isShowCount" class="num">{{ file.viewCount }}次查看</div> -->
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    Badge
} from "vant";
export default {
    components: {
        [Badge.name]: Badge,
    },
    props: {
        file: {
            type: Object,
            default: () => {}
        },
        meetingId: {
            type: String
        },
        isShowCount: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            fileType: {
                pdf: ["pdf"],
                img: [
                    "jpeg",
                    "bmp",
                    "webp",
                    "svgz",
                    "svg",
                    "gif",
                    "jpg",
                    "ico",
                    "png",
                    "tif"
                ],
                txt: [
                    "txt",
                    "sql",
                    "xml",
                    "html",
                    "css",
                    "js",
                    "java",
                    "php",
                    "bat",
                    "log"
                ],
                word: ["docx", "docm", "doc", "dotx", "dotm", "dot"],
                xls: [
                    "xlsx",
                    "xlsm",
                    "xlsb",
                    "xls",
                    "xltx",
                    "xltm",
                    "xlt",
                    "xlam",
                    "xla",
                    "ods"
                ],
                ppt: [
                    "pptx",
                    "pptm",
                    "ppt",
                    "potx",
                    "potm",
                    "pot",
                    "ppsx",
                    "ppsm",
                    "pps",
                    "ppam",
                    "ppa"
                ]
            },
            hasFilePng: [
                "ai",
                "cloud",
                "html",
                "img",
                "jpg",
                "mp3",
                "mp4",
                "pdf",
                "png",
                "ppt",
                "psd",
                "rar",
                "txt",
                "word",
                "wps",
                "xls",
                "zip",
                "folder"
            ],
            imgPreview: false,
            previewImg: [],
            popFile: {},
            showFile: false,
            filename: '',
            isPreview: true
        };
    },
    computed: {
        // type() {
        //   return this.children.length > 0 ? ""
        // },
        typeClass() {
            // let startIndex = this.title.lastIndexOf('.');
            // let str = startIndex > -1 ? this.title.substring(startIndex + 1, this.title.length).toLowerCase() : "";
            let type = this.file.type.toLowerCase();
            if (this.hasFilePng.includes(type))
                return require(`static/images/fileType/${type}.png`);
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.includes(type)) {
                    return require(`static/images/fileType/${key}.png`);
                }
            }
        }
    },
    methods: {
        goPreview() {
            this.isPreview = true;
        },
        goHandWrite() {
            this.isPreview = false;
        },
        link() {
            this.$emit('openFile', this.file)

        },
        closeFile() {
            this.showFile = false;
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
    }
};
</script>

<style lang="scss" scoped>
.file {
    padding: 0.24rem 0.4rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;

    .typeIcon {
        width: 0.6rem;
        height: 0.8rem;
        margin-right: 0.4rem;
        position: relative;

        // img {
        //     height: 100%;
        // }

        ::v-deep .van-badge {
            position: absolute;
            top: 0;
            right: -4px;
        }
    }

    .info {
        flex: 1;

        .num {
            font-size: var(--font_size_4);
            color: #999;
            padding-top: 0.1rem;
        }
    }
}
</style>
