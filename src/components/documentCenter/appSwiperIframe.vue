<template>
<div class="ds-iframe">
    <iframe ref="ifs" id="ifs" class="iframe"  :style="{height: height}" :src="swiper.url" width="100%" frameborder="0"></iframe>
</div>
</template>

<script>
import dsfIframe from "@/components/iframe/dsfIframe";
export default {
    name: 'appSwiperIframe',
    components: {
        dsfIframe
    },
    props: {
        swiper: {
            type: Object
        }
    },
    data() {
        return {
            height: '30vh'
        }
    },
    mounted() {
            let self=this
            self.resizeHeight()
            window.onresize = function(){
                self.resizeHeight()
            }
    },
    methods: {
       resizeHeight(){
        if(this.swiper.percent) {
            let width=document.documentElement.clientWidth
            this.height = (width>Number(this.swiper.picMaxWidth)?this.swiper.picMaxWidth:width) / this.swiper.percent.split(":")[0] * this.swiper.percent.split(":")[1] + 'px'
        } else {
            this.height = this.swiper.height ? `${this.swiper.height}${this.swiper.isPercent ? 'vh' : 'px'}` : this.height
        }
       }
    }

}
</script>

<style lang="scss" scoped>
.van-swipe-item {
    img {
        height: 30vh;
        object-fit: fill;
    }
}
// .iframe{
//     height: 325px;
// }
</style>
