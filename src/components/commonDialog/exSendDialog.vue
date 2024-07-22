<template>
  <round-popup :show.sync="show" title="请选择要增发的信息" style="height: 80vh">
    <template #container>
      <div class="send-dialog">
        <div class="list">
          <div class="item" v-for="ele in List" :key="ele.LineID">
            <div class="item-tit">
              <span>{{ ele.NodeName }}</span>
              <div class="input">
                <label for="">发送人：</label>
                <!-- <input type="text" v-model="inputValue" /> -->
                <van-dropdown-menu>
                  <van-dropdown-item @change="tabClick" v-model="ele.personId" :options="ele.UserInfoList.UserInfo" />
                </van-dropdown-menu>
              </div>
            </div>
            <div class="item main">
              <van-radio-group v-model="radio" @change="radioChange">
                <van-radio v-for="it in ele.NextNodes.Line" :key="`${ele.LinkID}_${it.LineID}`" :name="`${ele.LinkID}_${it.LineID}`">{{ it.ShowName }}</van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #btn>
      <van-button type="theme" @click="send()">发送</van-button>
    </template>
  </round-popup>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
export default {
  name: "exSendDialog",
  components: {
    roundPopup
  },
  created() {},
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    metaData: {
      type: Object,
      default: {}
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: true,
      personId: "",
      option: [],
      radio: "",
      List: [],

      LineName: "",
      person: "",
      sendDeptId: "",
      sendDeptName: "",
      sendUnitId: "",
      sendUnitName: ""
    }
  },
  watch: {
    show(nv, ov) {
      if (!nv) {
        this.$nextTick(() => {
          this.$emit("closeCallback", this.value)
        })
      }
    }
  },
  methods: {
    getData() {},
    tabClick(val) {
      console.log(val)
    },
    radioChange(val) {
      console.log(val)
    },
    send() {
      let self = this
      if (!this.radio) {
        dsf.layer.toast("请选择节点")
        return
      }
      let LinkID = this.radio.split("_")[0]
      let LineID = this.radio.split("_")[1]
      let chooseLink = this.List.find(item => item.LinkID == LinkID)
      let choosePerson = chooseLink.UserInfoList.UserInfo.find(item => item.value == chooseLink.personId)
      let chooseLine = chooseLink.NextNodes.Line.find(item => item.LineID == LineID)
      dsf.layer.confirm(
        {
          message: `确定使用用户${choosePerson.RealUserName}发送文件到节点【${chooseLine.ShowName}】吗？`,
          confirmButtonText: "确认"
        },
        () => {
          // console.log(self.$parent.$parent)
          this.show = false
          self.$parent.$parent.alreadyWriteOpintion = true
          self.$parent.$parent.isShowWriteOpintionBtn = true
          self.$parent.$parent.buttonHandle["send"](
            self.$parent.$parent.$route.params,
            self.$parent.$parent.formMeta,
            self.$parent.$parent.formData,
            self.$parent.$parent,
            self.$parent.$parent.$refs,
            null,
            self.$parent.$parent.nowButtonParameters,
            {
              sendUserId: choosePerson.RealUserId,
              sendUserName: choosePerson.RealUserName,
              pnid: LinkID,
              nextLineId: LineID,
              sendDeptId: choosePerson.RealDeptID,
              sendDeptName: choosePerson.RealDeptName,
              sendType: "SR_EXSEND"
            }
          )
        }
      )
    }
  },
  mounted() {
    this.$bus.$on("ZFLineData", val => {
      this.List = val.ResponseObject[0].ExSendLinks.Process
      this.List.forEach(item => {
        item.UserInfoList.UserInfo.forEach(it => {
          it.text = it.RealUserName
          it.value = it.RealUserID
        })
        item.personId = item.UserInfoList.UserInfo[0].value
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.send-dialog {
  .list {
    .item {
      padding: 10px 0;
      box-sizing: border-box;
      .item-tit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 40px;
        background: #f4f4f4;
      }
      .input {
        display: flex;
        align-items: center;
        width: 50%;
        label {
          width: 60px;
        }
        /deep/ .van-dropdown-menu {
          width: 100px;
          height: 35px !important;
        }
        /deep/ .van-dropdown-menu__bar {
          padding: 0 10px;
          width: 100%;
          height: 35px !important;
          border-width: 1px;
          border-style: solid;
          border: 1px solid #e6e6e6;
          background-color: #fff;
          border-radius: 2px;
        }
        /deep/ .van-dropdown-menu__title {
          width: 100%;
        }
      }
      /deep/ .van-radio-group {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap;
      }
      /deep/ .van-radio {
        margin: 0 10px 10px 0;
      }
      /deep/ .van-radio__label {
        margin-left: 3px !important;
      }
    }
  }
}
</style>
