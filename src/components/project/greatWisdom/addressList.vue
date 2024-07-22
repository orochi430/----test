<template>
  <!-- 智慧人大通讯录 -->
  <div class="address_list">
    <!-- 头部 -->
    <div class="head">
      <span
        v-for="items in tab_list"
        :key="items.type"
        :class="{ head_active: head_active == items.type }"
        @click="changeTab(items)"
      >
        {{ items.typeName }}
      </span>
    </div>

    <!-- 搜索 -->
    <form action="/">
      <van-search
        ref="searchOuter"
        v-model="keyword"
        placeholder="请输入查找内容"
        clearable
        @focus="onFocus"
      />
    </form>

    <!-- 通讯录列表 -->
    <div class="list">
      <div
        v-for="items in user_list"
        :key="items.id"
        class="single_person"
        @click="getSpecific(items)"
      >
        <p class="first" v-html="handleName(items.name)">
          <!-- <span class="name">items.name</span>
          <span v-if="items.delegation" class="belong">
            （{{ items.delegation }}）
          </span> -->
        </p>
        <p class="two">
          <span v-if="items.delegation">
            所属代表团：{{ items.delegation }}
          </span>
          <span v-if="items.phone">电话：{{ items.phone }}</span>
          <span v-if="items.extension">分机：{{ items.extension }}</span>
        </p>
      </div>
      <div v-if="!user_list.length" class="no_notice">
        该届次暂无通讯录人员
      </div>
    </div>

    <!-- 通讯录具体内容 -->
    <div v-if="specific_show" class="address_specific">
      <div class="content">
        <p class="cross">
          <van-icon name="cross" @click="specific_show = false" />
        </p>
        <p class="title">{{ special_user.name }}</p>
        <div class="message">
          <p v-if="special_user.phone">电话：{{ special_user.phone }}</p>
          <p v-if="special_user.delegation">
            所属代表团：{{ special_user.delegation }}
          </p>
          <p v-if="special_user.extension">
            分机：{{ special_user.extension }}
          </p>
          <p v-if="special_user.workplace">
            工作地点：{{ special_user.workplace }}
          </p>
        </div>
      </div>
    </div>

    <!-- 搜索 -->
    <div v-show="show_search" class="search_part">
      <van-popup
        :style="{ height: '100%' }"
        v-model="show_search"
        position="bottom"
      >
        <form action="/">
          <van-search
            ref="searchInner"
            v-model="keyword"
            placeholder="请输入查找内容"
            clearable
            show-action
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
        <div class="search_content">
          <div
            v-for="(items, i) in search_list"
            :key="i"
            :class="{
              group: i == '代表团' || i == '工作组',
              single: i == '负责人' || i == '联络员',
            }"
          >
            <p class="title">{{ i }}</p>
            <van-cell
              v-for="item in items"
              :key="item.id"
              :is-link="i == '代表团' || i == '工作组'"
              @click="getSpecific(item)"
            >
              <template #title>
                <div class="custom-title" v-html="matchColor(item.name)"></div>
              </template>
            </van-cell>
          </div>
          <div v-if="!Object.keys(search_list).length" class="no_notice">
            暂无检索人员
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'address_list',
  props: {
    bottom_active: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      list: [],
      head_active: '',
      keyword: '', //搜索关键字
      specific_show: false, //通讯录人员的详细信息
      show_search: false,

      tab_list: [], //头部栏
      user_list: [], //用户列表
      special_user: {}, //特定人员
      search_list: {}, //检索出的列表
    }
  },
  watch: {
    bottom_active(newV, oldV) {
      if (newV == 'address_list') {
        this.getTab()
      }
    },
  },
  created() {
    this.getTab()
  },
  methods: {
    handleName(name) {
      //处理姓名
      let temp = name.split('（')
      let dom = `<span class="name" style="font-size: var(--font_size_2);color: #333">${temp[0]}</span>`
      if (temp.length > 1) {
        dom += `<span class="belong" style="font-size: var(--font_size_3);color: #666">
            （${temp[1]}
          </span>`
      }
      return dom
    },
    getTab() {
      //获取tab栏
      dsf.http.get('action?AddressBookAppAction=1', {}).then((res) => {
        let data = res.data
        if (data.code == 200) {
          this.tab_list = data.data
          this.head_active = data.data[0].type
          if (dsf.util.loadSessionStore('current_session')) {
            this.getTabUsers()
          }
        }
      })
    },
    getTabUsers() {
      //获取每个tab下的用户
      let jc = dsf.util.loadSessionStore('current_session').name
      dsf.http
        .get('action?AddressBookAppAction=2', {
          tabId: this.head_active,
          jc: jc,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.user_list = data.data
          }
        })
    },
    changeTab(items) {
      //头部切换
      this.head_active = items.type
      this.getTabUsers()
    },
    onSearch(val) {
      this.keyword = val
      this.keyword_temp = val
      console.log('触发搜索', this.keyword, this.keyword_temp)
      if (!val) {
        dsf.layer.toast('请输入搜索内容')
        return
      }
      this.loading = dsf.layer.loading('检索中...')

      let jc = dsf.util.loadSessionStore('current_session').name
      dsf.http
        .get('action?AddressBookAppAction=4', {
          name: this.keyword,
          jc: jc,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.search_list = data.data
            dsf.layer.closeLoading(this.loading)
          }
        })
    },
    onCancel() {
      this.show_search = false
      this.keyword = this.keyword_temp
      console.log(this.keyword, this.keyword_temp)
    },
    onFocus() {
      this.show_search = true
      this.$nextTick(() => {
        this.$refs.searchOuter.querySelector('input').blur()
        this.$refs.searchInner.querySelector('input').focus()
      })
    },
    getSpecific(items) {
      dsf.http
        .get(`action?AddressBookAppAction=3`, {
          id: items.id,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.special_user = data.data
          }
        })
      this.specific_show = true
    },
    matchColor(mes) {
      //匹配检索颜色
      let temp = mes.split(this.keyword)
      //   console.log(temp)
      let total = temp.length
      let html_str = ''
      temp.forEach((ele, i) => {
        if (ele) {
          html_str += `<span>${ele}</span>`
        }
        if (i < total - 1) {
          html_str += `<span style="color: #CC0D12">${this.keyword}</span>`
        }
      })
      //   console.log(html_str)
      return html_str
    },
  },
}
</script>

