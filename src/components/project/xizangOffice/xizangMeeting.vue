<template>
  <div>
    <div class="center flex">
      <template v-if="!identity">
        <span>已入会 ({{ personList.length }})</span>
        <button @click="showPop2 = true">主持会议</button>
      </template>
      <template v-if="identity">
        <span>参会者</span>
        <div>
          <button class="identityBtn" @click="allSilent()">全部静音</button>
          <button class="identityBtn" @click="showPopList(0)">更多</button>
        </div>
      </template>
    </div>
    <div class="identity flex" v-if="identity">
      <span>已入会 ({{ personList.length }})</span>
      <!-- <div class="flex">
        <van-search v-model="search" left-icon="" maxlength="10" />
        <van-icon name="search" @click="searchKeys()" />
      </div> -->
    </div>
    <div class="footer" v-for="(item,index) in personList" :key="index">
      <div class="footer-list flex">
        <div class="footer-left flex_center">
          <svg t="1663146484780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1612" width="28" height="28"><path d="M512.010745 1022.082324c-282.335297 0-511.220241-228.798986-511.220241-511.036046C0.790504 228.798986 229.675448 0 512.010745 0c282.312784 0 511.198751 228.798986 511.198751 511.046279C1023.208473 793.285385 794.322505 1022.082324 512.010745 1022.082324zM512.010745 95.826486c-229.385341 0-415.371242 185.884594-415.371242 415.220816 0 107.22714 41.021276 204.6551 107.802238 278.339286 60.140729-29.092595 38.062897-4.88424 116.77254-37.274952 80.539314-33.089629 99.610672-44.639686 99.610672-44.639686l0.776689-76.29464c0 0-30.169113-22.890336-39.543621-94.683453-18.895349 5.426593-25.108864-21.988804-26.237571-39.429011-1.001817-16.863063-10.926864-69.487607 12.105712-64.739467-4.714372-35.144428-8.094352-66.844407-6.417153-83.633792 5.763261-58.938344 62.97324-120.518864 151.105486-125.017318 103.665011 4.486174 144.737452 66.028832 150.500713 124.9682 1.680269 16.800641-2.028193 48.511877-6.739495 83.594907 23.025413-4.686742 13.028735 47.861054 11.901051 64.726164-1.028423 17.440208-7.394411 44.756343-26.208918 39.34203-9.42158 71.79107-39.593763 94.498234-39.593763 94.498234l0.725524 75.924203c0 0 19.070334 10.788717 99.609649 43.892673 78.70862 32.387641 56.605206 9.609869 116.77561 38.765909 66.75231-73.686233 107.772562-171.101913 107.772562-278.339286C927.356404 281.712103 741.398132 95.826486 512.010745 95.826486z" p-id="1613" fill="#bfbfbf"></path></svg>
          <div>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="footer-right flex_center">
          <div @click="converMic(item, item.muteStatus) ">
            <svg v-show="identity && !item.muteStatus" t="1663146662073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2165" width="21" height="21"><path d="M896 490.666667a362.346667 362.346667 0 0 1-341.333333 362.046666V938.666667h192a21.333333 21.333333 0 0 1 0 42.666666H320a21.333333 21.333333 0 0 1 0-42.666666h192v-85.953334A362.366667 362.366667 0 0 1 170.666667 490.666667a21.333333 21.333333 0 0 1 42.666666 0c0 176.446667 143.553333 320 320 320s320-143.553333 320-320a21.333333 21.333333 0 0 1 42.666667 0zM317.113333 582A233.22 233.22 0 0 1 298.666667 490.666667V277.333333a234.666667 234.666667 0 1 1 469.333333 0v213.333334a234.726667 234.726667 0 0 1-450.886667 91.333333zM341.333333 490.666667c0 105.866667 86.133333 192 192 192s192-86.133333 192-192V277.333333c0-105.866667-86.133333-192-192-192S341.333333 171.466667 341.333333 277.333333z" fill="#2c2c2c" p-id="2166"></path></svg>
            <svg v-show="identity && item.muteStatus" t="1663147665367" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2417" width="21" height="21"><path d="M874.666667 469.333333a21.333333 21.333333 0 0 0-21.333334 21.333334c0 176.446667-143.553333 320-320 320a318.266667 318.266667 0 0 1-186.82-60.34l61.333334-61.333334A234.606667 234.606667 0 0 0 768 490.666667V328.84l121.753333-121.753333a21.333333 21.333333 0 1 0-30.173333-30.173334L767.826667 268.666667A234.666667 234.666667 0 0 0 298.666667 277.333333v213.333334a233.966667 233.966667 0 0 0 68.733333 165.933333c2.086667 2.086667 4.22 4.12 6.373333 6.12l-60.273333 60.273333C251.853333 664.626667 213.333333 582.06 213.333333 490.666667a21.333333 21.333333 0 0 0-42.666666 0 361.593333 361.593333 0 0 0 106.22 256.446666q3.126667 3.126667 6.326666 6.173334l-106.3 106.293333a21.333333 21.333333 0 0 0 30.173334 30.173333l108.786666-108.793333A361.266667 361.266667 0 0 0 512 852.713333V938.666667H320a21.333333 21.333333 0 0 0 0 42.666666h426.666667a21.333333 21.333333 0 0 0 0-42.666666H554.666667v-85.953334A362.366667 362.366667 0 0 0 896 490.666667a21.333333 21.333333 0 0 0-21.333333-21.333334z m-149.333334 21.333334c0 105.866667-86.133333 192-192 192a190.786667 190.786667 0 0 1-94.333333-24.826667l286.333333-286.333333z m-384 0V277.333333c0-105.866667 86.133333-192 192-192s192 86.133333 192 192v33.826667l-321.333333 321.333333A191.553333 191.553333 0 0 1 341.333333 490.666667z" fill="#d81e06" p-id="2418"></path></svg>
          </div>
          <span v-if="identity" @click="showPopList(1,item)">更多</span>
        </div>
      </div>
    </div>
    <van-popup v-model="showPop2" :style="{ height: '3rem', width: '80%'}">
