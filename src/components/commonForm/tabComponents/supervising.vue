<template>
  <div>
    <keep-alive>
      <default-list :params="item"></default-list>
    </keep-alive>
  </div>
</template>
  
  <script>
import defaultList from "@/components/documentCenter/DefaultList";
export default {
  // :tabsPage="tabsPage"
  //     :clickTabIndex="clickTabIndex"
  //     :routeKey="routeKey"
  //     :mainKeyWord="realKeyWord"
  //     :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"
  //v   :currentTabs="index"
  name: "supervising",
  components: {
    defaultList,
  },
  props:{
    "form-data":{
      type: Object,
    }
  },
  data() {
    return {
      item: {
        listId: "2108231603007SHLatwkCjnZRDaNaYn",
        moduleId: "210812165721b8aVEBBOB8sKpsbzNaK",
        name: "反馈情况",
        
        params: {
          moduleId: "210812165721b8aVEBBOB8sKpsbzNaK",
          listId: "2108231603007SHLatwkCjnZRDaNaYn",
          pk:this.formData.main.A0001.value,
        },
        
      },
    };
  },
};
</script>
  
  <style>
</style>