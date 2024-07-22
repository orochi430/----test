<template>
<div>
    <!-- <van-sticky :offset-top="oppsetTop ? oppsetTop : isShowAppHeader?'0.92rem':'0'" v-if="isShowSearchBox">
        <van-search v-model="keyword" sticky :show-action="!dsf.config.commonList || !dsf.config.commonList.isFideFilterIcon" placeholder="时间搜索" @focus="showPicker = true">
            <template #action>
                <van-icon name="static/assistant/filter.png" @click="showPicker = true" size="0.48rem" style="vertical-align: middle"/>
            </template>
        </van-search>
    </van-sticky> -->
    <div v-if="params && params.topRemark" class="topRemark">{{params.topRemark}}</div>
    <div v-if="allTab" class="allTab">
      <span class="choose"><span @click="showPicker = true">{{chooseTime.text}}<van-icon name="arrow-down" /></span></span>
      <span> <span class="tabIndex">{{clickTabIndex}}</span> / {{allTab}}</span>
    </div>
    <!-- <div v-if="title" class="title">{{title}}</div> -->
    <DsfListTable :columns="columns" :data="data" :show-default="showDefault" :showSlider="true" :adjoinGrey="true" :tbHighLight="true" :title="title" :tableHeader="tableHeader" :showOrder="!!params.showOrder"></DsfListTable>
    <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
    <van-popup get-container="#app" v-model="showPicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="selectColumns"
        @confirm="changeFn"
        @cancel="showPicker = false"
      />
    </van-popup>
</div>
</template>

<script>
import { mapState } from 'vuex'
import DsfListTable from "./listTable";
export default {
  components: { DsfListTable },
  props: [
    "oppsetTop",
    "params",
    "clickTabIndex",
    "allTab"
  ],
  data() {
    return {
    //   isShowSearchBox: true,
      keyword: "",
      columns: [],
      data: [],
      showDefault: [],
      showPicker: false,
      chooseTime: '',
      loading: true,
      title: '',
      selectColumns: [],
      tableHeader: []
    }
  },
  computed: {
    // selectColumns() { // 可选择前12个月
      
      
    // },
    // selectColumns() {
    //   let arr = []
    //   let nowYear = new Date().getFullYear()
    //   let nowMonth = new Date().getMonth()
    //   for(let i=nowMonth; i>0; i--) {
    //     arr.push(`${nowYear}-01至${nowYear}-${i >= 10 ? i : '0'+i}`)
    //   }
    //   arr.push(`${nowYear-1}-01至${nowYear-1}-12`)
    //   return arr
    // },
    fileType() {
      return this.$route.query.fileType || this.params.params.fileType
    },
    ...mapState({
      isShowAppHeader: state => state.isShowAppHeader
    }),
    isShowSearchBox() {
        return this.$route.query.timeFilter
    }
  },
  async created() {
    await this.getSelectColumns()
    this.chooseTime = this.selectColumns[0]
    this.init();
  },
  methods: {
    getSelectColumns() {
      if(!this.params.url) {
        let dataArr = [];
        let data = new Date();
        let year = data.getFullYear();
        let nowMonth = new Date().getMonth()
        data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
        for (let i = 0; i < 12 + nowMonth + 1; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            let m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            dataArr.push({text: data.getFullYear() + "年" + (m) + "月", value: `${data.getFullYear()}-${m}`})
        }
        this.selectColumns = dataArr
      } else {
        return dsf.http.post(this.params.url).then(res => {
          if(res.data.code == 200) {
            this.selectColumns = res.data.data
          }else {
            this.selectColumns = []
          }
        })
      }
    },
    changeFn(val){
        console.log(val)
        this.chooseTime = val
        this.showPicker = false
        this.init()
    },
    init() {
        let params = {
            type: this.fileType
        }
        if(this.chooseTime){
            params.from = `${this.chooseTime.value.slice(0, 4)}-01`
            params.to = `${this.chooseTime.value.slice(0, 4)}-${this.chooseTime.value.slice(5, 7)}`
        // }else if(this.isShowSearchBox) {
        //     params.from = this.selectColumns[0].value.split('至')[0]
        //     params.to = this.selectColumns[0].value.split('至')[1]
        }
        this.loading = true
        dsf.http.post('ctrl/news/tableList',params).then(res => {
            this.columns = res.data.showColumn
            this.data = res.data.datas
            this.showDefault = res.data.showDefault
            this.tableHeader = res.data.tableHeader || []
            this.title = res.data.title
        }).error(e => {
          dsf.layer.toast('系统出错，请再次尝试')
        }).always(() => {
          this.loading = false
        })
    },
    onSearch() {
      this.init();
    },
  }
}
</script>
<style lang='scss' scoped>
.topRemark {
  background-color: #fff;
  text-align: center;
  padding-top: 6px;
}
.allTab {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: var(--font_size_2);
  padding: 10px 16px;
  align-items: center;
  .choose {
    background-color: #fff;
    padding: 4px 10px;
    border-radius: 30px;
    flex: 1;
    text-align: center;
  }
  .tabIndex {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    background-color: #ddd;
  }
}
.title {
  font-size: 18px;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>