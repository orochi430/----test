<template>
  <div class="box"></div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  created() {
    dsf.http
      .post("/fn/covidProtect/toadyForm")
      .then((res) => {
        if (res.data.code != 200) {
          dsf.layer.toast(res.data.message);
        } else {
          const { data } = res.data;
          let route = {
            name: "commonForm",
            params: {
              moduleId: data.moduleId,
            },
          };
          if (data.pk) {
            route.params.pk = data.pk;
          }
          if (data.initDataSource) {
            route.query = {
              initDataSource: data.initDataSource
            };
          }
          this.$router.replace(route);
        }
      })
      .error(function (message) {
        dsf.layer.toast(message);
      });
  },
  methods: {},
};
</script>