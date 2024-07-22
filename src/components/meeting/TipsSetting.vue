<template>
  <div class="ds-tips">
    <!-- <van-nav-bar fixed title="日程提醒" left-arrow @click-left="back" /> -->
    <div class="setting">


      <van-cell class="none-tips" value="无提醒" @click="noneTips">
        <template #right-icon v-if="isnonetips">
          <van-icon name="success" color="#5094F3" style="line-height: inherit;" />
        </template>
      </van-cell>

      <van-cell-group class="none-tips">
        <van-cell class="cell-choose" :class="item.ischecked ? 'active' : ''" v-for="(item, index) in tipsdata"
          :value="item.name" :key="item.id" @click="secMultiple(index)">
          <template #right-icon v-if="item.ischecked">
            <van-icon name="success" color="#5094F3" style="line-height: inherit;" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell title="提醒方式" class="none-tips">
        <template #default>
          <div class="tabs-card">
            <div v-for="(item, index) in tipstype" :class="curr==index ? 'active' : ''" @click="changeTab(index)">
              <span>{{item}}</span></div>
          </div>
        </template>
      </van-cell>

      <div class="bf">
        <van-button type="primary" @click="sure">确定</van-button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'TipsSetting',
    data() {
      return {
        tipsdata: [{
            "id": "1",
            "name": "开始时",
            "ischecked": false
          },
          {
            "id": "2",
            "name": "5分钟前",
            "ischecked": false
          },
          {
            "id": "3",
            "name": "15分钟前",
            "ischecked": true
          },
          {
            "id": "4",
            "name": "30分钟前",
            "ischecked": false
          },
          {
            "id": "5",
            "name": "1小时前",
            "ischecked": false
          },
          {
            "id": "6",
            "name": "1天前",
            "ischecked": false
          }
        ],
        tipstype: ["应用内", "短信", "电话"],
        curr: 0,
        sectype: '',
        isnonetips: false,
        lastData: '', //传给父组件的结果
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      secMultiple(index) {
        this.isnonetips = false
        this.tipsdata[index].ischecked = !this.tipsdata[index].ischecked;
      },
      changeTab(index) {
        this.curr = index;
        // this.sectype = this.tipstype[index] + "提醒"
      },
      noneTips() {
        this.isnonetips = !this.isnonetips
        this.tipsdata.forEach(element => {
          element.ischecked = false
        });
      },
      sure() {
        this.lastData = "";
        if (this.isnonetips) {
          this.lastData = "无提醒";
        } else {
          this.tipsdata.forEach((element, index) => {
            if (element.ischecked) {
              if (this.lastData == "") {
                this.lastData = this.tipsdata[index].name
              } else {
                this.lastData += "," + this.tipsdata[index].name
              }
            }
          });
          if (this.lastData == "") {
            this.lastData = this.tipstype[this.curr] + "提醒";
          } else {
            this.lastData += "," + this.tipstype[this.curr] + "提醒";
          }
        }
        console.log(this.lastData)
        this.$emit("getData", this.lastData)
      }
    }
  }

</script>

<style lang="scss">
  .ds-tips {

    /* .setting {
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 0;
    } */
    .setting {
      background-color: #f2f2f2;
    }

    .bf {
      background-color: #fff;
      width: 100%;
      position: relative;

      .van-button {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 36px;
        line-height: 36px;
      }
    }

    .none-tips {
      /* border-top: 15px solid #f2f2f2; */
      margin-bottom: 15px;
    }

    .van-cell__title {
      padding-left: 0 !important;
    }

    .cell-choose {
      &.active {
        color: #5B9BF4;
      }
    }

    .tabs-card {
      display: flex;
      width: 170px;
      box-sizing: border-box;
      height: 28px;
      line-height: 28px;
      border: 1px solid #5B9BF4;
      border-radius: 2px;
      text-align: center;

      div {
        /* padding: 0 11px; */
        flex: 1;
        color: #5B9BF4;
        border-right: 1px solid #5B9BF4;

        &.active {
          color: #fff;
          background-color: #5094F3;
        }

        &:last-child {
          border-right: none;
          /* padding-right: 13px; */
        }
      }
    }
  }

</style>
