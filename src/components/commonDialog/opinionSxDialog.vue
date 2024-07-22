<template>
  <div class="opinionSxDialog">
    <van-popup v-model="show" closeable :style="{ height: '100vh', width: '100vw' }" @close="handleCancel">
      <div class="box">
        <van-button v-if="!formParams.selectOpinion" style="font-size: 13px;" class="btnbox" type="primary" size="small"
          @click="getXin">新增批示</van-button>
        <div class="box-text" v-for="(item, index) in dataValue" :key="index">
          <div class="textno">
            <div>环节名称:{{ item.actName }}</div>
            <div>接收:{{ item.rDate }}</div>
          </div>
          <div class="textno">
            <div>处理人员:{{ item.uName }}</div>
            <div>处理:{{ item.eDate }}</div>
          </div>
          <div class="textsan">
            <div>处理意见:{{ item.content }}</div>
          </div>
          <div class="textyi">
            <van-button style="font-size: 13px;" class="btnxiu" type="primary" size="small"
              @click="getAmend(item, index)">修改意见</van-button>
            <van-button style="font-size: 13px;" color="#FFA500" size="small" v-if="!formParams.selectOpinion"
              @click="getDel(item, index)">删除意见</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 选择日期 填写意见 -->
    <van-popup v-model="showPopup" round :style="{ height: '250px', width: '90vw' }">
      <van-nav-bar title="处理意见维护" left-text="取消" right-text="提交" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
      <van-field v-model="inputDate" label="意见时间" placeholder="请选择日期" @click="showPicker" :readonly="true" />
      <van-field v-model="message" rows="4" autosize label="填写意见" type="textarea" placeholder="请输入意见" />
    </van-popup>
    <!-- 日历弹窗 -->
    <van-calendar v-model="picker" type="single" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" />
  </div>
</template>
  
