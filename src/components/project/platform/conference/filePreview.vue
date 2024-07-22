<template>
<div class="file-container">
    <div class="top">
        <van-cell :title="title" icon="arrow-left" center @click="$router.back()"></van-cell>
    </div>
    <div class="content">
        <iframe :src="url" frameborder="0"></iframe>
        <div class="iconBox flex dc">
            <img v-if="false" src="../../../../assets/imgs/full.png" alt="" @click="isFullScreen = !isFullScreen">
            <img v-if="!isHandwriting" src="../../../../assets/imgs/edit.png" alt="" @click="isFullScreen = false;goHandWrite()">
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: this.$route.query.title || '文件',
            url: this.$route.query.url || `static/pdfh5/pdf.html?file=${file}`,
            isFullScreen: false
        }
    },
    computed: {
        isHandwriting() {
            return this.url.includes("&handwriting=1");
        }
    },
    methods: {
        goHandWrite() {
            let self = this;
            self.$router.push({
                path: `/conference/filePreview`,
                query: {
                    url: self.url += `&handwriting=1`,
                    title: self.title
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.file-container {
    height: calc(100vh - .92rem);
    display: flex;
    flex-direction: column;

    .top {
        .van-cell__title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600 !important;

            span {
                font-size: 0.3rem;
                padding-left: 0.2rem;
            }
        }

        .van-cell__left-icon {
            font-size: 0.2rem;
        }
    }

    >.content {
        flex: 1;
        overflow: hidden;
        padding: 10px;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
}

.iconBox {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: .2rem;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    img {
        margin: 0.16rem 0.12rem;
        width: 0.4rem;
        height: 0.4rem;
    }
}
</style>
