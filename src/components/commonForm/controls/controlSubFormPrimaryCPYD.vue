<template>
<div class="subform" ref="subform">
    <van-sticky :offset-top="dsf.util.getOffsetTop()" :container="container">
        <div class="disfr ac jsb subTitle">
            <span style="font-weight:600;font-size:0.3rem;">{{formMeta.name}}</span>
            <!-- <van-button @click.stop="addCard" v-if="!readonly" icon="plus" size="small" native-type="button" type="info" /> -->
        </div>
    </van-sticky>
    <van-row class="card" :id="'id'+index+formId" v-for="(cardItm,index) in formData.rows" :key="index" type="flex" justify="space-between" align="center">
        <van-col :span="getColSpan(item)" v-for="item in structControl" :key="item.controlId">
            <form-layout-cpyd v-if="item.privilege && item.privilege.visible && item.metaId!='201229102037KPKpUHuJI0O7jVQSW53'" :controlData="getData(index,item)" :subFormIndex="index" :metaData="item" :isSubForm="true"></form-layout-cpyd>
        </van-col>
    </van-row>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    props: ["formMeta", "formData", "formId", "foreign"],
    data() {
        return {
            subForm: null,
            cardCount: 1,
            container: null,
            subFormData: null,
            SubFormPrimary: null,
            readonly: false,
            structControl: []
        }
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    components: {
        formLayoutCpyd: () => import('../formLayoutCPYD.vue'),
        // ...allComps
    },
    beforeCreate() { // 组件之间循环引用
        this.$options.components.formLayout = require('../formLayoutCPYD.vue').default
    },
    mounted() {
        this.container = this.$refs.subform;
    },
    created() {
        this.subformShowType = dsf.config.commonForm.subformShowType || "block";
        let readonlyList = ['201125171531HhP41e8lrLw0T7kuFXK', '201230170107FTM46tEGeG4rwLX9mDr']; //dxq 带班统计子表\菜品预订子表 无法配置子表不可增加 写死 后期去掉
        if (readonlyList.includes(this.$route.params.moduleId)) {
            this.readonly = true
        }
        this.structControl = this.formMeta.controls.filter(itm => itm.controlType != "controlSubFormPrimary")
        this.SubFormPrimary = this.formMeta.controls.filter(itm => itm.controlType == "controlSubFormPrimary")[0]
        if (this.SubFormPrimary) {
            if (this.SubFormPrimary.privilege) {
                this.readonly = !this.SubFormPrimary.privilege.editable
            }
            this.structControl.forEach((item, index) => {
                if (this.subformShowType == "row") {
                    this.$set(item, "showLable", false)
                }
                if (!this.SubFormPrimary.defaultValue[item.metaId]) {
                    this.SubFormPrimary.defaultValue[item.metaId] = {
                        value: ""
                    }
                }
            })
        }
    },
    methods: {
        getData(index, item) {
            return this.formData.rows[index][item['metaId']]
        },
        deepCopy(data) {
            return JSON.parse(JSON.stringify(data))
        },
        addCard() {
            let self = this;
            dsf.http.get("fn/common/generateUUID?size=1").then(({
                data
            }) => {
                let newData = {}
                console.log(self.formMeta, self.formData.rows.length)
                if (self.formData.rows.length) {
                    newData = self.deepCopy(self.formData.rows[0])
                    var newObj = {}
                    Object.entries(newData).forEach(item => {
                        if (typeof item[1] == "object") {
                            newObj[item[0]] = item[1]
                            Object.entries(item[1]).forEach(itm => {
                                newObj[item[0]][itm[0]] = ""
                            })
                        }
                    })
                    console.log(newObj)
                    newData = newObj
                } else {
                    if (self.SubFormPrimary) {
                        newData = self.deepCopy(self.SubFormPrimary.defaultValue)
                    }
                }
                newData[self.formId] = {}
                newData[self.formId].value = data.data.UUID
                newData[self.formId].foreign = self.foreign
                console.log(newData)
                newData.action = "Added"
                self.formData.rows[self.formData.rows.length] = {};
                self.$set(self.formData.rows, self.formData.rows.length - 1, newData);
                console.log(self.formData)
                self.$nextTick(function () {
                    self.$el.querySelector(`#id${self.formData.rows.length-1}${self.formId}`).scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    });
                })

            })
            return false
        },
        deleteCard(index) {
            this.$dialog.confirm({
                title: '提示',
                message: '确定要删除吗？'
            }).then(() => {
                if (this.formData.rows.length > 0) {
                    let arr = this.deepCopy(this.formData.rows)
                    if (arr[index].action == "Added") {
                        arr.splice(index, 1)
                    } else if (arr[index].action == "Updated") {
                        arr[index].action = "Deleted"
                    }
                    this.formData.rows = arr
                }
            }).catch(() => {});

        },
        getColSpan(item){
            let colSpan=0;
            if (item.metaId=="201221102131oCk7pVCHhyH3e1I2TQt") {
                colSpan="12"
            }else if (item.metaId=="B0001") {
                colSpan="12"
            }else if (item.metaId=="201229101800AuyqpP4yjv7vbphegCh") {
                colSpan="7"
            }else{
                colSpan="5"
            }
            return colSpan
        }
    }

}
</script>

<style lang="scss" scoped>
.subform {
    width: 100%;
    box-sizing: border-box;
    // padding:10px 15px;
    // background:white;
    font-size: var(--font_size_2);

    .disfr {
        display: flex;
    }

    .fc {
        display: flex;
        flex-direction: column;
    }

    .jc {
        justify-content: center;
    }

    .ac {
        align-items: center;
    }

    .jsb {
        justify-content: space-between
    }

    .subTitle {
        padding: 15px;
        background: white;
    }

    .card {
        position: relative;
        margin: 15px;
        margin-top: 0;
        padding: 10px 0;
        padding-top: 20px;
        // border-radius: 10px;
        border-bottom: 1px solid #e5e5e5;
        // min-height: 300px;
        background: white;
        .deleteIcon {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 22px;
            z-index: 2;
        }

        .delateBox {
            margin: 10px 0;
        }

        .deleteBtn {
            width: 80%;
        }
        ::v-deep .van-field__control {
            text-align: left !important;
        }
    }

    .addBox {
        padding: 0 15px;

        .addBtn {
            width: 100%;
        }
    }
}
</style><style lang="scss">
.subform {
    .van-sticky--fixed {
        .subTitle {
            background: white;
            padding: 15px;
        }

        .subTitle::after {
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border-bottom: 1px solid #bbb;
            border-top: 1px solid #bbb;
            -webkit-transform: scale(.5);
            transform: scale(.5);
        }
    }
}
</style>
