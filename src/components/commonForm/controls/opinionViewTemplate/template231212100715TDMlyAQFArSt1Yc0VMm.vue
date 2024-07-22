<template>
  <!--[成都一体化]简单意见显示-显示部门名称加时间--->
  <div class="controlOpinionView">
    <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
      <div class="opinionContent">
        <div class="opinionText" v-html="item.opinionContent"></div>
        <div v-show="item.handwritePic">
          <img :src="dsf.url.getServerUrl(item.handwritePic)" alt=""  style="width: 50%;">
        </div>
        <div class="opinionTime">
          <span>{{ item.deptName }}</span>
          <span>{{ item.time.split(" ")[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ["metaData"],
  data() {
    return {
        depName:""
    };
  },
  computed: {
    opinion() {
      let tempOpinion = [];
      if (this.metaData.extra.list) {
        tempOpinion = this.metaData.extra.list;
      }
      console.log(tempOpinion);
      this.depName=this.metaData.opinion[0][0].orgName;
      return tempOpinion;
    },
  },
  methods: {},
};
</script>
  
<style lang="scss" scoped>
.controlOpinionView {
  .opinionBox {
    &:not(:first-child)::before {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      top: -5px;
      left: 0;
      border-bottom: 1px solid #ebedf0;
    }

    position: relative;
    color: #333;
    margin: 0.2rem 0 0.1rem;

    .opinionContent {
      // padding: 3px 0;
      .opinionText {
        font-weight: 600;
        padding-bottom: 0.24rem;
        text-indent: 1em;
      }

      .opinionTime {
        text-align: right;
      }
    }
  }
}
</style>
  