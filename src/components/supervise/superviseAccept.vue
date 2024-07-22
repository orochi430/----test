<template>
  <div class="supervise pd0-20">
    <template v-if="list.length > 0">
      <div class="" v-for="(item, index) in list" :key="index">
        <div class="supervise-cls pdtb">{{item.key === "1" ? '主办单位' : '协办单位'}}</div>
        <li class="pd20-10" v-for="(subitem, subindex) in item.data" :key="subindex">
          <div class="supervise-box">
            <div class="supervise-title" v-if="subitem.dutyUnit">{{subitem.dutyUnit}}</div>
            <div class="supervise-line pt10">
              <span class="linespan" v-if="subitem.orgLevelText">机构类型：{{subitem.orgLevelText}}</span>
              <span class="linespan" v-if="subitem.leader">机构负责人：{{subitem.leader}}</span>
            </div>
            <template v-if="subitem.isAccept === '1'">
              <div class="supervise-line pt10">
                <span class="linespan" v-if="subitem.underTaker">承办人：{{subitem.underTaker}}</span>
                <span class="linespan" v-if="subitem.utTel">联系方式：{{subitem.utTel}}</span>
              </div>
            </template>
            <div class="supervise-line displayflex pt10">
              <span v-if="subitem.isAccept === '1'">接收时间：{{subitem.acceptDate}}</span>
              <span v-else></span>
              <div class="idea-cus-button" :class="subitem.isAccept==='1'?'idea-cus-primary':'idea-cus-warning'">{{subitem.isAccept === "1" ? "已接收" : "未接收"}}</div>
            </div>
          </div>
        </li>
      </div>
    </template>
    <commonempty v-else description="暂无数据" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      id: this.$route.query.id || '',
    }
  },
  methods: {
    getArryMegre(data, keyValue) {
      const keySet = new Set(data.map(item => item[keyValue]))
      return Array.from(keySet).map(v => {
        return {
          key: v,
          data: data.filter(item => item[keyValue] === v)
        }
      })
    },
    getDataList () {
      dsf.http.get('/ctrl/superviseV6/m/undertake/info?id=' + this.id).then(data => {
        let res = data.data || {}, result = res.data || {}, ary = [];
        if (res.type === 'success') {
          for (let i in result) {
            ary.push(...result[i])
          }
          this.list = this.getArryMegre(ary, 'taskType');
        }
      })
    }
  },
  mounted () {
    this.getDataList()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.pd0-20{
  padding: 0 20px;
}
.pdtb{
  padding: 10px 0;
}
.pd20-10{
  padding: 20px 10px;
}
.pt10{
  padding-top: 10px;
}
.pl20{
  padding-left: 20px;
}
.idea-cus-button{
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 550;
  font-size: var(--font_size_3);
}
.idea-cus-warning{
  background-color: #FCEDED;
  color: #E45555;
  border: 1px solid #F1A7A7;
}
.idea-cus-primary{
  background-color: #E9FAF8;
  color: #2CD4BB;
  border: 1px solid #8CE7D9;
}
.displayflex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.supervise{
  margin-bottom: 20px;
  .supervise-cls{
    font-size: 18px;
    @include font-theme("normal")
  }
  li{
    box-shadow: 0px 0px 4px 1px rgba(204,204,204,0.5);
    background-color: #fff;
    border-radius: 8px;
    .supervise-title{
      color: #333;
      font-weight: 600;
      font-size: 18px;
    }
    .supervise-line{
      font-size: var(--font_size_3);
      color: #666666;
      display: flex;
      .linespan{
        display: inline-block;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &+li{
      margin-top: 20px;
    }
  }
}
</style>
