<template>
  <round-popup :show.sync="show" title="综合退回">
    <template #container>
      <div class="way-box">
        <van-field label="退回方式" name="radio" center>
          <template #input>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              @change="changeWay"
            >
              <van-radio
                v-for="(way, idx) in returnWays"
                :key="idx"
                :name="way.name"
              >
                {{ way.text }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div v-if="tips" class="tips-box">
        {{ tips }}
      </div>
      <div class="user-box" v-if="needPicker">
        <van-field
          readonly
          clickable
          label="被退用户"
          :value="showUser"
          placeholder="请选择"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            title="被退用户"
            show-toolbar
            :columns="columnsPicker"
            @cancel="showPicker = false"
            value-key="showText"
            @confirm="onConfirmPicker"
          />
        </van-popup>
      </div>
      <div class="opinion-box">
        <van-field
          v-model="message"
          rows="3"
          label="退回意见"
          type="textarea"
          placeholder="请输入意见"
        />
      </div>
    </template>
    <template #btn>
      <van-button type="primary" @click="confirm">立即提交</van-button>
    </template>
  </round-popup>
</template>

<script>
import roundPopup from '@/components/commonComponents/roundPopup.vue'
export default {
  name: 'comprehensiveBack',
  components: { roundPopup },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
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
    isFromList: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Object,
    },
  },
  data() {
    return {
      returnWays: [
        { name: '1', text: '退回上一环节' },
        { name: '2', text: '退回修改' },
        { name: '3', text: '退回审批' },
        { name: '4', text: '退回重办' },
      ],
      radio: '1',
      showPicker: false,
      columnsPicker: [],
      show: true,
      message: '',
      showUser: '',
      curUser: {},
      tips: '',
      needPicker: true,
    }
  },
  watch: {
    show(nv, ov) {
      if (!nv) {
        this.$nextTick(() => {
          this.$emit('closeCallback', this.value)
        })
      }
    },
  },
  created() {
    let self = this
    self.getUsersForReturn()
  },
  methods: {
    changeWay(val) {
      let self = this
      self.curUser = {}
      self.showUser = ''
      self.tips = ''
      self.needPicker = true
      self.columnsPicker = []
      if (val == '1') {
        self.getUsersForReturn()
      } else if (val == '2') {
        self.tips =
          '退回修改：当前文件退回至【被退用户】修改，修改完成后可直接回送到当前用户继续办理！'
        self.getNodesForReturn()
      } else if (val == '3') {
        self.tips =
          '退回审批：当前文件退回至【被退用户】修改，修改完成后按照流程节点顺序重新办理！'
        self.getNodesForReturn()
      } else {
        self.tips =
          '退回重办：此操作将删除当前文件的意见、流程信息，同时文件将退回至拟稿人待办列表，修改完成后按照流程节点顺序重新办理！'
        self.needPicker = false
      }
    },
    onConfirmPicker(value, index) {
      let self = this
      console.log(`当前值：`, value, `当前索引：`, index)
      self.showUser = value.showText
      self.curUser = value
      self.showPicker = false
    },
    onCancelPicker() {
      console.log('取消')
    },
    getUsersForReturn() {
      let self = this
      dsf.http
        .get('fn/flow/getGPNodeProcess', {
          pId: self.metaData.parameters.pId,
          flowId: self.metaData.parameters.flowId,
          pk: self.metaData.parameters.pk,
          pnId: self.metaData.parameters.pnId,
        })
        .done((res) => {
          if (res.type == 'success') {
            if (res.data.processArray.length == 1) {
              let p = res.data.processArray[0]
              self.tips = `上一环节为：${p.PARENT_NODE_NAME}节点，办理人员为：${p.Sender.UserName}`
              self.needPicker = false
              self.curUser = {
                userId: p.Sender.UserID,
                uName: p.Sender.UserName,
                actName: p.PARENT_NODE_NAME,
                showText: `${p.Sender.UserName}(${p.PARENT_NODE_NAME})`,
                TPID: p.TPID,
                LinkID: p.LinkID,
                WFID: p.WFID,
                MultSendBackMod: res.data.SendRequest.multSendBackMod,
                IsMergeTodo: res.data.SendRequest.isMergeTodo,
                SendBackTo: res.data.SendRequest.sendBackTo,
              }
            } else {
              res.data.processArray.forEach((item) => {
                self.columnsPicker.push({
                  userId: item.Sender.UserID,
                  uName: item.Sender.UserName,
                  actName: item.PARENT_NODE_NAME,
                  showText: `${item.Sender.UserName}(${item.PARENT_NODE_NAME})`,
                  TPID: item.TPID,
                  LinkID: item.LinkID,
                  WFID: item.WFID,
                  MultSendBackMod: res.data.SendRequest.multSendBackMod,
                  IsMergeTodo: res.data.SendRequest.isMergeTodo,
                  SendBackTo: res.data.SendRequest.sendBackTo,
                })
              })
            }
          }
        })
    },
    getNodesForReturn() {
      let self = this
      dsf.http
        .get('fn/flow/getGPNodeList', {
          pId: self.metaData.parameters.pId,
          returnNodeId: -1,
        })
        .done((res) => {
          if (res.type == 'success') {
            res.data.forEach((item) => {
              self.columnsPicker.push({
                wfNodeId: item.wfNodeId,
                userId: item.userId,
                uName: item.uName,
                deptId: item.deptId,
                deptName: item.deptName,
                actName: item.actName,
                showText: `${item.uName}(${item.actName})`,
              })
            })
          }
        })
    },
    confirm() {
      let self = this
      if (self.needPicker && Object.keys(self.curUser).length == 0) {
        dsf.layer.toast('请选择被退用户', false)
        return
      }
      if (!self.message) {
        dsf.layer.toast('请输入退回意见', false)
        return
      }
      if (self.radio == '2' || self.radio == '3') {
        //退回修改/审批
        self.sendBackToNode()
      } else {
        self.sendBackToUser()
      }
    },
    sendBackToUser() {
      let self = this
      let params = {
        backType: 4,
        pk: self.metaData.parameters.pk,
        Remark: self.message,
        inherit: '', //继承上一节点退回意见(暂不支持)
      }
      if (self.radio == '1') {
        //退回上一环节
        params = {
          TPID: self.curUser.TPID, //流程实例ID/pid
          CurLinkID: self.curUser.LinkID, //流程节点ID/pnid
          WFID: self.curUser.WFID, //流程ID
          backType: 1, //退回方式
          Remark: self.message, //退回意见
          inherit: '', //继承上一节点退回意见(暂不支持)
          MultSendBackMod: self.curUser.MultSendBackMod, //多发退回模式
          IsMergeTodo: self.curUser.IsMergeTodo, //同文件、同环节、同部门同处理人待办文件仅保留一个
          NGR: 0,
          SendBackTo: self.curUser.SendBackTo, //抢办环节退回模式
          pk: self.metaData.parameters.pk,
        }
      }
      let loader = dsf.layer.loading('提交中')
      dsf.http
        .post('fn/flow/submitSendBackNode', params)
        .done((res) => {
          if (res.type == 'success') {
            if (this.radio == '4') {
              this.moduleConvertEx(
                this.metaData.parameters.moduleId,
                this.metaData.parameters.moduleId,
                this.metaData.parameters.pk,
              )
            } else {
              dsf.layer.toast('退回成功', true, () => self.$emit('backSucces'))
            }
          } else {
            dsf.layer.toast('操作失败', false)
          }
        })
        .error((err) => {
          console.log('submitSendBackNode-err', err)
          dsf.layer.toast('操作失败', false)
        })
    },
    sendBackToNode() {
      let self = this
      let params = {
        disableAutoSend: -1, //不禁用自动发送
        isBackTrack: self.radio == '2' ? 1 : 0, //回送后原路返回：退回修改传1；退回审批传0
        nextHandleType: 'SR_BACKSEND', //回送
        nextNodeId: self.curUser.wfNodeId, //被推用户的节点wfNodeId
        opinionContent: self.message, //退回意见
        opinionType: 4,
        pId: self.metaData.parameters.pId,
        pk: self.metaData.parameters.pk,
        pnId: self.metaData.parameters.pnId,
        receiverList: [
          {
            type: 1,
            userId: self.curUser.userId,
            userName: self.curUser.uName,
            deptId: self.curUser.deptId,
            deptName: self.curUser.deptName,
          },
        ],
        sendType: 'SR_SPECIAL', //特送
      }
      dsf.layer.confirm(
        {
          message: `确定退回到 ${self.curUser.showText} 吗？`,
          confirmButtonText: '确认',
        },
        () => {
          let loader = dsf.layer.loading('提交中')
          dsf.http
            .post('fn/flow/sendRequest', params, {
              headers: { 'Content-Type': 'application/json' },
            })
            .done((res) => {
              if (res.type == 'success') {
                dsf.layer.toast('退回成功', true, () =>
                  self.$emit('backSucces'),
                )
              } else {
                dsf.layer.toast('操作失败', false)
              }
            })
            .error((err) => {
              console.log('sendRequest-err', err)
              dsf.layer.toast('操作失败', false)
            })
        },
      )
    },
    moduleConvertEx(
      targetModule,
      srcModule,
      sourcePk,
      callback,
      errorCallback,
      opts,
    ) {
      //类型转换，默认转自己模块
      opts = opts || {}
      let initData = opts.initData

      let postData = {
        sourceModule: srcModule,
        targetModule: targetModule,
        srcInfo: sourcePk,
      }

      if (initData) {
        postData['initDataSource'] = 1
      }

      if (opts.isEndSrcFlow) {
        postData.isEndSrcFlow = 1
      }
      if (opts.pnid) {
        postData.pnid = opts.pnid
      }
      if (opts.convertParams) {
        Object.assign(postData, opts.convertParams)
      } else {
        opts.convertParams = postData
      }
      let self = this
      function dataConvertEx() {
        if (targetModule && srcModule) {
          let result = dsf.http
            .post('ctrl/convert/moduleConvert', postData)
            .then((result) => {
              // var exeAfterModuleConvertEx = false;
              let callbackResult
              if (callback) {
                callbackResult = callback(result.data)
              }
              if (callbackResult === undefined || callbackResult === false) {
                if ('success' == result.data.type) {
                  if (
                    opts.isOpenForm != undefined &&
                    opts.isOpenForm == 'false'
                  ) {
                    return false
                  }
                  if (result.data.data['jump'] == '0') {
                    // 未用
                  } else if (result.data.data['jump'] == '-1') {
                    //转换至拟稿节点，退回列表
                    // this.$router.back();
                    dsf.layer.toast('退回成功', true, () =>
                      self.$emit('backSucces'),
                    )
                  } else {
                    // 未用
                  }
                  //办结源文件后操作
                  // if (!exeAfterModuleConvertEx && opts.isEndSrcFlow) {
                  //   that.$router.back();
                  // }
                  //是否刷新当前表单
                  // if (result.data.data && result.data.data["reloadForm"] == 1) {
                  //   window.location.href = window.location.href;
                  // }
                } else {
                  dsf.layer.toast(result.data.messagee)
                }
              }
            })
          if (
            result &&
            result.type !== 'success' &&
            typeof errorCallback === 'function'
          ) {
            errorCallback()
          }
        }
      }

      //需要文件限制
      dsf.http
        .post('ctrl/convert/fileConvertCount', postData)
        .then((result) => {
          if ('success' == result.data.type) {
            //取值
            let canCount = parseInt(result.data.data)
            if (canCount == -1) {
              dataConvertEx()
            } else if (canCount == 0) {
              dsf.layer.toast('转换生成文件已达到设定限制！')
            } else if (canCount > 0) {
              dsf.layer.confirm(
                {
                  message:
                    '已存在' +
                    canCount +
                    '个转换文件，请确认是否继续转换生成新文件？',
                  confirmButtonText: '确认',
                },
                () => {
                  dataConvertEx()
                },
              )
            }
          }
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .way-box {
    .van-radio {
      margin-bottom: 0.1rem;
    }
  }

  .tips-box {
    padding: 10px 16px;
    color: #f77171;
  }

  .opinion-box {
    ::v-deep .van-field__body {
      textarea {
        border: 1px solid #ddd;
      }
    }
  }
}
</style>
