<template>
  <div class="receipt">
    <form-frame title="现场">
      <template slot="default">
        <van-form @submit="onSubmit">
          <van-field required input-align="right" v-model="text" label="会议室名称：" placeholder="请输入会议室名称" />
          <van-field input-align="right" v-model="text" label="地址：" placeholder="请输入地址" />
          <van-field class="sb" input-align="right" name="radio" label="设备：">
            <template #input>
              <van-checkbox-group v-model="result" direction="horizontal">
                <van-checkbox name="a" shape="square">固定投影</van-checkbox>
                <van-checkbox name="b" shape="square">无投影设备</van-checkbox>
                <van-checkbox name="c" shape="square">话筒</van-checkbox>
                <van-checkbox name="d" shape="square">移动话筒</van-checkbox>
                <van-checkbox name="e" shape="square">无线话筒</van-checkbox>
                <van-checkbox name="f" shape="square">有投影幕布</van-checkbox>
                <van-checkbox name="g" shape="square">移动投影</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field input-align="right" v-model="text" label="容纳人数：" placeholder="请输入容纳人数" />
          <van-field input-align="right" type="textarea" rows="2" v-model="text" label="备注：" placeholder="请输入备注">
          </van-field>
          <van-cell title="是否启用">
            <template #right-icon>
              <van-switch v-model="checked" size="24" @change="switchChange" />
            </template>
          </van-cell>
          <van-field input-align="right" name="uploader" label="现场照片：">
            <template #input>
              <van-uploader>
                上传附件
              </van-uploader>
            </template>
          </van-field>
        </van-form>
      </template>
    </form-frame>
  </div>
</template>

<script>
  import FormFrame from './FormFrame'
  export default {
    name: 'Receipt',
    components: {
      FormFrame
    },
    data() {
      return {
        showCalendar: false,
        text: "",
        value: '',
        radio: "",
        showPicker: false,
        checked: true,
        result: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      };
    },
    computed: {},
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onSubmit() {

      },
      onConfirm(date) {
        this.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.showCalendar = false;
      },
      onConfirmJJCD(value) { //紧急程度
        this.jjcd = value;
        this.showPicker = false;
      },
      switchChange(value) {
        console.log(value)
      }
    },
    created() {},
    mounted() {},
    destroyed() {},
  }

</script>

<style scoped>
  .form-frame .van-checkbox {
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .form-frame .sb >>> .van-field__label {
    width: 60px;
  }

</style>
