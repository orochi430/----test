<template>
  <div class="remindersDialog">
    <van-popup v-model="show" round @close="close">
      <div class="remindersInfo">
        <div class="title">催办信息</div>
        <div class="content">
          <span class="label">全选：</span>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio :name="1">是</van-radio>
            <van-radio :name="0">否</van-radio>
          </van-radio-group>
          <span class="label">催办人：</span>
          <van-checkbox-group v-model="result" direction="horizontal">
            <van-checkbox v-for="item in remindAbleUsers" :key="item.userId" :name="item.userId">{{ item.uName
            }}</van-checkbox>
          </van-checkbox-group>
          <span class="label">短信内容：</span>
          <p class="sms">{{ smsContent }}</p>
        </div>
        <div class="btn">
          <button @click="show = false">取消</button>
          <button @click="onConfirm">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
  
<script>
export default {
  name: 'remindersDialog',
  props: {
    formParams: {
      type: Object,
      default: {}
    },
    formData: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      show: true,
      result: [],
      radio: 1,
      remindAbleUsers: [],
      smsContent: ""
    };
  },
  watch: {
    radio(newV) {
      if (newV) {
        this.remindAbleUsers.forEach(item => {
          this.result.push(item.userId)
        })
      }
      else {
        this.result = []
      }
    }
  },
  methods: {
    close() {
      this.show = false
      this.$nextTick(() => {
        this.$emit("closeCallback")
      })
    },
    onConfirm() {
      if (!this.result.length) {
        dsf.layer.toast("请选择催办人员!")
        return
      }
      let arr = []
      this.result.forEach(item => {
        this.remindAbleUsers.forEach(ele => {
          if (item == ele.userId) arr.push(ele)
        })
      })
      dsf.http.post("fn/proUrgent/senRemind", {
        remindUserList: JSON.stringify(arr),
        text: this.smsContent,
        infoId: this.formParams.pk
      }).then(({ data }) => {
        dsf.layer.toast(data.message, true, () => { this.show = false })
      })
    }
  },
  created() {
    let loading = dsf.layer.loading()
    dsf.http.post("ctrl/proUrgent/getRemindAbleUsers", { infoId: this.formParams.pk }).then(({ data }) => {
      if (data.code == 200) {
        data.data.remindAbleUsers.forEach(item => {
          this.remindAbleUsers.push({
            uName: item.uName,
            userId: item.userId
          })
          this.result.push(item.userId)
        })
        this.smsContent = `【${this.formData.main["B0001"].value}】请您尽快处理。${data.data.user.deptName}-${data.data.user.userName}。`
        dsf.layer.closeLoading(loading)
      } else {
        dsf.layer.closeLoading(loading)
        dsf.layer.toast(data.message)
      }
    })
  }
}
</script>
<style scoped lang='scss'>
.remindersInfo {
  width: 90vw;
  min-height: 200px;

  .title {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    text-align: center;
    font-size: 17px;
  }

  .content {
    padding: 0 8px;

    .label {
      display: inline-block;
      padding: 5px 0;
      font-size: 15px;
    }

    .sms {
      border: 1px solid #aaa;
      margin-bottom: 10px;
      font-size: 15px;
      padding: 5px 3px;
    }
  }

  .btn {
    display: flex;
    border-top: 1px solid #ccc;

    button {
      flex: 1;
      height: 40px;
    }

    button:last-child {
      background-color: var(--normal);
      color: #fff;
    }

    button:first-child {
      background-color: #fff;
      color: var(--normal);
    }
  }
}
</style>