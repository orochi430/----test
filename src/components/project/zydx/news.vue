<template>
  <div class="news">
    <div class="news-search">
      <van-sticky :offset-top="offsetTop">
        <van-search
          v-model.trim="searchvalue"
          :clearable="false"
          show-action
          placeholder="搜索"
          @search="onSearch"
        >
          <template #left-icon>
            <i class="iconfont iconsousuo1" style="color: #fff"></i>
          </template>
          <template #action>
            <div @click="onSearch">筛选</div>
          </template>
          <template #right-icon v-if="searchvalue">
            <i
              class="iconfont iconguanbi"
              @click="
                searchvalue = '';
                onSearch();
              "
            ></i>
          </template>
        </van-search>
      </van-sticky>
    </div>
    <div class="news-list">
      <van-tabs
        v-model="tabactive"
        :line-width="tabs[tabactive].width"
        swipeable
        sticky
        :offset-top="offsetTopTab"
        :class="tabs.length > 4 ? 'swipe' : ''"
        @change="tabChange"
      >
        <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.name">
          <div class="news-list-content">
            <van-pull-refresh
              v-model="refreshing"
              :success-text="successtext"
              @refresh="onRefresh"
            >
              <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="finishedtext"
                @load="onLoad"
                :style="'min-height:' + contentHeight"
              >
                <div
                  v-for="val in data"
                  :key="val.id"
                  class="news-list-content-item"
                  :class="getCss(val)"
                  @click="toDetail(val)"
                >
                  <template v-if="val.ImagePath.length == 0">
                    <div class="con">
                      <div class="caption">
                        <p v-html="val.title"></p>
                      </div>
                      <div class="des">
                        <span class="item top" v-if="val.istop == 1">置顶</span>
                        <span class="item fbbm">{{ val.fbbm }}</span>
                        <span class="item date">{{ getCommentTime(val) }}</span>
                        <span class="item">{{ val.readnum }}浏览</span>
                      </div>
                    </div>  
                  </template>
                  <template v-if="val.ImagePath.length > 0">
                    <!-- 只有一个图 或者 有封面 -->
                    <div class="con">
                      <div class="caption">
                        <div class="img" v-if="val.ImagePath.length == 1 || val.coverimage == 1">
                          <img :src="val.ImagePath[0]" />
                        </div>
                        <p v-html="val.title"></p>
                      </div>
                      <div class="des">
                        <span class="item top" v-if="val.istop == 1">置顶</span>
                        <span class="item fbbm">{{ val.fbbm }}</span>
                        <span class="item date">{{ getCommentTime(val) }}</span>
                        <span class="item">{{ val.readnum }}浏览</span>
                      </div>
                    </div>  
                    <!-- 有多个图 并且 无封面 -->
                    <div class="imglist" v-if="val.ImagePath.length > 1 && val.coverimage == 0">
                      <template v-for="(pic, index) in val.ImagePath">
                        <div class="img" :key="index" v-if="index < 3">
                          <img :src="pic" />
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <van-image-preview v-model="imgpreview.show" :images="imgpreview.images" :startPosition="imgpreview.index" max-zoom="5" closeable="true" @change="onChangeImg">
    </van-image-preview> -->
  </div>
