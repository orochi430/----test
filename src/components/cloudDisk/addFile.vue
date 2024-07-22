<template>
<div>
    <van-popup v-model="show" position="bottom" round get-container="#app" :close-on-click-overlay="false" @click-overlay="close">
        <div class="addFile">
            <p class="addtitle">新建</p>
            <ul>
                <li v-for="(item,index) in list" :key="index" class="items">
                    <van-uploader v-if="item.type != 'folder'" :multiple="true" :accept='item.accept' :after-read="afterRead">
                        <img :src="item.icon" alt="">
                        <span>{{item.title}}</span>
                    </van-uploader>
                    <div v-if="item.type == 'folder'" @click="addNew(item)">
                        <img :src="item.icon" alt="">
                        <span>{{item.title}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </van-popup>

    <van-popup v-model="addFolder" position="bottom" :style="{ height: '100%' }">
        <div class="addFolder">
            <div class="header">
                <van-icon @click="closeAddFolder" name="cross" />
                <p>新建文件夹</p>
                <span @click="doAddFolder">完成</span>
            </div>
            <div class="inputs">
                <img src="../../assets/imgs/cloudDisk/folder.png" alt="" srcset="">
                <input type="text" maxlength="20" placeholder="输入文件夹名称" v-model.trim="folderName">
            </div>
        </div>
    </van-popup>

</div>
</template>

<script>
import dsf from '../../common'

export default {
    name: 'addFile',
    components: {},
    props: {
        show: {
            type: Boolean,
            default: false
        },
        fid: {
            type: String,
            default: ""
        },
        listType: {
            type: String | Number,
            default: 4
        }
    },
    data() {
        return {
            maxSize: 0,
            list: [{
                    icon: require('../../assets/imgs/cloudDisk/upload-img.png'),
                    title: '上传图片',
                    type: "image",
                    accept: "image/*"
                },
                {
                    icon: require('../../assets/imgs/cloudDisk/upload-video.png'),
                    title: '上传视频',
                    type: "video",
                    accept: "video/*"
                },
                {
                    icon: require('../../assets/imgs/cloudDisk/upload-file.svg'),
                    title: '上传文件',
                    type: "document",
                    accept: "*"
                },
                {
                    icon: require('../../assets/imgs/cloudDisk/upload-folder.png'),
                    title: '新建文件夹',
                    type: "folder",
                    accept: ""
                },
                // {
                //     icon: require('../../assets/imgs/cloudDisk/upload-doc.svg'),
                //     title: 'Word'
                // },
                // {
                //     icon: require('../../assets/imgs/cloudDisk/upload-excel.svg'),
                //     title: 'Excel'
                // },
                // {
                //     icon: require('../../assets/imgs/cloudDisk/upload-naotu.svg'),
                //     title: '脑图'
                // },
                // {
                //     icon: require('../../assets/imgs/cloudDisk/upload-baiban.svg'),
                //     title: '白板'
                // },
                // {
                //     icon: require('../../assets/imgs/cloudDisk/upload-shouji.svg'),
                //     title: '收集表'
                // },
            ],
            addFolder: false,
            folderName: ""
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.getMaxFileSize()
    },
    methods: {
        close() {
            this.$emit('closeAddFile')
        },
        addNew(item) {
            if (item.type == "folder") {
                this.folderName = ""
                this.addFolder = true
            }
        },
        closeAddFolder() {
            this.addFolder = false
            this.close()
        },
        doAddFolder() {
            let that = this
            if (!this.folderName) {
                dsf.layer.toast("请输入文件夹名称");
                return
            }
            dsf.http.post("/fn/cloud/file/addDirectory", {
                    fid: this.fid,
                    name: this.folderName,
                    listType: this.listType
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        getMaxFileSize() {
            dsf.http.get("/fn/cloud/file/getMaxFileSize")
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.maxSize = res.data.data
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        afterRead(file) {
            // let files = Array.isArray(file) ? file.map(item => {
            //     return item.file
            // }) : [file.file]
            // files = JSON.stringify(files)
            // console.log(files)
            // let promiseList = []
            // if (Array.isArray(file)) {
            //     file.forEach(item => {
            //         promiseList.push(dsf.http.upload(`fn/cloud/file/uploadFile`, '', {
            //             fid: this.fid,
            //             listType: this.listType,
            //             files: item.file
            //         }))
            //     })
            // } else {
            //     promiseList.push(dsf.http.upload(`fn/cloud/file/uploadFile`, '', {
            //         fid: this.fid,
            //         listType: this.listType,
            //         files: file.file
            //     }))
            // }
            // this.$toast.loading({
            //     message: "上传中...",
            //     forbidClick: true,
            //     duration: 0,
            //     overlay: true,
            // });

            // Promise.all(promiseList).done(res => {
            //     this.$toast.clear();
            //     this.$emit('closeAddFile')
            // });

            /***
             * 多文件同时上传
             */
            console.log(file)
            let files = []
            if (!Array.isArray(file)) {
                files = [file.file]
            } else {
                file.forEach(obj => {
                    files.push(obj.file)
                })
            }

            let sizeTotal = 0
            let formdata = new FormData();
            for (let i = 0; i < files.length; i++) {
                sizeTotal += files[i].size
                formdata.append('files', files[i])
            }
            formdata.append('fid', this.fid)
            formdata.append('listType', this.listType)

            if (this.maxSize != 0 && this.maxSize < sizeTotal) {
                let limit = this.maxSize / (1024 * 1024)
                dsf.layer.toast(`文件不能超过${limit}M`)
                return
            }

            this.$toast.loading({
                message: "上传中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });

            dsf.http.post(`fn/cloud/file/uploadFile`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                timeout: 2000000
            }).then(data => {
                this.$toast.clear();
                if (data.data && data.data.code == "200") {
                    dsf.layer.toast(data.data.message)
                    this.$emit('closeAddFile')
                } else {
                    dsf.layer.toast(data.data.message)
                }
            }).finally(f => {
                this.$toast.clear();
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.addFile {
    width: 100%;
    background: #F2F2F5;
    padding: 10px 0;

    .items {
        /deep/ div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    .addtitle {
        font-size: 13.5px;
        color: #171A1D;
        text-align: center;
        line-height: 19px;
        font-weight: 600;
        margin-bottom: 30px;
    }

    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
            width: 33.3%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;

            img {
                width: 28px;
                height: 28px;
            }

            span {
                font-size: 11px;
                color: #171A1D;
                text-align: center;
                font-weight: 400;
                margin-top: 5px;
            }
        }
    }
}

.addFolder {
    width: 100%;
    height: auto;

    .header {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 14px;

        .van-icon {
            font-size: var(--font_size_2);
            color: #000;
            flex-shrink: 0;
        }

        p {
            font-size: var(--font_size_2);
            color: #000;
            flex: 1;
            text-align: center;
            line-height: 46px;
        }

        span {
            font-size: var(--font_size_3);
            color: rgb(47, 127, 202);
        }
    }

    .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        img {
            width: 80px;
        }

        input {
            width: 80%;
            height: 40px;
            background: #f2f2f2;
            text-align: center;
            border-radius: 10px;
            margin-top: 20px;
            font-size: var(--font_size_3);
            color: #333;
        }
    }
}
</style>
