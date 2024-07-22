<template>
<div>
  <template v-for="(item, index) in topics">
  <collapseTransition>
  <div class="card" :class="{ 'currentCard':item.conductText=='进行中'&&item.haveRole == 1}" v-show="showAllTopic || item.haveRole == 1" :key="index">
      <div class="topic-item">
          <div class="topic-top" @click="enterTopocsDetail(item)">
              <div class="title top-tit">
                <span>{{ item.title }}</span>
                <span v-if="nextCss">预计：10:00-12:00</span>
              </div>
              <div v-if="!nextCss">
                  <span class="ingtag" :class="{'gray-tag': item.conductText!='进行中'}" v-if="item.conductText">{{ item.conductText }}</span>
                  <span class="sub">汇报人：{{ item.reporter }}</span>
                  <span v-if="!nextCss&&item.conductText!='已结束'">{{ '预计：' + item.startTime + ' ' + item.ytKssj?.substr(11) + '-' + item.ytJssj?.substr(11) }}</span>
                  <span v-if="!nextCss&&item.conductText=='已结束'">{{ '预计：' + item.sjstartTime + ' ' + item.ytSjKssj?.substr(11) + '-' + item.ytSjJssj?.substr(11) }}</span>
              </div>
              <div v-if="item.tag">
                  <span class="type-tag" v-for="tag in item.tag.split(',')" :key="tag">{{ tag }}</span>
                  <span class="type-tag" v-if="item.reportTime">{{ item.reportTime }}min</span>
              </div>
              <div v-if="item.reviewStatus&&!nextCss" class="reviewStatus">
                <img :src="getReviewStatusImg(item.reviewStatus)" alt="">
              </div>
          </div>
          <div class="topic-remind" v-if="!nextCss"></div>
          <div class="topic-file" v-if="item.files&&!nextCss" >
              <div class="title">议题材料</div>
              <div v-for="(file, index) in item.files.slice(0, defaultFileLength)" class="file-item flex as" @click.stop="openFile(file,item)">
                  <img :src="dsf.util.getFileTypeIcon(file.fileName)" alt="">
                  <span>{{ file.fileName }}</span>
              </div>
              <collapseTransition>
                  <div v-show="item.showAllFiles">
                      <div v-for="(file, index) in item.files.slice(defaultFileLength)" class="file-item flex as" @click.stop="openFile(file)">
                          <img :src="dsf.util.getFileTypeIcon(file.fileName)" alt="">
                          <span>{{ file.fileName }}</span>
                      </div>
                  </div>
              </collapseTransition>
          </div>
          <div v-if="item.files && item.files.length > defaultFileLength" @click.stop="showAllFiles(item)" class="arrow" :class="{'down': !item.showAllFiles}">
              <img src="@/assets/imgs/conference/arrow.png" alt="">
          </div>
      </div>
  </div>
  </collapseTransition>
  </template>
</div>
</template>

<script>
import collapseTransition from "./collapseTransition.jsx";
export default {
  components: { collapseTransition },
  props: {
    topics: {
      type: Array,
      default: () => { [] }
    },
    defaultFileLength: {
      type: Number,
      default: 4
    },
    showAllTopic: {
      type: Boolean,
      default: true
    },
    meetingId: {
      type: String
    },
    nextCss: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {

    }
  },
  methods: {
    showAllFiles(topic) {
        topic.showAllFiles = !topic.showAllFiles
    },
    enterTopocsDetail (item) {
      if (item.haveRole == 1) {
        this.$router.push({
            path: `/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/${item.id}`,   
            query: {
              listId: 'MeetingList',
              method: 'viewYt',
              showNodeId: '15',
              validateByList: '1',
              meetingId: this.meetingId,
              checkRole: '1'
            }
        });
      }
    },
    openFile(file,allInfo) {
      if (dsf.config.projectName == 'shandongtong') {
        this.$router.push({
          name: 'meetingPreview',
          params: {
            file,
          },
          query: {
            infoId: allInfo.id,
            title:allInfo.title
          }
        })
      }
      else
        this.$emit('openFile', file);
    },
    getReviewStatusImg(status) {
      switch (status) {
        case '待定':
          return require('@/assets/imgs/conference/pending.png')
        case '通过':
          return require('@/assets/imgs/conference/pass.png')
        case '未通过':
          return require('@/assets/imgs/conference/fail.png')
        default:
          return ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>

.as {
  align-items: flex-start;
}
.ab {
  align-items: baseline;
}
.home {
  font-size: 15px;
}
.flex1 {
  flex: 1;
}
.sub {
    margin-right: 10px;
    font-size: 13px;
    font-weight: normal;
    color: #666666;
}
.type-tag {
    border: 1px solid #4DA4FB;
    border-radius: 19px;
    color: #4DA4FB;
    font-size: var(--font_size_4);
    padding: 3px 5px;
    margin: 0 5px 5px 0;
    display: inline-block;
}
.ingtag {
    padding: 3px 5px;
    background: rgba(0,145,255,0.23);
    border-radius: 4px;
    font-size: var(--font_size_4);
    color: #0075CD;
    margin-right: 6px;
    display: inline-block;
}
.gray-tag {
  background: #D3D3D3;
  color: #fff;
}
.arrow {
    text-align: center;
    margin-top: 10px;
    img {
        width: 12px;
        height: 8px;
        display: inline-block;
    }
    &.down {
        transform: rotate(180deg);
    }
}
.top {
    font-size: var(--font_size_2);
    color: #333333;
    font-weight: 800;
    display: flex;
    align-items: center;
    margin: 10px;
    img {
      width: 20px;
      margin-right: 6px;
    }
  }
.card {
  background: #FFFFFF;
  box-shadow: 0 1px 10px 4px rgba(191,191,191,0.26);
  border-radius: 7px;
  margin: 10px;
  padding: 16px;
  
}
.topic-item {
    .title {
        font-size: 14px;
        font-weight: 600;
    }
    .top-tit{
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        font-size: 14px;
        font-weight: 600;
      }
    }
    .topic-top {
      position: relative;
      &>div:not(:first-child) {
          padding-bottom: 10px;
      }
      &>div:nth-child(2) {
          padding-top: 10px;
      }
      .reviewStatus {
        position: absolute;
        right: 0;
        bottom: 0;
        img {
          height: 60px;
          width: 80px;
        }
      }
    }
    .topic-file {
        padding-top: 10px;
        border-top: 1px solid #e3e3e3;
    }
}
.file-item {
  padding-top: 16px;
  img {
    width: 16px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  span {
    font-size: 15px;
    color: #666666;
    word-break: break-all;
  }
}
</style>