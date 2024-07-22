<template>
  <div>
    <div v-for="(list, index) in opinionTree">
      <div class="title">第{{ index + 1 }}次拟办</div>
      <template v-for="item in list">
        <div v-if="item.opinionContent">
          <div class="node">{{ item.nodeId == 'Q23XZ6FnC7SDVMf' || item.nodeId == 'RfqqqHGESZNlapb' ? '审核：' : '拟办：' }}</div>
          <div class="content" v-html="item.opinionContent"></div>
          <div class="time">{{ item.userName }}&nbsp;&nbsp;{{ item.time.split(" ")[0] }}</div>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  props: ["metaData"],
  data() {
    return {
      dataTree: {}
    }
  },
  computed: {
    opinionTree() {
      let arr = []
      let startIndex = 0
      let list = this.metaData.extra.list.reverse()
      list.forEach((item, index) => {
        if (item.nodeId == "qTzpZgXEBU8GM0A" && list[index - 1].pnid != item.fpnid) {
          arr.push(this.metaData.extra.list.slice(startIndex, index))
          startIndex = index
        }
        if (index == this.metaData.extra.list.length - 1) {
          arr.push(this.metaData.extra.list.slice(startIndex))
        }
      })
      return arr
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.title {
  font-size: var(--font_size_1);
  font-weight: 600;
}
.node {
  font-size: var(--font_size_2);
  padding: 6px 0;
}
.content {
  font-size: var(--font_size_0);
  font-weight: 600;
  text-indent: 1em;
  padding-bottom: 12px;
}
.time {
  font-size: var(--font_size_2);
  text-align: right;
}
</style>
