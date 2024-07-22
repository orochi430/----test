<template>
  <div class="newsdetail">
    <div class="new-list">
      <div class="title">{{ title }}</div>
      <div class="des">
        <span class="fbbm">{{ fbbm }}</span>
        <span class="datetime">{{ datetime }}</span>
      </div>
      <div class="content">
        <!-- <div v-if="video.showVideo" id="video">
          <VPlayer :video="video"></VPlayer>
        </div> -->
        <!-- 视频 -->
        <div id="video" class="playerWrap video-player contentTxt" v-if="videourl"></div>
        <div class="editorhtml" v-html="content"></div>
        <div v-if="file && file.length > 0" class="filelist">
          <h6>附件：</h6>
          <ul>
            <li v-for="(file, index) in file" :key="index" @click="openfile(file)">{{ file.filename }}</li>
          </ul>
        </div>
        <div class="fbr" v-if="isVideoNews && fbr">（责任编辑 {{ fbr }}）</div>
      </div>
    </div>
    <van-image-preview v-model="imgpreview.show" :images="imgpreview.images" :startPosition="imgpreview.index" max-zoom="5" :closeable="true" @change="onChangeImg">
    </van-image-preview>
  </div>
</template>
<script>
// import VPlayer from "@/components/common/VideoPlayer";
// import videojs from "video.js";
// import "videojs-contrib-hls";
export default {
  name: "zydxnewsdetail",
  // components: {
  //   VPlayer
  // },
  data() {
    return {
      id: this.$route.query.id || "",
      title: "",
      fbbm: "",
      datetime: "",
      content: "",
      file: [],
      fbr: "",
      video: {
        type:"",
        src:"",
        videoTitle:"",
        showVideo: false,
      },
      imgpreview:{
        show: false,
        images:[],
        index: 0
      },
      videourl:"",
      isVideoNews: false//是否是视频新闻
    }
  },
  mounted() {
    let self = this
    dsf.loadJs('static/js/ckplayer/ckplayer.js').then(() => {
      self.getDetail();
      self.recordReadMsg();
    })
    .catch(err => {
      self.getDetail();
      self.recordReadMsg();
    })
  },
  methods: {
    //获取详情
    getDetail() {
      let self = this;
      let obj = {
        id: self.id,
        ispc: 0
      }
      dsf.http.post("/ctrl/cmsManager/getInfomationById", obj)
        .then(res => {
          if (res.data.type == "success") {
            let data = res.data.data[0];
            self.title = data.title;
            self.fbbm = data.fbbm;
            self.datetime = data.date1;
            self.content = data.content || data.contenttext;
            self.file = data.file;
            self.fbr = data.fbr;
            if(data.columnname == "视频新闻"){
              self.isVideoNews = true;
              self.getVideoById();  
            }

            self.$nextTick(()=>{
              let i = 0;
              $(".editorhtml img").each(function(){
                let src = $(this).attr("src");
                self.imgpreview.images.push(src);
                $(this).attr("index",i);
                i++;
              })
              $(".editorhtml img").off("click").on("click",function(){
                let index = $(this).attr("index");
                self.imgpreview.index = index;
                self.$nextTick(()=>{
                  self.imgpreview.show = true;
                })
              })
            })
          } else {
            self.dsf.layer.toast(res.data.message, false);
          }
        })
        .catch(res => {
          self.dsf.layer.toast(res.message || "失败");
        })
        .finally(() => { });
    },
    //获取视频地址
    getVideoById(){
      let self = this;
      dsf.http.post("/ctrl/cmsManager/getInfomationVideoById", {id: self.id})
        .then(res => {
          if (res.data.type == "success") {
            if(res.data.data.length>0){
              let vdeurl = res.data.data[0].vdeurl;
              self.videourl = vdeurl;
              if(vdeurl){
                self.$nextTick(function(){
                  var videoObject = {
                      playerID: 'ckplayer01',
                      container: '#video',
                      variable: 'player',
                      html5m3u8: true,
                      autoplay: false,
                      drag: 'start',
                      debug: false,
                      /*poster: imgurl,*/
                      video: vdeurl
                  };
                  try{
                    var player = new ckplayer(videoObject)
                  }catch(e){
                    console.log(e)
                  }
                })
              }
              //self.video.src = vdeurl;
              // let type = vdeurl.split(".")[1];
              // self.video.type = type == 'm3u8' ? 'application/x-mpegURL' : "video/" + type;
              // self.video.showVideo = true;
            }
          } else {
            self.dsf.layer.toast(res.data.message, false);
          }
        })
        .catch(res => {
          self.dsf.layer.toast(res.message || "失败");
        })
        .finally(() => { });
    },
    //切换图片
    onChangeImg(index){
      this.imgpreview.index = index;
    },
    //记录浏览次数
    recordReadMsg() {
      let self = this;
      let obj = {
        id: self.id
      }
      dsf.http.post("/ctrl/cmsManager/recordReadMsg", obj)
        .then(res => {
        })
        .catch(res => {
        })
        .finally(() => { });
    },
    //打开附件
    openfile(item) {
      if(item.filepath){
        //let filepath = item.filepath.split("url=")[1];
        this.$router.push({
          path: "/zydx/filepreview",
          query: {
            url: item.filepath
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.newsdetail {
  padding: 0.2rem;
  height: calc(100vh - 1rem);
  overflow-y: auto;
  // * {
  //   font-family: 'pf-regular';
  // }
  .new-list{
    padding: 0.2rem;
    background: #fff;
    box-shadow: 0px 0px 2px 0px rgba(211,168,168,0.47);
    border-radius: 10px;
    overflow: hidden;
  }
  .title {
    text-align: center;
    @include font_2;
    line-height: 1.6em;
    padding: 0em 0em 0.3em;
    font-weight: bold;
  }

  .des {
    text-align: center;
    @include font_6;
    color: #666;
    margin: 0.1rem 0 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .fbbm {
      max-width: calc(100% - 3.5rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .datetime {
      width: 3rem;
    }
  }

  .content {
    padding: 0.2rem 0;
    @include font_4;

    .editorhtml {
      ::v-deep p {
        @include font_5("true");
        line-height: 33px!important;
        text-indent: 2em;
        * {
          @include font_5("true");
          font-family: -apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif !important;
          position: static!important;
          margin-left: 0!important;
          margin-right: 0!important;
        }
      }
      ::v-deep img {
        display: block;
        max-width: 100%;
        margin: 0 auto!important;
        width: auto!important;
        border-radius: 6px;
      }
    }

    .filelist {
      display: flex;
      padding: 0.2rem 0;

      h6 {
        width: 45px;
        white-space: nowrap;
      }

      ul {
        flex: 1;
      }

      li {
        color: blue;
        word-break: break-all;
      }
    }
  }
}
</style>