<div class="popPass">
  <div class="__user_box-header">
        <div class="__title">主持会议</div>
      </div>
      <input v-model="password" type="text" maxlength="6" placeholder="请输入会控密码" />
      <div class="__user_box-footer">
        <van-button type="default" @click="password='';showPop2 = false;">取消</van-button>
        <van-button type="primary" @click="confirm">确定</van-button>
      </div>
</div>
    </van-popup>
    <van-popup class="popList" v-model="showPop" position="bottom" :style="{ height: popHeight }" >
      <div v-for="(item, index) in popList" :key="index" @click="position(item.index)">{{item.name}}</div>
      <div @click="showPop = false">取消</div>
    </van-popup>
  </div>

</template>

<script>
export default {
  name: "xizangMeeting",
  data() {
    return {
      personList: [], // 会议信息
      identity: 0, // 用户身份
      showPop: false, // 功能弹层
      popHeight: "", // 功能弹层高度
      popList: [], // 功能弹层列表
      meetingNum: "", // 云会议号
      bySelectPerson: "", // 被选中人员
      search: "", // 搜索框
      recording: false, // 开始录制/结束录制
      lockout: false, // 会议锁定/会议解锁
      showPop2: false, //会控密码弹窗
      password: "", // 会控密码
    }
  },
  created() {
    if (dsf.util.loadSessionStore('identity')) {
      dsf.util.loadSessionStore('identity').identity ? this.identity = 1 : this.identity = 0
    }
    this.meetingNum = this.$route.query.meetingNum
    this.init()
  },
  methods: {
    confirm(){
      if(this.password.length == 0){
        dsf.layer.toast("请输入密码")
        return;
      }
      dsf.http.post("fn/vedioMeeting/judgeControlPassword",{
        meetingRoom: this.meetingNum,
        controlPassword: this.password
      }).then(({data}) => {
          if(data.code == "200") {
            let loading = dsf.layer.loading("")
            dsf.util.saveToSessionStore("identity",  {identity: 1})
            this.identity = 1
            this.init()
            dsf.layer.closeLoading(loading)
            this.showPop2 = false
          }else if(data.code == "500") {
            dsf.layer.toast("密码错误")
          }
        }
      )
    },
    init() {
      dsf.http.post(`fn/vedioMeeting/getPersonnelByMeetingRoom?meetingRoom=${this.meetingNum}`).then(
        ({ data }) => {
          this.personList = data.deviceStatusList ? data.deviceStatusList : []
          this.lockout = data.locked
          this.recording = data.recordingDevice ? true : false
        })
    },
    converMic(item, status) {
      let flag
      let url
      if (status == 0) {
        flag = 1
        url = "singleSpeech"
      } else {
        flag = 0
        url = "relieveSingleSpeech"
      }
      this.personList.find(el => el.device.id == item.device.id).muteStatus = flag
      dsf.http.post(`fn/vedioMeeting/${url}`, {
        meetingRoom: this.meetingNum,
        id: item.device.id,
        type: item.device.type,
        participantNumber: item.device.participantNumber
      })
    },
    showPopList(flag, item) {
      if (flag == 0) {
        this.popList = [
          { name: "开始录制", index: 0 },
          { name: "锁定会议", index: 1 },
          { name: "解除全体静音", index: 2 },
          { name: "结束会议", index: 3 }
        ]
        this.recording ? this.popList[0].name = "结束录制" : ""
        this.lockout ? this.popList[1].name = "解锁会议" : ""
      } else {
        this.popList = [
          { name: "挂断", index: 4 },
        ]
      }
      item ? this.bySelectPerson = item.device : ""
      this.popHeight = `${(this.popList.length + 1) * 0.71}rem`
      this.showPop = true
    },
    position(index) {
      switch (index) {
        case 0:
          let url = this.recording ? "endRecordVideo" : "startRecordVideo"
          dsf.http.post(`fn/vedioMeeting/${url}?meetingRoom=${this.meetingNum}`).then(({ data }) => {
            if (data.code == "200") {
              this.recording = !this.recording
              this.popList[0].name = this.recording ? "结束录制" : "开始录制"
            }
          })
          break;
        case 1:
          let url1 = this.lockout ? "meetingUnlock" : "meetingLock"
          dsf.http.post(`fn/vedioMeeting/${url1}?meetingRoom=${this.meetingNum}`).then(({ data }) => {
            if (data.code == "200") {
              this.lockout = !this.lockout
              this.popList[1].name = this.lockout ? "解锁会议" : "锁定会议"
            }
          })
          break;
        case 2:
          dsf.http.post(`fn/vedioMeeting/allReleaseSilence?meetingRoom=${this.meetingNum}`).then(({ data }) => {
            if (data.code == 200) {
              this.personList.forEach(item => item.muteStatus = 0)
            }
          })
          break;
        case 3:
          dsf.layer.confirm({
            message: "是否结束会议",
            confirmButtonText: "是",
            cancelButtonText: "否",
          }, () => {
            dsf.http.post(`fn/vedioMeeting/meetingDismiss?meetingRoom=${this.meetingNum}`)
          }, () => { })
          break;
        case 4:
          dsf.layer.confirm({
            message: "是否挂断此人",
            confirmButtonText: "是",
            cancelButtonText: "否",
          }, () => {
            dsf.http.post("fn/vedioMeeting/kickPeople", {
              meetingRoom: this.meetingNum,
              id: this.bySelectPerson.id,
              type: this.bySelectPerson.type,
              participantNumber: this.bySelectPerson.participantNumber
            }).then(({ data }) => {
              if (data.code == 200) {
                this.init()
                this.showPop = false
              }
            })
          }, () => { })
          break;
        default:
          break;
      }
    },
    allSilent() {
      dsf.http.post(`fn/vedioMeeting/allSilence?meetingRoom=${this.meetingNum}`).then(({ data }) => {
        if (data.code == 200) {
          this.personList.forEach(item => item.muteStatus = 1)
        }
      })
    },
    // searchKeys() {
    //   dsf.layer.toast("功能待开发...")
    // }
  },
}
</script>
<style lang='scss' scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  background-color: white;
  height: 45px;

  padding: 10px 20px;
  border-bottom: 1px rgb(148, 148, 148) solid;

  button {
    width: 73px;
    height: 29px;
    background-color:#3875F6;
    color: white;
    font-size: 13px;
    border-radius: 5px;
  }

  .identityBtn {
    border-radius: 15px;
  }

  .identityBtn:first-child {
    background-color: rgb(214, 59, 59);
    margin-right: 8px;
  }
}

