<template>
    <div class='controlNestedForm'>
        <van-row class="box flex" v-for="(row, index) in struct.controls" :key="index">
            <template>
                <transition name="fade">
                    <component v-if="row.controlType == 'controlSubFormPrimary'" :checkShow="checkShow"
                        :is="'controlSubFormPrimary'" :formMeta="struct.subform[row.metaId]"
                        :formData="formData.multinfos[row.metaId]" :formId="formId"
                        :foreign="formData.main['A0001'].value"></component>
                </transition>
            </template>
        </van-row>
    </div>
</template>

<script>
import propMixin from "./mixin";
import specialJS from "../specialJS";
import controlSubFormPrimary from "./controlNestedFormlSub";
// import buttonHandle from "../buttonHandle";
export default {
    name: "controlNestedForm",
    mixins: [propMixin],
    components: {
        controlSubFormPrimary
    },
    props: ["pformData", "pformMeta", "topformData", "topformMeta", "formId"],
    data() {
        return {
            controlData: {
                begin: 0,
                end: 10,
                defaultValue: "编号",
                inputType: null, //类型
                clearable: true, //删除按钮
                leftIcon: "", //左icon
                rightIcon: "", //右icon
                // formatter:this.formatternum,//验证函数
                inputAlign: "right",
                errorMessage: "", //底部错误提示文案
                rules: [], //,{required: true, message: '超出最大长度',validator:this.validatorFn}
                placeholder: "",
                maxlength: "",
                readonly: false,
            },
            buttonHandle: null,
            formData: {},
            struct: {},
            checkShow: () => { }
        };
    },
    computed: {},
    mounted() { },
    created() {
        let self = this;
        this.importButtonHandle()
        let pk = this.pformData[this.formId].value
        let moduleId = this.pformData.A0004.value
        let _parentFlowId = this.topformMeta.parameters.flowId;
        let _parentNodeId = this.topformMeta.parameters.nodeId;
        let master_moduleId = this.topformMeta.parameters.moduleId;
        let url = "fn/xform/getInfo?nestedForm=true&pk=" + pk + "&" + this.metaData.extra.urlParam + "&moduleId=" + moduleId + "&_parentFlowId=" + _parentFlowId + "&_parentNodeId=" + _parentNodeId + "&master_moduleId=" + master_moduleId;
        dsf.http.get(url).then(({
            data
        }) => {
            self.formData = data.data;
            self.struct = data.struct;
            let multinfos = {};
            if (self.struct.subform) {
                for (let [k, v] of Object.entries(self.struct.subform)) {
                    if (self.formData.subform && self.formData.subform[k]) {
                        self.formData.subform[k].forEach((item) => {
                            self.$set(item, "action", "Updated");
                        });
                        multinfos[k] = {
                            rows: self.formData.subform[k],
                        };
                    } else {
                        multinfos[k] = {
                            rows: [],
                        };
                    }
                }
            }
            self.$set(self.formData, "multinfos", multinfos);

            //初始化特殊JS
            specialJS.init(moduleId, self.struct.parameters.formId);
            self.$nextTick(() => {
                specialJS.initHandle_subform(self.formData, self.struct, self);
                self.checkShow = function (data) {
                    return specialJS.checkShowByData_subform(data)
                }
            });
        });
    },
    methods: {
        importButtonHandle() {
          import(/* webpackChunkName: 'buttonHandle' */ "../buttonHandle").then(res => {
            this.buttonHandle = res.default
            // 项目特殊按钮动态引入
            let projectButtonHandle = {}
            import(/* webpackChunkName: 'buttonHandle' */ `../buttonHandleMixin/${dsf.config.projectName}.js`).then((module) => {
              console.log(module);
              projectButtonHandle = module.default
              Object.assign(this.buttonHandle, projectButtonHandle)
            }).catch((err) => {
              console.log('无项目按钮方法')
            })
          })
        },
        saveNestedForm() {
            let self = this;
            return new Promise((resolve, reject) => {
                self.buttonHandle.saveNestedFormSync(
                    self.$route.params,
                    self.struct,
                    self.formData,
                    self,
                    self.$refs)
                    .then(res => {
                        self.initSubForm()
                        resolve()
                    })
            })
        },
        initSubForm() {
            let self = this;
            for (let [k, v] of Object.entries(self.struct.subform)) {
                if (self.formData.multinfos[k]) {
                    self.formData.multinfos[k].rows.forEach((item) => {
                        self.$set(item, "action", "Updated");
                    });
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.controlNestedForm {
    width: 100%;
}
</style>
<style>
.overlayClass {
    opacity: 0.8;
}

.controlNestedForm .van-field__error-message {
    text-align: right;
    /* display:none; */
}
</style>
