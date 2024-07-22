<template>
<!-- 公务助手 -->
  <div class="box">
    <!-- <div class="nav">
      <van-icon name="arrow-left" class="navicon" @click="$router.go(-1)" />
      <p>公务助手</p>
    </div> -->
    <div class="dsf-list">
      <div class="menu" v-for="(item,index) in menuJson" :key="index" @click="goFun(item,index)">
        <img :src="item.img" alt :onerror='default_img' />
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"assistant",
  data(){
    return {
      default_img: 'this.src="' + require('static/squMenu/tatj.png') + '"',
      menuJson:[
        {
          img: 'static/assistant/cczsfbz.png',
          name:"出差住宿费标准",
          url:"/assistantStandard"
        },
        {
          img: 'static/assistant/jdyd.png',
          name:"酒店预订",
          url:"https://h5.m.taobao.com/trip/hotel/search/index.html?spm=181.7474825.entry.d2&scm=&dd_wx_android_ver=100.0.0&_projVer=1.17.20#/"
        },
        {
          img: 'static/assistant/jtcx.png',
          name:"交通出行",
          url:"https://gzcx.jxjt.gov.cn/logindex.html?v=0.5623247480169616"
        },
        {
          img: 'static/assistant/grgjcx.png',
          name:"个人轨迹查询",
          url:"https://app.10086.cn/activity/epidemicQuery/index.html"
        },
        // {
        //   img: 'static/assistant/szffw.png',
        //   name:"省行政中心服务电话",
        //   url:"http://college.gdtv.cn/dsfa/nc/mobile/dist/webmobile/index.html#/newsListPage?lmid=bab88650d8e84cd59a71642fb52c4d40&title=%E5%85%AC%E5%8A%A1%E5%B0%8F%E5%B8%AE%E6%89%8B"
        // },
        {
          img: 'static/assistant/hlhs.png',
          name:"汇率换算",
          url:"https://huilv.911cha.com/"
        },
      ]
    }
  },
  methods:{
    goFun(data,index){
      if(index>0){
        location.href=data.url
      }else{
        this.$router.push(data.url)
      }
      
    }
  },
  created(){
    
  },
  mounted(){
    document.title = "公务助手";
    if(window.dd){
      if (window.dd.biz) {
        window.dd.biz.navigation.setTitle({title:"公务助手"})
      }else{
        window.dd.setTitle({
          title: "公务助手",
          onSuccess: function(result) {
          // alert('succcess')
          },
          onFail: function(err) {
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width:100%;
    height:100%;
    background:white;
    .nav{
      background:#3d7fff;
      height:45px;
      line-height: 45px;
      color:white;
      text-align: center;
      display: flex;
      align-items: center;
      padding:0 10px;
      p{
        flex:1;
      }
    }

    .dsf-list {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 20px 10px 0.64rem;
      width: 100%;
      // height: 100%;

      .menu {
      display: inline-block;
        width: 33%;
        text-align: center;
        margin-bottom: 15px;

        img {
          display: inline-block;
          width: 48px;
          height:48px;
          vertical-align: middle;
          margin-bottom: 6px;
          border:none;
        }

        p {
          font-size: var(--font_size_2);
          color: #333333;
          letter-spacing: 1px;
        }
      }

      .menu:nth-child(n + 4) {
        // margin-bottom: 0;
      }
    }
  }
</style>
