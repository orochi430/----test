<template>
<div v-if="isShow" class="my-swipe" :class="{'hasPadding': swiper.hasPadding}">
    <van-swipe v-if="isShowSetting&&swipeImages && swipeImages.length > 0" :autoplay="autoplay" :indicator-color="swiper.indicatorColor || 'white'">
        <van-swipe-item v-for="(imgurl,index) in swipeImages" :key="index">
            <img :src="imgurl" :style="{height:height, objectFit: 'fill'}">
        </van-swipe-item>
    </van-swipe>
    <van-swipe v-if="isShowUrl&&swipeItems.length" :autoplay="autoplay" :indicator-color="swiper.indicatorColor || 'white'" @change="onChange">
        <van-swipe-item v-for="(itemdata,index) in swipeItems" :key="index" >
            <img :src="itemdata.imgSrcShow" :style="{height:height, objectFit: 'fill'}" @click="openUrl(itemdata)">
            <!-- <img v-lazy="getPhotoSrc(itemdata.imgSrc)" @click="openUrl(itemdata)" /> -->
        </van-swipe-item>
             <template #indicator v-if="currentText.length">
                <div class="custom-indicator">{{currentText}}</div>
            </template>
    </van-swipe>
</div>
</template>

<script>
export default {
    name: 'appSwiper',
    props: {
        swiper: {
            type: Object
        }
    },
    data() {
        return {
            isShow: false,
            isShowSetting: false,
            isShowUrl: false,
            swipeImages: [],
            swipeItems: [],
            autoplay: 3000,
            height: '30vh',
            currentText:""
        }
    },
    mounted() {
        if(this.swiper.percent) {
            this.height = document.documentElement.clientWidth / this.swiper.percent.split(":")[0] * this.swiper.percent.split(":")[1] + 'px'
        } else {
            this.height = this.swiper.height ? `${this.swiper.height}${this.swiper.isPercent ? 'vh' : 'px'}` : this.height
        }
        this.autoplay = this.swiper.autoplay || this.autoplay
        if (this.swiper.url) {
            this.isShowUrl = true
            // 接口获取轮播图列表
            dsf.http.get(this.swiper.url).then((res) => {
                //res.data={"code":"200","type":"success","message":"操作成功","metadata":null,"token":"","data":[{"address":"http://www.cma.gov.cn/2011xzt/2022zt/20220324/","itemindex":1,"from":2,"title":"【专题】打好全年粮食生产第一仗 气象部门全力做好各项服务保障","imgSrc":"http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xtpxw/202203/W020220324584071733543.JPG"},{"address":"http://www.cma.gov.cn/2011xzt/2022zt/20220323/","itemindex":2,"from":2,"title":"【世界气象日专题】早预警早行动 气象水文气候信息助力防灾减灾","imgSrc":"http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/202203/W020220322382683772752.jpg"},{"address":"http://www.zgqxb.com.cn/zt/gqzt/20220325/","itemindex":3,"from":2,"title":"气象部门紧盯天气过程服务农业生产","imgSrc":"http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xtpxw/202203/W020220325658077612841.jpg"},{"address":"http://www.cma.gov.cn/2011xwzx/spxw/202203/t20220328_594011.html","itemindex":4,"from":2,"title":"专家解读：两股冷空气接连影响我国中东部 北方降温幅度大南方降水明显","imgSrc":"http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xtpxw/202203/W020220329564905254110.jpg"},{"address":"http://www.cma.gov.cn/2011xzt/2015tgmb/202203/t20220304_592751.html","itemindex":5,"from":2,"title":"一图读懂《中国气象科技发展规划（2021-2035年）》","imgSrc":"http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xtpxw/202203/W020220304339238879823.jpg"}]}
                this.swipeItems = res.data.data
                this.swipeItems.forEach(element => {
                    element.imgSrcShow=this.getPhotoSrc(element.imgSrc)
                });
                this.isShow = this.swiper.isShow && this.swipeItems.length > 0
                this.currentText = this.swipeItems.length > 0?this.swipeItems[0].title:"";
            });
        } else {
            this.swipeImages = this.swiper.imgUrls
            this.isShowSetting = true
            this.isShow = this.swiper.isShow && this.swipeImages.length > 0
        }
    },
    methods: { 
        onChange(index) {
            this.currentText = this.swipeItems[index].title;
        },
        getPhotoSrc(path) {
            path=dsf.url.getWebPath(path)
            if (path.indexOf("?")>-1) {
                path+= `&time=${new Date().getTime()}`
            }else{
                path+= `?time=${new Date().getTime()}`
            }
            return path
        },
        openUrl(item) {
            if (item.address != "") {
                if (item.address.indexOf("http") == 0 || item.address.indexOf("https") == 0) {
                    let url = dsf.util.getReplaceUrl(item.address);
                    this.$router.push({
                        name: "dsfIframe",
                        params: {
                            url: url,
                            title:item.title
                        },
                        query: {
                            url: url,
                            title:item.title
                        }
                    });
                }else if(item.address.indexOf("SDDYNewsDetail") == 0){
                    this.$router.push({
                        path:"/SDDYNewsDetail",
                        query:{
                            infoId:item.infoId
                        }

                    })   
                }
                else {
                    this.$router.push({
                        path: item.address
                    });
                }
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.hasPadding {
    margin: 10px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
}
.van-swipe-item {
    img {
        height: 30vh;
        object-fit: fill;
    }
}
.custom-indicator {
    position: absolute;
    // right: 5px;
    bottom: 1px;
    padding: 2px 5px;
    color: #fff;
    font-size: var(--font_size_3);
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
}
</style>
