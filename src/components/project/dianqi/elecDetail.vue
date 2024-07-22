<template>
  <div ref="elecDetail">
    <div class="detail">
      <div class="title" v-html="news.title"></div>
      <div class="time">
        <van-row>
          <van-col>作者：{{ news.publisher }}</van-col>
          <van-col class="releData">发布日期：{{ news.time }}</van-col>
        </van-row>
      </div>
      <div class="content" v-html="news.content" :style="{ fontSize: fontSize + 'rem' }"></div>
      <div class="fujian">相关附件({{ counts }})</div>
      <div class="file" v-for="file in news.attachFile" :key="file.fileId" @click="filePre(file)">
        <img src="@/assets/imgs/attacIcon.png" alt="" />
        <span>{{ file.fileName }}</span>
      </div>
    </div>
    <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      fontSize: 0.32,
      loading: true,
      news: {
        title: null,
        time: null,
        viewsCount: null,
        image: null,
        content: null,
        publisher: null,
        files: null,
        images: null,
      },
      counts: 0,
      imgPreview: false,
      previewImg: [],
    };
  },
  created() {

    dsf.url.setTitle(" ");
    if (!this.$route.params?.data) {
      dsf.http.post('/fn/newscontent/detail', {
        id: this.$route.query.id,
      }).then(val => {
        console.log(val);
        this.news = val.data.data;
        this.counts = val.data.data.attachFile.length
      })
    }
    else {
      this.getNewsDetail();
    }
  },
  mounted() {

  },
  methods: {
    getNewsDetail() {
      this.news = this.$route.params.data;
      this.counts = this.$route.params.data.attachFile.length
      this.loading = false;
    },
    filePre(file) {
      let paramVal = {
        fileId: file.fileId,
        moduleId: '220803111621B521Wfaj0JHZLp0lbpU',
        fileName: file.fileName,
        flowId: 0,
        nodeId: -1,
        screenWidth: 375,
        "x-auth-token": dsf.util.loadSessionStore("loginToken"),
        addLoading: 1
      }

      const index = file.fileName.lastIndexOf(".");
      const suffix = file.fileName.substr(index + 1);
      const toLowerSuffix = suffix.toLowerCase();
      let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
      console.log(toLowerSuffix);
      if (imgArr.indexOf(toLowerSuffix) > -1) {
        this.imgPreview = true;
        let imgUrl = dsf.url.getWebPath(`ctrl/file/download?infoId=${file.infoId}&fileId=${file.fileId}&fileName=${file.fileName}`)
        this.previewImg = [imgUrl];
        console.log(imgUrl);
      }
      else {
        dsf.http.post('/fn/office/openMobileOffice', paramVal).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: res.data.message,
              },
            });

          }
        })
          .error((error) => {
            dsf.layer.toast("文件预览失败！");
          });
      }

    }

  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.detail {
  min-height: 100%;
  background-color: #fff;
  padding: 20px;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .time {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    color: #999;
    flex-wrap: wrap;
    border-bottom: #ccc 1px dashed;
    margin-bottom: 0.4rem;

    .releData {
      margin-left: 10px;
    }

    span {
      display: block;
      flex-shrink: 0;
      width: 150px;
      font-size: var(--font_size_3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .content {
    // ::v-deep img {
    //   width: auto !important;
    //   display: block;
    //   margin-bottom: 30px;
    // }

  }


  .fujian {
    font-weight: 600;
    border-top: #ccc 1px dashed;
    margin: 20px 0px 10px 0px;
    padding-top: 15px;
  }

  .file {
    height: 30px;

    img {
      float: left;
      width: 10px;
      height: 10px;
      margin-top: 10px;
    }

    span {
      display: block;
      width: 300px;
      float: left;
      background: transparent;
      text-decoration: none;
      line-height: 30px;
      color: #333;
      margin-left: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ::v-deep table {
    .selectTdClass {
      background-color: #edf5fa !important
    }

    table.noBorderTable td,
    table.noBorderTable th,
    table.noBorderTable caption {
      border: 1px dashed #ddd !important
    }

    table {
      margin-bottom: 10px;
      border-collapse: collapse;
      display: table;
    }

    td,
    th {
      padding: 5px 10px;
      border: 1px solid #DDD;
    }

    caption {
      border: 1px dashed #DDD;
      border-bottom: 0;
      padding: 3px;
      text-align: center;
    }

    th {
      border-top: 1px solid #BBB;
      background-color: #F7F7F7;
    }

    table tr.firstRow th {
      border-top-width: 2px;
    }

    .ue-table-interlace-color-single {
      background-color: #fcfcfc;
    }

    .ue-table-interlace-color-double {
      background-color: #f7faff;
    }

    td p {
      margin: 0;
      padding: 0;
    }
  }

}
</style>
