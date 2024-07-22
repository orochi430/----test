<template>
  <el-container class="setForm">
        <el-form ref="form" label-position="left" :model="data.meetingConfig" label-width="200px" size="medium" v-if="data">
            <el-form-item label="会议室预定moduleId">
                <el-input v-model="data.meetingConfig.reserveModuleId" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="	会议管理接口">
                <el-input v-model="data.meetingConfig.meetingManageUrl" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="	会议中心 会议室使用情况数量接口">
                <el-input v-model="data.meetingConfig.meetingCountUrl" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="会议中心未报名">
               <el-input v-model="data.meetingConfig.meetingNoToDoUrl" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="会议中心已报名">
               <el-input v-model="data.meetingConfig.meetingToDoUrl" size="medium"></el-input>
            </el-form-item>
            
        </el-form>
    </el-container>
</template>

<script>
export default {
  props:{
      mainConfig:{
          type:Object,
          default:{}
      }
  },
  computed:{
      data(){
          console.log(this.mainConfig)
          return this.mainConfig.data
      }
  },
}
</script>

<style>

</style>