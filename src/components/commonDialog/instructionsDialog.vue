<template>
    <!-- 陕西政务转包新增批示特殊弹窗 -->
    <div>
        <van-popup v-model="show" round position="bottom"   @close="close">
            <div class="pop">
                <van-nav-bar title="新增批示" />
                <!-- 展示注释 -->
                <!-- <van-field name="switch" label="是否公开" label-width="60px">
                    <template #input>
                        <van-switch v-model="switchChecked" size="20" />
                    </template>
                </van-field> -->
                <van-field v-model="value" rows="4" autosize type="textarea" placeholder="请输入批示意见" />
                <div class="btn">
                <van-button @click="close('取消')">取消</van-button>
                <van-button @click="close('确定')">确认</van-button>
                </div>
            </div>
         </van-popup>
    </div>
</template>

<script>
export default {
    name:"instructionsDialog",
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
      },
  },
    data(){
        return {
            show:true,
            value:'',
            switchChecked:false,
        }
    },
    created(){},
    mounted(){
    },
    methods:{
        close(btn){
            let userIdvalue = dsf.util.loadSessionStore("user")
            //let a = this.formData.mian['231124144956yJf6AX5Eaq3jXHFXK5J'].text
            
           
            if(btn == '确定'){
              // let isOpen = 1
              // if(this.switchChecked != true){
              //   isOpen = 1
              // }else{
              //   isOpen = 3
              // }
               let params ={
                fileNameText:this.formData.main['231124144956yJf6AX5Eaq3jXHFXK5J'].text,
                fileNameValue:this.formData.main['231124144956yJf6AX5Eaq3jXHFXK5J'].value,
                bt:this.formData.main['B0001'].value,
                userName: userIdvalue.name,
                userId: userIdvalue.user_id,
                content:this.value,
                isOpen:1,
                sourceId:this.formParams.pk
              }
              console.log(params);
              dsf.http.post("fn/informationDataController/createLeaderWritten",params).then((data)=>{
                console.log(data);
                if(data.data.code == '200'){
                   dsf.layer.toast("批示成功!")
                   this.$bus.emit("refreshValue", '刷新') 
                }
              })
              this.show = false
              this.$nextTick(() => {
                this.$emit("closeCallback", this.value)
              })
              //this.$emit("closeCallback", this.value) 
            }else{
              this.show = false
              this.$nextTick(()=>{
                this.$emit("closeCallback", this.value)
              })
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>
.pop {
  position: relative;
  width: 100vw;
  height: 45vh;
  min-height: 200px;
  border-radius: 8px;
}

.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;

  button {
    width: 49%;
    font-size: 15px;
  }
}

.btn button:last-child {
  background-color: var(--normal);
  color: white;
  
}

.btn button:first-child {
  background-color: white;
  color: var(--normal);
  border: 1px solid var(--normal);
}
</style>
