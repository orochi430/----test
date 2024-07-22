<template>
<div class="fileGrid">
    <div class="file-icon">
        <img src="../../assets/imgs/cloudDisk/file-doc.svg" alt="" class="fileIcon" />
        <!-- <img src="../../assets/imgs/cloudDisk/empty.png" alt="" class="fileImg" /> -->
    </div>
    <div class="file-title">DJLog-2023-05-03IMG-5003.MOVIMG-5003.MOV</div>
    <div class="file-size">10.8MB</div>
    <div class="file-more">
        <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
    </div>
</div>
</template>

<script>
export default {
    name: 'fileGrid',
    components: {},
    props: {},
    data() {
        return {

        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.fileGrid {
    max-width: 100px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;

    .file-icon {
        width: 100%;
        height: 56px;
        margin-bottom: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        .fileImg {
            max-width: 100%;
            height: 56px;
            border-radius: 5px;
        }

        .fileIcon {
            max-width: 42px;
            height: 42px;
        }
    }

    .file-title {
        width: 100%;
        text-align: center;
        overflow: hidden; //溢出内容隐藏
        text-overflow: ellipsis; //文本溢出部分用省略号表示
        display: -webkit-box; //特别显示模式
        -webkit-line-clamp: 2; //行数
        line-clamp: 2;
        -webkit-box-orient: vertical; //盒子中内容竖直排列
        font-size: var(--font_size_4);
        color: #171A1D;
        font-weight: 500;
    }

    .file-size {
        font-size: 8px;
        color: #747578;
        letter-spacing: 0;
        font-weight: 400;
        margin: 1.5px 0;
    }

    .file-more img {
        width: 24px;
        height: 24px;
    }
}
</style>
