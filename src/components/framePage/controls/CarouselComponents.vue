<template>
<app-swiper-iframe :swiper="appSwiper" v-if="swiperIframe"></app-swiper-iframe>
<app-swiper :swiper="appSwiper" v-else></app-swiper>
</template>

<script>
import appSwiper from "@/components/documentCenter/appSwiper";
import appSwiperIframe from "@/components/documentCenter/appSwiperIframe";

export default {
    name: "framePageSqumenu",
    props: ["itemdata"],
    components: {
        appSwiper,appSwiperIframe
    },
    data() {
        return {
            appSwiper: dsf.config.appSwiper || {},
            swiperIframe:false
        }
    },
    created() {
        if (this.itemdata.params.lbKey && (this.itemdata.params.lbKey.indexOf("http")>-1||this.itemdata.params.lbKey.indexOf("https")>-1)) {
            this.swiperIframe=true
            this.appSwiper.url=this.itemdata.params.lbKey
        }else {
            this.appSwiper.url="/fn/mobilecarousel/getcarousel?lbkz="+this.itemdata.params.lbKey
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
