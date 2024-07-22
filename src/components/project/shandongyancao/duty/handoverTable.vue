<template>
<div>
    <div class="allTab">
      <span class="choose" @click="previous = 1">上月</span>
      <span class="choose" @click="previous = null">本月</span>
    </div>
    <!-- <div v-if="title" class="title">{{title}}</div> -->
    <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
    <template v-else>
      <DsfListTable :columns="columns" :data="data" :show-default="showDefault" :tbHighLight="true"></DsfListTable>
      <commonempty v-if="data.length == 0" />
    </template>
</div>
</template>

<script>
import DsfListTable from "@/components/documentCenter/DsfListTable";
export default {
  components: { DsfListTable },
  data() {
    return {
    //   isShowSearchBox: true,
      keyword: "",
      columns: [{
            "showCategory": "subTitleA",
            "showName": "值班签到时间",
            "showMetaColumn": "handoverTime",
        },
        {
            "showCategory": "subTitleA",
            "showName": "值班人",
            "showMetaColumn": "nextDutyUserName",
        }],
      data: [],
      showDefault: [],
      showPicker: false,
      chooseTime: '',
      loading: true,
      previous: null
    }
  },
  computed: {
    
  },
  watch: {
    previous: {
      handler(nv) {
        this.init()
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
        this.loading = true
        dsf.http.post('ctrl/DutyForMobiles/dutyHandoverQuery',{previous: this.previous}).then(res => {
          if(res.data.code == 200) {
            this.data = res.data.data.map(item => {return {dataValue: item}})
          }
        }).error(e => {
          dsf.layer.toast('系统出错，请再次尝试')
        }).always(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
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
  padding: 10px 60px;
  align-items: center;
  .choose {
    background-color: #fff;
    padding: 4px 10px;
    flex: 1;
    text-align: center;
    border: 1px solid;
    @include border-color-theme('normal');
    &:first-child {
      border-radius: 30px 0 0 30px;
    }
    &:last-child {
      border-radius: 0 30px 30px 0;
    }
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