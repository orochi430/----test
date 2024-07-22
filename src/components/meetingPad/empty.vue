<template>
  <div class="empty-container">
    <img src="../../../static/images/no_data.png" alt="">
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.empty-container {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    width: 60%;
  }
}
</style>
