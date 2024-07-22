<template>
  <div class="question_query">
    <div class="title">
      <p>
        区人大常委会
        <span style="color: #3687ff;">{{ year }}</span>
        年度专项监督工作
      </p>
      <p>建议议题征询表</p>
    </div>
    <div class="question_body">
      <!-- 问题列表 -->
      <div class="question_list">
        <div v-for="(item, n) in question_list" :key="item.id" class="single">
          <div class="one">
            <span class="index">{{ n + 1 }}</span>
            <p>{{ item.name }}</p>
          </div>
          <div class="two">
            <span>会议类型：{{ item.type }}</span>
          </div>
          <div class="three">
            <div>
              <van-checkbox
                v-model="item.SFJDYT"
                :disabled="!can_submit"
                shape="square"
              >
                建议列入监督议题
              </van-checkbox>
            </div>
            <div v-if="sfch == 1">
              <van-checkbox
                v-model="item.SFCH"
                :disabled="!can_submit"
                shape="square"
              >
                参与会议
              </van-checkbox>
            </div>
          </div>
        </div>
      </div>
      <!-- 问题提议 -->
      <div class="propose">
        <p>您希望增加的其他建议议题</p>
        <van-field
          v-model="remark"
          :readonly="!can_submit"
          rows="3"
          autosize
          type="textarea"
          maxlength="3000"
          placeholder="请输入（请写明“议题名称及监督方式”）"
          show-word-limit
        />
      </div>
    </div>

    <!-- 提交 -->
    <div class="submit">
      <van-button type="info" @click="submitQuestion">提交</van-button>
    </div>

    <!-- 说明 -->
    <van-popup
      :close-on-click-overlay="false"
      v-model="explain_show"
      class="explain_popup"
    >
      <div class="explain">
        <h3>议题征询填写说明</h3>
        <p class="one">各位区人大代表：</p>
        <p class="two">
          区人大常委会在研究谋划2023年度工作要点过程中，对表区委和区政府2023年重点工作，对照市人大常委会明确上下联动的监督项目，提出了常委会专项监督工作建议议题。为增强监督工作的针对性和实效性，发挥好人大代表在践行全过程人民民主过程中的作用，请各位代表在审议区人大常委会工作报告的同时，对专项监督计划提出意见建议。
        </p>
        <p class="three">
          请您对建议列入监督的栏目打“√”，也可提出建议增加的其他监督内容。
        </p>
        <div class="four">
          <p>浦东新区人大常委会办公室</p>
          <p>2023年1月</p>
        </div>
        <van-button round type="info" @click="explain_show = false">
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'question_query',
  data() {
    return {
      question_list: [],
      year: '--',
      sfch: '', //是否参会
      checked1: false,
      checked2: false,
      remark: '', //议题建议
      can_submit: true,
      explain_show: true, //是否显示议题说明
    }
  },
  created() {
    this.getData()
    this.getQuestion()
  },
  methods: {
    getData() {
      //获取配置
      dsf.http
        .post(`action?RdSubjectDataAction=&cmd=getSubjectSetup`, {})
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.year = data.data.year
            this.sfch = data.data.SFCH
          }
        })
    },
    getQuestion() {
      //获取问题列表
      dsf.http
        .post(
          `action?RdSubjectDataAction=&cmd=getSubjectData&userId=${this.$user.user_id}`,
          {},
        )
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.question_list = data.data.dataList
            this.can_submit = data.data.canSubmit == 'false' ? false : true
          }
        })
    },
    submitQuestion() {
      //提交议题征询
      if (!this.can_submit) {
        dsf.layer.toast('不能多次提交')
        return
      }
      let param = []
      this.question_list.forEach((ele) => {
        let obj = {
          subjectId: ele.id,
          SFJDYT: ele.SFJDYT ? '1' : '0',
          SFCH: this.sfch == '0' ? '0' : ele.SFCH ? '1' : '0',
        }
        param.push(obj)
      })
      console.log(param)
      dsf.http
        .post(
          `action?RdSubjectDataAction=&cmd=subjectRecord`,
          {
            records: param,
            remark: this.remark,
            userId: this.$user.user_id,
            userName: this.$user.name,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            dsf.layer.alert(
              {
                title: '温馨提示',
                message: data.msg,
              },
              () => {
                this.$router.back()
              },
            )
          } else {
            dsf.layer.toast(data.msg)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.explain_popup {
  width: 84%;
  height: 76%;
  border-radius: 10px;
  overflow-y: auto;
  padding: 20px 15px;
  font-size: var(--font_size_2);
  h3 {
    text-align: center;
  }
  .one {
    padding: 10px 0 5px;
  }
  .two,
  .three {
    line-height: 24px;
    text-indent: 2em;
    margin: 5px 0;
  }
  .four {
    text-align: right;
    p {
      line-height: 24px;
    }
  }
  button {
    width: 80%;
    margin: 15px 10%;
  }
}
.question_query {
  background: #f8f8f8;
  .title {
    font-size: 18px;
    color: #333;
    padding: 15px 0;
    text-align: center;
    background: #fff;
    font-weight: 700;
    position: fixed;
    left: 0;
    top: 0.92rem;
    width: 100%;
    z-index: 10;
  }
  .question_body {
    margin-top: 93px;
    height: calc(100vh - 0.88rem - 16px - 78px - 46px - 15px);
    overflow-y: auto;
  }
  .question_list {
    margin: 0 0 15px;
    background: #fff;
    .single {
      padding: 15px 0;
      margin: 0 15px;
      border-bottom: 1px solid #cfcfcf;
      &:last-child {
        border-bottom: none;
      }
    }
    .one {
      display: flex;
      align-items: baseline;
    }

    .index {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      margin-right: 10px;
      background: #c3c3c3;
      border-radius: 100%;
      text-align: center;
      line-height: 20px;
      font-size: var(--font_size_4);
      color: #fff;
    }
    .two,
    .three {
      font-size: var(--font_size_3);
      color: #999;
    }
    .two {
      margin: 5px 0 10px 30px;
    }
    .three {
      margin: 0 30px;
      display: flex;
      justify-content: space-between;
      ::v-deep .van-checkbox__label {
        color: #999;
      }
    }
  }
  .propose {
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
    > p {
      font-size: var(--font_size_2);
    }
  }
  .submit {
    padding: 8px 12px;
    background: #fff;
    button {
      width: 100%;
      border-radius: 4px;
      background: #3687ff;
    }
  }
}
</style>
