<template>
  <div class="DYzhuanshouwen">
    <van-popup
      v-model="show"
      closeable
      :style="{ width: '76vw' }"
      @close="show = false"
    >
      <div class="title">请选择一个文件作为正文</div>
      <select v-model="id">
        <option
          v-for="item in optionData"
          :key="item.fileId"
          :value="item.fileId"
        >
          {{ item.fileName }}
        </option>
      </select>
      <div class="btn">
        <button @click="handle">确定</button>
        <button @click="show = !show">取消</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import dsf from "../../common";
export default {
  name: "DYzhuanshouwen",

  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {},
    },
    formParams: {
      type: Object,
      default: {},
    },
  },
  components: {},
  data() {
    return {
      show: true,
      optionData: [
        {
          fileId: 0,
          fileName: "请选择",
        },
      ],
      id: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.show = false;
      this.$emit("closeCallback", this.value);
    },
    handle() {
      if (!this.id) {
        dsf.layer.toast("请选择文件。");
        return;
      }
      dsf.http
        .post("/fn/notepaper/emailConvertLw", {
          emailId: this.formParams.pk,
          fileId: this.id,
          sourceModule: this.formParams.moduleId,
        })
        .then((result) => {
          this.close();
          if (result.data.type == "success") {
            this.$router.push({path:`/commonForm/${result.data.data.moduleId}/${result.data.data.lwId}`});
          } else {
            dsf.layer.toast(result.data.message);
          }
        });
    },
  },
  created() {
    var nodeId = this.metaData.parameters.nodeId;
    if (!"00Pag78Npnfozf7" == nodeId) {
      dsf.layer.toast("该邮件未收，不可转收文。");
      this.show = false;
      this.$emit("closeCallback", this.value);
      return;
    }
    dsf.http
      .post("/fn/notepaper/getAllFileByEmailId", {
        pk: this.formParams.pk,
        table: "g_notepaper",
      })
      .then((data) => {
        console.log("data", data);
        if (data.data.code == 200) {
          if (data.data.data.length != 0) {
            const arr = [
              {
                fileId: 0,
                fileName: "请选择",
              },
            ];
            data.data.data.forEach((item) => {
              arr.push({ fileId: item.fileId, fileName: item.fileName });
            });
            this.optionData = arr;
          }
        } else {
          dsf.layer.toast(data.data.message);
        }
      });
  },
  mounted() {},
  destroyed() {},
};
</script>

<style scoped lang='scss'>
.DYzhuanshouwen {
  .title {
    padding: 15px 10px;
    border-bottom: 1px px solid #eee;
    background-color: #f8f8f8;
    font-size: var(--font_size_3);
    color: #333;
  }
  select {
    margin: 15px auto 0;
    text-align: center;
    display: block;
    width: 50vw;
    height: 30px;
    border: 1px solid #333;
    border-radius: 5px;
  }
  select::after,
  select::before {
    box-sizing: border-box;
  }
  .btn {
    text-align: right;
    padding: 0 0.4rem 0.24rem;
    padding-top: 0.2rem;
    button:first-child {
      border-color: #1e9fff;
      background-color: #1e9fff;
      color: #fff;
      height: 28px;
      line-height: 28px;
      margin: 5px 5px 0;
      padding: 0 15px;
      border: 1px solid #dedede;
      /* background-color: #fff; */
      /* color: #333; */
      border-radius: 2px;
      font-weight: 400;
      cursor: pointer;
      text-decoration: none;
    }
    button:last-child {
      height: 28px;
      line-height: 28px;
      margin: 5px 5px 0;
      padding: 0 15px;
      border: 1px solid #dedede;
      background-color: #fff;
      color: #333;
      border-radius: 2px;
      font-weight: 400;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>