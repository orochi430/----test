<template>
  <moving-situation :form-data="{info_id:this.pk}" :parameters="formMeta.parameters" />
</template>

<script>
import movingSituation from "@/components/todoFile/movingSituation";
export default {
  name:"moveStatus",
  props:["formData","formMeta"],
  components: {
    movingSituation,
  },
  data(){
    return {
      pk: this.formMeta.parameters.pk,
    }
  }
}
</script>

<style>

</style>