<template>
  <default-list :params="item" :tabsPage="tabsPage" :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"></default-list>
</template>

<script>
import defaultList from "@/components/documentCenter/DefaultList";
import { mapState } from "vuex";
export default {
  name: "inspectionList",
  props: ["formData", "formMeta", "clickTabIndex"],
  components: {
    defaultList,
  },
  computed: {
    ...mapState({
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
  },
  data() {
    return {
      tabsPage: false,
      routeKey: "",
      item: {
        name: "巡检日志列表",
        icon: "",
        goRoute: "defaultList",
        url: "",
        params: {
          pk: this.formMeta.parameters.pk,
          FORM_DUTY_DATE: this.formData.main["B0013"].value
        },
        moduleId: "2205101043337PHtfjCsy9hZmA3AdES",
        listId: "220510114721TfVE0ibmbRAlrV6WPjY",
        badgeUrl: "",
        count: "",
      },
    };
  },
  created() { },
  methods: {}
};
</script>

<style>
</style>