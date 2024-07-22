<template>
  <div>
    <van-popup v-model="show" closeable class="voteBallot" @close="close">
        <van-sticky>
          <van-nav-bar title="议题表决">
          </van-nav-bar>
        </van-sticky>
        <div class='voteResult'  >
          <div class="vote">
            <div class="subtitle">
                关于{{voteOption.bt}}的表决
            </div>
            <div class="subtitle subtitle1">
                {{ voteMode == '-1' ? "单选" : (voteMinNum == '1' ? "多选，最多投" + voteMaxNum + "票" : "多选，最少投" + voteMinNum + "票，最多投" + voteMaxNum + "票" )}}
            </div>
            <div class="options">
                <span :class="{active: item.checked}" v-for='(item,index) in voteOption.optionList' :key='index' @click='activeOption(item)'>{{item.optionValue}}：{{item.bt}}</span>
            </div>
            <van-button type="info" size="small" color="#3478F7" @click="submitOption">提交</van-button>
          </div>
        </div>
      </van-popup>
  </div>
 
</template>

<script>
export default {
  name: 'voteBallot',
  props: ['topicId', 'meetingId'],
  data() {
    return {
      voteOption:{},
      checkData:[],
      voteMode:'',  //选择模式 -1 单选 1 多选
      voteMinNum:'',  //选择模式 -1 单选 1 多选
      voteMaxNum:'',  //选择模式 -1 单选 1 多选
      show:true,
      pk: this.topicId || this.$route.params.pk
    }
  },
  created() {
    this.$nextTick(()=>{
      this.getYtAndOption();
    })
     
  },
  watch: {
    "voteOption.optionList": {
      handler(val) {
        this.checkData = []
        console.log(val);
        val.forEach(ele=>{
          if(ele.checked) this.checkData.push(ele)
        })
      },
      deep: true
    },
  },
  methods: {
    //表决选项
    getYtAndOption(){
      dsf.http.post("fn/meetingVote/getYtAndOption", {
        topicId:this.pk,
      }).done(res => {
          if(res.code=='200'){
              this.voteOption = res.data;
              this.voteMode = res.data.voteMode
              this.voteMaxNum = res.data.voteMaxNum
              this.voteMinNum = res.data.voteMinNum
              this.voteOption.optionList.forEach((ele, i)=>{
                if(i==0) this.$set(ele,'checked', true);
                else this.$set(ele,'checked', false);
              })
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    activeOption(item,index){
      console.log(this.checkData);
      if(this.voteMode == '-1'){
        this.voteOption.optionList.forEach(ele=>{
          this.$set(ele,'checked', false);
        })
        this.$set(item,'checked', !item.checked)
      }else{
        if (this.checkData.length == this.voteMaxNum&&!item.checked) {
          dsf.layer.toast("最多可投" + this.voteMaxNum + "票");
          return
        }
        this.$set(item,'checked', !item.checked)
      }
      
    },
    //表决提交
    submitOption(){
      if (this.voteMinNum > this.checkData.length&&this.voteMode == '1') {
        dsf.layer.toast("最少需投" + this.voteMinNum + "票");
        return
      }
      let id = ''
      this.checkData.forEach((ele,i)=>{
        if (i == 0) id += ele.id
        else id += ',' + ele.id
      })
      let meetingId = this.meetingId || this.$route.query.meetingId;
       dsf.http.post("fn/meetingVote/vote", {
        topicId:this.pk,
        optionId: id,
        meetingId:meetingId
      }).done(res => {
          if(res.code=='200'){
            dsf.layer.toast(res.message);
            this.close();
          }else{
            dsf.layer.toast(res.message);
            this.close();
          }
      })
    },
    close() {
      this.show = false;
      this.$emit("closeCallback", "")
    }
  }
}
</script>
<style lang='scss' scoped>
.voteBallot{
  width: 80%;
}
.voteResult {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    .van-nav-bar__title{
      font-weight: bold;
    }
    .vote {
      width: 100%;
      position: relative;
      padding-bottom: 20px;
      .van-icon {
        font-size: 18px;
        color: #999;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .title {
        width: 100%;
        height: auto;
        line-height: 24px;
        padding: 0 20px;
        font-size: var(--font_size_2);
        color: #000;
        text-align: center;
      }
      .subtitle {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_3);
        color: #333;
        box-sizing: border-box;
        padding: 0 20px;
        line-height: 30px;
      }
      .subtitle1{
        font-size: var(--font_size_4);
        color: #999;
      }
      .options {
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px;
        span {
          height: 40px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 20px;
          display: flex;
          align-items: center;
          font-size: var(--font_size_3);
          color: #333;
          border-radius: 5px;
          margin-top: 10px;

          &.active {
            background: #3478F7;
            color: #FFF;
          }
        }
      }

      .van-button {
        width: 60%;
        margin-left: 20%;
        margin-top: 20px;
        border-radius: 5px;
      }

      .percent {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px;
        padding-top: 0;
        display: flex;
        flex-direction: column;

        &>div {
          display: flex;
          flex-direction: column;
          margin-top: 15px;

          .item {
            font-size: var(--font_size_3);
            color: #333;
            line-height: 30px;
          }

          .perc {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 5px;

            &>p {
              flex: 1;
              width: 80%;
              height: 12px;
              border-radius: 10px;
              overflow: hidden;
              display: flex;
              align-items: center;
              background: #e5e5e5;

              span {
                height: 12px;
                border-radius: 10px;
                display: block;
              }
            }

            &>span {
              width: 20%;
              flex-shrink: 0;
              font-size: var(--font_size_3);
              color: #666;
              box-sizing: border-box;
              padding-left: 5%;
            }
          }

          &:nth-child(4n+1) {
            .perc {
              &>p {
                span {
                  background: #40b505;
                }
              }
            }

          }

          &:nth-child(4n+2) {
            .perc {
              &>p {
                span {
                  background: #b52100;
                }
              }
            }

          }

          &:nth-child(4n+3) {
            .perc {
              &>p {
                span {
                  background: #e3c700;
                }
              }
            }

          }

          &:nth-child(4n) {
            .perc {
              &>p {
                span {
                  background: #0068c1;
                }
              }
            }

          }
        }
      }
    }
}
</style>