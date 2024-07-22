<template>
<div class="commonItem" v-if="dataObj" @click="goDetail">
    <div class="top-content">
        <div class="app-info">
            <img :src="dataObj['icon']" alt="">
            <div>
                <p>{{dataObj['text']}}</p>
                <span>{{dataObj['module']}}</span>
            </div>
        </div>
        <van-rate v-model="dataObj['rate']" :size="12" color="#F19927" void-icon="star" void-color="#eee" readonly />
    </div>
    <div class="bottom-content">
        <span>发布时间：{{dataObj['time']}}</span>
        <span>使用量：{{dataObj['used'] || 0}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'commonItem',
    components: {},
    props: {
        data: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            dataObj: {

            }
        }
    },
    computed: {

    },
    watch: {},
    created() {
        this.dataObj = {
            id: this.data['S-BASE-0001'] || this.data['app.S-BASE-0001'],
            icon: dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${this.data['S-APP-0026']||this.data['app.S-APP-0026']}`),
            text: this.data['S-APP-0001'] || this.data['app.S-APP-0001'],
            module: this.data['S-APP-0066'] || this.data['app.S-APP-0066'],
            rate: Number(this.data['S-APP-0110'] || this.data['app.S-APP-0110']),
            time: this.data['S-APP-0108'] || this.data['app.S-APP-0108'],
            used: this.data['S-APP-0109'] || this.data['app.S-APP-0109']
        }
    },
    mounted() {

    },
    methods: {
        goDetail() {
            this.$router.push({
                path: `/applicationDetail/${this.dataObj.id}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.commonItem {
    width: 100%;
    // height: 72px;
    background: #FFFFFF;
    border: 0.5px solid rgba(216, 216, 216, 0.72);
    border-radius: 2px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:last-child {
        margin: 0;
    }

    .top-content {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .app-info {
            display: flex;
            width: calc(100% - 80px);

            img {
                width: 34px;
                height: 34px;
                margin-right: 10px;
            }

            &>div {
                width: calc(100% - 50px);

                p {
                    font-size: var(--font_size_3);
                    color: #333333;
                    font-weight: 500;
                }

                span {
                    font-size: 10px;
                    color: #666666;
                    font-weight: 400;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                    width: 100%;
                }
            }
        }

        .van-rate {
            max-width: 80px;
            margin-top: 5px;
        }
    }

    .bottom-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;

        span {
            font-size: 10px;
            color: #666666;
            font-weight: 400;
        }
    }

}
</style>
