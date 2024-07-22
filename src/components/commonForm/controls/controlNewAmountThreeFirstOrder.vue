<script>
import controlTextBox from './controlTextBox'

export default {
    name: 'controlNewAmountThreeFirstOrder',
    extends: controlTextBox,
    methods: {
        toThousands(num) {
            let numStr = (num || 0).toString();
            // 根据小数点截取
            let numStrArr = numStr.split(".");

            let prefix = numStrArr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

            if (numStrArr.length === 2) {
                return prefix + "." + numStrArr[1]
            }
            return prefix;
        }
    },
    created() {
        this.controlData.inputType = 'Number'
        if (this.value.value && !isNaN(this.value.value)) {
            this.value.value = this.toThousands(this.value.value)
        }
    }
}
</script>

<style>

</style>
