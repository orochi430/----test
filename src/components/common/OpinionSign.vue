<template>
  <div class="opintionView">
    <span class="name">{{signName}}</span>
    <span class="date">{{signTime}}</span>
  </div>
</template>

<script>
export default {
  name: "OpintionSign",
  components: {},
  props: {
    signName:{
      type:String,
      default:""
    },
    signTime:{
      type:String,
      default:""
    }
  },
  data() {
    return {
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.opintionView {
  width: 100%;
  padding: 15px;

  .name{
    padding-left: 30px;
    display: block;
    height: 30px;
    line-height: 30px;
  }
  .date{
    padding-left: 60px;
    display: block;
    height: 20px;
    line-height: 20px;
  }
}
</style>
