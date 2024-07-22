<template>
    <div>
        <div class="dsf-list" :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }">
            <application-item :key="subIndex" v-for="(subItem, subIndex) in alwaysShowChildren" :data="subItem"
                v-if="subItem.isshow"></application-item>
        </div>
        <iframe :src="jwloginsso" class="hideiframe" v-if="jwloginsso"></iframe>
    </div>
</template>
  
<script>
import applicationItem from "../applicationItem"
export default {
    components: {
        applicationItem,
    },
    props: {
        menu: {
            type: Object,
            default: () => {
                return {
                    badge: "",
                    child: [],
                    img: "",
                    name: "",
                    props: "",
                    router: "",
                    showClickTip: "",
                    imgStyle: "{}",
                    style: "{}",
                    type: ""
                }
            }
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        isHideTitle: {
            type: Boolean,
            default: false
        },
        maxRows: {
            type: Number
        },
        rowNum: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            showMoreMenu: false,
            isMaxRowsMenu: false,
            //教务单点
            jwloginsso: dsf.config.login.jwloginsso || "",
            menunumlist:[],//角标列表
        }
    },
    computed: {
        isShowCard() {
            return this.menu.child.some(item => item.isshow)
        },
        alwaysShowChildren() {
            let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
            return this.menu.child.filter(item => item.isshow).slice(0, length)
        },
        collapseChildren() {
            let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
            return this.menu.child.filter(item => item.isshow).slice(length)
        }
    },
    created() {
        if (this.maxRows) {
            let showMaxRowsMenu = this.menu.child.filter(subItem => {
                return subItem.isshow
            })
            if (showMaxRowsMenu.length > this.rowNum * this.maxRows) {
                this.showMoreMenu = true
                this.isMaxRowsMenu = true
            }
        }
        this.getJwMessage();
    },
    mounted() { },
    methods: {
        // 折叠
        collapse() {
            this.showMoreMenu = !this.showMoreMenu
        },
        //接收教务传回的数据
        getJwMessage(){
            let self = this;
            window.addEventListener('message',function(event){
                if(event.data && event.data.type){
                    let data = event.data;
                    if(data.type == "getNum"){//获取角标
                        let menunumlist = data.list;
                        self.menunumlist = menunumlist;
                        self.setMenuNum();
                    }
                }
            })
        },
        //角标赋值
        setMenuNum(){
            let self = this;
            let menunumlist = self.menunumlist;
            let mainMenu = self.alwaysShowChildren;
            menunumlist.forEach(item=>{
                let appsubscript = item.appsubscript;
                mainMenu.forEach(menu=>{
                    if(menu.name == appsubscript){
                        this.$set(menu,"badgeNum",item.number);
                    }
                });
            });
        },
    }
}
</script>
<style lang="scss" scoped>
@import "../application.scss";
.hideiframe { 
    display: none;
}
</style>
  