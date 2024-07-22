<template>
<div class="subform" ref="subform">
    <div class="card" :id="'id'+index+formId" v-for="(cardItm,index) in formData.rows" :key="index" v-show="cardItm.action!='Deleted'">
        <van-row type="flex">
            <van-col :span="getcol(item)" style="padding: 0" v-for="(item, idx) in structControl" :key="item.controlId">
                <form-layout formType="nestedForm" :rowCteNum="1" v-if="check(cardItm,item)&&item.privilege && item.privilege.visible" :lastControl="idx - 1 >= 0 ? structControl[idx-1] : ''" :controlData="getData(index,item)" :subFormIndex="index" :metaData="item" :formId="formId" :isSubForm="true"></form-layout>
            </van-col>
        </van-row>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import DebounceClick from '@/components/common/debounceClick.jsx'
export default {
    name: "controlNestedFormlSub",
    props: ["formMeta", "formData", "formId", "foreign","checkShow"],
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
    watch: {
        "formData": {
            handler(newValue, oldValue) {
                console.log(newValue, oldValue);
            },
            deep: true,
            immediate: true,
        }},
    components: {
        DebounceClick,
        formLayout: () => import('../formLayout.vue'),
    },
    beforeCreate() { // 组件之间循环引用
        this.$options.components.formLayout = require('../formLayout.vue').default
    },
    mounted() {
        this.container = this.$refs.subform
    },
    created() {
        this.structControl = this.formMeta.controls.filter(itm => itm.controlType != "controlSubFormPrimary" && itm.controlType != "controlHidden")
        this.SubFormPrimary = this.formMeta.controls.filter(itm => itm.controlType == "controlSubFormPrimary")[0]
        if (this.SubFormPrimary) {
            if (!this.$route.params.pk && this.SubFormPrimary.extra['default-rows']) { // 拟稿时子表默认个数
                for (let i = 0; i < this.SubFormPrimary.extra['default-rows']; i++) {
                    this.addCard(false)
                }
            }
            if (this.SubFormPrimary.privilege) { // 子表是否只读不可编辑
                this.readonly = !this.SubFormPrimary.privilege.editable
            }
            this.structControl.forEach((item, index) => {
                item.showLabel = false;
                item.showLable = false;

                if (!this.SubFormPrimary.defaultValue[item.metaId]) {
                    this.SubFormPrimary.defaultValue[item.metaId] = {
                        value: ""
                    }
                }
            })
        }
    },
    methods: {
        check(item, ctr) {
          return this.checkShow({item:item,ctr:ctr});
        },
        getData(index, item) {
            return this.formData.rows[index][item['metaId']]
        },
        deepCopy(data) {
            return JSON.parse(JSON.stringify(data))
        },
        addCard(scroll = true) {
            let self = this;
            dsf.http.get("fn/common/generateUUID?size=1").then(({
                data
            }) => {
                let newData = {}
                if (self.SubFormPrimary) {
                    newData = self.deepCopy(self.SubFormPrimary.defaultValue)
                }
                newData[self.formId] = {}
                newData[self.formId].value = data.data.UUID
                newData[self.formId].foreign = self.foreign
                newData.action = "Added"
                self.formData.rows[self.formData.rows.length] = {};
                self.$set(self.formData.rows, self.formData.rows.length - 1, newData);
                // if (scroll) {
                //     self.$nextTick(function () {
                //         self.$el.querySelector(`#id${self.formData.rows.length-1}${self.formId}`).scrollIntoView({
                //             behavior: "smooth",
                //             block: "end"
                //         });
                //     })
                // }
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
        getcol(item) {
            // 会议资源子表控件占位格数
            switch(item.metaId) {
                case 'C-MEETINGBI-0015':
                    return 6;
                case 'C-MEETINGBI-0022':
                    item.isHideDivider = true
                    return 18;
                default:
                    return 24
            }
            
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
        padding: 15px 15px 0px 15px;
        background: white;
    }

    .card {
        position: relative;
        margin: 15px;
        //margin-top: 0;
        padding: 10px 0;
        border-radius: 10px;
        border: 1px solid #e5e5e5;
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
