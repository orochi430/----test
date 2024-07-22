<template>
  <div class="to-read-forms form-layout">
    <div class="form-content">
      <ReadOnlyForms :dataList="dataList"></ReadOnlyForms>
    </div>
    <div class="btn-bar">
      <DsfButtonToolbox
        :buttons="buttons"
        @leftClick="handleLeftClick"
        @rightClick="handleRightClick"
      />
    </div>
  </div>
</template>

<script>
import ReadOnlyForms from "./ReadOnlyForms";
import DsfButtonToolbox from "../documentCenter/DsfButtonToolbox";
export default {
  name: "ToReadForms",
  components: {
    ReadOnlyForms,
    DsfButtonToolbox
  },
  data: function() {
    return {
      dataList: null,
      //收文表单
      sw: [
        {
          title: "文件标题",
          value:
            "131321321321321321321321321321321321321321321321321321321321321321321321321321321322"
        },
        { title: "来文单位", value: "" },
        { title: "领导批示", value: "" },
        { title: "拟办意见", value: "" },
        { title: "办理情况", value: "" },
        { title: "来文文号", value: "" },
        { title: "来文日期", value: "" },
        { title: "收文日期", value: "" },
        { title: "收文编号", value: "" },
        { title: "紧急程度", value: "" },
        { title: "办理期限", value: "" }
      ],
      //发文表单
      fw: [
        {
          title: "标题",
          value:
            "131321321321321321321321321321321321321321321321321321321321321321321321321321321322"
        },
        { title: "签发意见", value: "" },
        { title: "会签意见", value: "" },
        { title: "科室审核", value: "" },
        { title: "办公室拟稿", value: "" },
        { title: "主送单位", value: "" },
        { title: "抄送单位", value: "" },
        { title: "会签部门", value: "" },
        { title: "是否公开", value: "" },
        { title: "紧急程度", value: "" },
        { title: "联系电话", value: "" },
        { title: "打印份数", value: "" }
      ],
      //会议通知表单
      hy: [
        {
          title: "会议时间",
          value:
            "131321321321321321321321321321321321321321321321321321321321321321321321321321321322"
        },
        { title: "开始时间", value: "" },
        { title: "结束时间", value: "" },
        { title: "会议地点", value: "" },
        { title: "会议类型", value: "" },
        { title: "会议主持", value: "" },
        { title: "会议领导", value: "" },
        { title: "会议部门", value: "" },
        { title: "参会部门", value: "" },
        { title: "参会人员", value: "" },
        { title: "备注", value: "" },
        { title: "联系人", value: "" }
      ],
      //督办表单
      db: [
        {
          title: "督办标题",
          value:
            "131321321321321321321321321321321321321321321321321321321321321321321321321321321322"
        },
        { title: "督办类型", value: "" },
        { title: "督办要求", value: "" },
        { title: "领导批示", value: "" },
        { title: "办公室意见", value: "" },
        { title: "主办单位", value: "" },
        { title: "协办单位", value: "" },
        { title: "紧急程度", value: "" },
        { title: "办结时限", value: "" },
        { title: "是否定期反馈", value: "", lay: "left" },
        { title: "反馈开始日期", value: "", lay: "left" },
        { title: "反馈周期", value: "" },
        { title: "办结提醒(提前N天)", value: "", lay: "left" },
        { title: "反馈提醒(提前N天)", value: "", lay: "left" }
      ],
      //代签收收文表单
      dq: [
        {
          title: "文件标题",
          value:
            "131321321321321321321321321321321321321321321321321321321321321321321321321321321322"
        },
        { title: "来文单位", value: "" },
        { title: "来文文号", value: "" },
        { title: "来文日期", value: "" },
        { title: "收文日期", value: "" },
        { title: "收文编号", value: "" },
        { title: "紧急程度", value: "" },
        { title: "办理期限", value: "" }
      ],
      buttons: {
        commonButton: [
          {
            icon: "icondayin1",
            action: "dataview",
            name: "打印"
          },
          {
            icon: "iconpiliangchuli",
            action: "batchaction",
            name: "沟通"
          },
          {
            icon: "iconpiliangchuli",
            action: "batchaction2",
            name: "更多"
          },
          {
            icon: "iconpiliangchuli",
            action: "batchaction3",
            name: "批量处理"
          }
        ],
        mainButtons: [
          {
            action: "create",
            name: "我要新建"
          },
          {
            action: "create",
            name: "我要新建"
          }
        ]
      }
    };
  },
  created() {
    console.log(this.$route.params.classify);
    this.dataList = this[`${this.$route.params.classify}`];
  },
  mounted() {},
  methods: {
    handleLeftClick(name) {
      // eslint-disable-next-line no-console
      console.log(name);
    },
    handleRightClick(name) {
      // eslint-disable-next-line no-console
      console.log(name);
    }
  }
};
</script>

<style>
</style>