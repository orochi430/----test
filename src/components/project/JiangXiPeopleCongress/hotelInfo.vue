<template>
  <div
    :style="{
      minHeight: `calc(100vh - ${isShowAppHeader ? '0.92rem' : '0px'})`
    }"
    class="container"
  >
    <template v-if="hotelInfo.hotels && hotelInfo.hotels.length > 0">
      <div v-for="(item, index) in hotelInfo.hotels" :key="index" class="hotel">
        <div class="title flex ac">
          <img
            src="static/images/peopleCongress/zsxx-icon-hotel.png"
            alt=""
          /><span
            >{{ item.hotel
            }}{{ `${item.room ? " " + item.room + "室" : ""}` }}</span
          >
        </div>
        <div class="time flex ja">
          <div class="flex dc ac">
            <span>入住</span
            ><span class="date">{{ item.startDate | dateFormat }}</span>
          </div>
          <div class="total">
            共{{ calcDays(item.startDate, item.endDate) }}晚
          </div>
          <div class="flex dc ac">
            <span>离店</span
            ><span class="date">{{ item.endDate | dateFormat }}</span>
          </div>
        </div>
        <div class="address flex ac">
          <img src="static/images/peopleCongress/zsxx-location.png" alt="" />
          <span>{{ item.address }}</span>
        </div>
        <div class="cell flex jb">
          <img
            src="static/images/peopleCongress/ccxx-icon-ContactPerson.png"
            alt=""
          />
          <span>联系人：</span><span style="flex:1">{{ item.lxr }}</span>
        </div>
        <div class="cell flex jb ac">
          <img
            src="static/images/peopleCongress/wdsfp-icon-ContactNumber.png"
            alt=""
          />
          <span>联系电话：</span>
          <span style="flex:1;overflow:hidden;"
            >{{ item.lxPhone }}
            <img
              v-if="item.lxPhone"
              src="static/images/peopleCongress/ccxx-icon-phonenumber.png"
              alt=""
              style="width: 0.52rem;height: 0.52rem;"
              @click="phoneTo(item.lxPhone)"
            />
          </span>
        </div>
      </div>

      <div
        class="btn-contanier"
        v-if="hotelInfo.dbtlxr || hotelInfo.dbtlxPhone"
      >
        <div class="flex jb title" @click="showRemind = !showRemind">
          住房温馨提示
          <van-icon :name="showRemind ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div v-show="showRemind" class="tips">
          详细住宿信息请咨询代表团工作人员{{ hotelInfo.dbtlxr
          }}{{ hotelInfo.dbtlxPhone }}。
        </div>
      </div>
      <div class="btn-contanier" v-if="hotelInfo.tips && false">
        <div
          class="flex jb"
          style="color:#FFA92A;font-size: var(--font_size_2)"
          @click="showRemind = !showRemind"
        >
          住房温馨提示
          <van-icon :name="showRemind ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div
          v-show="showRemind"
          class="tips"
          style="padding-top:10px;font-size:15px"
          v-text="hotelInfo.tips"
        ></div>
      </div>
    </template>
    <template v-else>
      <commonempty
        :image="require('static/images/peopleCongress/img_empty.png')"
        class="file-empty"
        description="暂无数据"
      />
    </template>
    <p v-if="hotelInfo.dbtlxr && false" class="remind">
      温馨提示：
      <!-- 需要客房服务请联系88888888 <br /> -->
      详细住宿信息请咨询代表团工作人员{{ hotelInfo.dbtlxr
      }}{{ hotelInfo.dbtlxPhone }}。
    </p>
  </div>
</template>

<script>
import store from "@/common/util";
import { mapState } from "vuex";
export default {
  filters: {
    dateFormat(val) {
      return dsf.date.format(val, "m月d日");
    }
  },
  data() {
    return {
      showRemind: true,
      hotelInfo: {},
      loading: null,
      meetingInfo: store.loadSessionStore("meeting")
    };
  },
  computed: {
    ...mapState({
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .post(`fn/peopleCongress/hotelInfo`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.code == 200 && result.data) {
            self.hotelInfo = result.data;
          }
        })
        .error(error => {})
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    // 计算入住天数
    calcDays(startDate, endDate) {
      return parseInt(
        dsf.date.diffDays(dsf.date.parse(startDate), dsf.date.parse(endDate))
      );
    },
    phoneTo(tel) {
      window.location.href = `tel:${tel}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  background-color: #c30e12;
  position: relative;

  .cell {
    position: relative;
    padding: 12px 0 0 0;
    font-size: 15px;

    img {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin: 2px 0;
    }
  }
}

.remind {
  position: absolute;
  bottom: 16px;
  text-align: left;
  color: #fff;
  font-size: var(--font_size_2);
  padding: 0 0.5rem;
}

.hotel {
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;

  &:last-of-type {
    margin-bottom: 80px;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;

    img {
      width: 22px;
      height: 100%;
      display: inline-block;
      margin-right: 6px;
    }
  }

  .time {
    margin: 16px 0;
    align-items: flex-end;
    .date {
      font-size: 22px;
      font-weight: 600;
      padding-top: 8px;
    }

    .total {
      padding: 3px 8px;
      border: 1px solid #ddd;
      border-radius: 30px;
      font-size: var(--font_size_4);
      margin-bottom: 2px;
    }
  }

  .address {
    font-size: var(--font_size_2);
    font-weight: 600;
    padding: 8px;
    background-color: #f8f8f8;
    border-radius: 5px;

    img {
      width: 45px;
      height: 100%;
      display: inline-block;
      margin-right: 6px;
    }
  }
}
.btn-contanier {
  font-size: 0.3rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff8ec;
  padding: 16px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.06);
  .van-icon {
    border: 1px solid;
    border-radius: 50%;
    padding: 2px;
  }
  .title {
    color: #ffa92a;
  }
  .tips {
    padding-top: 0.2rem;

    ::v-deep p {
      line-height: 20px;
    }
  }
  .btn {
    background-color: #c30e12;
    color: #fff;
    font-size: var(--font_size_2);
    line-height: 50px;
    margin-top: 16px;
  }
}
.file-empty {
  // display: flex;
  // flex-direction: row;
  padding: 5rem 0;

  ::v-deep .van-empty__image {
    flex: none;
    height: 2.2rem;
  }

  ::v-deep .van-empty__description {
    padding: 0;
    color: #fff;
  }
}
</style>
