<template>
  <div class="dyProjectImg">
      <ul v-if='imgArr.length>0' class="dyProjectImg_ul">
          <li v-for='(item,index) in imgArr' :key = 'index'>
               <!-- <img src="../../../../static/images/shandongdongying/yd5.jpg" alt="" @click="clickImg(item)"> -->
               <img :src="getUrl(item)" alt="" @click="clickImg(item)">
          </li>
      </ul>
      <commonempty description="暂无数据" v-else />
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
       infoId:this.$route.query.infoId,
       imgArr:[],
    };
  },
  created() {
    this.getXmjsImageDetailData();
  },
  mounted() {
     
  },
  
  computed:{
     getUrl(){
         return(item) =>{
              return  dsf.url.getServerUrl(item.imgAppUrl.substring(1,item.imgAppUrl.length))
         }
      }
  },
  methods: {
     getXmjsImageDetailData(){
          dsf.http.post("/fn/sjgwcPortalController/getXmjsImageDetailData", { infoId: this.infoId }).done((res) => {
            if (res.error_code == "0" && res.data) {
                this.imgArr = res.data;
            }
        });
     },
     clickImg(item){
         ImagePreview({
            images:[
                this.getUrl(item)
            ],
            showIndex:false,
            loop:false,
            closeable: true,
         });
     }
  },
};
</script>
<style lang="scss" scoped>
.dyProjectImg{
    padding: 0.2rem;
    .dyProjectImg_ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 10px;
        li{
            width: 32%;
            margin-bottom: 10px;
            img{
                width: 100%;
            }
        }
    }
}
</style>