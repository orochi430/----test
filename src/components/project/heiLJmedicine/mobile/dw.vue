<template>
  <div class="dw">
    <div class="dw_con">
      <div class="search">
        <form action="/">
          <van-search
            v-model="keyword"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </form>
      </div>
      <div class="menu" @click="choseArea">选择地区：{{ address }}</div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="onLoad"
        >
          <div class="hostipal">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="yy"
              @click="skipToMap(item)"
            >
              <div class="left">
                <img src="static/images/hljMedicine/yy.png" class="tu" alt="" />
                <div class="message">
                  <p>{{ item.title }}</p>
                  <p>{{ item.address }}</p>
                  <p>服务时间：{{ item.fwsj }}{{ item.fwsd }}</p>
                  <p>电话：{{ item.tel }}</p>
                </div>
              </div>
              <van-icon name="guide-o" color="#64bae7" size="22px" />
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <van-popup v-model="area_popup" position="bottom">
        <van-picker
          ref="areaPicker"
          :columns="area_columns"
          show-toolbar
          title="选择地区"
          @cancel="area_popup = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { areaColumn } from '@/components/project/heiLJmedicine/mobile/area_columns'
export default {
  mixins: [areaColumn],
  data() {
    return {
      keyword: '',
      area_popup: false,
      page: 1,
      limit: 10,
      address: '哈尔滨市,道里区',
      loading: false,
      finished: false,
      list: [],
      refreshing: false,
    }
  },
  created() {
    this.type = this.$route.params.type
    this.initial = true
    if (dsf.util.getClientName() == 'app') {
      let that = this
      $BaiduLocation.getLocation(
        {},
        function (locationObj) {
          let location = JSON.parse(locationObj)
          that.address = location.city + ',' + location.district
          console.log('插件方法体', locationObj, that.address)
          that.current_address = location
          that.getData()
        },
        function (e) {
          alert(e)
        },
      )
    } else {
      this.getData()
    }
  },
  mounted() {},
  methods: {
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.page = 0
      this.onLoad()
    },
    onSearch() {
      this.page = 1
      this.loading = false
      this.finished = false
      this.list = []
      this.use_search = true
      this.getData()
      setTimeout(() => {
        this.use_search = false
      }, 500)
    },
    choseArea() {
      //选择地区
      this.area_popup = true
      if (this.initial) {
        this.$nextTick(() => {
          let temp = this.address.split(',')
          this.$refs.areaPicker.setValues([temp[0], temp[1]])
        })
      }
      this.initial = false
    },
    onLoad() {
      this.page++
      this.getData()
    },
    skipToMap(item) {
      //跳转到具体地图
      let url = `${dsf.url.getServerUrl(
        'p2345/map/mobilemap.html',
      )}?startCoordinate=${this.current_address.latitude},${
        this.current_address.longitude
      }&endCoordinate=${item.location.lat},${item.location.lng}&startAdd=${
        this.current_address.address
      }&endAdd=${item.address}`
      this.$router.push({
        name: 'dsfIframe',
        params: {
          url: url,
          title: item.title,
        },
        query: {
          url: url,
          title: item.title,
        },
      })
    },
    getData() {
      //获取列表数据
      let url = ''
      let temp = this.address.includes('全部')
        ? this.address.split(',')[0]
        : this.address
      if (this.use_search && this.keyword) {
        url = `fn/map/searchMobileByKeyword?city=${temp}&page=${this.page}&limit=${this.limit}&keyword=${this.keyword}`
      } else {
        url = `fn/map/searchMobileBylx?type=${this.type}&address=${temp}&page=${this.page}&limit=${this.limit}`
      }
      dsf.http
        .get(url)
        .then((res) => {
          if (this.page == 1) {
            this.refreshing = false
            this.list = res.data.data
          } else {
            this.list = [...this.list, ...res.data.data]
          }
          if (res.data.data.length < this.limit) {
            this.loading = false
            this.finished = true
          } else {
            this.loading = false
            this.finished = false
          }
        })
        .error((err) => {
          if (err.message.indexOf('404') > -1) {
            dsf.layer.toast('登录接口异常，请联系系统管理员！')
          }
          return 0
        })
    },
    onConfirm(value, index) {
      this.address = value.toString()
      this.page = 1
      this.loading = false
      this.finished = false
      this.list = []
      this.getData()
      this.area_popup = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dw {
  width: 100vw;
  height: calc(100vh - 0.93rem);
  background: #ffffff;
  box-sizing: border-box;
  padding: 2%;
  .dw_con {
    width: 100%;
    // height: 100%;
    border: 1px solid #d7d7d7;
    box-sizing: border-box;
    padding: 0 2%;
    height: 100%;

    .search {
      height: 55px;
      box-sizing: border-box;
      .van-search__content {
        background-color: #d7d7d7 !important;
        ::v-deep input::-webkit-input-placeholder {
          font-size: 4px;
          color: #6e6e6e;
          font-weight: bold;
        }
        ::v-deep .van-icon {
          font-size: var(--font_size_0);
          color: #090909;
          font-weight: bold;
        }
      }
    }
  }

  .menu {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 4%;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: calc(100% - 22px);
    margin: auto;
  }

  .van-pull-refresh {
    width: 100%;
    height: calc(100% - 55px - 40px);
    padding: 10px 0;
    overflow-y: auto;
    .yy {
      height: 132px;
      border-bottom: 1px solid #f1f1f1;
      box-sizing: border-box;
      padding: 10px 12px;
      .left {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .tu {
          width: 10%;
          margin-right: 3%;
          height: auto;
        }

        .message {
          p {
            font-size: var(--font_size_4);
            margin-bottom: 4px;
            &:first-child {
              font-size: var(--font_size_3);
              font-weight: bold;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .van-icon {
        margin-top: 11%;
      }
    }

    // .yy:last-child {
    //   margin-bottom: 4%;
    // }
  }
}
</style>
