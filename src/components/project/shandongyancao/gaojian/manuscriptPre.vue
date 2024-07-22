<template>
  <div class="tobacco-index">
    <div>
      <div class="logo-top">
        <img src="../../../../../static/images/shandongyancao/conference/smoking.png" alt="">
        吸烟有害健康提示，谢绝十八周岁以下人士浏览本站
      </div>
      <div class="tobacco-logo">
        <img class="logo-img" src="../../../../../static/images/shandongyancao/conference/logoZy.png" alt="">
        <div class="toolbar-img">
          <img class="searchBtn" src="../../../../../static/images/shandongyancao/conference/search.png" alt="">
          <img class="moreBtn" src="../../../../../static/images/shandongyancao/conference/more.png" alt="">
        </div>
      </div>
      <div class="house-logo">
        <img src="../../../../../static/images/shandongyancao/conference/home.png" alt="">
        <div class="shu">|</div>
        <div class="details">详情</div>
      </div>
    </div>
    <div class="detailst">
      <div class="header-cont">
        {{conTitle}}
      </div>
      <div class="details-cont">
        <span>投稿单位:{{unit}} &nbsp;</span>
        <span>发表时间:{{dataTime}}</span>
        <span style="margin-left:10px">作者：{{author }}</span>
      </div>
      <div class="linene">

      </div>
      <div class="details-content">
        <div v-html="content"></div>
      </div>
    </div>
    <div>
      <div class="tobacco-footer">
        <div class="number">访问量：<span class="main-number">2347890</span><span>｜</span>网站地图</div>
        <div>Copyright© 2017山东中烟工业有限责任公司版权所有</div>
        <div class="last">鲁ICP备09052569号-1</div>
      </div>
    </div>

  </div>
</template>

<script>
import urlJs from "@/common/url";
export default {
  name: "SDYCManuscriptPre",
  components: {},
  data() {
    return {
      conTitle: '',//标题
      content: '',//主体内容
      dataTime: '',//时间
      unit: '',//投稿单位
      author: ''//作者
    };
  },
  computed: {},
  watch: {},
  methods: {
    initInfo() {
      dsf.http.get("/fn/sdycGaojian/getManuscriptPre", { pk: this.$route.query.pk }).then((res) => {
        if (res.data.code) {
          this.conTitle = res.data.data.conTitle;
          this.content = res.data.data.content;
          this.dataTime = res.data.data.dataTime;
          this.unit = res.data.data.unit;
          this.author = res.data.data.author;
        }
        else
          dsf.layer.toast(res.data.meseage)

      })
    }
  },
  created() {
    this.initInfo()
  },
  mounted() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    urlJs.setTitle('稿件预览');
  },
};
</script>
<style lang="scss" scoped>
.tobacco-index {
  width: 100%;
  /* height: calc(100%-20px); */
  padding: 0;
  margin: 0;
  outline: none;
}

/* 顶部内容 */
.logo-top {
  display: flex;
  align-items: center;
  padding: 6.5px 0px 2px 10px;
  box-sizing: border-box;
  font-size: 11px;
  color: #666666;
  letter-spacing: 0;
  background: #fdfaf7;
}

.logo-top img {
  width: 12px;
  height: 12px;
  margin-right: 2px;
  cursor: pointer;
}

.tobacco-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  box-sizing: border-box;
}

.logo-img {
  height: 25px;
}

.toolbar-img {
  display: flex;
  align-items: center;
}

.toolbar-img img:first-child {
  margin-right: 4.5px;
}

.toolbar-img img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.house-logo {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(151, 151, 151, 0.33);
  padding-bottom: 4.5px;
  margin-bottom: 5px;
}

.house-logo img {
  width: 18px;
  margin-left: 15px;
}

.house-logo .shu {
  color: rgba(151, 151, 151, 0.33);
  font-size: var(--font_size_3);
  padding-left: 8px;
  padding-right: 8px;
}

.house-logo .details {
  font-size: var(--font_size_3);
  color: #999999;
  letter-spacing: 0;
}

