

<script>
import controlTextBox from './controlTextBox'

export default {
  name:'controlNumberBox',
  extends:controlTextBox,
  created(){
    this.controlData.inputType='Number'
  }
}
</script>

<style>

</style>