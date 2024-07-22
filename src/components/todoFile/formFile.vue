<template>
  <div class="ds-form-group">
    <template v-if="info && !dsf.isEmptyObject(info)">
      <!-- 收文 -->
      <ReceiptReadonly v-if="moduleId==moduleIds[0]" :info="info" msg=''></ReceiptReadonly>
      <!-- 发文 -->
      <PostFileReadonly v-if="moduleId==moduleIds[1]" :info="info"></PostFileReadonly>
      <!-- 会议室预定 -->
      <MeetingReadonly v-if="moduleId==moduleIds[2]" :info="info"></MeetingReadonly>
      <!-- 督办(弃用) -->
      <SuperviseReadonly v-if="moduleId==moduleIds[3]" :info="info"></SuperviseReadonly>
      <!-- 会议室申请 -->
      <MeetingReadonly v-if="moduleId==moduleIds[4]" :info="info" type="1"></MeetingReadonly>
      <!-- 签收公文 -->
      <SignFileReadonly v-if="moduleId==moduleIds[5]" :info="info"></SignFileReadonly>
      <!-- 督办立项单 -->
      <DuBanLiXiangDanReadOnly v-if="moduleId==moduleIds[6]" :info="info" />
    </template>
    <template v-else-if="info && dsf.isEmptyObject(info)">
      <commonempty :description="text" />
    </template>
  </div>
</template>

<script>
  import ReceiptReadonly from "@/components/Forms/ReadOnly/ReceiptReadonly"; //收文
  import PostFileReadonly from "@/components/Forms/ReadOnly/PostFileReadonly"; //发文
  import MeetingReadonly from "@/components/Forms/ReadOnly/MeetingReadonly"; //会议
  import SuperviseReadonly from "@/components/Forms/SuperviseReadonly"; //督办
  import SignFileReadonly from "@/components/Forms/ReadOnly/SignFileReadonly"; //待签收公文
  import DuBanLiXiangDanReadOnly from "@/components/Forms/ReadOnly/DuBanLiXiangDanReadOnly"; //督办立项单
  export default {
    name: "formFile",
    components: {
      ReceiptReadonly,
      PostFileReadonly,
      MeetingReadonly,
      SuperviseReadonly,
      SignFileReadonly,
      DuBanLiXiangDanReadOnly
    },
    data() {
      return {
        info: null,
        moduleId: "200514112152rWCht6hUiXVRuSKXPMZ",
        moduleIds: [
          '2001131007187DmPkCTl0HFmPhHOk1c',
          '200113151945A52p5tF0hUVkN2RlogI',
          '200514112152rWCht6hUiXVRuSKXPMZ',
          '2005131819079PyGXaUaHgivaFEdNzc',
          '190121161348OthBI4s3sEhvfuDJ5FD',
          '190313143112jfLuUxrc19Dchhv4BPU',
          "190323145209SuSc9CTjs9rg88i22T1"
        ],
        text: '获取异常'
      }
    },
    created() {
      //  签收公文
      if (!this.$route.params.formData) {
        this.info = {};
        this.text = '缺少参数';
        return;
      }
      let dataValue = this.$route.params.formData ? this.$route.params.formData.dataValue : {};

      let isMaster = dataValue.masterModuleId == '190323145209SuSc9CTjs9rg88i22T1';
      this.moduleId = isMaster ? dataValue.masterModuleId : (dataValue.moduleId || dataValue[
        'SW_XZD.A0004'] || dataValue['A0004']);

      if (!this.moduleIds.includes(this.moduleId)) {
        this.info = {};
        this.text = '未知类型';
        return;
      }
      console.log(this.$route.params.formData);
      console.log(dataValue.moduleName);
      if (!this.moduleId) {
        this.info = {};
        this.text = '缺少参数';
        dsf.layer.toast('缺少参数，获取中断', false)
        return
      }
      let that = this,
        toast = {},
        loader = dsf.layer.loading('获取中')
      dsf.http.get("/fn/xform/data", {
        pk: isMaster ? dataValue.masterId : (dataValue.info_id || dataValue.id || dataValue['SW_XZD.A0001'] || dataValue['A0001'] || dataValue.fid),
        moduleId: that.moduleId
      }).then((res) => {
        that.info = res.data.main;
        that.info.dataValue = dataValue;
        that.info.opinionList = res.data.opinionList || {};
        //待签收---已读未读状态update接口
        if(this.$route.params.type=='dqs'){
          dsf.http.post("fn/remoteExchange/read",{
            rcvRecordId:dataValue['A0001']
          }).then(result=>{})
        }
      }).catch((res) => {
        toast = {
          msg: '请求异常',
          type: false
        }
      }).finally(() => {
        that.$nextTick(() => {
          dsf.layer.closeLoading(loader);
          if (toast.msg) {
            that.info = {};
            dsf.layer.toast(toast.msg, toast.type)
          }
        })
      })
    }
  };
</script>

<style lang="scss" scoped>
  // @import "../../assets/font/font.css";
  @import "../../assets/styles/themes.scss";
  @import "../../assets/styles/mixin.scss";

  .ds-form-group {
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    @include background-theme("button_auxiliary_bgcolor");

    * {
      box-sizing: border-box;
    }
  }

  ::v-deep.van-cell {
    padding: 15px 16px;

    ::v-deep.van-cell__title {
      width: 25%;
      -webkit-box-flex: none;
      -webkit-flex: none;
      flex: none;
      @include font_4;
      color: $fontColor_sub;
    }

    ::v-deep.van-cell__value {
      @include font_4;
      color: $fontColor_main;
      text-align: left;
    }
  }

  ::v-deep.van-cell-group {
    padding: 15px 0;
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
    border-width: 0;
  }

  .van-cell:not(:last-child)::after {
    border: none;
  }
</style>
