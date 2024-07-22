<template>
<moving-situation :form-data="{info_id:this.pk}" :isControl="true" v-if="isShow" :parameters="formMeta.parameters"/>
</template>

<script>
import movingSituation from "@/components/todoFile/movingSituation";
export default {
    props: ["formData", "formMeta"],
    components: {
        movingSituation
    },
    computed: {
        isShow() {
            return this.formMeta.parameters.hasFlow==1
        }
    },
    data() {
        return {
            pk: this.$route.params.pk,
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
