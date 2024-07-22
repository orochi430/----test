<template>
<div id="transaction-action-sheet">
    <van-action-sheet :value="value" @input="$emit('change', $event)" :actions="transactionActions" @select="onSelect" />
</div>
</template>

<script>
export default {
    name: 'TransactionActionSheet',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: Boolean,
        metaData: Object
    },
    data() {
        return {
            isShowActionSheet: false,
            transactionActions: [{
                name: '送审',
                method: 'send',
                value: 1
            }, {
                name: '会文',
                method: 'send',
                value: 2
                // }, {
                // 	name: '转发文',
                // 	method: '',
                // 	value: 4
            }, {
                name: '办结',
                method: 'documentFilingForm',
                value: 3
            }]
        }
    },
    mounted() {

    },
    methods: {
        closeActionSheet() {
            this.$emit('closeTransactionActionSheet');
        },
        onSelect(action) {
            action.params = this.getButtonParams();
            if (action.name == '转发文') {
                dsf.layer.alert({
                    title: '提示',
                    message: '请在pc端中，进行转发文操作',
                    confirmButtonText: '知道了'
                }, () => {})
            } else if (action.name == '办结') {
                this.$emit('actionSelect', action);
                // dsf.layer.confirm({
                // 	message: '是否确认办结',
                // 	confirmButtonText: '确认'
                // }, () => {
                // 	this.$emit('actionSelect', action);
                // })
            } else {
                this.$emit('actionSelect', action);
            }
        },
        getButtonParams() {
            let button = [...this.metaData.buttons.mainButtons, ...this.metaData.buttons.commonButtons].find(button => button.action == 'transaction');
            let params = {};
            if (button && button.parameters) {
                button.parameters.forEach(obj => {
                    params[obj.key] = obj.value;
                });
            }

            return params;
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
