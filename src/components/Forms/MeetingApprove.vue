<template>
  <div class="meeting-approve form-layout">
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
  name: "MeetingApprove",
  components: {
    ReadOnlyForms,
    DsfButtonToolbox
  },
  data: function() {
    return {
      dataList: [
        {
          title: "会议名称",
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
        { title: "参会人员", value: "" },
        { title: "备注", value: "" },
        { title: "联系人", value: "" }
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
  created() {},
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