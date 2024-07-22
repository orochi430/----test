<template>
  <div class="weekduty">
    <!-- 日期 -->
    <week-slider
      @dateClick="dateClickhandler"
      :showYear="true"
      :defaultDate.sync="default_date"
    >
    </week-slider>
    <!-- 当日值班人员 -->
    <div class="content-box">
      <div class="leader">
        <!-- <div class="content-duty">
          <div class="title">带班领导</div>
          <div
            class="p"
            v-for="(item, index) in leaders.shiftleader"
            :key="index + 0"
          >
            <span class="name">
              <span>{{ item.name }}</span>
              <span class="van-tag" v-show="item.leader == 2"
                >主</span
              >
              <span class="van-tag" v-show="item.leader == 3"
                >副</span
              >
            </span>
            <span class="gray">
              <img src="../../../../../static/images/tangshan/组织.png" alt="">
              <span class="ellipsis">{{ item.department }}</span>
            </span>
            <span class="gray">
              <img src="../../../../../static/images/tangshan/电话.png" alt="" />
              <span>{{ item.telephone }}</span>
            </span>
          </div>
        </div> -->
        <div class="content-duty">
          <div class="title">白天值班</div>
          <div
            class="p"
            v-for="(item, index) in leaders.dayshift"
            :key="index + 1"
          >
            <span class="name">
              <span>{{ item.name }}</span>
              <span class="van-tag" v-show="item.leader == 2"
                >主</span
              >
              <span class="van-tag" v-show="item.leader == 3"
                >副</span
              >
            </span>
            <span class="gray">
              <img src="../../../../../static/images/tangshan/dept.png" alt="" />
              <span class="ellipsis">{{ item.department }}</span>
            </span>
            <span class="gray">
              <img src="../../../../../static/images/tangshan/tel.png" alt="" />
              <span>{{ item.telephone }}</span>
            </span>
          </div>
        </div>
        <div class="content-duty">
          <div class="title">夜间值班</div>
          <div
            class="p"

            v-for="(item, index) in leaders.nightshift"
            :key="index + 3"
          >
            <span class="name">
              <span>{{ item.name }}</span>
              <span class="van-tag" v-show="item.leader == 2"
                >主</span
              >
              <span class="van-tag" v-show="item.leader == 3"
                >副</span
              >
            </span>

            <span class="gray">
              <img src="../../../../../static/images/tangshan/dept.png" alt="" />
              <span class="ellipsis">{{ item.department }}</span>
            </span>
            <span class="gray">
              <img src="../../../../../static/images/tangshan/tel.png" alt="" />
              <span>{{ item.telephone }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import weekSlider from "./weekSlider.vue";
export default {
  name: "weekDuty",
  props: {},
  components: { weekSlider },
  data() {
    return {
      default_date: moment(new Date()).format("YYYY-MM-DD"),
      leaders: [],
      shiftleader:[],
      dayshift:[],
      nightshift:[]
    };
  },
  computed: {},
  watch: {},
  methods: {
    dateClickhandler(date) {
      this.leaders=[]
      dsf.http
        .post("/fn/mobileDuty/currentDayDuty", { daydate: date })
        .then((res) => {
          if(res.data.data!=null){
              this.leaders = res.data.data;
          }
        });
    },
  },
  created() {},
  mounted() {
    dsf.http
      .post("/fn/mobileDuty/currentDayDuty", {
        daydate: moment(new Date()).format("YYYY-MM-DD"),
      })
      .then((res) => {
        this.leaders = res.data.data;
      });
  },
  beforeDestroy() {},
};
</script>
<style lang='scss' scoped>
.weekduty {
  .content-box {
    margin: 22px;
    font-size: var(--font_size_3);
    .content-duty {
      margin-bottom: 22px;
      background-color: white;
      border-top: 1px solid transparent;
      box-shadow: 0 0 10px #ecebeb;
      border-radius: 5px;
      overflow: hidden;
      .title {
        border-left: 5px solid #e10707;
        padding-left: 10.5px;
        margin: 10px 0;
      }
      .p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        .name {
          display: flex;
          align-items: center;
          font-size: var(--font_size_0);
          font-weight: 700;
          color: #333333;
          width: 100px;
          .van-tag {
            height: 17px;
            width: 17px;
            background-color: #fee2e2;
            color: #e10707;
            line-height: 18px;
            font-weight: 400;
            border: 1px solid #e10707;
            font-size: 10px;
            margin-left: 5px;
            padding: 2px;
            margin-top: 2px;
          }
        }
        img {
          display: inline-block;
          height: 14px;
          width: 14px;
          margin-right: 3px;
        }
        .gray {
          width: 120px;
          color: #666666;
          display: flex;
          font-size: var(--font_size_3);
          align-items: center;
        }
        .ellipsis {
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #666666;
        }
      }
    }
  }
}
</style>
