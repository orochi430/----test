<template>
  <div class="turnwsdx">
  </div>
</template>
<script>
export default {
  name: "turnwsdx",
  data() {
    return {
    };
  },
  created() {
    var _this = this;
    setTimeout(function(){
      _this.init();
    },500);
  },
  mounted() {
  },
  methods: {
    init(){
        dsf.http.post("/ctrl/wsdxgosso", {type:"app"})
        .then(res => {
          var user_id = res;
          // var url = "https://wsdx.ccps.gov.cn/dsfa/nc/mobile/login/appLoginByStuId?stuId="+user_id+"&hideTab=1";

          var url = "https://wsdxtest.ccps.gov.cn/dsfa/nc/mobile/login/appLoginByStuId?stuId="+user_id+"&hideTab=1";
          location.replace(url);
        })
        .catch(res => {
        })
        .finally(() => { });
    }
  }
}
</script>