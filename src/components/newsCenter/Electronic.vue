<template>
  <div class="ds-announcement">
    <!-- <div class="announcement-header">
      <van-nav-bar title="电子刊物" />
    </div> -->
    <div class="announcement-search">
      <form action="/">
        <van-search v-model="value" placeholder="搜索" @search="onSearch" @clear="onClear" />
      </form>
    </div>
    <div :style="contentHeight" class="announcement-list">
      <div class="announcement-list-inner">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
          <div v-for="(val) in data" :key="val.id" class="announcement-list-content" @click="toDtail(val)">
            <div class="announcement-list-content-tit clamp">{{ val.title }}</div>
            <div class="announcement-list-time">
              <div class="announcement-list-time-left">
                <i class="iconfont">&#xe635;</i>
                <span>{{ val.userName }}</span>
              </div>
              <div class="announcement-list-time-right">
                <i class="iconfont">&#xe618;</i>
                <span>{{ val.time }}</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../common/util";
export default {
  name: "electronic",
  data() {
    return {
      value: "",
      data: {},
      obj_hei: { height: "" },
      // serverurl: dsf.url.ge
      docurl: "",
      office365: "https://doc.pudong.gov.cn:1443/?furl=",
      loading: false,
      finished: false,
      start: 0,
      limit: 15
    };
  },
  computed: {
    contentHeight: function () {
      let contentHeight1= document.body.clientHeight;
      this.obj_hei.height = contentHeight1 - 62 + "px";
      return this.obj_hei;
    }
  },
  created() {
    this.getList();
  },
  mounted() {
  },
  methods: {
    onSearch(val) {
      this.start = 0;
      this.getList();
    },
    onClear() {
      this.getList();
    },
    async toDtail(val) {
      if (val.attachList.length != 0) {
        var timestamp=new Date().getTime()
        let fileUrl = dsf.url.getServerUrl(
          "fn/file/download?infoId=" +
          val.attachList[0].infoId +
          "&fileId=" +
          val.attachList[0].id +
          "&fileName=" +
          val.attachList[0].title +
          "&nrType=" +
          val.attachList[0].type +
          "&moduleId=" +
          val.moduleId +
          "&x-auth-token=" +
          store.loadSessionStore("loginToken"))+
          `&fullfilename=${timestamp}` +val.attachList[0].title;
        this.docurl = dsf.url.openOffice(fileUrl);
        if(dsf.config.previewSetting.previewType==4){
          let data=await  dsf.http.post(`fn/office/mobile/wpsPreview`,{fileId:item.id,readOnly:item.canEdit>0?true:false})
          this.docurl=data.data.data
        }
        this.$router.push({ name: "dsfIframe", params: { url: this.docurl } });
      } else {
        this.dsf.layer.toast("没有对应的文件");
      }
    },
    getList() {
      let obj = {
        start: this.start,
        limit: this.limit,
        module: "kw",
        key: this.value
      };
      dsf.http
        .post("/fn/mobileXXBS/getkwORgkList", obj)
        .then(res => {
          if (res.status === 200) {
            this.data = res.data;
            for (let i = 0, len = this.data.length; i < len; i++) {
              this.data[i].time = this.getTime(this.data[i].time);
            }
            this.loading = false
            if (res.data.length < this.limit) {
              this.finished = true;
            }
          } else {
            this.dsf.layer.toast(res.message);
          }
        })
        .catch(res => {
          this.dsf.layer.toast(res.message);
        })
        .finally(() => { });
    },
    getTime(time) {
      return dsf.date.format(new Date(time), 'yyyy-mm-dd');
    },
    onLoad() {
      let obj = {
        start: this.start + this.limit,
        limit: this.limit,
        module: "kw",
        key: this.value
      };
      this.start = obj.start;
      dsf.http
        .post("/fn/mobileXXBS/getkwORgkList", obj)
        .then(res => {
          if (res.status === 200) {
            res.data.forEach(v => {
              v.time = this.getTime(v.time);
            });
            for (let i = 0; i < res.data.length; i++) {
              this.data.push(res.data[i]);
            }
            this.loading = false;
            if (res.data.length < this.limit) {
              this.finished = true;
            }
          } else {
            this.dsf.layer.toast(res.message);
          }
        })
        .catch(res => {
          this.dsf.layer.toast(res.message);
        })
        .finally(() => { this.loading = false });
    },
  }
};
</script>


