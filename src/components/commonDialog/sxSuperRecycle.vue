<template>
  <div>
    <van-popup v-model="show" @close="close" :style="{ height: '100vh' }" position="bottom">
      <div class="sxSuperRecycle">
        <van-nav-bar title="请选择强制回收节点" :fixed="true" left-text="返回" left-arrow @click-left="close" />
        <div class="nodeBox" v-if="isSuperRecycle">
          <div class="nodeCard" v-for="(item, index) in superRecycleData" :key="index" @click="changeNode(item, index)">
            <span class="changeStatu" :style="{ 'background-color': item.chcek ? 'var(--normal)' : '#fff' }"></span>
            <div class="nodeBText"><span>节点名称：</span><span>{{ item.ACTNAME }}</span></div>
            <div class="nodeBText"><span>处理人：</span><span>{{ item.UNAME }}</span></div>
            <div class="nodeBText"><span>处理时间：</span><span>{{ item.EDATE }}</span></div>
          </div>
        </div>
        <div class="nodeBox" v-else>
          <div class="nodeCard" v-for="(item, index) in superRecycleData" :key="index" @click="changeNode1(item, index)">
            <span class="changeStatu" :style="{ 'background-color': item.chcek ? 'var(--normal)' : '#fff' }"></span>
            <!-- <span class="changeStatu" v-else style="background-color: #ccc"></span> -->
            <div class="nodeBText"><span>接受人：</span><span>{{ item.uName }}</span></div>
            <div class="nodeBText"><span>接受部门：</span><span>{{ item.deptName }}</span></div>
            <!-- <div class="nodeBText" v-if="item.status == 0"><span>状态：</span><span> 已回收 </span></div> -->
          </div>
        </div>
        <div class="btnBox">
          <van-button @click="close">取消</van-button>
          <van-button @click="closePage">{{ isSuperRecycle ? "强制回收" : "确定" }}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
  
<script>
export default {
  name: 'sxSuperRecycle',
  props: {
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
      superRecycleData: {},
      checkItem: {},
      isSuperRecycle: true,
      checkArray: []
    };
  },
  created() {
    if (this.formParams.isSuperRecycle != undefined) {
      this.isSuperRecycle = this.formParams.isSuperRecycle
    }
    this.superRecycleData = JSON.parse(JSON.stringify(this.formParams.superRecycleData))
    this.superRecycleData.forEach(item => {
      this.$set(item, "chcek", false)
    });
  },
  methods: {
    close() {
      this.show = false
      // this.$nextTick(() => { this.$emit("closeCallback", "") })
    },
    closePage() {
      let self = this;
      // dsf.layer.toast("强制回收成功！", true, () => { self.close(); setTimeout(() => { self.$emit("backSucces"); self.$emit("closeCallback", "") }, 500) })
      if (this.isSuperRecycle) {
        if (this.checkItem && JSON.stringify(this.checkItem) == "{}") {
          dsf.layer.toast("请选择强制回收节点！", false)
        } else {
          dsf.layer.confirm({
            message: "<div style='font-size: 18px;'>是否确定强制回收节点？</div>",
            confirmButtonText: "确认",
          }, () => {
            let rollbackdata = {
              CallBackCurLinkID: self.checkItem.ID,
              CurLinkID: self.checkItem.PNID,
              TPID: self.checkItem.PID,
              actName: self.checkItem.ACTNAME,
              issuper: self.formParams.issuper || 1,
              nodeUid: self.checkItem.UID,
              nodeWFNODEID: self.checkItem.WFNODEID,
              pk: '2312171958250s5zy26CyqHp8vjdjV7',
              modulId: '231020165620H7JZqLZ4XVsPlTlrpgi',
              APPName: 'DreamWeb',
              version: 2
            }
            console.log(rollbackdata);
            $.ajax({
              type: "post",
              async: false,
              url: dsf.url.getRootPath() + 'fn/flow/rollbackFlow',
              data: JSON.stringify(rollbackdata),
              dataType: 'json',
              contentType: "application/json",
              success: function (res) {
                if (res.type == "success") {
                  dsf.layer.toast("强制回收成功！", () => { self.close(); setTimeout(() => { self.$emit("backSucces"); self.$emit("closeCallback", "") }, 500) })
                } else {
                  dsf.layer.toast("强制回收失败！", false)
                }
              }
            });
          })
        }
      } else {
        let recycleData = [];
        this.checkArray.forEach(item => {
          let recyle = {
            pk: item.infoId,
            flowId: item.wfId,
            pId: item.pId,
            pnId: item.pNId,
            fPnId: item.fId,
            bt: item.bt,
            userId: item.userId,
            nodeName: item.actName
          }
          recycleData.push(recyle);
        })
        dsf.http.post("ctrl/flow/batchRecycle", { data: JSON.stringify(recycleData) }).then(({ data }) => {
          if (data.type == "success") {
            dsf.layer.toast("回收成功", true, () => { self.close(); setTimeout(() => { self.$emit("backSucces"); self.$emit("closeCallback", "") }, 500) })
          } else {
            dsf.layer.toast(data.message)
          }
        })
      }
    },
    changeNode(item, index) {
      let tempCheck = item.chcek
      if (!tempCheck) {
        this.superRecycleData.forEach(item => item.chcek = false);
        this.checkItem = item
      } else {
        this.checkItem = {}
      }
      this.superRecycleData[index].chcek = !tempCheck
    },
    changeNode1(itemData, index) {
      // if (itemData.status == 0 && !this.isSuperRecycle) return
      let tempCheck = itemData.chcek
      if (tempCheck) {
        let checkIndex = this.checkArray.findIndex(item => item.id == itemData.id)
        this.checkArray.splice(checkIndex, 1)
      } else {
        this.checkArray.push(itemData)
      }
      this.superRecycleData[index].chcek = !tempCheck
    }
  }
}
</script>
<style lang="scss" scoped>
.sxSuperRecycle {
  height: 100vh;
  width: 100vw;
  position: relative;

  .nodeBox {
    padding: 1rem 10px;

    .nodeCard {
      position: relative;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #e6e6e6;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      font-size: 15px;

      .nodeBText {
        padding: 3px 0;
      }

      .changeStatu {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px #ccc solid;
      }
    }
  }

  .btnBox {
    height: 1rem;
    position: fixed;
    left: 0;
    bottom: 10px;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    background-color: #fff;

    button {
      width: 49%;
      font-size: 15px;
    }
  }

  .btnBox button:last-child {
    background-color: var(--normal);
    color: white;
  }

  .btnBox button:first-child {
    background-color: white;
    color: var(--normal);
    border: 1px solid var(--normal);
  }
}
</style>