<template>
  <div class="container flex dc">
    <div class="content flex dc">
      <div class="top flex ac">
        <img :src="data.icon" alt="" />
        <div class="flex1">
          <div class="">{{ data.appName }}</div>
          <div class="sub1" style="padding: 0.08rem 0">{{ data.applicationProfile }}</div>
          <div>
            <span v-for="item in data.tags" class="tag">{{ item }}</span>
          </div>
        </div>
        <van-rate v-model="data.appScore" :size="12" color="#F19927" void-icon="star" readonly void-color="#eee" />
      </div>
      <div style="padding-top: 0.2rem">
        <span class="sub2">开发商：{{ data.supplier }}</span>
        <span class="sub2">使用量：{{ data.useNum }}</span>
      </div>
      <div class="tabs">
        <van-tabs>
          <van-tab title="应用介绍">
            <div style="padding-top: 0.2rem" v-html="data.introduce"></div>
          </van-tab>
          <van-tab title="应用评价">
            <div class="tab-top">
              <span>应用评价({{ data.evaluateNum }})</span>
              <van-button v-if="applyStatus == 9 && evaluateStatus == 0" type="primary" size="small" @click="show = true">发表评论</van-button>
            </div>
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
              <div v-for="item in comments" class="comment">
                <div class="comment-top flex ac">
                  <img :src="item.img" alt="" />
                  <span class="elps name">{{ item.name }}</span>
                  <van-rate v-model="item.appScore" :size="12" color="#F19927" readonly void-icon="star" void-color="#eee" />
                  <span class="del" v-if="item.userid == dsf.util.loadSessionStore('user').user_id" @click="delEvaluate(item.id)">删除</span>
                </div>
                <div class="comment-text">{{ item.text }}</div>
                <div class="sub3">{{ item.time }}</div>
              </div>
            </van-list>
            <commonempty v-if="!comments.length && !loading"></commonempty>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="footer">
      <van-button type="primary" :disabled="applyStatus == 9 || applyStatus == 1" @click="apply" :color="applyStatus == 9 || applyStatus == 1 ? '#b8b8b8' : ''">
        {{ applyStatus == 9 ? "已开通" : applyStatus == 1 ? "申请中" : "申请应用" }}
      </van-button>
    </div>
    <van-popup v-model="show" position="bottom" round get-container="#app" class="pop">
      <van-nav-bar title="发表评价" left-arrow @click-left="show = !show" placeholder />
      <van-field v-model="evaluateContent" rows="5" autosize type="textarea" placeholder="请输入您的评价" />
      <div class="rate">
        <van-rate v-model="star" size="22" color="#F19927" void-color="#eee" />
      </div>
      <van-button type="primary" block @click="submit">提交</van-button>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      data: {
        icon: "",
        appName: "",
        applicationProfile: "",
        tags: [],
        supplier: "",
        useNum: "",
        appScore: 5,
        introduce: "",
        evaluateNum: 0
      },
      isApply: false,
      isEvaluate: false,
      evaluateContent: "",
      star: 5,
      show: false,
      evaluateStatus: 0,
      applyStatus: 0,
      page: 1,
      limit: 5,
      loading: false,
      finished: false,
      total: 0
    }
  },
  created() {
    this.getData()
    // this.getEvaluateList()
  },
  methods: {
    getData() {
      dsf.http.get("fn/application/store/info", { pk: this.$route.params.pk }).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data
          this.data = {
            icon: dsf.url.getWebPath(data.icon),
            appName: data.appName,
            applicationProfile: data.applicationProfile,
            tags: data.labelIndustryText ? data.labelIndustryText.split(",") : [],
            supplier: data.supplier,
            useNum: data.useNum,
            appScore: data.appScore,
            introduce: data.introduce,
            evaluateNum: data.evaluateNum
          }
          this.evaluateStatus = data.evaluateStatus
          this.applyStatus = data.applyStatus
        }
      })
    },
    getEvaluateList() {
      dsf.http
        .post("fn/application/store/230519141848vhUIc6fw3rCmJG5IB7a/mobile/q", {
          moduleId: "2305181733278mFvPjQ16UBEBTgwZUV",
          appId: this.$route.params.pk,
          page: this.page,
          limit: this.limit,
          formId: "230519141848vhUIc6fw3rCmJG5IB7a"
        })
        .then(res => {
          this.total = res.data.total || 0
          let datas = res.data.datas.map(item => {
            return {
              id: item.dataValue["evaluate.S-BASE-0001"],
              img: dsf.url.getWebPath(item.dataValue["useIconUrl"]),
              name: item.dataValue["evaluate.S-APP-EVALUATE-0001"],
              userid: item.dataValue["evaluate.S-APP-EVALUATE-0002"],
              appScore: Number(item.dataValue["evaluate.S-APP-EVALUATE-0005"]),
              text: item.dataValue["evaluate.S-APP-EVALUATE-0004"],
              time: item.dataValue["evaluate.S-APP-EVALUATE-0006"]
            }
          })
          this.comments = [...this.comments, ...datas]
          if (this.comments.length === this.total) {
            // 加载结束
            this.finished = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onLoad() {
      this.getEvaluateList()
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.page = 1
      this.comments = []
      this.getEvaluateList()
    },
    submit() {
      dsf.http
        .post("fn/application/store/evaluate", {
          appId: this.$route.params.pk,
          star: this.star,
          content: this.evaluateContent
        })
        .then(res => {
          if (res.data.code == 200) {
            this.show = false
            this.evaluateStatus = 1
            this.onRefresh()
          }
        })
    },
    delEvaluate(id) {
      dsf.layer.confirm(
        {
          message: "是否确认删除",
          confirmButtonText: "确认"
        },
        () => {
          dsf.http.post("fn/application/store/evaluate/del", { evaId: id }).then(res => {
            if (res.data.code == 200) {
              this.onRefresh();
              this.getData()
            }
          })
        }
      )
    },
    apply() {
      this.$router.push({
        path: "/commonForm/2305181732545eWpU6ESTFnvts0srPh",
        query: {
          appid: this.$route.params.pk,
          appName: this.data.appName,
          title: "应用申请"
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.flex1 {
  flex: 1;
}
.container {
  height: calc(100vh - 46px);
  .content {
    flex: 1;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
    border-radius: 4px;
    margin: 10px;
    padding: 10px;
    overflow: hidden;
    .sub1 {
      font-size: var(--font_size_4);
      color: #333;
      line-height: 18px;
    }
    .sub2 {
      font-size: var(--font_size_4);
      color: #666;
      line-height: 18px;
    }
    .sub3 {
      font-size: var(--font_size_4);
      color: #999;
      line-height: 18px;
    }
    .tag {
      background-color: rgba(0, 145, 255, 0.1);
      color: var(--normal);
      border-radius: 12px;
      font-size: var(--font_size_4);
      line-height: 18px;
      padding: 0 6px;
      margin-right: 6px;
    }
    .top {
      img {
        width: 58px;
        height: 58px;
        margin-right: 10px;
      }
    }
    .tabs {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .van-tabs {
        height: 100%;
      }
      ::v-deep .van-tabs__content {
        height: calc(100% - 0.88rem);
        overflow: auto;
      }
      ::v-deep .van-tabs__wrap {
        border-bottom: 1px solid rgba(232, 232, 232, 1);
      }
      .tab-top {
        padding-top: 15px;
        position: relative;
        > span {
          border-left: 5px solid;
          padding-left: 5px;
          @include border-color-theme("normal");
        }
        button {
          position: absolute;
          right: 0;
        }
      }
    }
    .comment {
      padding: 15px 0;
      border-bottom: 1px dotted #e4e4e4;
      &-top {
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 5px;
          flex-shrink: 0;
        }
        .name {
          padding-right: 15px;
        }
        .van-rate {
          flex-shrink: 0;
        }
        .del {
          font-size: var(--font_size_4);
          flex: 1 0 auto;
          text-align: right;
          padding-left: 10px;
          @include font-theme("normal");
        }
      }
      &-text {
        padding: 5px 0;
      }
    }
  }
  .footer {
    background-color: #fff;
    button {
      margin: 10px;
      width: calc(100% - 20px);
    }
  }
}
.pop {
  .van-field {
    border-top: 5px solid #f1f2f4;
  }
  .rate {
    text-align: center;
    padding: 20px 0 5px;
    border-top: 1px solid #ddd;
  }
  button {
    width: calc(100% - 30px);
    margin: 15px;
  }
}
</style>
