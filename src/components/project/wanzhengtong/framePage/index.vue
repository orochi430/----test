<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<div class="container">
    <div class="wan-header" :style="{backgroundImage: `url(${backgroundImage})`}">
    <van-icon name="setting-o" size="22" @click="toSetting" />
      <div>
        <!-- <img src="static/images/wanzhengtong/search.png" alt="" @click="$router.push('/commonList?fileType=WZTzhcx')"> -->
        <img src="static/images/wanzhengtong/service.png" alt="" @click="toService">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="dept">
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference>
            {{currentDept}}<van-icon name="arrow-down" />
          </template>
        </van-popover>
      </div>
      <div class="name">
        {{ new Date().getHours() | greeting }}，{{ name }}
      </div>
    </div>
    <!-- <header-component></header-component> -->
    <component
        v-for="item in currentComponents"
        :key="`${item.id}_${currentPortalId}_${refreshTime}`"
        :is="item.componentCode"
        :ref="item.componentCode"
        :currentComponent="item"
        :currentPortalId="currentPortalId"
      ></component>
    <!-- <todo-component></todo-component>
    <notice-component></notice-component>
    <application-component></application-component>
    <database-component></database-component> -->
    <div style="height: 1rem;">
      <div class="footer">客服电话：{{dsf.config.setting['SYS-MOBILE-YW-0001']}}</div>
    </div>
</div>
</van-pull-refresh>
</template>

<script>
import todoComponent from './components/todoComponent'
import noticeComponent from './components/noticeComponent'
import applicationComponent from './components/applicationComponent'
import databaseComponent from './components/databaseComponent'
export default {
  components: {
    todoComponent,
    noticeComponent,
    applicationComponent,
    databaseComponent,
  },
  filters: {
    greeting(hour) {
      if(hour >=0 && hour <= 10) {
        return '早上好'
      } else if(hour > 10 && hour <= 14) {
        return '中午好'
      } else if(hour > 14 && hour <= 18) {
        return '下午好'
      } else if(hour > 18 && hour <= 24) {
        return '晚上好'
      }
    }
  },
  data() {
    return {
      backgroundImage: 'static/images/wanzhengtong/top.png',
      currentDept: '',
      currentPortalId: '',
      name: dsf.util.loadSessionStore("user").name,
      actions: [],
      showPopover: false,
      currentComponents: [],
      isLoading: false,
      refreshTime: ''
    }
  },
  created() {
    this.getMobilePortalPages()
  },
  watch: {
    currentPortalId (newVal, oldVal) {
      this.getMobilePortalComponents(newVal)
    }
  },
  methods: {
    getMobilePortalPages() {
      let loading = dsf.layer.loading()
      dsf.http.post('ctrl/unifyOfficeInfo/getMobilePortalPages').then(res => {
        if (res.data.code == 200 && res.data.data.length > 0) {
          this.actions = res.data.data.map(item => {
            return {
              text: item.pageName,
              id: item.id,
              background: item.background
            }
          })
          this.currentDept = this.actions[0].text
          this.currentPortalId = this.actions[0].id
          this.backgroundImage = dsf.url.getServerUrl(this.actions[0].background)
        } else {
          this.$router.replace(`/wanError?CODE=G02&TEL=${dsf.config.setting['SYS-MOBILE-YW-0001']}`)
        }
        dsf.layer.closeLoading(loading)
      }).error(error => {
        dsf.layer.closeLoading(loading)
      })
    },
    getMobilePortalComponents(id) {
      let loading = dsf.layer.loading()
      dsf.http.post('ctrl/unifyOfficeInfo/getMobilePortalComponents', {pageId: id}).then(res => {
        if (res.data.code == 200) {
          this.currentComponents = res.data.data
        }
        dsf.layer.closeLoading(loading)
      }).error(error => {
        dsf.layer.closeLoading(loading)
      })
    },
    onSelect(action) {
      this.currentDept = action.text
      this.currentPortalId = action.id
      this.backgroundImage = dsf.url.getServerUrl(action.background)
      dsf.http.post('fn/unifyOfficeInfo/setMobilePortal', {pageId: action.id}).then(res => {})
    },
    onRefresh() {
      this.refreshTime = new Date().getTime()
      this.isLoading = false
      this.getMobilePortalComponents(this.currentPortalId)
    },
    toSetting(){
      this.$router.push('/wanSetting')
    },
    toService() {
      if(window.dd) {
        dd.openLink({
          url: 'https://static.ahzwfw.gov.cn/wzt-ics-h5/#/'
        }).then(res => {
          console.log(res)
        }).catch(err => { })
      } else {
        this.$router.push({
          path: "/iframe",
          query: {
            url: 'https://static.ahzwfw.gov.cn/wzt-ics-h5/#/'
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  min-height: 100vh;
  background-color: #f0f7ff;
  overflow: hidden;
  position: relative;
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-bottom: 30px;
    font-size: 15px;
  }
}
.wan-header {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  padding: 15px;
  text-align: right;
  margin-bottom: -65px;
  img {
    width: 22px;
    height: 22px;
    display: inline-block;
    margin-left: 16px;
  }
  .dept {
    padding-top: 38px;
    padding-bottom: 30px;
  }
  .name {
    padding-bottom: 100px;
    font-size: var(--font_size_2);
  }
  .van-icon-setting-o{
    position: absolute;
    left: 15px;
    top: 15px;
  }
}
</style>