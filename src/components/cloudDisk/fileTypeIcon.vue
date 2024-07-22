<template>
<van-image :src="iconUrl" :width="width" :height="height">
    <template v-slot:error>
        <img src="../../../static/images/fileType/cloud.png" alt="" srcset="">
    </template>
</van-image>
</template>

<script>
export default {
    name: 'fileTypeIcon',
    props: {
        fileName: {
            type: String,
            default: "cloud"
        },
        width: {
            type: Number,
            default: 32
        },
        height: {
            type: Number,
            default: 38
        },
        isDirectory: {
            type: Number,
            default: 0
        }
    },
    components: {},
    data() {
        return {

        };
    },
    computed: {
        iconUrl() {
            let suffix = this.fileName.substr(this.fileName.lastIndexOf(".") + 1)
            if (this.isDirectory == 1) {
                return `./static/images/fileTypeIcons/folder.png`
            }
            return `./static/images/fileTypeIcons/` + suffix + '.png'
        }
    },
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    destroyed() {},
}
</script>