<style lang="scss" scoped>
.address_list {
  height: calc(100vh - 50px);
}
.no_notice {
  text-align: center;
  margin-top: 100px;
}
.head {
  height: 44px;
  line-height: 44px;
  background: #cc0d12;
  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font_size_2);
    width: 24%;
    display: inline-block;
    text-align: center;
    height: 100%;
    line-height: 44px;
  }
  .head_active {
    font-size: 18px;
    position: relative;
    color: #fff;
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 2px;
      background: #ffffff;
      border-radius: 1px;
      left: 50%;
      transform: translate(-50%, 50%);
      top: 80%;
    }
  }
}
.van-search {
  background: #f7f8fa;
  ::v-deep .van-search__content {
    background: #fff;
  }
}
.list {
  background: #fff;
  height: calc(100% - 44px - 0.98rem);
  overflow-y: auto;
  padding: 0 15px;
  .single_person {
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
  }
  .name {
    font-size: var(--font_size_2);
    color: #333333;
  }
  .belong {
    font-size: var(--font_size_3);
    color: #666666;
  }
  .two {
    font-size: var(--font_size_4);
    color: #999999;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
}
.address_specific {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  .content {
    position: absolute;
    background: #fff;
    border-radius: 8px;
    width: 86%;
    left: 7%;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px 24px;
  }
  .cross {
    text-align: right;
    margin-bottom: 15px;
    font-size: 18px;
  }
  .title {
    font-size: 18px;
    color: #333333;
    font-weight: 700;
    margin-bottom: 15px;
  }
  .message {
    font-size: 18px;
    color: #333333;
    > p {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.search_part {
  .search_content {
    .title {
      background: #f5f5f5;
      padding: 12px 0 12px 12px;
      font-size: var(--font_size_2);
      color: #999;
    }
  }
}
.search_part .van-popup {
  background: #f5f5f5;
  ::v-deep .van-search__action {
    color: #cc0d12;
  }
  ::v-deep .van-search {
    background: #fff;
    .van-search__content {
      border: 1px solid #cc0d12;
      border-radius: 6px;
    }
  }
  .van-cell {
    border-bottom: 1px solid #eee;
  }
}
</style>
