import req from '@/api/api';
<template>
  <div class="app-popBox">
    <div class="modal">
      <div class="title" style="background:blue">分阅意见</div>
      <div class="box">
        <div class="cont">
        <van-field
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入分阅意见"
          v-model="optionValue"
      />
          <div class="opinion">
            <div class="item" v-for="(item,index) in opinionList" :key="index">
              <div class="desc" @click="writeAdvice(item.context)">{{item.context}}</div>
              <div class="close" @click="deleteAdvice(item,index)">
                <img src="../../assets/imgs/workflow/close.png" alt />
              </div>
            </div>
            <div class="add" @click="addadvice()">
              <img src="../../assets/imgs/workflow/add.png" alt />
            </div>
          </div>
            <van-button type="default" size="small" @click="cancelClick()">取消</van-button>
            <van-button type="info" size="small" @click="sendClick()">发送</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:[],
  data() {
    return {
      opinionList: [],
      isHidden:false,
      optionValue:""
    };
  },
  mounted() {
    this._getAdvice();
  },
  methods: {
    // 获取常见意见模板
    _getAdvice() {
      const self = this;
      dsf.http.get("fn/mobileUsedOpinion/find",{}).then(function(result) {
        self.opinionList = result.data.rows;
      });
    },
    // 添加意见
    addadvice() {
      const self = this;
      if(!self.optionValue){
        self.$dialog.alert({
          title: '提示',
          message: '请输入内容',
        })
      }else{
        dsf.http.post(
              "fn/mobileUsedOpinion/add",
               {
                __DATA: JSON.stringify({ opinion: self.optionValue })
              }).then(
              function(result) {
                self._getAdvice();
              }
            );
      }

    },
    // 删除意见
    deleteAdvice(item, index) {
      const self = this;
      self.$dialog.confirm({
        title:"提示",
        message:"确定要删除吗？"
      }).then(function (){
        dsf.http.get( "fn/mobileUsedOpinion/delete?id=" + item.id,{}).then(function(result) {
            self._getAdvice();
          });
      })
    },
    //点击意见
    writeAdvice(txt){
     this.optionValue=this.optionValue+txt;
     this.$forceUpdate();
    },
    sendClick(){
      this.$emit('adviceSend',this.optionValue);
    },
    cancelClick(){
      this.$emit('cancelClick');
    }
  }
};
</script>

<style lang="css">
.app-popBox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.app-popBox .modal {
  width: 300px;
  height: 230px;
  background: #ffffff;
}
.app-popBox .modal .title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
}
.app-popBox .modal .box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.app-popBox .modal .box .cont {
  width: 100%;
}
.app-popBox textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #d6d6d6;
  text-indent: 1rem;
}
.app-popBox .modal .box .cont .opinion {
  position: relative;
  width: 100%;
  padding: 15px 0;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.app-popBox .modal .box .cont .opinion .item {
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 5px;
}
.app-popBox .modal .box .cont .opinion .item .desc {
  font-size: 10px;
  color: #333333;
  max-width: 150px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  line-height: 20px;
  margin-right: 2px;
  padding: 2px 5px;
  border: 1px solid #d6d6d6;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.app-popBox .modal .box .cont .opinion .item .close {
  max-width: 50px;
  height: 20px;
  padding: 2px 5px;
  border: 1px solid #d6d6d6;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
}
.app-popBox .modal .box .cont .opinion .item .close img {
  width: 15px;
  height: 15px;
}
.app-popBox .modal .box .cont .btn {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.app-popBox .modal .box .cont .add img {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0px;
  right: 0;
}
.app-popBox .modal .box .cont .btn .cancel,
.app-popBox .modal .box .cont .btn .send {
  width: 30%;
  height: 30px;
  border-radius: 5px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-popBox .modal .box .cont .btn .cancel {
  background: #d8d8d8;
  font-size: var(--font_size_4);
  color: #333333;
}
.app-popBox .modal .box .cont .btn .send {
  font-size: var(--font_size_4);
  color: #ffffff;
}
</style>
