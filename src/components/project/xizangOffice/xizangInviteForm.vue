<template>
  <commonForm :_moduleId="$route.params.moduleId"></commonForm>
</template>

<script>
import commonForm from '@/components/commonForm/commonForm.vue';
export default {
  name: "xizangInviteForm",
  components: {
    commonForm
  },
}
</script>