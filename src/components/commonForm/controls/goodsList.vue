<template>
  <div class="good_list">
    <van-nav-bar fixed placeholder :title="params.name ?? ''" @click-left="back">
      <template #left>
        <van-icon name="arrow-left" /><span>返回</span>
      </template>
    </van-nav-bar>
    <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @focus="isFocus = true">
      <template slot="action">
        <span class="search_btn" @click="onSearch">搜索</span>
      </template>
      <template v-if="isFocus" slot="left">
        <van-icon @click="searchBack" style="padding-right: 5px;" name="arrow-left" />
      </template>
    </van-search>
    <goods-list-child v-if="goodsData.length" :multiple="multiple" :goodsData="goodsData" @imgSwipeShow="imgSwipe"
      @goodsCheck="goodsCheck" />
    <commonempty v-else description="暂无数据" />
    <div class="goods_list_footer">
      <span @click="showCheckGoods = true">
        已选择：{{ goodsNum }}
        <van-icon v-if="goodsNum" name="arrow-up" />
      </span>
      <button @click="goodsSelect">确定</button>
    </div>
    <van-popup v-model="showCheckGoods" :style="{ height: '70%' }" round position="bottom">
      <van-nav-bar class="goods_nav_bar" title="选中物品" @click-left="showCheckGoods = false">
        <template #left>
          <van-icon name="arrow-down" />
        </template>
      </van-nav-bar>
      <div class="goods_display_list" v-for="(item, index) in goodsCheckArr" :key="item.id + index">
        <span>{{ item.name }}</span>
        <van-icon name="close" @click="goodsDelete(index)" />
      </div>
    </van-popup>
    <van-popup v-model="showImgSwipe" :overlay-style="{ 'background-color': '#000' }"
      :style="{ height: '130vw', width: '100vw', 'background-color': '#000' }" @click="showImgSwipe = false">
      <van-swipe width="100vw" height="100vw">
        <van-swipe-item v-for="(item, index) in imgSwipeArr" :key="index">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <span class="img_swipe_name">{{ imgSwipeName }}</span>
    </van-popup>
  </div>
</template>

<script>
import goodsListChild from './goodsListChild.vue'
export default {
  name: 'goodsList',
  props: ["params"],
  components: {
    goodsListChild
  },

  data() {
    return {
      goodsData: [],
      multiple: false,
      showCheckGoods: false,
      showImgSwipe: false,
      imgSwipeArr: [],
      imgSwipeName: "",
      goodsCheckArr: [],
      searchText: "",
      isFocus: false
    }
  },

  created() {
    this.initData()
    // 多选 / 单选
    this.multiple = this.params.multiple ?? false
  },
  computed: {
    goodsNum() {
      return this.goodsCheckArr.length
    }
  },
  methods: {
    searchBack() {
      this.searchText = ""
      this.isFocus = false
      this.initData()
    },
    onSearch() {
      this.initData()
    },
    initData() {
      let self = this
      let loading = dsf.layer.loading()
      if (!this.params.url) {
        dsf.layer.closeLoading(loading)
        dsf.layer.toast("参数配置有误，请检查！")
        return
      }
      let name = this.searchText ? this.searchText : ""
      dsf.http.post(this.params.url, { name }).then(({ data }) => {
        this.goodsData = data.data.codeList
        arrayFlagLevel(this.goodsData)
        // 第一级默认展开
        if (this.goodsData[0]?.children.length > 0) {
          this.goodsData[0].open = 1
        }
        dsf.layer.closeLoading(loading)
        console.log(this.goodsData);
      })
      function arrayFlagLevel(array, level = 0) {
        if (!array || !array.length) return;
        array.forEach(item => {
          item.level = level;
          self.$set(item, 'open', self.searchText ? 1 : (item.open ?? 0))
          self.$set(item, 'checked', item.checked ?? false)
          if (item.children && item.children.length) {
            arrayFlagLevel(item.children, level + 1);
          }
        })
      }
    },
    back() {
      this.$emit("close", false);
    },
    imgSwipe(imgObj) {
      this.imgSwipeArr = []
      imgObj.imgArr.forEach(item => {
        if (item.includes("http") || item.includes("static")) {
          this.imgSwipeArr.push(item)
        } else {
          this.imgSwipeArr.push(dsf.url.getServerUrl(`fn/file/downloadImage?fileName=` + item))
        }
      });
      this.imgSwipeName = imgObj.name
      this.showImgSwipe = true
    },
    goodsCheck(item) {
      console.log(item.checked);
      if (this.multiple) {
        if (item.checked) {
          this.goodsCheckArr.push(item)
        } else {
          let goodsItemIndex = this.goodsCheckArr.findIndex(ele => ele.id == item.id)
          this.goodsCheckArr.splice(goodsItemIndex, 1)
        }
      } else {
        if (item.checked) {
          if (this.goodsCheckArr.length > 0) {
            this.goodsCheckArr[0].checked = false
            this.goodsCheckArr.pop()
          }
          this.goodsCheckArr.push(item)
        } else {
          this.goodsCheckArr = []
        }
      }
    },
    goodsDelete(index) {
      this.goodsCheckArr[index].checked = false
      this.goodsCheckArr.splice(index, 1)
    },
    goodsSelect() {
      this.$bus.emit("subFormGoodsSelect", this.goodsCheckArr)
      this.back()
    }
  },
}

</script>

<style scoped lang='scss'>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.good_list {
  margin-bottom: 1.2rem;

  .goods_list_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100vw;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    span {
      color: var(--normal);
      font-size: 14px;
    }

    button {
      color: #fff;
      width: 45%;
      padding: 10px;
      background-color: var(--normal);
      border-radius: 3px;
    }
  }

  .img_swipe_name {
    background: rgba(255, 255, 255, 0.50);
    border-radius: 30px;
    display: inline-block;
    width: 35%;
    padding: 8px;
    text-align: center;
    color: #FFF;
    margin-top: 20px;
  }

  .goods_display_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 10px 14px;
    font-size: 18px;
  }
}

.goods_nav_bar {
  position: sticky;
  top: 0;
}

.search_btn {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 2px;
  background-color: #F5F5F5;
}

::v-deep.van-nav-bar {
  @include font-theme("normal");
  width: 100%;

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }
}

::v-deep.van-popup {
  /* position: relative; */
  text-align: center;
}

::v-deep.van-swipe {
  height: 100vw;
}

::v-deep.van-search {
  border-bottom: 1px solid #eee;
}
</style>