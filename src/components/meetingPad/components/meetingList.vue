<template>
  <div class="meeting-list">
    <div
      v-for="(item, i) in list"
      :key="i"
      :class="{ active: item.id == activeId }"
      :style="{
        marginTop: '0.5rem',
        paddingTop: cardPaddingTop
      }"
      class="meeting-list-item"
      @click="listClick(item)"
    >
      <div class="item-desc">
        <span class="item-desc-tit">{{ item.bt }}</span>
        <span
          :class="{ finish: item.status == '-1' }"
          class="item-desc-status"
          >{{ item.statusText }}</span
        >
      </div>
      <p :style="{ paddingBottom: cardBottom }">{{ item.meetingType }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MeetingList",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    activeId: {
      type: String,
      default: ""
    },
    cardBottom: {
      type: String,
      default: "1rem"
    },
    cardPaddingTop: {
      type: String,
      default: "1rem"
    }
  },
  data() {
    return {};
  },
  methods: {
    listClick(item) {
      this.$emit("updateAcitve", item);
    }
  }
};
</script>
<style scoped lang="scss">
.meeting-list {
  height: 100%;
  overflow: auto;
  padding: 20px 70px 20px 16px;

  .meeting-list-item {
    cursor: pointer;
    padding-top: 50px;
    border-radius: 14px;

    &.active {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 2px;

      p {
        border: none;
      }
    }

    .item-desc {
      display: flex;
      justify-content: space-between;
      padding: 0 60px;

      .item-desc-tit {
        font-size: 44px;
        color: #333333;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .item-desc-status {
        padding: 12px 20px;
        color: rgb(219, 83, 82);
        background-color: rgb(251, 237, 237);
        border: 1px solid rgb(228, 127, 127);
        min-width: 78px;

        &.finish {
          color: #909399;
          background: #f4f4f5;
          border-color: #d3d4d6;
        }
      }
    }

    p {
      font-size: 40px;
      color: #666666;
      margin-top: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 60px;
      padding-bottom: 50px;
      border-bottom: 1px solid #dcdcdc;
    }
  }
}
</style>
