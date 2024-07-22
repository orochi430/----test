<template>
  <div class="read-only-forms">
    <van-cell-group>
      <van-cell
        v-for="(item,index) in dataList"
        :key="index"
        :title="item.title"
        :value="item.value"
        :title-class="(item.lay&&item.lay=='left')?'title-class-left':'title-class-right'"
        value-class="value-class"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "ReadOnlyForms",
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [
          { title: "显示标题", value: "显示内容" },
          { title: "显示标题", value: "显示内容" },
          { title: "显示标题", value: "显示内容" }
        ];
      }
    }
  },
  data: function() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style>
</style>