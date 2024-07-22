<template>
  <div class="ds-signinlist">
    <van-search v-model="keyword" placeholder="搜索" @search="onSearch" />
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        :finished="finished"
        :finished-text="finishedTips"
        v-model="loading"
        :offset="10"
        @load="onLoad"
      >
        <DsList :data="data" :columns="columns" @mainClick="handleActionClick" @commonClick="handleActionClick" />
      </van-list>
    </van-pull-refresh>
     <!--分阅弹窗-->
    <separate-read v-if="showFyyj" ref="readPop" />
  </div>
  
</template>
<script>
import DsList from '@/components/documentCenter/DsList';
import ButtonActions from '@/components/todoCenter/TodoCenter.mixin';
import SeparateRead from "@/components/selectPerson/SeparateRead";
export default {
  components: {
    DsList,SeparateRead
  },
  mixins: [ButtonActions],
  data() {
    return {
      data: [],
      columns: [],
      keyword: '',
      finished: false,
      loading: false,
      isLoading: false,
      finishedTips: '',
      start: 1,
      listButtons: [],
      showFyyj:false
    }
  },
  methods: {
    onSearch() {
      this.onRefresh();
    },
    fetchData() {
      dsf.http.post('fn/list/200517221440muOZO3Y4RodwxFvhCKU/mobile/q?moduleId=2001131007187DmPkCTl0HFmPhHOk1c', {
        limit: 15,
        _content: this.keyword,
        start: this.start,
        page: this.start,
      }).then(({ status, data }) => {
        const { showColumn, datas = [], total, listButtons } = data;
        if(status === 200) {
          this.start += 1;
          this.data = [...this.data, ...datas];
          this.listButtons = listButtons || {};
          this.columns = showColumn || [];
          if (datas == null || this.data.length === total || datas.length === 0 || datas.length < 15) {
            // 加载结束
            this.finished = true
          }
          if(datas.length < this.start){
            if(datas == null || datas.length === 0){
              if(this.start === 0){
                this.finishedTips = '暂无数据';
              }else{
                this.finishedTips = '';
              }
            }else{
              this.finishedTips = '';
            }
          }
        } else {
          this.dsf.layer.toast(message);
          this.finished = true;
          this.finishedTips = message;
        }
      }).catch(({ message }) => {
        this.finished = true;
        this.dsf.layer.toast(message);
        this.finishedTips = message;
      }).finally(() => {
        this.loading = false;
        this.isLoading = false;
      });
    },
    onLoad() {
      /**
     * 上拉加载
     */
      this.fetchData()
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.data = [];
      this.start = 1;
      this.fetchData();
    },
    handleActionClick() {
      const action = arguments[0];
      const fn = this[`action-${action}`] || function() {};
      fn(...Array.prototype.slice.call(arguments, 1) );
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
