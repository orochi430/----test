<template>
  <div class="dyProjectVideoandImg">
      <van-row type="flex" justify="center" align="center">
        <van-field
            v-model="bt"
            left-icon="search"
        >
            <template #button>
                <van-button size="small" type="primary" @click="searchBt">查询</van-button>
            </template>
        </van-field>
      </van-row>
      <ul v-if='videoArr.length>0&&type=="video"' class="dyProjectVideoandImg_ul">
          <li v-for='(item,index) in videoArr' :key = 'index'>
              <!-- <video src="../../../../static/images/shandongdongying/山与海.mp4" controls>
                <source src="movie.mp4" type="video/mp4">
                <source src="movie.ogg" type="video/ogg"> 
              </video> -->
              <video :src="getVideoUrl(item)" controls>
                  <source src="movie.mp4" type="video/mp4">
                  <source src="movie.ogg" type="video/ogg"> 
              </video>
              <p class="desc" @click="showVideoDesc(item)">{{item.videoDesc}}</p>
              <p class="title">{{item.bt}}</p>
          </li>
      </ul>
      <ul v-else-if='imgArr.length>0&&type=="image"' class="dyProjectVideoandImg_ul">
          <li v-for='(item,index) in imgArr' :key = 'index' @click="enterImgDetail(item)">
              <van-image fit="cover" width="100%" height="150px" :src="getImgUrl(item)"/>
              <!-- <van-image fit="cover" width="100%" height="150px" src="../../../../static/images/shandongdongying/yjktp.png"/> -->
              <p class="title">{{item.bt}}</p>
          </li>
      </ul>
      <commonempty description="暂无数据" v-else />
      <van-popup v-model="isShowDesc" closeable close-icon="close" class='videoPopup'>
          <p>{{videoDesc}}</p>
        </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
       bt:'',
       videoArr:[],
       imgArr:[],
       type:this.$route.query.type,
       isShowDesc:false,
       videoDesc:''
    };
  },
  created() {
    if(this.type=='video'){
        this.getXmjsVideoData();
    }else if(this.type=='image'){
        this.getXmjsImageData();
    }    
  },
  mounted() {
     
  },
  computed:{
     getVideoUrl(){
         return(item) =>{
              return  dsf.url.getServerUrl(item.videoAppUrl.substring(1,item.videoAppUrl.length))
         }
      },
      getImgUrl(){
         return(item) =>{
              return  dsf.url.getServerUrl(item.imgAppUrl.substring(1,item.imgAppUrl.length))
         }
      }
  },
  methods: {
     getXmjsVideoData(){
          dsf.http.post("/fn/sjgwcPortalController/getXmjsVideoData", { bt: this.bt }).done((res) => {
            if (res.error_code == "0" && res.data) {
                this.videoArr = res.data;
            }
        });
     },
     getXmjsImageData(){
          dsf.http.post("/fn/sjgwcPortalController/getXmjsImageData", { bt: this.bt }).done((res) => {
            if (res.error_code == "0" && res.data) {
                this.imgArr = res.data;
            }
        });
     },
     searchBt(){
        if(this.type=='video'){
            this.getXmjsVideoData();
        }else if(this.type=='image'){
            this.getXmjsImageData();
        }
     },
     enterImgDetail(item){
        this.$router.push({
            path: "/dyProjectImg",
            query: {
                infoId: item.infoId,
            },
        });
     },
     showVideoDesc(item){
         this.videoDesc = item.videoDesc;
         this.isShowDesc = true;
     }
  },
};
</script>
<style lang="scss" scoped>
.dyProjectVideoandImg{
    padding: 0.2rem;
    .van-row--flex{
        flex-wrap:nowrap;
        .van-cell{
            padding: 5px;
            align-items: center;
        }
        ::v-deep .van-icon-search{
            font-size: 22px;
        }
        .van-button--small{
            height: 0.56rem;
        }
    }
    .dyProjectVideoandImg_ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 10px;
        li{
            width: 49%;
            margin-bottom: 10px;
            video{
                width: 100%;
                height: 150px;
                border-radius: 5px;
            }
            .desc{
                line-height: 20px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:3;
                text-indent:2em;
            }            
            .title{
                text-align: center;
                font-size: var(--font_size_3);
                margin-top: 3px;
                text-overflow:ellipsis;
                overflow: hidden;
                white-space:nowrap;
                font-weight: bold;
            }
        }
    }
    .videoPopup{
        width: 80%;
        padding: 10px;
        border-radius: 6px;
        p{
            line-height: 24px;
            text-indent: 2em;
            margin-top: 20px;
        }
        ::v-deep .van-popup__close-icon--top-right{
            top: 0.1rem;
            right: 0.2rem
        }
    }
}
</style>