/* 底部 */
.tobacco-footer {
  background: #3c372d;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tobacco-footer .number {
  font-size: 13px;
  color: #ffffff;
  letter-spacing: 0;
  padding-top: 8px;
}
.tobacco-footer .number span {
  font-size: 13px;
  letter-spacing: 1.85px;
  line-height: 26px;
}
.tobacco-footer .number .main-number {
  font-size: 13px;
  color: #e6d589;
  letter-spacing: 1.85px;
  line-height: 26px;
}

.tobacco-footer div {
  font-size: 13px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 19px;
}

.tobacco-footer .last {
  padding-bottom: 15px;
}

/* 中间部分 */
.detailst {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow-y: scroll; */
  min-height: calc(100vh - 196px);
}

.header-cont {
  font-size: 19px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  padding: 20px 20px 0px 20px;
}

.details-cont {
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 5px;
  flex-wrap:wrap
}

.details-cont span {
  font-size: 11px;
  color: #999999;
  letter-spacing: 0;
  white-space: nowrap;
}

.linene {
  margin-top: 8px;
  margin-bottom: 9px;
  width: 94%;
  box-sizing: border-box;
  border-bottom: 1px solid #cfcfcf;
}

.details-content {
  font-size: var(--font_size_3);
  color: #333333;
  letter-spacing: 0;
  line-height: 24px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
.details-content p {
  line-height: 24px;
}
.header {
  width: 100%;
  height: 0.96rem;
  padding: 0.28rem 0.39rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 0.38rem;
  align-items: center;
  border-bottom: 1px solid #efefef;
}

.header .header-left {
  width: 35%;
  display: flex;
  /* align-items: center; */
}
.header .header-right {
  width: 35%;
  padding-top: 0.03rem;
}

.header .header-right i {
  float: right;
  margin-left: 0.32rem;
}

.header i {
  height: 0.31rem;
}

.header i img {
  height: 0.31rem;
  display: block;
}

.header a {
  height: 0.31rem;
  padding-top: 0.03rem;
}

.header a img {
  height: 0.31rem;
  display: block;
}
.header .header-divide {
  width: 1px;
  height: 0.4rem;
  background-color: #e6e6e6;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.header .header-channelTitle {
  font-size: var(--font_size_2);
  color: #333333;
  line-height: 0.4rem;
}
.header .header-contentTitle {
  font-size: var(--font_size_2);
  color: #333333;
  text-align: center;
  line-height: 1;
}
.my-loading {
  padding: 0.5rem 0;
  text-align: center;
  font-size: var(--font_size_4);
  color: #999999;
}
.my-loading .my-loading-i {
  width: 0.24rem;
  height: 0.24rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  display: inline-block;
  margin-right: 0.1rem;
  position: relative;
  top: 0.03rem;
}

/* 成功提示框的样式 */
.win-tip {
  display: block;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.22rem 0.47rem;
  line-height: 0.33rem;
  position: fixed;
  left: 50%;
  top: 25%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  border-radius: 5px;
  display: none;
  z-index: 9999;
  font-size: 0.26rem;
  text-align: center;
}

/* 失败提示框的样式 */

.error-tip {
  display: block;
  background: rgba(227, 11, 32, 0.7);
  color: #fff;
  padding: 0.22rem 0.47rem;
  line-height: 0.33rem;
  position: fixed;
  left: 50%;
  top: 25%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  border-radius: 5px;
  display: none;
  z-index: 9999;
  font-size: 0.26rem;
  text-align: center;
}

/* 字体标红 */
.highlight {
  color: #e30b20;
}
.Return > div {
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.02rem 0.13rem 0px rgba(18, 39, 104, 0.1);
  border-radius: 50%;
}
.Return > div:first-child {
  margin-bottom: 0.6rem;
}
.Return.home > div:first-child {
  margin-bottom: 0;
}
.Return > div a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Return.home > div {
  margin-top: 1.5rem;
}
.Return > div img {
  width: 0.32rem;
  height: 0.36rem;
}
.Return {
  position: fixed;
  right: 0.4rem;
  bottom: 10%;
  z-index: 1000;
}
</style>


