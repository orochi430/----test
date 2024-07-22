<template>
  <div class="memo-container">
    <div class="top">
      <van-cell title="备忘录" icon="arrow-left" center @click="$router.back()" >
        <template #default >
          <!-- <van-button type="primary" @click.stop="exportZip()">导出</van-button> -->
          <van-button icon="plus" type="primary" @click.stop="add()">新增</van-button>
        </template>
      </van-cell>
    </div>
    <div class="content">
      <memoList :memos="memoList" @reload="reload"></memoList>
      <!-- <common-list :params="params"></common-list> -->
    </div>
  </div>
</template>

<script>
import memoList from "@/components/meetingPad/components/memoList";
import commonList from "@/components/documentCenter/DefaultList";
// import jsZip from "jszip"
export default {
  components: {
    memoList,
    commonList
  },
  data() {
    return {
      memoList: [],
      user: dsf.util.loadSessionStore("user"),
      meeting: dsf.util.loadSessionStore("meeting"),
      params: {
        name: "备忘录",
        icon: "",
        goRoute: "defaultList",
        url: "",
        params: {
          moduleId: "220120172125U35lYA3kpFwxWs3L9JX",
          listId: "220120174253Rn2TPlSK5oF8arUiv9B",
          fid: dsf.util.loadSessionStore("meeting").id
        },
        moduleId: "220120172125U35lYA3kpFwxWs3L9JX",
        listId: "220120174253Rn2TPlSK5oF8arUiv9B"
      }
    };
  },
  created() {
    let self = this;
    self.getData();
  },
  mounted() {},
  methods: {
    add() {
      dsf.http
        .post(`fn/conferenceMemorandum/addMemorandum`, {
          meetingId:dsf.util.loadSessionStore("meeting").id
        })
        .done(result => {
          
          if (result.data) {
            this.$router.push({
                name: "dsfIframe",
                params: {
                    url: `./static/signatureMobile/mindex_meeting.html?fileId=${result.data.id}&meetingId=${this.meeting.id}&type=add`,
                    title: "新增备忘录"
                }
            });
          }
        })
        .error(error => {
          console.log("error", error);
        })
    },
    reload(){
      this.getData()
    },
    async getData() {
      // let self = this;
      // let sql = `select id,fid,name,updatetime,content from memo where fid='${self.user.ID}' order by updatetime desc`;
      // let res = await self.queryDB(sql);
      // console.log("res == ", res);
      // if (res) {
      //   if (res.length > 0) {
      //     res.forEach(item => {
      //       self.memoList.push({
      //         id: item.ID,
      //         title: item.NAME,
      //         content: item.CONTENT,
      //         time: item.UPDATETIME,
      //         userId: item.FID,
      //         meetingId: self.meeting.ID
      //       });
      //     });
      //   } else {
      //     // dsf.layer.toast("暂无数据！", false);
      //   }
      // } else {
      //   dsf.layer.toast("系统错误，请稍后重试！", false);
      // }

      dsf.http
        .get(`fn/list/220824182854XIvX8qp2dlqO8LQwBQ9/mobile/q`, {
          moduleId:'220120172125U35lYA3kpFwxWs3L9JX',
          fid:this.meeting.id
        })
        .done(result => {
          if (result.datas) {
            this.memoList = []
            result.datas.forEach(item => {
              this.memoList.push({
                title: item.dataValue["B0001"],
                time: item.dataValue["A0019"],
                id: item.dataValue["A0001"],
              })
            })
          }
        })
        .error(error => {
          console.log("error", error);
        })
    },
    // exportZip() {
    //     let self = this;
    //     console.log('cordova.platformId =', cordova.platformId)
    //     console.log("cordova.file.dataDirectory = ", cordova.file.dataDirectory)
    //     // self.funDownload(JSON.stringify(self.memoList), "memo.json")
    //     // self.createAndWriteFile(JSON.stringify(self.memoList), 'memo.json')
    //     // self.downFile({
    //     //     url:'https://dtapp-pub.dingtalk.com/dingtalk-desktop/win_downloader/dingtalk_downloader.exe',
    //     //     title:'钉钉下载器.exe'
    //     // })

    //     const zip = new jsZip();
    //     zip.file('memo.json', JSON.stringify(self.memoList));
    //     zip.generateAsync({
    //             type: "blob",
    //             compression: "DEFLATE", // STORE：默认不压缩 DEFLATE：需要压缩
    //             compressionOptions: {
    //                 level: 9 // 压缩等级1~9 1压缩速度最快，9最优压缩方式
    //             }
    //         })
    //         .then((content) => {
    //             // // 创建隐藏的可下载链接
    //             // const eleLink = document.createElement('a');
    //             // // 下载的文件名
    //             // eleLink.download = this.filename + 'zip';
    //             // eleLink.style.display = 'none';
    //             // // 下载内容转变成blob地址
    //             // eleLink.href = URL.createObjectURL(content);
    //             // // 触发点击
    //             // document.body.appendChild(eleLink);
    //             // eleLink.click();
    //             // // 然后移除
    //             // document.body.removeChild(eleLink);
    //             self.createAndWriteFile(content, 'memo.zip')
    //         });
    // },
    downFile(item) {
      var fileTransfer = new FileTransfer();
      var uri = encodeURI(item.url); //encodeURI(dsf.url.getRootPath() + "/" + item.initUrl);
      let filename =
        item.title.substr(0, item.title.indexOf(".")) +
        dsf.date.format(new Date(), "yyyymmddiiss") +
        item.title.substr(item.title.indexOf("."));
      let fileURL =
        cordova.file.externalRootDirectory + "/Download/item/" + filename;
      fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
          console.log(entry);
          dsf.layer.alert({
            message: "文件已下载到 " + fileURL
          });
        },
        function(error) {
          console.log("download error source =" + error.source);
          console.log("download error target =" + error.target);
          console.log("upload error code =" + error.code);
        },
        false,
        {
          headers: {
            Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
          }
        }
      );
    },
    funDownload(content, filename) {
      // 创建隐藏的可下载链接
      var eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([content]);

      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },

    /*
     * 打开或创建文件夹,创建文件并写入内容
     * Android:sdcard/xbrother/assets目录
     * IOS:cdvfile://localhost/persistent/xbrother/assets目录
     * 文件目录存在则打开,不存在则创建
     * */
    createAndWriteFile(content, fileName) {
      let self = this;
      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        function(fs) {
          console.log("打开的文件系统: " + fs.name);
          fs.root.getDirectory(
            "Download",
            {
              create: true
            },
            function(dirEntry) {
              dirEntry.getDirectory(
                "item",
                {
                  create: true
                },
                function(subDirEntry) {
                  subDirEntry.getFile(
                    fileName,
                    {
                      create: true,
                      exclusive: false
                    },
                    function(fileEntry) {
                      fileEntry.name == fileName;
                      fileEntry.fullPath == `Download/item/${fileName}`;
                      //文件内容
                      // jsonStr = jsonStr || 'some file data'
                      // let dataObj = new Blob([jsonStr], {
                      //     type: 'text/plain'
                      // });
                      //写入文件
                      self.writeFile(fileEntry, content);
                    },
                    self.onErrorCreateFile
                  );
                },
                self.onErrorGetDir
              );
            },
            self.onErrorGetDir
          );
        },
        self.onErrorLoadFs
      );
    },

    /*
     * 依次打开指定目录文件夹,读取文件内容
     * Android:sdcard/xbrother/assets/task.json
     * IOS:cdvfile://localhost/persistent/xbrother/assets/task.json
     * 目录和文件存在则打开,不存在则退出
     * */
    getAndReadFile() {
      let self = this;
      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        function(fs) {
          console.log("打开的文件系统: " + fs.name);
          fs.root.getDirectory(
            "xbrother",
            {
              create: false
            },
            function(dirEntry) {
              dirEntry.getDirectory(
                "assets",
                {
                  create: false
                },
                function(subDirEntry) {
                  subDirEntry.getFile(
                    "task.json",
                    {
                      create: false,
                      exclusive: false
                    },
                    function(fileEntry) {
                      console.log(
                        "是否是个文件？" + fileEntry.isFile.toString()
                      );
                      fileEntry.name == "task.json";
                      fileEntry.fullPath == "xbrother/assets/task.json";
                      self.readFile(fileEntry);
                    },
                    self.onErrorCreateFile
                  );
                },
                self.onErrorGetDir
              );
            },
            self.onErrorGetDir
          );
        },
        self.onErrorLoadFs
      );
    },

    //将内容数据写入到文件中
    writeFile(fileEntry, dataObj) {
      //创建一个写入对象
      fileEntry.createWriter(function(fileWriter) {
        //文件写入成功
        fileWriter.onwriteend = function() {
          console.log("Successful file write...");
          dsf.layer.alert({
            message: `${fileEntry.fullPath}下载成功！`
          });
        };

        //文件写入失败
        fileWriter.onerror = function(e) {
          console.log("Failed file write: " + e.toString());
        };

        //写入文件
        fileWriter.write(dataObj);
      });
    },

    //读取文件
    readFile(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          $("#file_content_info").html(this.result);
          console.log("file read success:" + this.result);
        };
        reader.readAsText(file);
      }, onErrorReadFile);
    },

    //FileSystem加载失败回调
    onErrorLoadFs(error) {
      console.log("onErrorLoadFs =", error);
      console.log("文件系统加载失败！");
    },

    //文件夹创建失败回调
    onErrorGetDir(error) {
      console.log("文件夹创建失败！");
    },

    //文件创建失败回调
    onErrorCreateFile(error) {
      console.log("文件创建失败！");
    },

    //读取文件失败响应
    onErrorReadFile() {
      console.log("文件读取失败!");
    }
  }
};
</script>

<style lang="scss">
.memo-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    .van-cell__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600 !important;

      span {
        font-size: 0.88rem;
        padding-left: 0.4rem;
      }
    }

    .van-cell__left-icon {
      font-size: 0.8rem;
    }

    .van-button {
      font-size: 40px;
      height: 1.6rem;
      padding: 0 0.5rem;
      background: #3B74DB;
      border-color: #3B74DB;
    }
  }

  > .content {
    flex: 1;
    overflow: auto;
    padding-left: 40px;
  }
}
</style>
