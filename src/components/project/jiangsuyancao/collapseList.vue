<template>
  <div>
    <van-collapse v-model="active">
      <template v-for="(item, index) in collapse.children">
        <van-collapse-item v-if="item.children && item.children.length > 0" :key="index" :title="item.title" :name="item.title">
          <template v-for="(itm,idx) in item.children">
            <collapseList v-if="itm.children && itm.children.length > 0" :key="idx" :node="itm"></collapseList>
            <van-cell v-else :key="idx" :value="itm.title" @click="linkTo(itm)"></van-cell>
          </template>
        </van-collapse-item>
        <van-cell v-else :key="index" :value="item.title" @click="linkTo(item)"></van-cell>
      </template>
      
    </van-collapse>
  </div>
</template>

<script>
import urlJs from "@/common/url";
export default {
  name: 'collapseList',
  props: {
    node: {type: Object}
  },
  data() {
    return {
      routeKey: '',
      active: []
    }
  },
  computed: {
    collapse() {
      if(this.node) {
        return {
          children: [this.node]
        }
      } else {
        let data = dsf.config.collapseList;
        this.routeKey = this.tabKey || this.$route.params.key
        if (data[this.routeKey]) {
          let docTitle = this.$route.query.title || data[this.routeKey].title;
          urlJs.setTitle(docTitle);
          return data[this.routeKey]
        }
      }
    }
  },
  created() {
    this.collapse.children.forEach(item => {
      if(item.defaultOpen) {
        this.active.push(item.title)
      }
    })
  },
  methods: {
    linkTo(item) {
      if(item.linkTo) {
        this.$router.push(item.linkTo)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .van-cell {
  font-size: var(--font_size_2);
  padding: 0.32rem;
}
::v-deep .van-cell:active { 
  background-color:#ddd;
}
::v-deep .van-cell::after {
  border-bottom: 1px solid #ebedf0 !important;
}
::v-deep .van-collapse-item__wrapper::after{
  position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 1px;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
::v-deep .van-collapse-item__title::after {
  display: block;
}
::v-deep .van-collapse-item__content {
  padding: 0 0.32rem;
}
</style>