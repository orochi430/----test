<template>
<div class="testDialog1">
    <van-popup v-model="show" position="bottom" @close="close">

    </van-popup>
</div>
</template>

<script>
export default {
    name: 'testDialog2',
    components: {},
    data() {
        return {
            show: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        close() {
            this.show = false
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>
