<template>
  <div class="application-header" :style="{ backgroundImage: `url(${dsf.url.getWebPath(itemdata.params.bgImgUrl)})` }">
    <div v-if="itemdata.params.logoImgUrl">
      <img :src="dsf.url.getWebPath(itemdata.params.logoImgUrl)" alt="" style="height: 0.7rem;width:auto">
    </div>
    <div v-if="itemdata.params.fontContent" class="text">
      <span>{{ itemdata.params.fontContent }}</span>
    </div>
    <div v-if="itemdata.params.fontExpression" class="text">
      <span>{{ replaceText(itemdata.params.fontExpression) }}</span>
    </div>
    <div class="flex ac search-container">
      <van-search v-model="keyword" placeholder="请输入关键词" left-icon="" @search="search" :clearable="false">
        <template #right-icon>
          <i class="iconfont iconsousuo i1" style="color: #fff;" @click="search"></i>
        </template>
      </van-search>
      <!-- <div class="search flex jb ac" @click="$router.push('/commonList?fileType=zhcx&title=文件查询')">
      <input type="text" placeholder="请输入关键词" :value="keyword">
      <i class="iconfont iconsousuo i1"></i>
    </div> -->
      <van-popover v-if="actions.length > 0" v-model="showPopover" trigger="click" :actions="actions" @select="onSelect"
        placement="bottom-end">
        <template #reference>
          <van-icon name="add-o" color="#fff" size="0.48rem" style="margin-left: 0.2rem" />
        </template>
      </van-popover>
    </div>

    <div>
      <HeaderMenu fontsize="0.28rem" ref="headerMenu" />
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/SquMenu/headerMenu";
import dsf from "../../../common";
export default {
  components: { HeaderMenu },
  props: ["itemdata"],
  data() {
    return {
      showPopover: false,
      keyword: ''
    }
  },
  activated() {
    this.showPopover = false
    this.$refs.headerMenu.getMenu()
  },
  computed: {
    actions() {
      let arr = []
      if (this.itemdata.params.quickOptionList) {
        this.itemdata.params.quickOptionList.forEach(item => {
          if (item.title) {
            arr.push({
              text: item.title,
              action: item.action,
              param: item.param
            })
          }
        })
      }
      return arr
    }
  },
  methods: {
    replaceText(text) {
      return dsf.util.getReplaceUrl(text)
    },
    onSelect(action) {
      this.showPopover = false
      if (action.action) {
        this[action.action](action.param);
      }
    },
    go(param) {
      setTimeout(() => {
        this.$router.push(param);
      }, 100);
    },
    search() {
      this.$router.push(`/commonList?fileType=zhcx&keyword=${this.keyword}&title=文件查询`)
      this.keyword = ''
    }
  },
}
</script>
<style lang='scss' scoped>
.application-header {
  background-size: 100%;
  padding: 16px;

  .text {
    color: #fff;
    font-size: var(--font_size_0);
    // padding-top: 10px;
  }

  .search-container {
    margin: 16px 0 10px;

    // .search {
    //   padding: 8px 16px;
    //   background-color: rgba(255, 255, 255, 0.2);
    //   border-radius: 5px;
    //   color: #fff;
    //   flex: 1;
    // }
    .van-search {
      padding: 0;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.2);
      flex: 1;

      .van-search__content {
        background-color: transparent;

        ::v-deep input {
          color: #fff;

          &::placeholder {
            color: #fff;
          }
        }
      }
    }
  }

}
</style>
