<!-- 收文 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <van-cell :value="info.B0001?info.B0001.value || '':''" title="文件标题" />
      <van-cell :value="info['C-LW-0001']?info['C-LW-0001'].value || '':''" title="来文单位" />
      <!-- 同意
              张三  2020-05-09
      -->
      <van-cell title="领导批示" :value="info['200113110054qQsV5PE7sKFR9T7NOcb']?info['200113110054qQsV5PE7sKFR9T7NOcb'].value || '':''">
        <!-- <template #default>
          <div v-html="getVal('领导批示')"></div>
        </template> -->
      </van-cell>
      <van-cell title="拟办意见">
        <template #default>
          <div v-html="getVal('办公室拟办')"></div>
        </template>
      </van-cell>
      <van-cell title="办理情况" :value="info['C-LW-0006']?info['C-LW-0006'].value || '':''">
        <!-- <template #default>
          <div v-html="getVal('科室办理')"></div>
        </template> -->
      </van-cell>
      <van-cell :value="info['C-LW-0016']?info['C-LW-0016'].value || '':''" title="来文文号" />
      <van-cell :value="info.B0013?info.B0013.value || '':''" title="来文日期" />
      <van-cell :value="info.B0021?info.B0021.value || '':''" title="收文日期" />
      <van-cell :value="info.B0003?info.B0003.value || '':''" title="收文编号" />
      <van-cell :value="info.B0006?info.B0006.text || '':''" title="紧急程度" />
      <van-cell :value="info.B0018?info.B0018.value || '':''" title="办理期限" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "ReceiptReadonly",
  props: ["info"],
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
