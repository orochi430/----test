<!-- 会议 -->
<template>
  <div class="receipt-readonly MeetingReadonly">
    <van-cell-group v-if="info">
      <van-cell :value="info.B0001?info.B0001.value || '':''" title="会议名称" />
      <van-cell v-if="info.dataValue.pid" title="单位领导意见">
        <template #default>
          <div v-html="getVal('单位领导')" ></div>
        </template>
      </van-cell>
      <!-- <van-cell title="部门负责人意见" :value="getVal('部门负责人')" /> -->
       <van-cell v-if="info.dataValue.pid" title="部门负责人意见">
        <template #default>
          <div v-html="getVal('部门负责人')"></div>
        </template>
      </van-cell>
      <van-cell
        :value="info['c-meetingtz-019']?info['c-meetingtz-019'].value || '':''"
        title="开始时间"
      />
      <van-cell
        :value="info['c-meetingtz-020']?info['c-meetingtz-020'].value || '':''"
        title="结束时间"
      />
      <van-cell
        :value="info['c-meetingtz-030']?info['c-meetingtz-030'].value || '':''"
        title="会议地点"
      />
      <van-cell
        :value="info['c-meetingtz-004']?info['c-meetingtz-004'].text || '':''"
        title="会议类型"
      />
      <van-cell
        v-if="!type"
        :value="info['c-meetingtz-011']?info['c-meetingtz-011'].text || '':''"
        title="会议主持"
      />
      <van-cell
        v-if="!type"
        :value="info['c-meetingtz-014']?info['c-meetingtz-014'].text || '':''"
        title="参会领导"
      />
      <van-cell
        :value="info['c-meetingtz-043']?info['c-meetingtz-043'].text || '':''"
        title="参会单位"
      />
      <van-cell
        v-if="!type"
        :value="info['c-meetingtz-013']?info['c-meetingtz-013'].text || '':''"
        title="参会人员"
      />
      <!-- <van-cell :value="info['c-meetingtz-029']?info['c-meetingtz-029'].value || '':''" title="备注" /> -->
      <!-- <van-cell :value="info['c-meetingtz-012']?info['c-meetingtz-012'].text || '':''" title="联系人" /> -->
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "MeetingReadonly",
  props: ["info", "type"],
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    getVal(key) {
      if (this.info.opinionList && this.info.opinionList[key]) {
        this.msg = "";
        let opts = this.info.opinionList[key];
        console.log(opts);
        let msg = "";
        for (let i in opts) {
          let opt = opts[i];
          console.log(opt);
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