<template>
  <div class="mzt_LogOut"></div>
</template>

<script>

export default {
  name: 'mzt_LogOut',

  props: [],

  components: {},

  data() {
    return {}
  },

  created() {},

  mounted() {
    let self = this;
    if (dsf.util.getClientName() == "app") {
      document.addEventListener("deviceready", function () {
        console.log("mzt_LogOut");
        xsfCommon.koalCaLogout('',function success(result){
          // alert(result)
        },function error(result){
          dsf.layer.toast(result);
        })
      });
    } else {
      self.$router.replace("testLogin");
    }
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {},

}

</script>

<style scoped lang='scss'>
</style>