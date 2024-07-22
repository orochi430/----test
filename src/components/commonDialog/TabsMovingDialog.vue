<template>
  <div class="TabsMovingDialog">
    <van-popup v-model="show" style="height: 100vh; width: 100%">
      <van-nav-bar left-text="返回" left-arrow @click-left="close" title="流转情况"></van-nav-bar>
      <van-tabs v-model="active">
        <van-tab title="办理情况">
          <dsf-iframe v-if="active==0" :src="url"></dsf-iframe>
        </van-tab>
        <van-tab title="意见列表">
          <moving-situation :form-data="{ info_id: metaData.parameters.pk }" :parameters="metaData.parameters" />
        </van-tab>
      </van-tabs>
    </van-popup>
    <van-popup v-model="showCB" position="bottom" round :style="{ height: '70%' }">
      <div class="cb_contain">
        <van-nav-bar class="cbnav" title="催办信息发送" right-text="关闭" @click-right="closePop"></van-nav-bar>
        <div class="cbinfo">
          <!-- <textarea placeholder="请输入催办信息" class="text" v-model.trim="message"></textarea> -->
          <van-field v-model.trim="message" rows="1"  :autosize= "{maxHeight: 175}" label="" type="textarea" placeholder="请输入催办信息" />
          <div class="tipText">催办消息将以下面的形式发送：</div>
          <div class="cbtype">
            <van-checkbox-group v-model="result" direction="horizontal">
              <van-checkbox icon-size="16px" :name="item.codeValue" v-for="item in typeList" :key="item.codeValue">{{ item.codeName }}</van-checkbox>
            </van-checkbox-group>
          </div>
          <!-- <div class="defaultText">
                    {{ defaultText }}
                </div> -->
        </div>
        <div class="btoms">
          <van-button type="primary" size="small" @click="doCBAction"><img src="static/images/project/chengduyitihua/cuiban.png" alt="" class="cuibanimg" />
            催办</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import dsfIframe from "@/components/iframe/dsfIframe.vue";
import movingSituation from "@/components/project/chengduyitihua/movingSituation.vue";
export default {
  name: "TabsMovingDialog",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {},
    },
    formParams: {
      type: Object,
      default: {},
    },
  },
  components: { dsfIframe, movingSituation },
  data() {
    return {
      show: true,
      value: "",
      active: 0,
      url: this.formParams.url || "",
      showCB: false,
      message: "",
      result: [],
      typeList: [],
      defaultText: "",
      curNode: {},
    };
  },
  computed: {},
  watch: {
    show(nv, ov) {
      if (!nv) {
        this.$nextTick(() => {
          this.$emit("closeCallback", this.value);
        });
      }
    },
    active: {
      handler(nv, ov) {
        if (nv == 0) {
          if (this.url.includes("timer")) {
            this.url = this.url.replace(/timer=\d+/i, `timer=${+new Date()}`);
          } else {
            // this.$nextTick(() => {
            this.url += `&timer=${+new Date()}`;
            // console.log("111", this.url);
            // });


          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    cuiban(node) {
      this.curNode = node;
      console.log(this.formParams);
      //加载催办提醒方式和提醒模板
      let infoId = this.formParams.pk; //文件id
      let moduleId = this.formParams.moduleId; //文件的模块id
      dsf.http
        .post(`ctrl/flowmonitor/getUrgeRemindConfig`, {
          infoId: infoId,
          moduleId: moduleId,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.type == "success") {
            if (data.data) {
              var smsMethodType = data.data.smsMethodType;
              this.message = data.data.sms;
              if (smsMethodType) {
                this.typeList = smsMethodType;
                this.result = smsMethodType.map((item) => item.codeValue);
              }
              this.showCB = true;
            }
          } else {
            console.log("get urge config error!");
          }
        });
    },
    doCBAction() {
      var docid = this.metaData.parameters.pk; //文件id
      var moduleId = this.metaData.parameters.moduleId; //模块id
      var bt = this.message; //催办内容
      var remindType = this.result; //提醒方式
      var pnId = this.metaData.parameters.pnId; //催办环节
      if (!bt) {
        dsf.layer.toast("请输入催办内容！");
        return true;
      }
      // if (remindType.length == 0) {
      //   dsf.layer.toast("请选择提醒方式！");
      //   return true;
      // }

      dsf.http
        .post(`fn/remind2512/remindTodo`, {
          moduleId: moduleId,
          pk: docid,
          content: bt,
          remindModes: remindType.join(","),
          pnIds: pnId,
          nodeId: this.curNode.nodeId,
          userId: this.curNode.userId
        })
        .then(({ data }) => {
          console.log(data);
          if (data.type == "success") {
            dsf.layer.toast("催办成功！");
            this.closePop();
          } else {
            console.log("get urge config error!");
          }
        });
    },
    close() {
      this.show = false;
      this.$nextTick(() => {
        this.$emit("closeCallback", this.value);
      });
    },
    closePop() {
      this.showCB = false;
      this.message = "";
      this.result = [];
      this.typeList = [];
      this.defaultText = "";
      this.curNode = {};
    },
  },
  created() {
    // this.url = this.formParams.url;
  },
  mounted() {
    window.cuiban = this.cuiban
  },
  destroyed() { },
};
</script>
<style scoped lang='scss'>
::v-deep .van-field__body{
  padding-right: 2px;
  ::-webkit-scrollbar {
      width: 3px;
      background-color: #eee;
  }

  ::-webkit-scrollbar-track {
      background-color: #eee;
  }

  ::-webkit-scrollbar-thumb {
      background: #ccc;
  }

}
::v-deep .van-tabs {
  height: calc(100vh - 0.92rem);
  display: flex;
  flex-direction: column;
  .van-tabs__content {
    flex: 1;
    overflow: auto;
  }
}
.cb_contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cbnav {
    width: 100%;
    flex-shrink: 0;
  }

  .cbinfo {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background: #fff;

    .text {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      padding: 15px;
      font-size: var(--font_size_6);
      color: #333;
      line-height: 24px;
    }

    .tipText {
      width: 100%;
      height: 40px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      font-size: var(--font_size_4);
      color: #333;
      box-sizing: border-box;
      padding: 0 15px;
    }

    .cbtype {
      border-top: 1px solid #ebebeb;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;

      .van-checkbox {
        margin-right: 20px;
        margin: 5px 20px 5px 0;
      }
    }

    .defaultText {
      border-top: 1px solid #ebebeb;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      font-size: var(--font_size_6);
      color: #000;
      line-height: 24px;
    }
  }

  .btoms {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-top: 1px solid #ebebeb;

    .van-button {
      width: 100%;
      height: 40px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
      }
    }
  }
}
</style>