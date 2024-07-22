<template>
  <div>
    <div class="bgc"></div>
    <div class="header">
      <div class="numberBox spaceAround">
        <div class="center" style="flex-direction: column;">
          <div class="number" :style="numberColor[0]">{{ numberType.zrs }}</div>
          <div>总人数</div>
        </div>
        <div class="center" style="flex-direction: column;">
          <div class="number" :style="numberColor[1]">{{ numberType.tbcs }}</div>
          <div>填报次数</div>
        </div>
        <div class="center" style="flex-direction: column;">
          <div class="number" :style="numberColor[2]">{{ numberType.dgrc }}</div>
          <div>到岗人次</div>
        </div>
        <div class="center" style="flex-direction: column;">
          <div class="number" :style="numberColor[4]">{{ numberType.syrc }}</div>
          <div>涉疫人次</div>
        </div>
      </div>
    </div>
    <div class="content" v-for="(item, index) in dataValue" :key="index">
      <div class="title">{{ item.text + item.uom }}</div>
      <div class="detail spaceBetween" v-for="(ele, index) in item.dataArray" :key="index">
        <span>{{ ele.text }}</span>
        <span>{{ ele.value }}</span>
      </div>
    </div>
    <div class="content" v-if="nrgkq.nrgkqText !== null">
      <div class="title">{{ nrgkq.nrgkqCN }}</div>
      <div class="detail spaceBetween">
        <span>{{ nrgkq.nrgkqCN }}</span>
        <span>{{ nrgkq.nrgkqText }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "fangyiDetail",
  data() {
    return {
      numberColor: ["color:#0089FF", "color:#F89908", "color:#00AAB2", "color:#F73131"],
      numberType: { zrs: 0, tbcs: 0, dgrc: 0, syrc: 0 },
      dataValue: [],
      nrgkq: { nrgkqCN: "", nrgkqText: "" }
    };
  },
  created() {
    this.init()
  },
  methods: {
    getFytjDetile() {
      dsf.http.get("/ctrl/mzbMobileController/fytjDetail", {
        query_time_start: this.$route.query.dateStart,
        query_time_end: this.$route.query.dateEnd,
        query_org_id: this.$route.query.id
      }).then(({ data }) => {
        this.numberType.zrs = data.data.data.zrs
        this.numberType.tbcs = data.data.data.tbcs
        this.numberType.dgrc = data.data.data.dgrc
        this.numberType.syrc = data.data.data.syrc
        let result = data.data.data
        for (let key of Object.keys(result)) {
          if (result[key] !== null && result[key].dataArray) {
            this.dataValue.push(result[key])
          }
        }
        this.nrgkq.nrgkqCN = data.data.data.nrgkqCN
        this.nrgkq.nrgkqText = data.data.data.nrgkqText
        dsf.url.setTitle(data.data.data.orgName)
      })
    },
    init() {
      this.getFytjDetile()
    }
  }
  // mounted() {
  //   let navbar = document.querySelector(".van-nav-bar")
  //   console.log(navbar);
  //   navbar["background-color"] = "#0089FF"
  // }
};
</script>
  
<style lang="scss" scoped>
.bgc {
  width: 100%;
  background: #0089FF;
  height: 66px;
  position: absolute;
  top: 0.92rem;
  z-index: -1;
}

.header {
  .numberBox {
    background: #FFFFFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    margin: 25px 10px 10px;
    padding: 0 10px;
    padding-bottom: 0.4rem;

    .number {
      font-size: 25px;
      margin-top: 20px;
      margin-bottom: 8px;
    }

    .type {
      margin-bottom: 18px;
    }
  }
}

.content {
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  padding: 15px;
  margin: 12px;

  .title {
    font-size: var(--font_size_2);
    font-weight: 600;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .detail {
    border-top: 1px solid #ccc;
    padding: 10px 5px;

    span:nth-child(1) {
      width: 85%;
      word-break: break-all;
      white-space: normal;
    }
  }
}

.center {
  display: flex;
  align-items: center;
}

.spaceBetween {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.spaceAround {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
  