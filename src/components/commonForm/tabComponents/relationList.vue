<template>
<div>
  <div class="relation-list">
    <div class="relation-type" v-for="type in list" :key="type.relaValue" :style="{padding: isControl ? `${dsf.config.commonForm.controlPadding || '0.3rem'} 0` : '0.2rem'}">
      <template v-if="type.canShow">
        <div  class="type-name" :style="{fontWeight: isControl ? 'normal' : 'bold'}">
          <span :class="[`size-${dsf.config.commonForm.fontLevel ? dsf.config.commonForm.fontLevel : 3}`]"><span v-if="metaData && metaData.showLabel">{{type.name}}</span></span>
          <van-icon class="fileIcon" size="0.42rem" name="add-o" v-if="type.canEdit > 0" @click="showList(type.fileRelaId)"/>
        </div>
        <div class="fileList" v-for="(item, index) in type.document" :key="item.info_id" @click="toDtail(item)">
          <div class="fileBody flex1">
            <div class="fileTitle flex ac">
              <img src="static/images/platform/relation.png" alt="">
              <span class="ellipsis" style="flex: 1">{{ item.itemsContents }}</span>
              <i class="iconfont iconguanbi1" v-if="type.canEdit > 0" @click.stop="delRelation(item, index, type.document)"></i>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <van-popup v-model="show" position="bottom" :style="{ height: '100%' }" :get-container="'#app'">
    <default-list :params='params' :checkable="checkable" :oppsetTop="oppsetTop" :checkIds="relaIds" @cancelCheck="show=false" @confirmCheck="confirmRelation"></default-list>
  </van-popup>
  <van-popup v-model="showForm" position="bottom" :style="{ height: '100%' }" :get-container="'#app'">
    <van-nav-bar title="关联文件" @click-left="showForm = false">
        <template #left>
            <van-icon name="arrow-left" /><span>返回</span>
        </template>
    </van-nav-bar>
    <common-form v-if="showForm" :_moduleId="relaForm.moduleId" :_pk="relaForm.pk" :_params="relaForm.params || {}" :isPop="true"></common-form>
  </van-popup>
</div>

</template>

