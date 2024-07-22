<template>
  <div>
    <van-popup v-model="show" closeable class="voteResults" @close="close">
        <van-sticky>
          <van-nav-bar title="表决结果">
          </van-nav-bar>
        </van-sticky>
        <div  class="voteResult" >
            <div class="vote">
              <p class="title">
                  关于{{voteResult.bt}}的表决结果
              </p>
              <div class="percent">
                <div v-for='(item,index) in voteResult.optionList' :key='index'>
                    <span class="item">{{item.optionValueText}}</span>
                    <div class="perc">
                        <p><span :style="{width:item.proportionStr}"></span></p>
                        <span>{{item.proportionStr}}</span>
                    </div>
                </div>
                
              </div>
            </div>
        </div>
      </van-popup>
  </div>
 
</template>

<script>
export default {
  name: 'voteResult',
  data() {
    return {
      voteResult:{},
      show:true
    }
  },
  created() {
     this.getVoteResults();
  },
  methods: {
    //表决结果
    getVoteResults() {
      dsf.http.post("fn/meetingVote/getVoteResults", {
        topicId:this.$route.params.pk,
      }).done(res => {
          if(res.code=='200'){
              this.voteResult = res.data;
          }else{
             dsf.layer.toast(res.message);
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
.voteResults{
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