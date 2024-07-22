<template>
<div id="changePassWord">
    <div class="content">
        <!-- 表单盒子 -->
        <van-form ref="editPassword_form" @submit="onSubmit">
            <!-- 旧密码 -->
            <van-field v-model="editPassword_form.oldPsw" clearable type="password" name="oldPsw" label="旧密码" placeholder="请输入旧密码" :error="false" :rules="oldPwdRules" />
            <!-- 新密码 -->
            <van-field v-model="editPassword_form.newPsw" clearable type="password" name="newPsw" label="新密码" placeholder="请输入新密码" :error="false" :rules="newPwdRules" />
            <!-- 确认密码 -->
            <van-field v-model="editPassword_form.checkPsw" clearable type="password" name="checkPsw" label="确认密码" placeholder="请再次输入新密码" :error="false" :rules="checkPwdRules" />
            <div class="point-content">{{point}}</div>
            <div class="btngroup">
                <van-button class="btn" block type="info" native-type="submit">保存</van-button>
            </div>
        </van-form>
    </div>
</div>
</template>

<script>
export default {
    name: "changePassWord",
    data() {
        return {
            isLoading: false,
            editPassword_form: {
                oldPsw: "",
                newPsw: "",
                checkPsw: "",
            },
            isIm: false
        };
    },
    created() {
        this.userInfo = dsf.util.loadSessionStore("user");
        if (this.$route.query.isIm) {
            this.isIm = this.$route.query.isIm == 1
        }
    },
    computed: {
        minPwd() { // 最小密码长度
            return dsf.config.setting.hasOwnProperty('SYS-SEC-0001') ?
                (dsf.config.setting['SYS-SEC-0001'] || 6) : 6
        },
        strengthPwd() { // 密码强度
            return dsf.config.setting.hasOwnProperty('SYS-SEC-0002') ?
                (dsf.config.setting['SYS-SEC-0002'] || 1) : 1
        },
        point() {
            console.log(this.strengthPwd)
            let strength = this.strengthPwd == 1 ? '，只能包含合法字符：数字、字母、~@^!#$()*' :
                (this.strengthPwd == 2 ? '，而且同时包含数字+字母' : '，而且同时包含数字+大小写字母+合法特殊字符 ~@^!#$()*')
            return '密码必须至少' + this.minPwd + '位' + strength
        },
        oldPwdRules() {
            return [{
                validator: (value) => value !== '',
                message: `请输入旧密码`
            }]
        },
        newPwdRules() {
            let rules = [{
                    validator: (value) => value !== '',
                    message: `请输入新密码`
                },
                {
                    pattern: /^[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
                    message: `密码只能包含合法字符：数字、字母、~@^!#$()*`
                },
                {
                    pattern: new RegExp("^.{" + this.minPwd + ",}$", ""),
                    message: `密码长度至少为${this.minPwd}位`
                },
                {
                    validator: (value) => value !== this.editPassword_form.oldPsw,
                    message: `新密码不能和旧密码相同`
                }
            ]
            if (this.strengthPwd == 2) {
                rules.push({
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
                    message: '密码必须包含数字+字母'
                })
            }
            if (this.strengthPwd == 3) {
                rules.push({
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\~\@\^\!\#\$\(\)\*])[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
                    message: '密码必须包含数字+大小写字母+合法特殊字符 ~@^!#$()*'
                })
            }
            console.log(rules)
            return rules
        },
        checkPwdRules() {
            return [{
                    validator: (value) => value !== '',
                    message: `请再次输入密码`
                },
                {
                    validator: (value) => value === this.editPassword_form.newPsw,
                    message: `两次输入密码不一致`
                }
            ]
        }
    },
    mounted() {},
    methods: {
        onSubmit() {
            // let indx = this.dsf.layer.loading();
            dsf.http
                .post("/fn/userinfo/updatePwd", {
                    pwd: this.editPassword_form.oldPsw,
                    newPwd: this.editPassword_form.newPsw,
                    userId: dsf.util.loadSessionStore('user').user_id
                })
                .then(({
                    data
                }) => {
                    // this.dsf.layer.closeLoading(indx);
                    if (data.type == "success") {
                        if (this.isIm && window.native && window.native.isNative) { //判断是不是
                            this.dsf.layer.toast("修改密码成功", 'success', () => {
                                window.native.back()
                            })
                        } else {
                            this.dsf.layer.toast("修改密码成功,请重新登录", 'success', () => {
                                if (dsf.util.loadSessionStore('homePage') == '/changePassWord') dsf.util.removeSessionStore('homePage')
                                dsf.util.logOut()
                            });
                        }
                    } else {
                        this.dsf.layer.toast(data.message || '修改失败');
                    }
                })
                .catch(({
                    message
                }) => {
                    // this.dsf.layer.loading(indx);
                    this.dsf.layer.toast(message);
                });
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.content {
    margin: 10px 0px;
    .van-cell {
        font-size: var(--font_size_2);
    }
    .btngroup {
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 12px;

        .btn {
            width: 100%;
        }
    }

    .middle {
        font-family: PingFangSC-Regular;
        font-size: var(--font_size_3);
        color: #999999;
        margin: 0px 10px 10px 10px;
    }

    .point-content {
        padding: 10px 16px;
        @include font-theme('normal')
    }
}
</style>
