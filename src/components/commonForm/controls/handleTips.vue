<template>
<div class="handleTips">
    <div class="opinionBox" v-for="(item, index) in handletips" :key="index">
        <div class="opinionText" v-show="item.handletips" v-html="item.handletips">
        </div>
        <div class="opinionWhere tr">
        </div>
        <div class="opinionTime tr">
            <i>{{ item.deptname }}&nbsp;&nbsp;</i>
            <i>{{ item.username }}&nbsp;&nbsp;</i>
            {{ item.accDate }}
        </div>
    </div>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: "handleTips",
    mixins: [propMixin],
    props: ["parameters"],
    data() {
        return {
            controlData: {},
        };
    },
    computed: {
        handletips() {
            let handletips = []
            if (this.metaData.extra.list) {
                let tips = this.metaData.extra.list

                handletips = tips;
            }
            return handletips
        }
    },
    mounted() {},
    methods: {}
};
</script>
<style lang='scss' scoped>
.handleTips {
  font-size: var(--font_size_2);
  width: 100%;
  .tf {
    text-align: left;
  }
  .tc {
    text-align: center;
  }
  .tr {
    text-align: right;
  }
  iframe{
    width:100%;
    height:calc(100vh - 40px);
  }
  >>>.van-nav-bar__content{
    height:40px;
  }
  .videoBox{
        background-color: rgba(0,0,0,.8);
        height:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
      }
  .opinionBox {
    // padding-left: 15px;
    position: relative;
    margin: 10px 0 5px;
    .opinionText {
      margin-top: 5px;
      min-height: 30px;
    }
    .opinionImg{
      display: flex;
      >img,>div{
        width:50%;
      }
    }
    &:first-child {
      margin-top: 5px;
    }
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      bottom: -5px;
      left: 10px;
      border-bottom: 1px solid #ebedf0;
    }
    .iconIMAGE{
      color: #49C9A7 !important;
    }
    .iconTXT{
      color: #A6A6A6 !important;
    }
    .iconPDF{
      color: #E21607 !important;
    }
    .iconWORD{
      color: #2A5699 !important;
    }
    .iconEXCEL{
      color: #207245 !important;
    }
    .iconPPT{
      color: #D33922 !important;
    }
    .iconOTHER{
      color: #AEBFCD !important;
    }
    
    .opinionFile{
      margin: 4px 0;
      display: flex;
      >i{
        margin-right:5px;
        display: inline-block;
        transform: rotate(-45deg);
        font-size: 18px;
      }
      .fileTxt{
        flex:1;
        word-break: break-all;
      }
      
    }
  }
}
</style>