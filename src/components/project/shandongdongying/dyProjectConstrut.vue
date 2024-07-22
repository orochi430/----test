<template>
  <div class="dyProjectConstrut">
      <ul class="dyProjectConstrut_menu">
          <li v-for="(item,index) in list" :key = 'index' @click="enterProDynamics(item,index)">
              <img :src="item.url" alt="">
              <p>{{item.title}}</p>
          </li>
      </ul>
      <ul class="dyProjectConstrut_img">
          <li v-for="(item,index) in showDataArr" :key='index' >
              <!-- <img src="../../../../static/images/shandongdongying/yd5.jpg" alt=""> -->
              <img :src="getUrl(item)" alt="">
          </li>
      </ul>
    <div>
      <van-pagination class="pagFix" v-model="currentPage" :total-items="total"  :items-per-page='pageSize'  @change="changeImg">
        <template #prev-text>
            <van-icon name="arrow-left" />
        </template>
        <template #next-text>
            <van-icon name="arrow" />
        </template>
        <template #page="{ text }">{{ text }}</template>
        </van-pagination>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Pagination } from "vant";

Vue.use(Pagination);
export default {
  data() {
    return {
        list:[
            {url:require('static/images/shandongdongying/xmdt.png'),title:'项目建设动态',type:''},
            {url:require('static/images/shandongdongying/yjksp.png'),title:'一键看视频',type:'video'},
            {url:require('static/images/shandongdongying/yjktp.png'),title:'一键看图片',type:'image'},
        ],
        currentPage:1,
        xmjsDataArr:[],
        total:0,
        pageSize:2,
        showDataArr:[],
    };
  },
  created() {
    this.getXmjsData();
  },
  mounted() {},
  computed:{
     getUrl(){
         return(item) =>{
              return dsf.url.getServerUrl(item.imgAppUrl.substring(1,item.imgAppUrl.length))
         }
         
      }
  },

  methods: {
    getXmjsData(){
        dsf.http.post("/fn/sjgwcPortalController/getXmjsData", { type: 'app' }).done((res) => {
            console.log(res)
            if (res.error_code == "0" && res.data) {
                this.getXmjsDataArr = res.data;
                this.total = res.total;
                this.showDataArr = this.getXmjsDataArr.slice(0,this.currentPage*this.pageSize)
            }
        });
    },
    enterProDynamics(item,index){
        if(index==0){
            this.$router.push({
                path: "/commonList",
                query: {
                    fileType: "xmdtjs_dy",
                },
            });
        }else if(index==1||index==2){
            this.$router.push({
                path: "/dyProjectVideoandImg",
                query: {
                    type: item.type,
                },
            });
        }
    },
    changeImg(currentPage) {
        let start = (currentPage-1)*this.pageSize;
        let end = currentPage*this.pageSize;
        if(currentPage*this.pageSize>=this.total||(currentPage-1)*this.pageSize>=this.total){
            end = this.total;
        }
        this.showDataArr = this.getXmjsDataArr.slice(start,end);
    },
  },
};
</script>
<style lang="scss" scoped>
.dyProjectConstrut{
    padding: 0.2rem;
    .dyProjectConstrut_menu{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 10px;
        li{
            width: 30%;
            img{
                width: 100%;
                height: 100px;
            }
            p{
                text-align: center;
                font-size: var(--font_size_3);
                margin-top: 6px;
            }
        }
    }
    .dyProjectConstrut_img{
        height: calc(100vh - 4.8rem);
        overflow: auto;
        li{
            margin-bottom: 5px;
        }
    }
    .pagFix {
        position: fixed;
        bottom: 5px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: #ddd;
    }
}
</style>