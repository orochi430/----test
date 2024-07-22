<template>
  <!-- 智慧人大 -->
  <div class="wisdom_index">
    <!-- 组件打开 -->
    <!-- 通讯录 -->
    <AddressList v-show="active == 'address_list'" :bottom_active="active"></AddressList>
    <!-- 应用页 -->
    <Application v-show="active == 'application'" :bottom_active="active"></Application>
    <van-tabbar v-model="active">
      <van-tabbar-item
        name="address_list"
        icon="friends-o"
      >
        通讯录
      </van-tabbar-item>
      <van-tabbar-item
        name="application"
        icon="apps-o"
      >
        应用
      </van-tabbar-item>
    </van-tabbar>


    

    <!-- 路由打开 -->
    <!-- <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        name="address_list"
        to="/wisdomIndex/address_list"
        icon="friends-o"
      >
        通讯录
      </van-tabbar-item>
      <van-tabbar-item
        name="application"
        to="/wisdomIndex/application"
        icon="apps-o"
      >
        应用
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
export default {
  name: 'wisdom_index',
  components: {
    Application: () => import('./application.vue'),
    AddressList: () => import('./addressList.vue'),
  },
  data() {
    return {
      active: 'application'
    }
  },
  created() {},
  activated() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.wisdom_index {
  ::v-deep .van-tabbar-item--active {
    color: #d3171c !important;
  }
}
</style>
