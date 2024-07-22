<template>
<div>
  <van-dialog v-model="isShow" :title="title" show-cancel-button @cancel="$emit('update:show', false)" @confirm="confirm">
    <div style="padding: 0.2rem 0.32rem;">
      <span v-for="(item, index) in breadcrumb" :key="item.id" @click="to(index)">{{ item.name }}/</span>
    </div>
    <div style="min-height: 1rem">
      <template v-for="(file,index) in folders">
        <div :key="index" class="file" @click="link(file)">
          <div class="typeIcon">
              <img src="static/images/fileType/folder.png" alt="" />
          </div>
          <div class="info">
              <div v-if="file.type == 'folder'">
                  <div class="title">{{ file.name }}</div>
              </div>
          </div>
      </div>
      </template>

    </div>
  </van-dialog>
</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "focus"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      breadcrumb: [{name: `全部${dsf.config.setting['SYS-MOBILE-LIST-0005'] || '收藏'}`, id: 0}], //面包屑
      folders: [],
      isShow: true
    }
  },
  computed: {
    title() {
      return this.type == 'move' ? '移动到目录' : `${dsf.config.setting['SYS-MOBILE-LIST-0005'] || '收藏'}到目录`
    },
  },
  created() {
    this.getFiles()
  },
  methods: {
    uncode(str) {
        return str.replace(/&#(x)?([^&]{1,5});?/g, function (a, b, c) {
            return String.fromCharCode(parseInt(c, b ? 16 : 10));
        })
    },
    getFiles() {
        let self = this;
        self.folders = []
        // if (self.$route.params.folderid || self.$route.params.driveType) {
        let url = `fn/myFavorite/list`;
        dsf.http.post(url, {
            isDirectory: '1',
            dataId: self.breadcrumb[self.breadcrumb.length -1].id ,
            key: ""
        }).then(res => {
            // console.log(result);
            if (res.data.code == "200") {
                let result = res.data.data.data
                result.forEach(element => {
                    element.name = self.uncode(element.name)
                    if (element.isDirectory == 1) {
                        element.type = "folder"
                        self.folders.push(element)
                    }
                });
                // self.files = result.filter(item => item.type != undefined);
            }
        }).error(error => {
            self.errored = true;
        }).always(() => {
            dsf.layer.closeLoading(self.loading);
        });
    },
    link(item) {
      this.breadcrumb.push(item);
      this.getFiles()
    },
    to(index) {
      this.breadcrumb.splice(index+1)
      this.getFiles()
    },
    confirm() {
      this.$emit('update:show', false)
      this.$emit('confirmChoose', this.breadcrumb[this.breadcrumb.length-1].id)
    }
  }
}
</script>
<style lang='scss' scoped>
.file {
    padding: 0.32rem 0.4rem;
    background-color: #fff;
    display: flex;

    .typeIcon {
        width: 0.6rem;
        height: 0.5rem;
        margin-right: 0.4rem;
        position: relative;

        ::v-deep .van-badge {
            position: absolute;
            top: 0;
            right: -4px;
        }
    }

    .info {
        flex: 1;
        padding-top: 8px;

        .num {
            font-size: var(--font_size_4);
            color: #999;
            padding-top: 0.1rem;
        }
    }
}
</style>
