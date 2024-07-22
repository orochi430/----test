<template>
  <div class="ds-announceDetail">
    <div class="announcement-header">
      <van-nav-bar title="通知公告" />
    </div>
    <div class="announceDetail-tab">
      <van-tabs v-model="active">
        <van-tab :style="contentHeight" title="基本信息">
          <div class="announceDetail-tab-content">
            <div class="announceDetail-tab-content-tit">
              中共中央政治局常务委员会召开会议
              听取疫情防控工作中央指导组工作汇报的通知
            </div>
            <div class="announcement-list-time">
              <div class="announcement-list-time-left">
                <i>发布者:</i>
                <span>张三</span>
              </div>
              <div class="announcement-list-time-right">
                <i>发布时间:</i>
                <span>2020-05-04</span>
              </div>
            </div>
            <div class="announceDetail-tab-content-datail">
              习近平指出，党中央决定向湖北等疫情严重地区派出指导组，督促贯彻落实党中央关于疫情防控工作各项决策部署，
              全面加强疫情防控第一线工作指导。在党中央坚强领导和全国各族人民大力支持下，中央指导组同湖北人民和武汉人民并肩作战，
              突出抓好源头防控、患者救治、物资保障三项重点，下最大气力控制疫情流行，努力守住全国疫情防控第一道防线，
              展现了中国力量、中国精神、中国效率，为打赢疫情防控的人民战争、总体战、阻击战作出了重要贡献。
              习近平强调，当前，境外疫情扩散蔓延势头并没有得到有效遏制，国内个别地区出现聚集性疫情，新冠肺炎疫情还有很大不确定性。
              湖北省疫情防控已由应急性超常规防控向常态化防控转变，但并不意味着防控措施可以松一松、歇一歇。党中央决定继续派出联络组，
              加强对湖北省和武汉市疫情防控后续工作指导支持。要继续指导做好治愈患者康复和心理疏导工作，督促落实常态化疫情防控举措，
              外防输入、内防反弹，要毫不懈怠抓好各项工作，巩固疫情防控成果，决不能前功尽弃。要协调推动湖北省和武汉市在做好常态化疫情防控工作的同时，
              推动支持湖北省经济社会发展一揽子政策落实到位，加快恢复生产生活正常秩序。
            </div>
          </div>
        </van-tab>
        <van-tab :style="contentHeight" title="相关文件">
          <enclosure-button @open-file="openFile" />
          <enclosure-pre :file-url="fileUrl" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="announceDetail-tabbar">
      <div class="announceDetail-tabbar-left" @click="dayinClick">
        <i class="iconfont">&#xe612;</i>
        <span>打印</span>
      </div>
      <div class="announceDetail-tabbar-right" @click="goutongClick">
        <i class="iconfont">&#xe61a;</i>
        <span>沟通</span>
      </div>
    </div>
    <!-- <iframe
        v-show="!notSp"
        :src="docurl"
        width="100%"
        height="100%"
        frameborder="1"
    ></iframe> -->
  </div>
</template>

<script>
import EnclosureButton from './../enclosure/EnclosureButton'
import EnclosurePre from './../enclosure/EnclosurePre'
export default {
  name: 'announceDetail',
  components: {
    EnclosureButton,
    EnclosurePre
  },
  data() {
    return {
      notSp: false,
      active: 0,
      actives: 0,
      fileUrl: '', // 预览文件的链接
      obj_hei: { height: '' },
      docurl: ''
    }
  },
  computed: {
    contentHeight: function () {
      let contentHeight = document.body.clientHeight
      this.obj_hei.height = (contentHeight - 170) + 'px'
      return this.obj_hei
    }

  },
  created() {
    this.docurl = this.$route.query.url
  },
  mounted() {
  },
  methods: {
    onChange(index) {
      console.log(index)
    },
    // 预览文件
    openFile(item) {
      this.fileUrl ='http://116.230.14.120:9031/DreamMobile/fn/file/download?infoId=200227153051zzr9X8OtgDJqoM6KP6Q&fileId=200227154106XJvaPsmVe2lQ4UkHDsT&fileName=测试正文.docx&nrType=1&moduleId=200201134851eEu0uTZ7flLMglxhn1I&x-auth-token=191213191439W7tOGuTwd4Rl7M5i3BQ-61ddb2074b3c492d8e205bf7d7f79d0d'
    },
    dayinClick() {
    },
    goutongClick() {
    }
  },
}
</script>
<style lang="scss" scoped>
#app .van-tab.van-tab--active {
  // color: #333333 !important;
}

#app .van-tabs__line {
  background-color: #0089ff !important;
}
</style>