<template>
<div class="wan-todo">
  <div class="title">
    <img src="static/images/wanzhengtong/todoTitle.png" alt="" style="width: 1.96rem; height: auto">
    <span>{{ total }}</span>
    <van-icon size="20" color="#666" name="plus" style="padding: 0 0.2rem;" @click="$router.push('/commontabs/Grtxtab')"/>
    <img :src="menuType=='card' ? 'static/images/wanzhengtong/todoList.png' : 'static/images/wanzhengtong/todoCard.png'" alt="" @click="changeType" style="width: 0.34rem; height: auto">
  </div>
  <template v-if="menus.length">
    <div class="menu" v-if="menuType == 'card'">
      <div v-for="item in menus" :key="item.typeName" :style="{backgroundImage: `url(${dsf.url.getServerUrl(item.imgUrl)})`}" @click="goLink(item)">
        <div class="name">{{item.typeName}}</div>
        <div class="badgeNum">{{item.count}}</div>
      </div>
    </div>
    <div class="tabs" v-else-if="menuType == 'list'">
      <van-tabs v-model="active" swipeable>
        <van-tab :title="item.typeName" :badge="item.count || ''" v-for="(item, index) in menus" :key="index">
          <todo-list :url="item.listUrl"></todo-list>
        </van-tab>
      </van-tabs>
    </div>
  </template>
  <commonempty v-else></commonempty>
</div>
</template>

<script>
import TodoList from '../../components/todoList'
export default {
  components: { TodoList },
  props: ['currentComponent', 'currentPortalId'],
  data() {
    return {
      menus: [],
      active: '',
      menuType: dsf.util.loadLocalStore('menuType') || 'card'
    }
  },
  computed: {
    total() {
      return this.menus.reduce(function(total, currentValue) {
        return total + currentValue.count
      }, 0)
    }
  },
  created() {
    this.getMenu()
    let self = this
    if(window.dd) {
      dd.ready(function() {
        // 页面被唤醒的事件监听(webview)
        document.addEventListener('resume', function(e) {
            e.preventDefault();
            console.log('事件：resume')
            self.getMenu()
        }, false);
      })
    }
  },
  activated() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      dsf.http.get(this.currentComponent.action, {
        pageId: this.currentPortalId
      }).then(res => {
        if (res.data.code == 200) {
          this.menus = res.data.data
          this.menus.forEach(item => {
            // mobielUrl中拼接参数pageId
            this.analysUrl(item)
            item.datas = []
          })
        }
      })
    },
    goLink(item) {
      if (item.mobielUrl) {
        if(item.mobielUrl.indexOf('http') == 0) {
          if(window.dd) {
            dd.openLink({
              url: item.mobielUrl
            }).then(res => {
                console.log(res)
            }).catch(err => { })
          } else {
            this.$router.push({
              path: "/iframe",
              query: {
                  url: item.mobielUrl,
                  title: item.typeName
              }
            })
          }
        } else {
          this.$router.push({
            path: item.mobielUrl,
            query: {
              title: item.typeName
            }
          })
        }
      }
    },
    // 解析列表接口
    analysUrl(menu) {
      if (menu.dataUrl) {
        menu.listUrl = menu.dataUrl
        return
      }
      let str = menu.mobielUrl
      if (str.indexOf('/commonList') == 0) {
        const path = str.split('?')[0]
        const listId = path.split('/')[2]
        const moduleId = path.split('/')[3]

        const query = str.split('?')[1].split('&')
        const queryObj = {}
        query.forEach(item => {
          const result = item.split('=')
          queryObj[result[0]] = result[1]
        })
        let secQueryParm = ''
        if (queryObj.secQuery) {
          let secQueryObj = JSON.parse(queryObj.secQuery)
          secQueryObj.pageId = this.currentPortalId
          queryObj.secQuery = JSON.stringify(secQueryObj)
          Object.entries(secQueryObj).forEach(item => {
            secQueryParm += `&${item[0]}=${item[1]}`
          })
        }
        let queryParm = ''
        Object.entries(queryObj).forEach((item, index) => {
          queryParm += `${index == 0 ? '?' : '&'}${item[0]}=${item[1]}`
        })
        menu.mobielUrl = path + queryParm
        menu.listUrl = `fn/list/${listId}/mobile/q?moduleId=${moduleId}${secQueryParm}`
      } else {
        menu.listUrl = ''
      }
    },
    changeType() {
      this.menuType == 'card' ? this.menuType = 'list' : this.menuType = 'card'
      dsf.util.saveToLocalStore('menuType', this.menuType)
      this.getMenu()
    }
  }
}
</script>
<style lang='scss' scoped>
.wan-todo {
  background-image: linear-gradient(180deg, #EFF6FF 0%, #F6FBFF 100%);
  box-shadow: 0 1px 20px 0 rgba(166,201,235,0.26);
  border-radius: 5px;
  margin: 15px;
  padding: 10px 0;
  .title {
    padding: 10px;
    display: flex;
    align-items: center;
    img {
      display: inline-block;
    }
    span {
      flex: 1;
      padding: 0 8px;
    }
  }
  .menu {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
    &>div {
      background-size: cover;
      background-position: center;
      width: 49%;
      height: 65px;
      border-radius: 5px;
      margin-top: 10px;
      div {
        padding: 8px 0 0 30px;
      }
      .badgeNum {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  ::v-deep .van-tab.van-tab--active {
    color: #2779F8 !important;
  }
  ::v-deep .van-tabs__line {
    background-color: #2779F8 !important;
  }
  ::v-deep .van-tabs__wrap {
    box-shadow: 0 10px 10px 0 rgba(166,201,235,0.26);
  }
  ::v-deep .van-tabs__nav {
    background-color: initial;
  }
}
</style>