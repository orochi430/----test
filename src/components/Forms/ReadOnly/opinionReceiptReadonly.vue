<!-- 收文 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group>
      <!-- <van-cell :value="info.B0001?info.B0001.value || '':''" title="文件标题" />
      <van-cell :value="info['C-LW-0001']?info['C-LW-0001'].value || '':''" title="来文单位" />
        
      <van-cell title="领导批示">
        <template #default>
          <div v-html="getVal('领导批示')"></div>
        </template>
      </van-cell>
      <van-cell title="拟办意见">
        <template #default>
          <div v-html="getVal('办公室拟办')"></div>
        </template>
      </van-cell>
      <van-cell title="办理情况">
        <template #default>
          <div v-html="getVal('科室办理')"></div>
        </template>
      </van-cell>
      <van-cell :value="info['C-LW-0016']?info['C-LW-0016'].value || '':''" title="来文文号" />
      <van-cell :value="info.B0013?info.B0013.value || '':''" title="来文日期" />
      <van-cell :value="info.B0021?info.B0021.value || '':''" title="收文日期" />
      <van-cell :value="info.B0003?info.B0003.value || '':''" title="收文编号" />
      <van-cell :value="info.B0006?info.B0006.text || '':''" title="紧急程度" />
      <van-cell :value="info.B0018?info.B0018.value || '':''" title="办理期限" />-->

      <van-cell
        :value="maininfo['2003092135402UzHeOPIWnQXwpt4mig']?maininfo['2003092135402UzHeOPIWnQXwpt4mig'].value || '':''"
        title="签发人"
      />
      <van-cell
        :value="maininfo['C-R-RCV-0030']?maininfo['C-R-RCV-0030'].value || '':''"
        title="签发时间"
      />
      <van-cell title="意见">
        <template #default>
          <div
            v-html="maininfo['200401165633xuXK6ujlrJxGj8Qpq4y']?maininfo['200401165633xuXK6ujlrJxGj8Qpq4y'].value || '':''"
          ></div>
        </template>
      </van-cell>
      <van-cell title="附件">
        <template #default>
          <filepre
            style="height:0.5rem"
            v-for="item in attach"
            :key="item.id"
            :name="item.title"
            :size="item.size"
            :url="item.url"
            @open="openFile"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import EnclosureButton from "./../../enclosure/EnclosureButton";
import EnclosureItem from "./../../enclosure/EnclosureItem";
import filepre from "./../../enclosure/file";
export default {
  name: "ReceiptReadonly",
  components: {
    EnclosureButton,
    EnclosureItem,
    filepre
  },
  data() {
    return {
      maininfo: {},
      attach: {}
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let url = "/fn/xform/data?pk=" + this.$route.params.pk;
      var that = this;
      let attachs=[];
      dsf.http.get(url, {}).then(function(data) {
        if (data && data.data && data.data.main) {
          that.maininfo = data.data.main;
          // that.info_id = that.maininfo['A0001'].value
        }
        dsf.http
          .get("fn/mobileAttachment/getFormAttachment", {
            info_id: that.$route.params.pk,
            infoId: that.$route.params.pk,
            start: 0,
            limit: 1000
          })
          .then(function(attach) {
            if(attach.data.rows.length>0)
            {
              for(let category of attach.data.rows)
              {
                if(category.document)
                {
                  for(let doc of category.document)
                  attachs.push(doc);
                }

              }
            }
            that.attach = attachs;
          });
        console.log(that.maininfo);
      });
    },
    openFile(url) {
      let fileUrl = dsf.url.getServerUrl(url);
      this.docurl = dsf.url.openOffice(fileUrl);
      this.$router.push({ name: "dsfIframe", params: { url: this.docurl } });
    },
  }
};
</script>