</template>
<script>
import debounce from "./tool.js"
export default {
  name: "zydxnews",
  data() {
    return {
      searchvalue: "", //检索项
      loading: false,
      finished: false,
      refreshing: false,
      successtext: "",
      finishedtext: "",
      offsetTop: 0,
      offsetTopTab: 0,
      startindex: 0,
      data: [],
      tabs: [
        {
          name: "全部",
          xwlx: "all",
          width: "3em",
        },
        {
          name: "校（院）新闻",
          xwlx: "xyxw",
          columnId: "1906101346159VJ7mL1KUHEZrQzKnGc",
          width: "7em",
        },
        {
          name: "通知公告",
          xwlx: "",
          columnId: "190521153131vU89yfMNTbfmiWYswU1",
          width: "5em",
        },
        {
          name: "部门动态",
          xwlx: "bmdt",
          columnId: "1906101346159VJ7mL1KUHEZrQzKnGc",
          width: "5em",
        },
      ],
      tabactive: 0,
      imgpreview:{
        show: false,
        images:[],
        index: 0
      },
      isload: true
    };
  },
  computed: {
    contentHeight: function () {
      let footerH = $("#app footer").height() || 0;
      let contentHeight = document.body.clientHeight - 120 - footerH + "px";
      return contentHeight;
    }
  },
  created() {
    var _this = this;
    //解决嵌在IM里之后  登录成功过会点击新闻不调接口问题
    setTimeout(function(){
      _this.startindex = 1;
      _this.getList();
    },500);
  },
  mounted() {
    this.$nextTick(() => {
      this.offsetTop = $("#appTop").height() || 0;
      this.offsetTopTab = this.offsetTop + $(".van-search").outerHeight() + 5;
    });
  },
  methods: {
    getCss(val) {
      let path = val.ImagePath;
      let coverimage = val.coverimage;
      let istop = val.istop;
      let css_str = "";
      if (path.length > 0) {
        if (path.length == 1 || coverimage == 1) {
          css_str = "haspic";
        }
        if (path.length > 1 && coverimage == 0) {
          css_str = "haspics";
        }
      }
      if(istop == 1){
        css_str += " istop";
      }
      return css_str;
    },
    //切换图片
    onChangeImg(index){
      this.imgpreview.index = index;
    },
    //点击预览图片
    showImg(val,index,isone){
      this.imgpreview.index = index;
      this.imgpreview.images = [];
      if(isone == 1){//只有一张图
        this.imgpreview.images = [val.ImagePath[0]];
      }else{
        val.ImagePath.forEach((img,i)=>{
          if(i<3){
            this.imgpreview.images.push(img);
          }
        })
      }
      this.imgpreview.show = true
    },
    onCancel() {
      this.searchvalue = "";
    },
    onRefresh() {
      this.isload = false;
      this.initData(1);
    },
    onSearch() {
      this.data = [];
      this.initData();
    },
    tabChange() {
      //this.data = [];
      this.initData();
    },
    onLoad() {
      if(this.isload){
        this.startindex++;
        this.getList();
      }else{
        this.loading = false;
      }
    },
    initData(isfresh) {
      this.finished = false;
      if (!isfresh) {
        this.loading = true;
      }
      this.startindex = 1;
      this.getList();
    },
    getApi() {
      let self = this;
      let api = "/ctrl/cmsManager/loadColumnById";
      if (self.tabactive == 0) {
        api = "/ctrl/cmsManager/loadColumnAllMsg";
      }
      return api;
    },
    //获取列表数据
    getList: debounce(function(){
      let self = this;
      if (self.startindex > 0) {
        let api = self.getApi();
        let obj = {};
        if (self.tabactive == 0) {
          obj = {
            istop: 1,
            key: self.searchvalue,
            page: self.startindex,
            limit: 15,
          };
        } else {
          obj = {
            columnId: self.tabs[self.tabactive].columnId,
            istop: 1,
            issyxs: 1,
            xwlx: self.tabs[self.tabactive].xwlx,
            page: self.startindex,
            limit: 15,
            key: self.searchvalue,
          };
        }
        self.successtext = "";
        self.finishedtext = "";
        dsf.http
          .post(api, obj)
          .then((res) => {
            if (res.data.type == "success") {
              let data = res.data.data;
              data.forEach(function (item) {
                if (item.ImagePath) {
                  item.ImagePath = item.ImagePath.split("|");
                } else {
                  item.ImagePath =[];
                  //  item.ImagePath = ["../../../../static/images/logo.jpg","../../../../static/images/logo.jpg","../../../../static/images/logo.jpg","../../../../static/images/logo.jpg"];
                  //item.ImagePath = ["../../../../static/images/logo.jpg"];
                }
              });
              // self.successtext = "已为您搜索到" + data.length + "条内容";
              self.successtext = "刷新成功";
              if (self.refreshing) {
                self.refreshing = false;
              }
              self.loading = false;
              if (self.startindex == 1) {
                self.data = [];
              }
              if (data.length < 15 || data.length == 0) {
                self.finished = true;
                self.finishedtext = "没有更多了";
              }
              let listdata = data;
              if (self.searchvalue) {
                //高亮检索的内容
                listdata.forEach(function (item) {
                  item.title = self.showKeyWord(item.title);
                });
              }
              if (self.data.length > 0) {
                self.data = [...self.data, ...listdata];
              } else {
                self.data = listdata;
              }
            } else {
              self.refreshing = false;
              self.loading = false;
              self.finished = true;
              self.dsf.layer.toast(res.data.message, false);
            }
            self.isload = true
          })
          .catch((res) => {
            self.dsf.layer.toast(res.message || "失败");
          })
          .finally(() => {});
      }
    },0),
    //高亮搜索字
    showKeyWord(val) {
      var str = val;
      let s = this.searchvalue;
      if (str && s) {
        //复制过来的数据中间带有空格的，去除中间空格，字符之间用逗号隔开
        let inputvalue = s.replace(/\ +/g, ","); //把空格分开的字符串转换成以逗号分割
        let keyWordArr2 = inputvalue.split(","); //把字符串转换成数组
        // 当对话内容中有包含搜索框中的字符串时
        if (str && str != "") {
          keyWordArr2.forEach((e) => {
            let regStr = "" + `(${e})`;
            let reg = new RegExp(regStr, "g");
            str = str.replace(
              reg,
              '<span style="color:red; font-weight: bold;">' + e + "</span>"
            );
          });
        }
      }
      return str;
    },
    //查看详情
    toDetail(val) {
      let title = val.columnname;
      this.$router.push({
        path: "/zydx/newsdetail?title="+title,
        query: {
          id: val.id || "",
          t: Math.random(),
        },
      });
      setTimeout(function () {
        val.readnum = Number(val.readnum) + 1;
      }, 300);
    },
    //格式化时间
    formatDate(date) {
        date = new Date(date.replace(/-/g, "/"));
        return dsf.date.format(date, "yyyy-mm-dd hh:ii:ss");
    },
    getCommentTime(item){
      if(item.pubtime && item.currentTime){
        const createTime = new Date(this.formatDate(item.pubtime)).getTime();
        const serverTime = new Date(this.formatDate(item.currentTime)).getTime();
        const interval = (serverTime - createTime) / 1000
        if (interval < 60) {
          return '刚刚'
        } else if (interval < 60 * 60) {
          let tempTime = Math.floor(interval / 60)
          return `${tempTime}分钟前`
        } else if (interval < 60 * 60 * 24) {
          let tempTime = Math.floor(interval / (60 * 60))
          return `${tempTime}小时前`
        } else if (interval < 60 * 60 * 24 * 10) {
          let tempTime = Math.floor(interval / (60 * 60 * 24))
          return `${tempTime}天前`
        }else {
          return item.date
        }
      }else{
        return item.date
      }
    }
  },
};
</script>
<style lang='scss' scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.news {
  // * {
  //   font-family: 'pf-regular';
  // }
  ::v-deep .van-tab {
    flex: 1 0 auto;
  }
  ::v-deep .van-tabs {
    .van-sticky {
      margin-top: -0.2rem;
    }
  }
  ::v-deep .van-tabs__wrap {
    background: #fff;
    box-shadow: 0 1px 6px 0 rgba(80,126,170,0.10);
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 0 15px;
  }
  ::v-deep .van-tab__pane {
    padding: 0 0.3rem;
    background-image: linear-gradient(227deg, #FFE9E3 0%, #FFFFFF 10%);
    box-shadow: 0px 0px 2px 0px rgba(211,168,168,0.47);
    border-radius: 6px;
  }
  ::v-deep .van-pull-refresh__head {
    top: 10px;
  }
  ::v-deep .van-tab {
    color: #666;
  }
  ::v-deep .van-tab.van-tab--active {
    @include font-theme("normal","true");
    font-weight: bold;
  }
  ::v-deep .van-tabs__line {
    @include background-theme("normal", "true");
  }
  ::v-deep .van-tabs__content {
    margin-top: 60px;
    border-radius: 6px;
    padding-top: 0px;
    background: #fff;
    box-shadow: 0px 3px 3px 0px rgba(229, 229, 229, 0.5);
  }
  .news-search {
    position: fixed;
    width: 100%;
    top:0;
    left:0;
    z-index:10;
    .van-search {
      @include background-theme("normal", "true");
      padding: 0.2rem 0.04rem 0.32rem 0.2rem;
      border-bottom: 1px solid #f5f5f5;
      // .van-cell {
      //   height: auto;
      //   display: flex;
      //   align-items: center;
      // }
      .van-search__content {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
      ::v-deep .van-field__left-icon {
        color: #fff;
      }
      .van-search__action {
        color: #fff;
      }
      .van-search__action:active {
        background: transparent !important;
      }
      .van-field__right-icon {
        position: absolute;
        right: 0px;
        top: 0px;
        i {
          color: #fff;
        }
      }
    }
    ::v-deep .van-icon {
      color: #fff !important;
    }
    ::v-deep .van-field__control {
      color: #fff;
    }
    ::v-deep input::-webkit-input-placeholder {
      color: #fff;
    }
  }
  .news-list {
    padding: 0 0.2rem;
    ::v-deep .van-sticky--fixed {
      padding: 0 0.2rem;
    }
    ::v-deep .van-list__error-text, 
    ::v-deep .van-list__finished-text, 
    ::v-deep .van-list__loading {
      margin-top: 0.2rem;
    }
    .news-list-content {
      .news-list-content-item {
        padding: 0.24rem 0;
        border-top: 1px dashed #CCC;
        &:first-child {
          border-top: 0;
        }
        .caption {
          margin-bottom: 0.2rem;
          @include font_4;
          color: #333;
          p {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .des {
          display: flex;
          align-items: center;
          //font-size: var(--font_size_4);
          @include font_7;
          color: #666;
          .item {
            margin-right: 0.3rem;
            &.top {
              @include font-theme("normal");
            }
            &.fbbm {
              max-width: 32vw;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            &:last-child {
              margin-right: 0;
            }
          }
          span,.item{
            line-height: 18px!important;
          }
        }
        &.istop {
          .fbbm {
            max-width: 30vw!important;
          }
        }
        &.haspics {
          // .fbbm{
          //   max-width:40vw;
          // }
          .imglist {
            margin-top: 0.1rem;
            display: flex;
            .img {
              width: 31%;
              height: 70px;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
              &:nth-child(2) {
                margin: 0 3.5%;
              }
            }
          }
        }
        &.haspic {
          .caption {
            display: flex;
            .img {
              width: 100px;
              height: 70px;
              border-radius: 5px;
              overflow: hidden;
              margin-right: 0.2rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              flex: 1;
              height: fit-content;
            }
          }
        }
      }
    }
  }
}
</style>