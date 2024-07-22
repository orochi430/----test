<template>
<div class="padHeader">
    <img class="logo" src="static/images/project/fgwPad/logo.png" alt="" srcset="">
    <div class="right">
        <!-- <div class="search">
            <input type="text" placeholder="请输入关键字" v-model.trim="keyword">
            <img src="static/images/project/fgwPad/ss.png" alt="" srcset="" @click="search">
        </div> -->
        <div class="user">
            <span class="photo">
                <van-image :src="userInfo.photo || ''">
                    <template v-slot:error>
                        <img src="static/images/project/fgwPad/user-img.png" alt="" srcset="" />
                    </template>
                </van-image>
            </span>
            <span class="username">您好！{{ userInfo.logName }}</span>
        </div>
        <div class="exit" style="display:none">
            <img @click="exit" class="close" src="static/images/project/fgwPad/tc.png" alt="" srcset="" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'padHeader',
    components: {},
    data() {
        return {
            userInfo: {
                photo: "",
                logName: ""
            },
            keyword: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        exit() {
            let self = this;
            dsf.layer.confirm({
                    message: "是否确认退出登录",
                    confirmButtonText: "确认",
                },
                () => {
                    dsf.util.logOut();
                }
            );
        },
        search() {
            if (!this.keyword) {
                return
            }
            this.$emit("doSearch", this.keyword)
        }
    },
    created() {},
    mounted() {
        this.userInfo = dsf.util.loadSessionStore("user");
        // let that = this
        // dsf.http.get(`/fn/developmentOffice/getUserInfo`, {}, {
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     })
        //     .done(res => {
        //         let user = res.data
        //         if (res.data && res.data.userInfo) {
        //             that.userInfo = res.data.userInfo
        //         } else {
        //             alert("未获取到用户信息")
        //         }
        //     }).error(err => {
        //         alert("未获取到用户信息")
        //     })

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.padHeader {
    width: 100%;
    height: 75px;
    box-sizing: border-box;
    padding: 0 30px;
    background: rgba(0, 0, 0, 0.22);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        height: 75px;
        width: 570px;
    }

    .right {
        display: flex;
        align-items: center;

        .search {
            background: #FFFFFF;
            border-radius: 23px;
            width: 260px;
            height: 46px;
            box-sizing: border-box;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            align-items: center;
            flex-shrink: 0;

            img {
                width: 20px;
                height: 20px;
                flex-shrink: 0;
            }

            input {
                width: 100%;
                flex: 1;
                height: 46px;
                font-size: 18px;
                color: #333;

                &::placeholder {
                    font-size: 18px;
                    color: #0F77AB;
                }
            }
        }

        .user {
            display: flex;
            align-items: center;
            margin-left: 20px;

            .photo {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }

                .van-image {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;
                }

                /deep/.van-image__error,
                /deep/.van-image__loading {
                    background: none !important;
                }

                img {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }

            }

            .username {
                font-size: 18px;
                color: #FFFFFF;
                margin-left: 10px;
            }
        }

        .exit {
            width: 32px;
            height: 32px;
            margin-left: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>
