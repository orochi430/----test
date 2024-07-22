<template>
<div class="form-frame">
    <div class="form-contain">
        <slot name="default"></slot>
    </div>
    <div class="form-footer">
        <slot name="button"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'FormFrame',
    components: {},
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        console.log(this.title)
    },
    destroyed() {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        }

    },
}
</script>
