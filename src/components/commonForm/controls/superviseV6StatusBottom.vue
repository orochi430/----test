<template>
  <div class="superviseV6StatusBottom">
    <div v-for="masterInfo in supervisionInfo.master">
      <div v-for="item in masterInfo" :key="item.id">
        <div class="deptTitle">{{"-"+item.deptName+"（主办）"}}</div>
        <div class="supervisionContent">{{"●"+item.feedbackDate+"&nbsp&nbsp&nbsp" +item.feedbackText  }}
          <span class="detailbt" @click="detail(item)">[详情]</span>
        </div>

      </div>

    </div>
    <div v-for="minorInfo in supervisionInfo.minor">
      <div v-for="item in minorInfo" :key="item.id">

        <div class="deptTitle">{{"-"+item.deptName+"（协办）"}}</div>
        <div class="supervisionContent">{{"●"+item.feedbackDate+"&nbsp&nbsp&nbsp" +item.feedbackText  }}
          <span class="detailbt" @click="detail(item)">[详情]</span>
        </div>

      </div>

    </div>
    <div v-for="item in supervisionInfo.notFeed" :key="item.id">
      <div class="deptTitle">{{"-"+item.dutyUnitText  +"（"+item.taskTypeText+"）"   }}</div>
      <div class="supervisionContent">●未反馈 </div>
    </div>
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  mixins: [propMixin],
  props: {
    formMeta: {
      type: Object,
      default: () => ({}),
    },
    metaData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      supervisionInfo: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      //ctrl/superviseV6/status/getFeedbackInfo?id=240311093318pI517yuUXO55MIqJovU&showLevel=5
      let params = {
        id: this.formMeta.parameters.pk,
        showLevel: 5
      }
      dsf.http.post("fn/superviseV6/status/getFeedbackInfo", params).then(res => {
        if (res.data.code == 200) {
          this.supervisionInfo = res.data.data
        }
      })
    },
    detail(info) {
      console.log(info);
      this.$router.push({
        path: `/commonForm/210608105939mkuTUSzHdhowHPHxlY8/${info.id}`,
        query: {
          isPreview: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.superviseV6StatusBottom {
  .deptTitle {
    font-size: 16px;
    font-weight: bold;
    color: #73716f;
  }
  .supervisionContent {
    color: #57bbdd;
    margin: 0 0 4px 0;
    letter-spacing: 1px;
    text-indent: 7px;
  }
  .detailbt {
    margin-left: 20px;
  }
}
</style>