<script>
import dsfFab from "@/components/dsfFab/dsfFab";
import dsfFabItem from "@/components/dsfFab/dsfFabItem";
import defaultList from "../../documentCenter/DefaultList"
import { Dialog } from "vant";
  export default {
    name: 'announcement',
    components:{
      Dialog,
      defaultList,
      dsfFab,
      dsfFabItem,
      commonForm: () => import('@/components/commonForm/commonForm'),
    },
    props:["relationList","parameters","isControl","metaData"],
    data(){
        return {
          list: this.relationList,
          value: '',
          data:{},
          obj_hei:{height:''},
          show: false,
          checkable: true,
          oppsetTop: '0px',
          activeIcon: "add", //icon-jiahao
          fabIcon: "add", //icon-gengduo
          params:{
            moduleId: null,
            infoId: null,
            fileRelaId: 0
          },
          relaIds: [],
          relaForm: {},
          showForm: false
        }
  },
    beforeCreate() { // 组件之间循环引用
      this.$options.components.commonForm = require('@/components/commonForm/commonForm').default
    },
    created(){
      this.params.moduleId = this.$route.params.moduleId
      this.params.infoId = this.parameters.pk
    },
    computed:{
    },
    watch:{
      'params.fileRelaId'(newVal, oldVal){
        if(newVal != 0) {
          this.relaIds = this.list.find(item => item.fileRelaId == newVal).document.map(item => item.pk)
        }
      },
      relationList(newVal, oldVal) {
        this.list = newVal
      }
    },
    methods: {
      getList(){
        dsf.http
          .get("fn/mobileRelationFile/getFormRelationFiles", {
              pk: this.parameters.pk,
              moduleId: this.$route.params.moduleId,
              nodeId: this.parameters.nodeId,
              flowId: this.parameters.flowId
          })
          .then((res) => {
              this.list.forEach((item, index) => {
                this.list.splice(index, 1, res.data.rows.find(row => item.fileRelaId == row.fileRelaId))
              })
          });
      },
      toDtail(obj){
        this.showForm = true
        this.relaForm = {
          moduleId: obj.moduleId,
          pk: obj.info_id,
          params: {
            relaId: obj.relaId,
            isShowRela: obj.isShowRela
          }
        }
      },
      showList(fileRelaId) {
        let self = this
        function saveCallback() {
          if (self.metaData&&window[self.metaData.metaId + "_beforeOpenCode"]) {
            window[self.metaData.metaId + "_beforeOpenCode"](fileRelaId,self.parameters, self.metaData,self);
            return;
          }
          self.params.fileRelaId = fileRelaId
          self.show = true
        }
        // 是否通过关联文件生成本类文件
        if (self.list.find(it => it.fileRelaId == fileRelaId).isCreatenew == 1) {
          self.$bus.emit("saveFormBus", {
              metaData: self.metaData,
              callback: saveCallback,
              isTemp: true
          });
        } else {
          saveCallback()
        }
      },
      confirmRelation(list, relaMode){
        const relaIdArr = list.map(item => item.dataValue.relaId)
        const relaModuleIdArr = list.map(item => item.dataValue.relaModuleId)
        // 是否通过关联文件生成本类文件
        if (this.list.find(it => it.fileRelaId == this.params.fileRelaId).isCreatenew == 1) {
          if (list.length > 1) {
            dsf.layer.toast('关联个数不能超过1个')
            return
          }
          dsf.layer.loading()
          dsf.http.post('fn/filerelation/select/updateInfo', {
            fromPk: relaIdArr.join(','),
            toPk: this.parameters.pk,
            fromModule: relaModuleIdArr.join(','),
            toModule: this.parameters.moduleId,
          }).then(res => {
            if (res.data.code == 200) {
              dsf.layer.clear()
              if (!this.$route.params.pk) { // 拟稿情况下先将路由替换成带pk的
                this.$router.replace({
                  path: `/commonForm/${this.parameters.moduleId}/${this.parameters.pk}`,
                  query: this.$route.query
                })
              } else {
                this.show = false
                this.$bus.emit("refreshFormBus");
              }
            } else {
              dsf.layer.toast(res.data.message)
            }
          })
        } else {
          dsf.http.post('fn/mobileRelationFile/save', {
            relaMode: relaMode,
            relaIds: relaIdArr.join(','),
            pk: this.parameters.pk,
            moduleId: this.$route.params.moduleId,
            fileRelaId: this.params.fileRelaId
          }).then(res => {
            this.getList()
            this.params.fileRelaId = 0 // 下次打开列表将重新渲染数据
            // 新增关联文件触发函数
            this.$bus.emit("relationListAdd", {metaData: this.metaData, list});
          })
          this.show = false
        }
      },
      delRelation(item, index, document){
        Dialog.confirm({
          message: '是否确认不再关联该文件',
        })
          .then(() => {
            // on confirm
            console.log(item)
            dsf.http.post('fn/mobileRelationFile/delete',{
              pk: this.parameters.pk,
              moduleId: this.$route.params.moduleId,
              fileRelaId: item.fileRelaId,
              fileId: item.fileId
            }).then(res => {
              document.splice(index, 1)
              this.params.fileRelaId = 0 // 下次打开列表将重新渲染数据
            })
          })
          .catch(() => {
            // on cancel
          });
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.isStatus{
  position:absolute;
  left:6px;
  top:6px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #13C940;
  display: inline-block;
}
.announcementbox{
  width:100%;
  height:100%;
}
.fc{
  display:flex;
  flex-direction: column;
}
.flex1{
  flex:1;
}
.verticalScroll{
  overflow-y:scroll;
  overflow-x: hidden;
}

.delRelation{
  position: absolute;
  top: 5px;
  right: 5px;
  .iconfont{
    font-size: 26px;
  }
}
.relation-list {
  padding: 0 0.2rem;
  background-color: #fff;
  .relation-type {
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 10px;
    &:last-child {
      border-bottom: 0;
    }
    .type-name {
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      font-weight: bold;
      align-items: center;
      >span{
        line-height: 24px;
      }
      .fileIcon {
        @include font-theme('normal');
      }
    }
    .fileList{
        padding-top: 10px;
      .fileTitle {
        font-size: var(--font_size_2);
        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-right: 5px;
        }
        .iconfont {
          color: #999999;
          font-size: var(--font_size_2);
        }
      }
      .fileModule {
        display: flex;
        color: #999;
        padding-top: 10px;
        .fileBtn {
          flex: 1;
        }
      }
    }
    .fileBtn{
      text-align: right;
      .fileButton{
        display:inline-block;
        // width:48px;
        margin:0 0.04rem;
        text-align: center;
        border-radius:0.48rem;
        border:1px solid #e5e5e5;
        white-space:nowrap;
        padding:0 0.2rem;
        font-size: var(--font_size_4);
        line-height: 0.42rem;
      }
    }
  }

}
.size-1 {
        font-size: var(--font_size_3);
        // font-weight: 500;
    }

    .size-2 {
        font-size: 0.3rem;
        // font-weight: 600;
    }

    .size-3 {
        font-size: var(--font_size_2);
        // font-weight: 700;
    }

    .size-4 {
        font-size: var(--font_size_1);
        // font-weight: 700;
    }

    .size-5 {
        font-size: 0.36rem;
        // font-weight: 700;
    }
</style>


