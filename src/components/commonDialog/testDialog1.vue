<template>
<div class="testDialog1">
    <van-popup v-model="show" closeable :style="{ height: '100%' }" position="bottom" @close="close">
        <van-cell-group>
            <van-field v-model="value" label="文本" placeholder="请输入用户名" />
        </van-cell-group>
    </van-popup>
</div>
</template>

<script>
export default {
    name: 'testDialog1',
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        metaData: {
            type: Object,
            default: {}
        },
        formParams: {
            type: Object,
            default: {}
        }
    },
    components: {},
    data() {
        return {
            show: true,
            value: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        close() {
            this.show = false
            this.$emit("closeCallback", this.value)
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>