.identity {
  padding: 0 20px;
  background-color: white;

  span {
    display: block;
    color: #3875F6;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px #3875F6 solid;
  }
}

.footer {
  margin-top: 10px;

  .footer-list {
    height: 40px;
    padding: 10px 20px;

    span {
      margin-left: 8px;
    }

    .footer-right span {
      color: #3875F6;
    }
  }
}

.popList div {
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: white;
  text-align: center;
}

.popList div:last-child {
  border-top: 1px rgb(148, 148, 148) solid;
}
.popPass{
  .__user_box-header {
  height: 46px;
  border-bottom: 1px solid #eee;
  background-color: #f4f5f6;

  .__title {
    line-height: 46px;
    padding: 0 20px;
    font-size: var(--font_size_2);
    font-weight: bold;
    color: #666;
    text-align: center;
  }
}
input{
    text-align: center;
    background-color: rgb(244,245,247);
    width: 100%;
    height: 45px;
  }
.__user_box-footer {
  padding: 0 10px;
  border-top: 1px solid #eee;
  background-color: #f4f5f6;
  height: 46px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}

}

>>>.van-nav-bar__content {
  background-color: rgb(57, 57, 69);

  .van-nav-bar__title,
  .van-nav-bar__left i,
  .van-nav-bar__left span {
    color: white !important
  }
}

>>>.van-icon-search {
  padding: 15px;
}

>>>.van-search {
  padding: 0;

  .van-search__content {
    background-color: white;
  }
}

::v-deep .van-switch {
  float: right;
}

::v-deep .van-field__control {
  text-align: right;
}

::v-deep .van-button {
  float: left;
  width: 48%;
  height: 100%;
}
</style>
