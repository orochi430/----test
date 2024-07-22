<template>
  <div class="reserve-meeting">
    <!--    <van-nav-bar title="预定会议室" left-arrow @click-left="$router.back()" />-->
    <!-- <van-popup v-model="showPicker" position="bottom" round get-container="#app" :style="{ height: '500px' }">
      <van-calendar :poppable="false" @confirm="onConfirm" first-day-of-week="1"/>
    </van-popup> -->
    <van-sticky :offset-top="dsf.util.getOffsetTop()">
      <!-- <div class="_time">
        <div @click="showPicker = true">
          <i class="iconfont">&#xe61f;</i>
          <span class="ds_font6">{{ dateStr }}</span>
        </div>
        <div class="filter">
          <van-dropdown-menu>
            <van-dropdown-item v-model="typeValue" :options="typeOption" @change="postData"/>
          </van-dropdown-menu>
        </div>
      </div> -->
      <time-picker @onConfirm="onConfirm" @showSearchAction="showSearchAction"></time-picker>
    </van-sticky>
    <van-action-sheet v-model="showFilter" class="searchSheet" position="bottom" round>
      <van-nav-bar title="筛选" @click-left="showFilter = !showFilter" @click-right="showFilter = !showFilter" />
      <div class="sheetBox flex1">
        <div class="filter-box" v-if="typeOption.length > 2">
          <p class="title">会议室类别</p>
          <ul>
            <li v-for="(item, index) in typeOption" :key="index" :class="{ checked: typeValue == item.value }"
              @click="checkTypeBox(item, index)">
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="filter-box">
          <p class="title">
            该时间段可用{{
      timeValue[1] != 0
        ? `（${timeValue[0]}点 - ${timeValue[1]}点）`
        : ""
    }}
          </p>
          <van-slider v-model="timeValue" range @change="changeFilterTime" :min="0" :max="24" :step="1"
            bar-height="5px">
            <template #button>
              <div class="custom-button">
                <!-- <span>{{ timeValue[0] }}点</span> -->
              </div>
            </template>
          </van-slider>
        </div>
        <div class="filter-box" v-if="sourceList.length > 0 && !dsf.config.meetProjectconfig?.searchNoSource">
          <p class="title">会议室需要有以下资源</p>
          <ul>
            <li v-for="(item, index) in sourceList" :key="index" :class="{ checked: sourceValue.includes(item.id) }"
              @click="checkSourceBox(item, index)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="btnBox disfr jsb">
        <van-button class="flex1" @click="returnFilter">清空</van-button>
        <van-button class="flex1" type="info" @click="filterConfirm">确定</van-button>
      </div>
    </van-action-sheet>
    <div class="_contents" v-if="meetingData">
      <div v-for="item in meetingData" :key="item.id" class="_content">
        <div class="_item">
          <div class="_right" @click="imageClick(item)">
            <van-image :src="item.images | urlFilter" fit="cover" lazy-load>
              <template v-slot:error>
                <img src="../../assets/imgs/meetingRoom.jpg" />
              </template>
            </van-image>
          </div>
          <div class="_left" @click="book(item)">
            <div class="_title ds_font4">
              {{ item.bame }} {{ item.name }}
              <span v-if="item.number" class="num-span">{{ item.number }}</span>
            </div>
            <!-- <div class="_shebei ds_font6">{{ item.configSetUp | emptyFilter('暂无相关设备') }}</div> -->
            <div class="_shebei ds_font6" v-if="item.resource">
              <div v-for="(res, index) in item.resource.split(',')" :key="index">{{ res }}</div>
            </div>
            <!-- <div class="_shebei ds_font6" v-else>无可用资源</div> -->
            <!-- <div class="_num">
              <i class="iconfont">&#xe614;</i>
              <span class="ds_font6">{{ item.number }}</span>
            </div> -->
          </div>
        </div>
        <!--        <div class="_status">-->
        <!--          <div v-for="(v, i) in item.occupydate"-->
        <!--               :key="i"-->
        <!--               class="_status-item">-->
        <!--            <div class="name">{{ statusConfig[v.status] }}</div>-->
        <!--            <span>{{ v.starttime }} 到 {{ v.endtime }}</span>-->
        <!--          </div>-->
        <!--        </div>-->
        <!-- <div class="_progress">
          <div class="_progress-box">
            <div v-if="expire" :style="expire" class="_progress-bar __o"/>
            <div v-for="(v, i) in item.occupydate" :key="i" :style="progressBar(v)" :class="['__' + v.status]" class="_progress-bar"/>
          </div>
          <div class="_time_dot">
            <div v-for="n in 17" :key="n">{{ n + 6 }}</div>
          </div>
        </div> -->
        <div class="time-process">
          <ul>
            <li v-for="(ele, i) in item.timelist" :key="i">
              <div class="process-box" @click.stop="goForm(item, ele)">
                <div class="process-top" :class="['__' + ele.children[0].status]"></div>
                <div class="process-bottom" :class="['__' + ele.children[1].status]"></div>
                <span>{{ ele.num < 10 ? "0" + ele.num : ele.num }}:00</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <commonempty v-if="!meetingData.length"></commonempty>
    <!-- <dsf-fab :fab-items="addBtn"></dsf-fab> -->
    <van-dialog v-model="toastShow" width="60%" :showConfirmButton="false" :close-on-click-overlay="true">
      <div class="dio-head">会议占用信息</div>
      <div class="dio" v-for="(toast, i) in toastData" :key="i">
        <div v-if="toast.time" class="dio-time">
          <i>{{ toast.time }}</i>
        </div>
        <div v-if="toast.name">
          <span>会议名称：</span><i>{{ toast.name }}</i>
        </div>
        <div v-if="toast.ngr">
          <span>联系人：</span><i>{{ toast.ngr }}</i>
        </div>
        <div v-if="toast.ngbm">
          <span>申请部门：</span><i>{{ toast.ngbm }}</i>
        </div>
        <div v-if="toast.mobile">
          <span>联系方式：</span><i>{{ toast.mobile }}</i>
        </div>
      </div>
    </van-dialog>
    <div class="moreButtons" v-if="showMoreButton">
      <p class="tipIcon" @click="isShowMore = !isShowMore" v-if="!isShowMore"><van-icon name="ellipsis" /></p>
      <p class="tipIcon" @click="isShowMore = !isShowMore" v-if="isShowMore"><van-icon class="tipIcon" name="cross" />
      </p>
      <div class="menusList" :class="{ 'show': isShowMore }">
        <span v-for="(item, index) in MeetingScheduledMoreButtonsList" :key="index" @click.stop="goPage(item)">{{
      item.name
    }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "../../common/util";
import dsfFab from "@/components/dsfFab/dsfFab";
import timePicker from "./timePicker.vue";
import { Slider } from "vant";
import Vue from "vue";
import dsf from "../../common";
import { ImagePreview } from "vant";
Vue.use(Slider);
export default {
  name: "reserveMeeting",
  components: { dsfFab, timePicker },
  filters: {
    emptyFilter(str, tips) {
      if (str && str.length > 0) {
        return str;
      }
      return tips;
    },
    urlFilter(str) {
      return str.indexOf("ctrl/") > -1 || str.indexOf("fn/") > -1
        ? dsf.config.assetsRoot + str
        : dsf.url.getServerUrl("/fn/file/downloadImage?fileName=" + str);
    },
  },
  data() {
    let now = new Date();
    return {
      type: this.$route.query.type || 0,
      expire: null,
      date: dsf.date.format(now, "yyyy-mm-dd"),
      dateStr: dsf.date.format(now, "mm月dd日 DD"),
      showPicker: false,
      statusConfig: {
        0: "未审核通过/审核中",
        1: "审核通过",
        2: "被占用",
        3: "被锁定",
        4: "本人预定",
      },
      meetingData: [],
      moduleId: dsf.config.meetingConfig.reserveModuleId,
      reserveMeeting: dsf.config.meetingConfig.reserveMeeting,
      dropdownTitle: "全部类别",
      typeValue: "",
      typeOption: [],
      addBtn: [
        {
          icon: "iconzhongyaohuiyi",
          title: "我的预订",
          type: "go", // 'event'
          url: `/commonList/210624195204wVRIrZVLAmBn18tlVnJ/1905311647221BSf1doWPYLsr8nAdqB`,
          action: "",
        },
      ],
      showFilter: false,
      timeValue: [0, 0],
      sourceValue: [],
      sourceList: [],
      timeChooseList: [],
      toastShow: false,
      toastData: [],
      MeetingConflict: dsf.config.meetingConfig.MeetingConflict || false,
      showMoreButton: dsf.config.meetingConfig.MeetingScheduledMoreButtons || false,
      MeetingScheduledMoreButtonsList: dsf.config.meetingConfig.MeetingScheduledMoreButtonsList || [],
      isShowMore: false
    };
  },
  computed: {
    ...mapState({
      isShowAppFooter: (state) => state.isShowAppFooter,
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
  },
  created() {
    this.init();
    this.getType();
    this.getSource();
  },
  activated() {
    this.init();
  },
  methods: {
    goPage(item) {
      this.$router.push(item.url)
      this.isShowMore = !this.isShowMore
    },
    onConfirm(date) {
      this.date = dsf.date.format(date, "yyyy-mm-dd");
      this.dateStr = dsf.date.format(date, "mm月dd日 DD");
      this.showPicker = false;
      // 筛选重新清空
      this.typeValue = ""; //全部类别
      this.timeValue = [0, 0];
      this.sourceValue = [];
      this.meetingData = [];
      this.init();
    },
    progressBar({ endtime, starttime }) {
      let e = dsf.date.parse(endtime, "yyyy-mm-dd hh:ii");
      let todayStart = dsf.date.parse(`${this.date} 00:00`, "yyyy-mm-dd hh:ii"); // 选择日期的0点
      let start = dsf.date.parse(starttime, "yyyy-mm-dd hh:ii"); // 会议开始时间
      let s = todayStart > start ? todayStart : start; // 如果会议开始时间为当前0点前，取0点时间
      let m = dsf.date.parse(
        starttime.split(" ")[0] + " 07:00",
        "yyyy-mm-dd hh:ii"
      );
      let width = (((e - s) * 100) / 57600000).toFixed(2) + "%";
      let left = (((s - m) * 100) / 57600000).toFixed(2) + "%";
      return { left, width };
    },
    setExpire() {
      let now = new Date();
      let starttime = dsf.date.format(now, "yyyy-mm-dd 07:00");
      if (starttime.indexOf(this.date) === -1) {
        this.expire = null;
      } else {
        this.expire = this.progressBar({
          starttime,
          endtime: dsf.date.format(now, "yyyy-mm-dd hh:ii"),
        });
      }
    },
    book(item) {
      util.saveToSessionStore("checkedMettingRoom", {
        value: item.id,
        text: item.name,
      });
      this.$router.push(`/commonForm/${this.moduleId}?isFromreserve=true`);
    },
    /********数据请求*******/
    init() {
      this.postData();
      // dsf.http.get("static/moduleId.json")
      // .then(({data})=>{
      //   this.moduleId=data.meetingConfig.reserveModuleId
      // })
    },
    postData() {
      let _loading = dsf.layer.loading();
      this.setExpire();
      let time = "";
      if (this.timeValue[1] != 0) {
        let time1 =
          this.timeValue[0] < 10
            ? "0" + this.timeValue[0] + ":00"
            : this.timeValue[0] + ":00";
        let time2 =
          this.timeValue[1] < 10
            ? "0" + this.timeValue[1] + ":00"
            : this.timeValue[1] + ":00";
        time = time1 + "-" + time2;
      }
      dsf.http
        .post(this.reserveMeeting, {
          date: this.date,
          buildingType: this.typeValue,
          time: time,
          resourceIds: this.sourceValue.join(","),
        })
        .done((res) => {
          console.log(res);
          if (res.code + "" === "200") {
            if (res.data.length > 0) {
              this.meetingData = [];
              let chooseStime = Number(res.data[0].chooseStime.split(":")[0]);
              let chooseEtime = Number(res.data[0].chooseEtime.split(":")[0]);
              let dataSource = [];
              for (let i = chooseStime; i <= chooseEtime; i++) {
                let time1 = this.date + " " + (i < 10 ? "0" + i : i) + ":00";
                let time2 = this.date + " " + (i < 10 ? "0" + i : i) + ":30";
                dataSource.push({
                  num: i,
                  children: [
                    {
                      time: time1,
                      status:
                        moment(time1).unix() < moment(new Date()).unix()
                          ? 5
                          : 0,
                    },
                    {
                      time: time2,
                      status:
                        moment(time2).unix() < moment(new Date()).unix()
                          ? 5
                          : 0,
                    },
                  ],
                });
              }
              this.timeChooseList = dataSource;
              console.log(this.timeChooseList);
            }
            this.postDataSuccess(res.data);
          }
        })
        .error(() => {
          dsf.layer.toast("请求异常");
        })
        .always(() => {
          dsf.layer.closeLoading(_loading);
        });
    },
    postDataSuccess(list) {
      this.meetingData = list;
      if (this.meetingData) {
        this.meetingData.forEach((item, index) => {
          item["timelist"] = JSON.parse(JSON.stringify(this.timeChooseList));

          if (item.occupydate && item.occupydate.length > 0) {
            item.timelist.forEach((data) => {
              item.occupydate.forEach((ele) => {
                let s = moment(ele.starttime).unix(); // 开始时间时间戳
                let e = moment(ele.endtime).unix(); // 结束时间时间戳
                if (
                  moment(data.children[0].time).unix() >= s &&
                  moment(data.children[0].time).unix() < e
                ) {
                  if (ele.isBecheck && ele.isBecheck == "1") {
                    data.children[0].status = 1;
                  } else if (ele.status == "2" && ele.hasMine) {
                    data.children[0].status = 4;
                  } else if (ele.status == "2" && !ele.hasMine) {
                    data.children[0].status = 2;
                  } else if (ele.isLock == true) {
                    data.children[0].status = 3;
                  }
                  data.children[0].ngr = ele.ngr;
                  data.children[0].ngbm = ele.ngbm;
                  data.children[0].mobile = ele.mobile;
                }
                if (
                  moment(data.children[1].time).unix() >= s &&
                  moment(data.children[1].time).unix() < e
                ) {
                  if (ele.isBecheck && ele.isBecheck == "1") {
                    data.children[1].status = 1;
                  } else if (ele.status == "2" && ele.hasMine) {
                    data.children[1].status = 4;
                  } else if (ele.status == "2" && !ele.hasMine) {
                    data.children[1].status = 2;
                  } else if (ele.isLock == true) {
                    data.children[1].status = 3;
                  }
                  data.children[1].ngr = ele.ngr;
                  data.children[1].ngbm = ele.ngbm;
                  data.children[1].mobile = ele.mobile;
                }
              });
            });
          }
          // console.log(item);
        });
      }
    },
    getType() {
      // 获取会议类型
      dsf.http.get("fn/meeting/meetingRoomClassJson").then((res) => {
        if (res.data.code == 200) {
          this.typeOption = res.data.data.map((v) => {
            return { text: v.name, value: v.id };
          });
          this.typeOption.unshift({ text: "全部类别", value: "" });
        }
      });
    },
    getSource() {
      // 获取会议资源
      dsf.http.get("fn/meetingRoom/getOptionalResource").then((res) => {
        if (res.data.code == 200) {
          this.getTreeLeaf(res.data.data.codeList, this.sourceList);
        }
      });
    },
    getTreeLeaf(treeData, leafList) {
      treeData.forEach((item) => {
        if (item.children && item.children.length > 0) {
          this.getTreeLeaf(item.children, leafList);
        } else {
          if (!item.attrs.noselect) {
            leafList.push({
              id: item.id,
              name: item.name,
            });
          }
        }
      });
    },
    showSearchAction() {
      this.showFilter = true;
    },
    returnFilter() {
      this.typeValue = ""; //全部类别
      this.timeValue = [0, 0];
      this.sourceValue = [];
    },
    filterConfirm() {
      this.showFilter = false;
      let time1 =
        this.date +
        " " +
        (this.timeValue[0] < 10
          ? "0" + this.timeValue[0] + ":00"
          : this.timeValue[0] + ":00");
      let time2 =
        this.date +
        " " +
        (this.timeValue[1] < 10
          ? "0" + this.timeValue[1] + ":00"
          : this.timeValue[1] + ":00");
      this.postData();
    },
    // 会议室类别筛选
    checkTypeBox(item, index) {
      this.typeValue = item.value;
    },
    // 会议室资源筛选
    checkSourceBox(item, index) {
      console.log(item);
      if (this.sourceValue.includes(item.id)) {
        this.sourceValue = this.sourceValue.filter(function (ele) {
          return ele != item.id;
        });
      } else {
        this.sourceValue.push(item.id);
      }
    },
    // 修改会议时间段
    changeFilterTime(value) {
      // console.log(value)
    },
    // 选择预定时间
    goForm(item, ele) {
      this.toastData = [];
      if (ele.children[0].status != 0 && ele.children[1].status != 0) {
        if (this.MeetingConflict && ele.children[1].status != 5) {
          //电气集团会议预定占用信息
          ele.children.forEach((it) => {
            let occupyName = "";
            item.occupydate.forEach((occ) => {
              if (
                new Date(occ.starttime) <= new Date(it.time) &&
                new Date(occ.endtime) > new Date(it.time)
              ) {
                occupyName = occ.occupyName;
              }
            });

            let obj = {
              name: "",
              ngr: "",
              ngbm: "",
              mobile: "",
              time: "",
            };
            if (it.ngr) {
              obj = {
                name: occupyName,
                ngr: it.ngr,
                ngbm: it.ngbm,
                mobile: it.mobile,
                // time: it.time.substr(11, it.time.length),
                time: it.time,
              };
              this.toastData.push(obj);
            }
          });
          console.log(this.toastData);
          if (
            this.toastData[0].ngr == this.toastData[1].ngr &&
            this.toastData[0].ngbm == this.toastData[1].ngbm &&
            this.toastData[0].mobile == this.toastData[1].mobile &&
            this.toastData[0].name == this.toastData[1].name
          ) {
            this.toastData.pop(); //前半小时与后半小时冲突会议相同
          }
          if (this.toastData.length > 0) {
            this.toastShow = true;
          }
        } else {
          dsf.layer.toast("该时间段不可预定！");
        }
      } else {
        if (ele.children[0].status != 0 && ele.children[1].status == 0) {
          util.saveToSessionStore("checkedMettingStime", {
            value: ele.children[1].time,
          });
        } else if (ele.children[0].status == 0) {
          util.saveToSessionStore("checkedMettingStime", {
            value: ele.children[0].time,
          });
        }
        util.saveToSessionStore("checkedMettingRoom", {
          value: item.id,
          text: item.name,
        });
        // this.$router.push(`/commonForm/${this.moduleId}`);
        // isFromreserve是否来自会议室预订页面
        this.$router.push(`/commonForm/${this.moduleId}?isFromreserve=true`);
      }
    },
    imageClick(data) {
      let images = [];
      if (!data.images) return;
      images.push(
        dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${data.images}`)
      );
      console.log(images);
      ImagePreview({
        images: images,
        startPosition: 0,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.reserve-meeting {
  display: flex;
  flex-direction: column;
  flex-flow: column;

  height: 100%;
  @include font_4();

  ._time {
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
    position: relative;

    z-index: 100;

    i {
      margin-right: 5px;
    }

    span {
      color: $fontColor_main;
    }

    .filter {
      margin-right: 0.32rem;
    }
  }

  ._contents {
    flex: 1;
    overflow-y: auto;
    padding: 0 11px;
    background: #f4f4f4;

    ._content {
      position: relative;
      box-sizing: border-box;
      margin-top: 15px;
      padding: 15px 10px;
      display: flex;
      flex-flow: column;
      background: #ffffff;
      border: 1px solid rgba(230, 230, 230, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
      border-radius: 3px;

      ._item {
        display: flex;
        justify-content: space-between;
        min-height: 100px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(213, 213, 213, 0.78);

        ._left {
          flex: 1;

          ._title {
            font-size: var(--font_size_1);
            color: #333333;
            margin-right: 5px;
            font-weight: bold;

            span {
              position: absolute;
              top: 0;
              right: -1px;
              display: inline-block;
              width: 64px;
              height: 24px;
              border-radius: 3px;
              padding-left: 40px;
              font-size: var(--font_size_4);
              color: #4a74c2;
              font-weight: bold;
              line-height: 24px;
              background: url("../../assets/imgs/roomnum.png") no-repeat;
              background-size: 100% 100%;
              box-sizing: border-box;
            }
          }

          ._shebei {
            margin: 10px 0;
            color: #666666;
            display: flex;
            flex-wrap: wrap;

            div {
              height: 22px;
              padding: 0 7px;
              margin: 0 5px 5px 0;
              font-size: 13px;
              color: #333333;
              text-align: center;
              line-height: 22px;
              background: #ffffff;
              border: 1px solid rgba(151, 151, 151, 0.35);
              border-radius: 12px;

              &:last-child {
                margin-right: 0;
              }
            }
          }

          ._num {
            display: flex;
            align-items: center;
            margin-bottom: 19px;

            span {
              color: #666666;
              margin-left: 5px;
            }
          }
        }

        ._right {
          width: 110px;
          height: 82px;
          margin-right: 7px;

          .van-image {
            border-radius: 5px;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
      }
    }
  }

  ._progress {
    box-sizing: border-box;
    height: 20px;
    padding-top: 20px;
    margin-bottom: 27px;
    position: relative;

    &-box {
      height: 100%;
      width: 100%;
      background: #ffffff;
      border: 1px solid #e8e8e8;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
    }

    &-bar {
      height: 100%;
      width: 0;
      position: absolute;
      left: 0;
      top: 0;

      &.__o {
        // 过期
        background-color: #ffffff;
      }

      &.__0,
      // 未审核通过/审核中 锁定
      &.__1,
      // 审核通过/已确认
      &.__2,
      // 被占用
      &.__3 {
        // 被锁定
        background-color: #fa6400;
      }

      &.__4 {
        // 本人预定
        background-color: #6dd400;
      }
    }

    ._time_dot {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-top: 3px;
      position: relative;
      left: -3.125%;

      div {
        display: block;
        flex: none;
        text-align: center;
        font-size: var(--font_size_4);
        color: $fontColor;
        width: 6.25%;
      }
    }
  }

  .time-process {
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    // margin: 15px 0;
    position: relative;

    ul {
      width: 100%;
      height: 120%;
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }

      &::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #065465;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }

      li {
        margin-right: 10px;
        width: 50px;
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-radius: 3px;

        .process-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 50px;
          height: 100%;
          border-radius: 3px;
          overflow: hidden;

          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: var(--font_size_3);
            color: rgba(51, 51, 51, 0.5);
            font-weight: bold;
            z-index: 10;
          }

          .process-top {
            width: 50%;
            height: 100%;
            border-radius: 3px 0 0 3px;
            border: 1px solid #e8e8e8;
            border-right: none !important;
          }

          .process-bottom {
            width: 50%;
            height: 100%;
            border-radius: 0 3px 3px 0;
            border: 1px solid #e8e8e8;
            border-left: none !important;
          }

          div {
            &.__1 {
              // 审核中
              background-color: #0086d9;
              border: none;
            }

            &.__2 {
              // 被占用2
              background-color: #e8e8e8;
              border: none;
            }

            &.__4 {
              // 本人预定4
              background-color: #6dd400;
              border: none;
            }

            &.__3 {
              // 被锁定
              background-color: #e8e8e8;
              border: none;
            }

            &.__5 {
              // 过期
              background-color: #e8e8e8;
              border: 1px solid #e8e8e8;
            }
          }
        }
      }
    }
  }

  /*._status{
    @include font_6();
    color: #666;
    &-item{
      line-height: 1.4em;
      margin-bottom: 0.5em;
    }
  }*/
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }

  .searchSheet {
    height: auto;

    .van-nav-bar {
      border-bottom: 5px solid #f1f2f4;
    }

    .disfr {
      display: flex;
    }

    .flex1 {
      flex: 1;
    }

    .jsb {
      justify-content: space-between;
    }

    .sheetBox {
      padding: 15px;
      font-size: var(--font_size_3);

      .filter-box {
        width: 100%;
        border-bottom: 1px solid #cfcfcf;
        padding: 15px;
        box-sizing: border-box;

        .title {
          font-size: var(--font_size_1);
          color: #333333;
          margin-bottom: 15px;
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            min-width: 40px;
            height: 25px;
            border: 1px solid #ebebeb;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_4);
            color: #666666;
            margin: 0 7px 10px 0;
            padding: 0 10px;

            &.checked {
              @include background-theme("normal");
              color: #ffffff;
            }
          }
        }

        .van-slider {
          margin: 30px 0 20px 0;

          ::v-deep .van-slider__bar {
            @include background-theme("normal");
          }
        }

        .custom-button {
          width: 11px;
          height: 11px;
          background-color: #ffffff;
          border-radius: 100%;
          position: relative;
          @include border-theme(1px, solid, "normal");

          span {
            font-size: var(--font_size_4);
            color: #666666;
            position: absolute;
            bottom: 14px;
            left: -12px;
          }
        }
      }
    }

    .btnBox {
      padding: 15px;

      button {
        margin: 0 6px;
      }
    }
  }
}

::v-deep .van-action-sheet__content {
  display: flex;
  flex-direction: column;

  .van-cell::after {
    border: none;
  }
}

::v-deep .van-field__left-icon {
  display: flex;
  align-items: center;

  .van-icon-search {
    font-size: var(--font_size_2);
  }
}

::v-deep .van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}

::v-deep .van-dialog {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.dio {
  display: flex;
  flex-direction: column;

  >div {
    display: flex;
    align-items: baseline;
    margin: 3px 0;
    color: #fff;
    font-size: 14px;

    span {
      width: 75px;
      text-align: right;
      color: #fff;
      font-size: 14px;
    }

    i {
      flex: 1;
    }

    &.dio-time {
      font-size: 16px;
      font-weight: bold;
    }
  }

  &:nth-child(2) {}
}

.van-dialog__content>div:nth-child(3) {
  margin-top: 20px;
}

.dio-head {
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}

.moreButtons {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 10;
  width: 40px;
  height: 40px;

  .tipIcon {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #FFF;
    background-color: var(--normal);
    position: relative;
    z-index: 15;
    flex-shrink: 0;
  }

  .menusList {
    width: 100px;
    height: 0;
    overflow: hidden;
    background: radial-gradient(circle at center bottom, transparent 25px, #FFFFFF 0);
    border-radius: 5px;
    flex-direction: column;
    position: absolute;
    bottom: 20px;
    display: flex;
    left: 50%;
    margin-left: -50px;
    z-index: 10;
    transition: all .2s linear;
    overflow: hidden;

    &.show {
      transition: all .2s linear;
      padding: 10px 0 10px 0;
      height: auto;
    }

    span {
      width: 100%;
      height: 40px;
      text-align: center;
      align-items: center;
      font-size: var(--font_size_3);
      color: #333;
    }
  }
}
</style>
