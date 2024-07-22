<template>
  <!-- 山东东营友情链接 -->
  <div>
    <div>
        <ul>
            <li v-for="(item,index) in imgAppUrl" :key="index" class="list" @click="imgUrl(index)">
                <img referrerPolicy='no-referrer' 
                     :src=item.imgAppUrl  alt="">
                <div>{{ item.bt }}</div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:"blogroll",
    data(){
      return{
        bt:[], //标题的名称
        imgAppUrl:[], // 图片的路径
        appUrl:[],//跳转的路径
        imgurl:[],
      }
    },
    created(){
       this.initData() 
    },
    mounted(){},
    methods:{
        initData(){
            let pams ={
                bt:''
            }
            let this_ = this
            dsf.http.post("/fn/sjgwcPortalController/getFriendshipLink",pams).then(({data})=>{
                data.data.forEach(function (item){
                    this_.appUrl.push(item.appUrl)
                    let str = {
                        bt:item.bt,
                        imgAppUrl: dsf.url.getServerUrl(item.imgAppUrl.substring(1,item.imgAppUrl.length)),
                    }

                    this_.imgAppUrl.push(str)
                })
            })
        },
        //点击当前跳转
        imgUrl(index){
            this.appUrl.forEach(function (item,indexs){
                if(index == indexs){
                    location.href = item
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
 .list{
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
 }
</style>