<script>
export default {
  name: "opinionSxDialog",
  props: {
    listData: {
      type: Object,
      default: () => { }
    },
    formParams: {
      type: Object,
      default: () => { }
    }
  },
  components: {},
  data() {
    return {
      show: true,
      showPopup: false,
      picker: false,
      message: "",
      inputDate: "",
      // currentDate: new Date(),
      dataTime: "",
      minDate: new Date(new Date().getFullYear() - 5, 0, 1),
      maxDate: new Date(new Date().getFullYear() + 5, 11, 31),
      dataValue: [],
      itemValue: {},
      refresh: true,
      listDatas: {},
    };
  },
  methods: {
    getData() {
      let pams = {
        limit: '999',
        sourceType: '16',
        infoId: this.formParams.pk || this.listDatas.dataValue.infoId,
        searchText: '',
        page: '1',
      }
      let url = dsf.config.commonForm.selectOpinion?.showPnodesUrl ?? "fn/flowinfo/showPnodes"
      dsf.http.post(url, pams).then((data) => {
        this.dataValue = data.data.data
        console.log(this.dataValue);
      })
    },
    //新增弹窗
    getXin() {
      this.showPopup = true
      this.inputDate = ''
      this.message = ''
      this.getDate()
      this.inputDate = this.dataTime
      this.itemValue = {}
    },
    handleCancel() {
      this.show = false
      this.$emit("closeCallback", this.refresh)
    },
    showPicker() {
      // this.picker = true
    },
    onPickerCancel() {
      this.picker = false
    },
    onClickLeft() {
      this.showPopup = false
    },
    //新增意见确认
    onClickRight() {
      let self = this
      if (this.formParams.selectOpinion) {
        let params = {
          id: self.itemValue.id,
          infoId: self.formParams.pk,
          rdate: self.inputDate,
          content: self.message,
          subList: [],
          moduleId: self.formParams.moduleId,
          pk: self.formParams.pk
        }
        let url = dsf.config.commonForm.selectOpinion?.changeOpinionUrl ?? "fn/shareRead/toChangeOpinion"
        dsf.http.post(url, params).then(({ data }) => {
          dsf.layer.toast(data.message)
          self.showPopup = false
        })
      } else {
        let pams = {
          rdate: self.inputDate,
          pk: self.formParams.pk || self.listDatas.dataValue.infoId,
          content: self.message
        }
        if (Object.keys(self.itemValue).length == 0) {
          dsf.http.post('fn/personalDealListProject/toChangeOpinion', pams).then((data) => {
            console.log(data);
            if (data.data.code == '200') {
              dsf.layer.toast(data.data.message)
              self.showPopup = false
              this.getData()
            } else {
              dsf.layer.toast(data.data.message)
              self.showPopup = false
            }
          })
        } else if (Object.keys(self.itemValue).length != 0) {
          let params = {
            subList: [],
            rdate: self.inputDate,
            pk: self.formParams.pk || self.listDatas.dataValue.infoId,
            moduleId: self.itemValue.moduleId,
            content: self.message,
            infoId: self.formParams.pk || self.listDatas.dataValue.infoId,
            id: self.itemValue.id
          }
          dsf.http.post('fn/personalDealListProject/changeOpinion', params).then((data) => {
            if (data.data.code == '200') {
              dsf.layer.toast(data.data.message)
              self.showPopup = false
              this.getData()
            } else {
              dsf.layer.toast(data.data.message)
              self.showPopup = false
            }
          })
        }
      }
    },
    onConfirm(data) {
      this.picker = false;
      this.getDate()
      function isSameDay(date) {
        const today = new Date();
        const givenDate = new Date(date);
        return (
          today.getFullYear() === givenDate.getFullYear() &&
          today.getMonth() === givenDate.getMonth() &&
          today.getDate() === givenDate.getDate()
        );
      }
      const givenDate = new Date(data);
      const isToday = isSameDay(givenDate);
      if (isToday == true) {
        this.inputDate = this.dataTime
      } else {
        this.inputDate = dsf.date.format(data, 'yyyy-mm-dd hh:ii')
      }
    },
    getAmend(item, index) {
      this.showPopup = true
      this.getDate()
      this.message = item.content
      this.inputDate = this.dataTime
      this.itemValue = item
    },
    getDel(item, index) {
      console.log(item);
      let self = this
      let params = {
        pk: self.formParams.pk || self.listDatas.dataValue.infoId,
        id: item.id
      }
      dsf.layer.confirm({
        message: '确定删除该意见吗?',
        title: '提示',
        confirmButtonText: '确定'
      }, () => {
        dsf.http.post("fn/personalDealListProject/exSend", params).then((data) => {
          if (data.data.code == '200') {
            dsf.layer.toast(data.data.message)
            this.getData()
          } else {
            dsf.layer.toast(data.data.message)
          }
        })
      })
    },
    getDate() {
      this.picker = false;
      let now = new Date();
      let year = now.getFullYear();
      let month = String(now.getMonth() + 1).padStart(2, "0");
      let day = String(now.getDate()).padStart(2, "0");
      let hours = String(now.getHours()).padStart(2, "0");
      let minutes = String(now.getMinutes()).padStart(2, "0");
      this.dataTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  created() {
    this.listDatas = this.listData
    this.getData()
  }
};
</script>
  
<style scoped lang='scss'>
.box {
  margin-top: 12%;

  .btnbox {
    margin-left: 78%;
    margin-top: 8px;
  }
}

.btnbox-pop {
  margin-bottom: 0px;
  margin-left: 50%;
}

.box-text {
  font-size: 15px;
  background-color: rgba(224, 222, 222, 0.26);
  box-shadow: 0 1px 10px 0 rgba(80, 78, 78, 0.26);
  border-radius: 3px;
  width: 90%;
  margin-left: 6%;
  margin-top: 5px;
  margin-bottom: 8px;

  .textno {
    padding: 4px;
    padding-left: 10px;
  }

  .textyi {
    border-top: 1px solid #DCDCDC;
    padding-top: 8px;
    margin-right: 10px;
    padding-bottom: 8px;
    display: flex;
    justify-content: flex-end;

    .btnxiu {
      margin-right: 14px;
    }
  }

  .textsan {
    padding-top: 0.16rem;
    padding-left: 10px;
    margin-bottom: 0.06rem;
  }
}
</style>