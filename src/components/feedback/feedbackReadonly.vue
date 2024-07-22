<!-- 反馈 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <!-- <van-cell :value="info.B0001?info.B0001.value || msg:msg" title="文件标题" />
      <van-cell title="签发意见">
        <template #default>
          <div v-html="getVal('领导签发')"></div>
        </template>
      </van-cell>
      <van-cell title="会签意见">
        <template #default>
          <div v-html="getVal('部门会稿')"></div>
        </template>
      </van-cell>
      <van-cell title="科室审核">
        <template #default>
          <div v-html="getVal('部门审核')"></div>
        </template>
      </van-cell>
      <van-cell title="办公室核稿">
        <template #default>
          <div v-html="getVal('办公室核稿')"></div>
        </template>
      </van-cell>-->
      <van-cell :value="info['C-DB-FK-0002']?info['C-DB-FK-0002'].text ||msg:msg" title="" >
        <template #title>
          <span class="custom-title">反馈单位</span>
        </template>
      </van-cell>
      <van-cell :value="info['C-DB-FK-0001']?info['C-DB-FK-0001'].text || msg:msg" title="反馈人" />
      <van-cell :value="info['C-DB-FK-0004']?info['C-DB-FK-0004'].value || msg:msg" title="反馈时间" />
      <van-cell :value="info['C-DB-FK-0006']?info['C-DB-FK-0006'].value || msg:msg" title="反馈情况" />
      <van-cell :value="info['C-DB-FK-0007']?info['C-DB-FK-0007'].value || msg:msg" title="下一步工作" />
      <van-cell title="附件">
        <template #default>
          <filepre
            style="height:0.7rem"
            v-for="item in attach"
            :key="item.id"
            :name="item.title"
            :size="item.size"
            :url="item"
            @open="openFile"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import filepre from "./../enclosure/file";
export default {
  components: {
    filepre
  },
  name: "feedbackReadonly",
  data() {
    return {
      info: {},
      maininfo: {},
      attach: [],
      msg: "",
      docurl: ""
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let that = this;
      dsf.http
        .get(
          "/fn/xform/data?pk=" +
            this.$route.params.pk +
            "&moduleId=" +
            this.$route.params.moduleId,
          {}
        )
        .then(function(res) {
          that.maininfo = res.data.main;
          that.info = that.maininfo;
          console.log(that.maininfo);
          dsf.http
            .get("fn/mobileAttachment/getFormAttachment", {
              info_id: that.$route.params.pk,
              infoId: that.$route.params.pk,
              moduleId: that.$route.params.moduleId,
              start: 0,
              limit: 1000
            })
            .then(function(attach) {
                let attachs=[];
              if (attach.data.rows.length > 0) {
                for (let category of attach.data.rows) {
                  if (category.document) {
                    for (let doc of category.document) attachs.push(doc);
                  }
                }
              }
              console.log(attachs)
              that.attach = attachs;
            });
        });
    },
    async openFile(item) {
      var timestamp=new Date().getTime()
      let loginToken = dsf.util.loadSessionStore("loginToken");
      let fileUrl = dsf.url.getServerUrl(
        `fn/file/download?infoId=${item.infoId}&fileId=${item.id}&fileName=${item.title}&nrType=${item.type}&moduleId=${item.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${item.title}`
      );
      console.log(fileUrl)
      this.docurl = dsf.url.openOffice(encodeURIComponent(fileUrl));
      if(dsf.config.previewSetting.previewType==4){
        let data=await  dsf.http.post(`fn/office/mobile/wpsPreview`,{fileId:item.id,readOnly:item.canEdit>0?true:false})
        this.docurl=data.data.data
      }
      this.$router.push({ name: "dsfIframe", params: { url:this.docurl } });
    },
    getVal(key) {
      if (this.info.opinionList && this.info.opinionList[key]) {
        let opts = this.info.opinionList[key];
        let msg = "";
        for (let i in opts) {
          let opt = opts[i];
          // msg += opt.opinionContent + ' ' + opt.userName + ' ' + opt.opinionDate;
          //  + ' ' + opt.nodeName;
          msg += `
          <span>${opt.opinionContent}</span>
          <p style="text-align:left">${opt.userName} ${opt.opinionDate}</p>`;
        }
        return msg ? msg : "";
      } else {
        return this.msg;
      }
    }
  }
};
</script>
<style lang="scss">
.receipt-readonly .van-cell__title{
  width:120px !important;

}
</style>
