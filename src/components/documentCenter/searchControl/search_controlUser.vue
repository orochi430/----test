<template>
  <div class="searchUser">
    <p>{{ metaData.title }}</p>
    <div class="searchOuter">
      <!-- <div class="text elps" :style="`color:${metaData.value == '' ? '#C8C8C8' : '#323233'};`">{{ metaData.value == ""
                ? "请选择" : metaData.value }}</div> -->
      <div class="text" @click="show = true">
        <span v-if="!personData.length">请选择</span>
        <van-tag
          v-else
          closeable
          size="large"
          type="primary"
          @close="closePerson(item, index)"
          v-for="(item, index) in personName"
          :key="item.id"
        >
          {{ item }}
        </van-tag>
      </div>
      <van-button class="color" @click="show = true" size="small"
        >选择</van-button
      >
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      get-container="#app"
    >
      <!-- 暂时无用的参数 :topformMeta="topformMeta" -->
      <controlUserList
        v-if="show"
        ref="userList"
        :extra="metaData.extra"
        :selectType="selectType"
        @getSelectUser="getSelectUser"
        :default-select-array="personData"
        @close="close"
      />
    </van-popup>
  </div>
</template>
<script>
import controlUserList from "@/components/commonForm/controls/controlUserList";
export default {
  name: "searchControlUser",
  components: {
    controlUserList,
  },
  props: ["metaData"],
  data() {
    return {
      personName: [],
      show: false,
      selectType: 0,
      personData: [],
    };
  },
  watch: {
    metaData: {
      handler(val) {
        if (val.value == "") {
          this.personData = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (this.metaData.defaultValue) {
      this.personData = this.metaData.defaultValue;
      this.getSelectUser(this.personData);
    }
    if (this.metaData.control !== "search_controlUser") {
      this.metaData.extra.tabs = this.metaData.extra.tabs.map((item) => {
        if (item.action.indexOf("fn") < 0) {
          const prefix = item.action[0] === "/" ? "fn" : "fn/";
          item.action = `${prefix}${item.action}${item.action.includes("?") ? "&" : "?"}fromList=1&moduleId=${this.$route.params.moduleId}`;
        }
        return item;
      });
    }
    this.selectType = this.metaData.control === "search_controlUser" ? 0 : 1;
  },
  methods: {
    getSelectUser(selectArr) {
      let name = ""; // 选择的名字
      let val = ""; // 选择的ID
      let sch = ""; // 父ID
      let temp1 = [];
      let temp2 = [];
      let temp3 = [];
      for (let cell of selectArr) {
        let id = "";
        if (cell.attrs.idValue) {
          if (cell.attrs.idValue.lastIndexOf("-") > -1) {
            id = cell.attrs.idValue.slice(
              cell.attrs.idValue.lastIndexOf("-") + 1
            ); // 检索的数据 person-id
          } else if (cell.attrs.idValue.lastIndexOf("_") > -1) {
            id = cell.attrs.idValue.slice(
              cell.attrs.idValue.lastIndexOf("_") + 1
            ); // person_id
          } else {
            id = cell.attrs.idValue;
          }
        } else {
          id = cell.id;
        }
        temp1.push(cell.name);
        temp2.push(id);
        if (cell.attrs.idValue) {
          temp3.push(
            cell.type + "::" + (cell.type == "1" ? cell.attrs.pidValue : id)
          );
        }
      }
      this.personName = temp1;
      this.personData = selectArr;
      this.metaData.value = temp1.join(",");
      this.show = false;
    },
    closePerson(item, index) {
      this.personName.splice(index, 1);
      this.personData.splice(index, 1);
      this.metaData.value = this.personData.map((item) => item.name).join(",");
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.searchOuter {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  .text {
    overflow-x: scroll;
    overflow-y: hidden;
    width: 88%;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    padding: 6px 10px;
    color: #c8c8c8;
    white-space: nowrap;
  }

  .text::-webkit-scrollbar {
    display: none;
  }

  .color {
    min-width: 46px;
    width: 11%;
    margin-left: 7px;
    background-color: var(--normal);
    color: #fff;
    border-radius: 2px;
  }
}

::v-deep .van-tag {
  margin-right: 5px;
}
</style>
