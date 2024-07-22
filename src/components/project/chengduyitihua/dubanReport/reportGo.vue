<template>
  <div></div>
</template>
<script>
export default {
  name: "reportGo",
  created() {
    // console.log(this.$route.query)
    this.$router.replace({
      path: `/dblist`,
      query:this.$route.query
    });
  },
};
</script>
