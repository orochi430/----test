<template>
  <div class="superviseidea">
    <template v-if="tabList.length > 0">
      <van-tabs v-model="active" sticky :offset-top="dsf.util.getOffsetTop()" @change="handleTabChange" >
        <van-tab v-for="(item, index) in tabList" :title="`${item.label}`" :key="index" title-style="color:#333">
          <div class="ideacontent">
            <div class="disflex">
              <span>反馈状态：</span>
              <van-dropdown-menu>
                <van-dropdown-item v-model="selectVal" :options="option" @change="handleChange" />
              </van-dropdown-menu>
            </div>
            <ul class="idea-box" v-if="item.data.length > 0">
              <li v-for="(subitem, index) in item.data" :key="index" >
                <div class="idea-title" v-if="subitem.dutyUnit">
                  <span>[{{subitem.taskType === "1"?'主办':'协办'}}]</span>
                  {{subitem.dutyUnit}}</div>
                  <div class="displayflex">
                    <div class="idea-ln" v-if="subitem.underTaker">
                      承办人：{{subitem.underTaker}}
                      <!-- <img src="../../assets/imgs/sms.png" alt="" @click="handleDingDing(subitem)"> -->
                    </div>
                    <div class="idea-ln" v-if="subitem.feedBackId">
                      反馈时间：{{subitem.feedBackDate}}
                    </div>
                  </div>

                <div class="idea-ln displayflex">
                  <div class="idea-phone" @click="handleTel(subitem)">联系方式：{{subitem.utTel}}
                    <van-icon v-if="subitem.utTel" name="phone-o" size="20"/>
                    <!-- <img v-if="subitem.utTel" src="../../assets/imgs/mailDetail_phone.png" alt="" @click="handleTel(subitem)"> -->
                  </div>
                  <div class="idea-cus-button" :class="subitem.feedBackId?'idea-cus-primary':'idea-cus-warning'">{{subitem.feedBackId ? "已反馈" : "未反馈"}}</div>
                </div>
                <div class="idea-ln displayflex" v-if="subitem.exeInfo && subitem.feedBackId">
                  <div class="idea-phone idea-lan" @click="handleJump(subitem)">反馈情况：{{subitem.exeInfo}}</div>
                </div>
                <div class="idea-ln displayflex" v-if="subitem.bjyj && subitem.feedBackId">
                  <div class="idea-lan elps" @click="handleJump(subitem)">反馈内容：{{subitem.bjyjText}}</div>
                </div>
                <div class="idea-send" v-if="!subitem.feedBackId" @click="handleDeal">
                  <div class="idea-primary-blue">催办</div>
                </div>
              </li>
            </ul>
            <commonempty v-else description="暂无数据" />
          </div>
        </van-tab>
      </van-tabs>
    </template>
    <commonempty v-else description="暂无数据" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.query.id || '',
      selectVal: 0,
      option: [
        { text: '全部', value: 0 },
        { text: '已反馈', value: 1 },
        { text: '未反馈', value: 2 }
      ],
      active: 0,
      tabList: [],
      copyTabList: []
    }
  },
  methods: {
    getDataList () {
      let loading = dsf.layer.loading()
      dsf.http.get('/ctrl/superviseV6/m/feedBack/info?id='+ this.id).then(data => {
        dsf.layer.closeLoading(loading)
        let res = data.data || {}, result = res.data || {};
        let list = Object.keys(result).map(item => ({label: item + '期', data: result[item]}));
        this.copyTabList = JSON.parse(JSON.stringify(list));
        this.tabList = list;
      })
    },
    handleDingDing (row) {
      try {
        if (dsf.config.ddSetting.isDing) {
          dd.biz.chat.openSingleChat({
            corpId: dsf.config.ddSetting.ddCoprId,
            userId: row.id,
            onSuccess: function () {
              console.log('success')
            },
            onFail: function () {
              console.log('error')
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleTel (row) {
      window.location.href = `tel:${row.utTel}`
    },
    // 催办
    handleDeal () {
      dsf.http.post('/ctrl/convert/moduleRuleConvert', {
          convertId: '2106161334381PC5vugnZwQyjNoMLzA',
          initDataSource: 1,
          srcInfo: this.id
      }).then(res => {
          if (res.data.code == 200) {
              this.$router.push({
                  path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
                  query: {
                      initDataSource: 1,
                      sourcePk: this.id,
                      relationId: this.id,
                      type: '催办'
                  }
              })
          }
      })
    },
    // 反馈情况跳转反馈页面
    handleJump (row) {
      this.$router.push({
          path: `/commonForm/210608105939mkuTUSzHdhowHPHxlY8/${row.feedBackId}`
      })
    },
    handleTabChange () {
      this.handleChange(this.selectVal);
    },
    handleChange (val) {
      this.tabList[this.active].data = this.copyTabList[this.active].data.filter(item => {
        if (val === 1) {
          return item.feedBackId
        } else if (val === 2) {
          return !item.feedBackId
        } else {
          return true
        }
      })
    }
  },
  mounted () {
    this.getDataList()
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.superviseidea{
  .van-dropdown-menu__bar{
    width: 50px;
    background-color: transparent;
    box-shadow: 0px 0px 0px;
  }
  .van-dropdown-menu__title{
    max-width: none;
    @include font-theme("normal");
    // &:after{
      // @include background-theme("normal")
    // }
  }
  .van-dropdown-menu__title::after{
    // border: 6px solid;
  }
}
</style>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.superviseidea{
  .disflex{
    display: flex;
    align-items: center;
    @include font-theme("normal")
  }
  .displayflex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ideacontent{
    padding: 0 20px;
  }
  .idea-cus-button{
    padding: 4px 8px;
    border-radius: 3px;
    font-weight: 550;
    font-size: var(--font_size_3);
  }
  .idea-cus-warning{
    background-color: #FCEDED;
    color: #E45555;
    border: 1px solid #F1A7A7;
  }
  .idea-cus-primary{
    background-color: #E9FAF8;
    color: #2CD4BB;
    border: 1px solid #8CE7D9;
  }
  .idea-primary-blue{
    width: 70px;
    // background-color: #3389E0;
    @include background-theme("normal");
    color: #fff;
    border-radius: 5px;
    padding: 5px 0;
    text-align: center;
  }
  .idea-box{
    li{
      background-color: #fff;
      border-radius: 8px;
      margin-bottom: 15px;
      padding: 20px 15px;
      box-shadow: 0px 0px 4px 1px rgba(204,204,204,0.5);
      .idea-title{
        font-family: PingFangSC-Medium;
        color: #333;
        font-size: 18px;
        font-weight: 500;
      }
      .idea-ln{
        color: #666;
        font-size: var(--font_size_3);
        padding-top: 10px;
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-left: 10px;
          box-sizing: border-box;
        }
      }
      .idea-phone{
        display: flex;
      }
      .idea-lan{
        @include font-theme("normal")
      }
      .idea-send{
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #cfcfcf;
        text-align: right;
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
