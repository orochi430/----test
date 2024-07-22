<template>
  <div class="container">
    <van-collapse v-model="activeNames">
      <template v-for="(org, o) in list">
        <van-collapse-item
          v-if="org.groupType === 1"
          :name="`item_${o}`"
          :key="o"
          :title="org.orgName"
        >
          <van-cell
            v-for="(item, index) in org.users"
            :key="index"
            :class="{ active: item.userId == activeId }"
            :title="item.name"
            :value="item.zwText"
            center
            @click="clickItem(item, index)"
          >
            <template #icon>
              <img
                :src="dsf.url.getWebPath(item.img)"
                :onerror="default_avatar"
                class="avatar"
                alt=""
              />
            </template>
          </van-cell>
        </van-collapse-item>
        <div v-else :key="o">
          <van-cell
            v-for="(item, index) in org.users"
            :key="index"
            :class="{ active: item.userId == activeId }"
            :title="item.name"
            :value="item.zwText"
            center
            @click="clickItem(item, index)"
          >
            <template #icon>
              <img
                :src="dsf.url.getWebPath(item.img)"
                :onerror="default_avatar"
                class="avatar"
                alt=""
              />
            </template>
          </van-cell>
        </div>
      </template>
    </van-collapse>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      default_avatar:
        'this.src="' + require("static/images/meetingPad/avatar.png") + '"',
      activeId: 0,
      activeNames: []
    };
  },
  watch: {
    list: {
      deep: true,
      handler(nVal) {
        this.activeNames = [];
        nVal.forEach((item, index) => {
          this.activeNames.push(`item_${index}`);
        });
      }
    },
    defaultId: {
      immediate: true,
      handler(newV) {
        if (newV) this.activeId = this.defaultId;
      }
    }
  },
  methods: {
    clickItem(item, index) {
      this.activeId = item.userId;
      this.$emit("clickItem", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar {
  width: 98px;
  height: 98px;
  padding: 0 40px;
  border-radius: 50%;
  box-sizing: content-box;
}
.active {
  background-color: #f7f8fa;
}
</style>
