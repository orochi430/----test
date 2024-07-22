<!-- 督办立项单 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <van-cell :value="info.B0001?info.B0001.value || '':''" title="督办标题" />
      <van-cell v-if="info.dataValue.pid" title="单位领导意见">
        <template #default>
          <div v-html="getVal('单位领导')"></div>
        </template>
      </van-cell>
      <van-cell v-if="info.dataValue.pid" title="部门负责人意见">
        <template #default>
          <div v-html="getVal('部门负责人')"></div>
        </template>
      </van-cell>
      <van-cell :value="info['B0003']?info['B0003'].value || '':''" title="督办编号" />
      <van-cell :value="info['C-DB-0020']?info['C-DB-0020'].text || '':''" title="督办类型" />
      <van-cell :value="info['C-DB-0007']?info['C-DB-0007'].value || '':''" title="督办要求" />
      <van-cell :value="info['C-DB-0001']?info['C-DB-0001'].text || '':''" title="主办单位" />
      <van-cell :value="info['C-DB-0001']?info['C-DB-0001'].text || '':''" title="协办单位" />
      <van-cell :value="info.B0006?info.B0006.text || '':''" title="紧急程度" />
      <van-cell :value="info.B0018?info.B0018.value || '':''" title="办结时限" />
      <van-cell :value="info['C-DB-0014']?info['C-DB-0014'].value || '':''" title="下次反馈日期" />
      <van-cell
        :value="info['C-DB-0011']?info['C-DB-0011'].value?info['C-DB-0011'].value+info['C-DB-0011'].text : '':''"
        title="反馈周期"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "DuBanLiXiangDanReadOnly",
  // eslint-disable-next-line vue/require-prop-types
  props: ["info"],
  methods: {
    getVal(key) {
      if (this.info.opinionList && this.info.opinionList[key]) {
        let opts = this.info.opinionList[key];
        let msg = "";
        for (let i in opts) {
          let opt = opts[i];
          // msg += opt.opinionContent + ' ' + opt.userName + ' ' + opt.opinionDate;
          msg += `
          <span>${opt.opinionContent}</span>
          <p style="text-align:left">${opt.userName} ${opt.opinionDate}</p>`;
        }
        return msg ? msg : "";
      } else {
        return "";
      }
    }
  }
};
</script>
