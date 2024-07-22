<!-- 发文 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <van-cell :value="info.B0001?info.B0001.value || msg:msg" title="文件标题" />
      <van-cell :value="info.B0003?info.B0003.value || msg:msg" title="文号" />
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
      </van-cell>
      <van-cell :value="info['C-GW-FW-0001']?info['C-GW-FW-0001'].text || msg:msg" title="主送单位" />
      <van-cell :value="info['C-GW-FW-0002']?info['C-GW-FW-0002'].text || msg:msg" title="抄送单位" />
      <!-- <van-cell :value="info['C-GW-FW-0104']?info['C-GW-FW-0104'].text || msg:msg" title="会签部门" /> -->
      <van-cell :value="info['C-FW-0022']?info['C-FW-0022'].value || msg:msg" title="文种" />
      <van-cell :value="info.B0015?info.B0015.text || msg:msg" title="是否公开" />
      <van-cell :value="info.B0006?info.B0006.text || msg:msg" title="紧急程度" />
      <!-- <van-cell :value="info.B0012?info.B0012.value || msg:msg" title="联系电话" /> -->
      <van-cell :value="info['C-FW-0036']?info['C-FW-0036'].value || msg:msg" title="签发日期" />
      <van-cell :value="info.B0014?(info.B0014.value || 0)+'份':msg" title="打印份数" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "PostFileReadonly",
  props: ["info", "msg"],
  methods: {
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
