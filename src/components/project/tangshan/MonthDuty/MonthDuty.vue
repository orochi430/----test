<template>
  <div>
    <!-- 带班标识符 -->
    <div class="choose">
      <i class="icon iconfont icontable" @click="openTable"></i>
      <div class="smallchoose">
        <div class="circle circleone"></div>
        <p>带班</p>
      </div>
      <div class="smallchoose">
        <div class="circle circletwo"></div>
        <p>白班</p>
      </div>
      <div class="smallchoose">
        <div class="circle circlethree"></div>
        <p>夜班</p>
      </div>
    </div>
    <!-- 日历 -->
    <div class="calendar">
      <div class="dashboard-container">

        <el-calendar v-model="date">
          <template slot="dateCell" slot-scope="{date, data}">
            <!-- <div :class="{ selected: isSelected(date, data) }"> -->
              <div @click="showReplaceDialog(data)">
              <!-- 如果是选中的日期，那么将所对应的参数传进isSelected此函数 -->
              <!-- 阳历和阴历 -->
              <div class="solar">{{ data.day.split('-')[2] }}</div>
              <!-- 对于日历上面的阳历几号进行格式化将日期截取出来，data中的day是yy-mm-dd的日期格式，先将日期格式划分为数组，然后取出代表的具体日期即可 -->
              <div class="lunar" :class="{ festival: dsf.date.isFestival(date, data.day) }">{{
                dsf.date.solarToLunar(date, data.day) }}</div>
              <!-- 农历有节日需要传进两个函数里面，一个是isFestival函数用来判断是否是节日，然后将此单元格所表示的日期传进solarTolunar中，将阳历日期转化为农历日期，如果该日期是农历，就会有农历的样式 -->

              <!-- 循环值班表 -->
              <div v-for="(item, index) in textContent(data.day)" :key="index" class="dutypeople">
                <div class="dutySchedule-content" style="">
                  <div class="smallbox1">
                    <div v-for="(a, b) in item.leader" :key="`${b}+0a`">
                      <div v-show="item.leader.name != ''" :class="a.isSelf ? 'mySelf' : 'box1'">{{ a.name }}
                        <i class="icon iconfont iconliuzhuan2" v-show="a.shiftChangesType && a.shiftChangesType > 0"></i>
                      </div>
                    </div>
                  </div>
                  <div class="smallbox2">
                    <div v-for="(a, b) in item.dayduty" :key="`${b}+0b`">
                      <div v-show="item.dayduty.name != ''" :class="a.isSelf ? 'mySelf' : 'box2'">{{ a.name }}
                        <i class="icon iconfont iconliuzhuan2" v-show="a.shiftChangesType && a.shiftChangesType > 0"></i>
                      </div>
                    </div>
                  </div>
                  <div class="smallbox3">
                    <div v-for="(a, b) in item.nightduty" :key="`${b}+0c`">
                      <div v-show="item.nightduty.name != ''" :class="a.isSelf ? 'mySelf' : 'box3'">{{ a.name }}
                        <i class="icon iconfont iconliuzhuan2" v-show="a.shiftChangesType && a.shiftChangesType > 0"></i>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
    <van-dialog v-model="isShowReplace" title="调换班/替班信息">
      <div class="replace-dialog">
        <div class="replacebox" v-if="shiftChanges?.leaderShiftChanges?.length > 0">
          <p class="replacetext1"><i></i>带班组</p>
          <div v-for="(item, index) in shiftChanges.leaderShiftChanges" :key="index">
            <span>申请时间：{{item.date}}</span>
            <span>值班信息：{{item.info}}</span>
          </div>
        </div>
        <div class="replacebox" v-if="shiftChanges?.dayShiftChanges?.length > 0">
          <p class="replacetext2"><i></i>白班组</p>
          <div v-for="(item, index) in shiftChanges.dayShiftChanges" :key="index">
            <span>申请时间：{{item.date}}</span>
            <span>值班信息：{{item.info}}</span>
          </div>
        </div>
        <div class="replacebox" v-if="shiftChanges?.nightShiftChanges?.length > 0">
          <p class="replacetext3"><i></i>夜班组</p>
          <div v-for="(item, index) in shiftChanges.nightShiftChanges" :key="index">
            <span>申请时间：{{item.date}}</span>
            <span>值班信息：{{item.info}}</span>
          </div>
        </div>
      </div>
    </van-dialog>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
      <van-nav-bar title="值班表" fixed placeholder @click-left="closeFile" @click-right="closeFile">
        <template v-if="appTopMenu" #left>
          <van-icon name="arrow-left" />返回
        </template>
        <template v-else #right>
          <span>关闭文件</span>
        </template>
      </van-nav-bar>
      <div class="content">
        <iframe :src="fileUrl" frameborder="0"></iframe>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Calendar } from "element-ui"
Vue.use(Calendar);
export default {
  name: 'Month',
  data() {
    return {
      currentmonthdate: '',
      arr: [],
      date: new Date(),
      user: dsf.util.loadSessionStore("user"),
      isShowReplace: false,
      shiftChanges: {},
      showFile: false,
      appTopMenu: dsf.config.appTopMenu.value,
      fileUrl: '',
      files: {}
    }
  },
  mounted() {
    let prebtn = document.getElementsByClassName("el-calendar__button-group")[0].children[0].children[0]
    let currentbtn = document.getElementsByClassName("el-calendar__button-group")[0].children[0].children[1]
    let nextbtn = document.getElementsByClassName("el-calendar__button-group")[0].children[0].children[2]
    currentbtn.innerHTML = "本月";
    prebtn.innerHTML = "上月"
    nextbtn.innerHTML = "下月"
    this.currentmonthdate = moment(this.date).format('YYYY-MM-DD').split("-")[0] + "-" + moment(this.date).format('YYYY-MM-DD').split("-")[1]
    nextbtn.addEventListener("click", () => {
      this.currentmonthdate = moment(this.date).format('YYYY-MM-DD').split("-")[0] + "-" + moment(this.date).format('YYYY-MM-DD').split("-")[1]
      this.getdata()
    })

    currentbtn.addEventListener("click", () => {
      this.currentmonthdate = moment(this.date).format('YYYY-MM-DD').split("-")[0] + "-" + moment(this.date).format('YYYY-MM-DD').split("-")[1]
      this.getdata()
    })

    prebtn.addEventListener("click", () => {
      this.currentmonthdate = moment(this.date).format('YYYY-MM-DD').split("-")[0] + "-" + moment(this.date).format('YYYY-MM-DD').split("-")[1]
      this.getdata()
    })

    this.getdata()

  },
  methods: {
    getdata() {
      this.arr = []
      dsf.http.post("/fn/mobileDuty/monthDuty", { monthdate: this.currentmonthdate }).then((res) => {
        this.arr = res.data.data
      })
    },
    textContent(date) {
      if (this.arr != null) {
        return this.arr.filter(item => {
          return date === item.time
          // 三目运算符的执行语句也可以是函数的调用，然后返回的是true的语句:返回当日期和数据数组里面的日期相同时，就返回其值，并存放在数组中
        })
      }
    },
    showReplaceDialog(data) {
      if (this.arr != null) {
        this.arr.map(item => {
          if (data.day == item.time) {
            this.shiftChanges = item.shiftChanges;
            if (item.shiftChanges) {
              this.isShowReplace = Object.keys(item.shiftChanges).some(el => {
                return item.shiftChanges[el].length > 0;
              })
            }
          }
        })
      }
    },
    openTable() {
      let year = moment(this.currentmonthdate).get('year');
      let month = moment(this.currentmonthdate).get('month') + 1;
      dsf.http.post(`/fn/dutyScheduleCtrl/mobileGenerate?year=${year}&month=${month}`).then((res) => {
        if(res && res.data && res.data.code == "200") {
          this.files = res.data.data;
          if (this.files) {
            this.openFile(this.files)
          } else {
            dsf.layer.toast("该月份暂无排班表格")
          }
        } else {
          dsf.layer.toast(res.data.message || "该月份没有排班信息");
        }
      })
      .catch(error => {
        dsf.layer.toast("该月份暂无排班表格");
      })
    },
    openFile(file) {
      if (navigator.userAgent.includes("DreamSoft")) { // 公司app中
        if (dsf.config.commonForm.nativeWps) { // 使用wpsApp打开
          this.wpsOpen(file)
          return 
        }
      }
      let previewUrl = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${file.id}&moduleId=${file.moduleId}&fileName=${file.fileName}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&isTemp=1&initDataSource=1`);
      
      this.fileUrl = previewUrl
      this.showFile = true;
    },
    wpsOpen(doc) {
      let rootPath = dsf.url.getRootPath()
      let loginToken = dsf.util.loadSessionStore("loginToken");
      var param = {
        keepCallback: true,
        downUrl: rootPath + `fn/file/download?fileId=${doc.id}&fileName=${doc.fileName}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.fileName}`,
        saveUrl: '',
        fileName: doc.fileName,
        openWithWPS: true,
        uploadFile: true,
        openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
        enterReviseMode: false,
        showReviewingPaneRightDefault: false,
        userName: dsf.util.loadSessionStore("user").name
      };
      console.log(param);
      $WPS.downAndOpen(param, function (data) {
        console.log(data);
      }, function (data) {
        console.log("错误回调", data);
      });
    },
    closeFile() {
      this.showFile = false;
      dsf.http.post(`/fn/dutyScheduleCtrl/deleteTemp?id=${this.files.id}&fileName=${this.files.fileName}`).then((res) => {

      })
      this.files = {};
    },
  }
}
</script>

<style lang="scss" scoped>
.choose {
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  // margin-left: 25%;
  justify-content: center;
  position: relative;

  .iconfont {
    font-size: 20px;
    color: #333;
    position: absolute;
    right: 10px;
  }

  .smallchoose {
    // width: 100%;
    display: flex;
    align-items: center;
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }

    .circle {
      width: 12PX;
      height: 12PX;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 1);
    }

    .circleone {
      background: #E44242;
    }

    .circletwo {
      background: #E28001;
    }

    .circlethree {
      background: #42A1E4;
    }

    p {
      // width: 48PX;
      height: 33PX;
      font-family: PingFangSC-Regular;
      font-size: 12PX;
      color: black;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
      line-height: 33PX;
      margin-left: 10px;
    }
  }
}

/**隐藏上一月、本月、下一月*/
.el-calendar__button-group {
  display: none;
}

/**月份居中*/
.el-calendar__title {
  width: 100%;
  text-align: center;
}

/**日期div的样式*/
::v-deep .el-calendar__body {
  padding: 0;
  margin: 0;
  border: none;
}

.el-calendar-table tr td:first-child {
  border-left: 0px;
}

::v-deep .el-calendar-table td {
  min-height: 120px;
  min-width: 110px;
  border: none;
  padding: 0;
}

.el-calendar-table td.is-selected {
  background-color: white;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 100%;
  padding: 4px;
  text-align: center;

}

.el-calendar-table .el-calendar-day>div {
  // height: 104px;
  text-align: center
}

/**日期div的样式-公历*/
.el-calendar-table .el-calendar-day>div .solar {
  // padding-top: 30px;
  text-align: center
}

/**日期div的样式-农历*/
.el-calendar-table .el-calendar-day>div .lunar {
  // padding-top: 10px;
  text-align: center;
  font-size: 10px;
}

/**日期div的样式-选中*/
// .el-calendar-table .el-calendar-day>div.selected {
//   background-color: #fef2f2;
//   border: 3px solid #fb0;
//   border-radius: 20px;
//   text-align: center
// }


/**本月周末设置为红色*/
// .el-calendar-table .current:nth-last-child(-n+2) .solar {
//   color: red;
// }

/**本月农历设置为灰色*/
.el-calendar-table .current .lunar {
  color: #606266;
}

/**本月农历节日设置为红色*/
// .el-calendar-table .current .lunar.festival {
//   color: red;
// }

/**禁用点击效果*/
/*.el-calendar-table td {*/
/*pointer-events: none;*/
/*}*/


.dutySchedule-content {
  padding: 0;
  color: black;
  border-radius: 3px;
  font-size: 10px;
  text-align: center;
  overflow: auto;

  .box1 {
    color: #E44242;
    background-color: #FFE3E3;
    margin-top: 5%;
  }

  .box2 {
    color: #E28001;
    background-color: #FFF4D0;
    margin-top: 5%;
  }

  .box3 {
    color: #42A1E4;
    background-color: #E3F4FF;
    margin: 5% 0;
  }

  .iconfont {
    font-size: 0.2rem;
    color: #666;
  }

  .mySelf {
    color: #2EC178;
    background: rgba(46, 193, 120, 0.3);
    margin-top: 5%;
  }

}

.dutypeople {
  // height: 50px;
  overflow: auto;
}

.dutypeople::-webkit-scrollbar {
  display: none;
}

::v-deep .el-calendar-table td {
  border: none !important;
  // height: 100px;
}

::v-deep .el-calendar-table td>.el-calendar-day {
  height: 100% !important;
}

.replace-dialog {
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;

  .replacebox {
    border-bottom: 1px solid #c9c9c9;

    &:last-child {
      border-bottom: none;
    }

    p {
      margin: 10px 0 5px 0;
      display: flex;
      align-items: center;
      font-size: var(--font_size_3);
      color: black;

      i {
        width: 12PX;
        height: 12PX;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 1);
        margin-right: 5px;
      }
    }

    .replacetext1 i {
      background: #E44242;
    }

    .replacetext2 i {
      background: #E28001;
    }

    .replacetext3 i {
      background: #42A1E4;
    }

    div {
      padding: 0 0 10px 0;
      display: flex;
      flex-direction: column;

      span {
        font-size: var(--font_size_3);
        color: #333;
        margin: 3px;
      }
    }
  }
}

.file-preview {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
