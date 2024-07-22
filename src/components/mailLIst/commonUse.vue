<template>
  <div class="organization fc pt10">
    <div class="organizationPerson  flex1 " v-show="userList.length>0">
      <div class="personInfo disfr ac" v-for="(item,index) in userList" :key="index" @click="toDetail(item)">
        <img v-if="item.photoSrc" class="userImg" :src="item.photoSrc" />
        <div v-else class="userImg">{{item.userName | filterName}}</div>
        <div class="itemContent fc jsb">
          <span class="personName">{{item.userName}}</span>
          <span class="personNum">{{item.mobile}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import "./iconfont.css"
export default {
  props:{
		keyword: {
			type: String,
			default: ''
		},
		initOrgId: {
			type: String,
			default: ''
		},
		isShowCount: {
			type: Boolean,
			default: true
		},
		url:{
			type: String,
			default: ''
		}
	},
  data(){
    return {
       userList:[],
       allData:{},

    }
  },
  created(){
		this.userInfo = dsf.util.loadSessionStore('user');
    this.init()
  },
  methods:{
    toDetail(data){
      this.$router.push({name:"mailDetail",params:data})
    },
    init(){
      this.crumbsList=[]
			let params = this.initOrgId&&this.userInfo?{orgId:this.userInfo[this.initOrgId]}:{};
      dsf.http.post(this.url,params).then((res)=>{
        // this.allData=res.data.data;
        // this.changeCrumbs(this.allData);
				//this.userList=res.data.data;
      })
    },
    toNext(data){
      if(data.hasChildren){
        this.$toast.loading({});
        if(this.timeout){
            clearTimeout(this.timeout)
          }
          this.timeout = setTimeout(() => {
            this.timeout = null;
            dsf.http.post(this.url,{orgId:data.id,keyword: this.keyword}).then((res)=>{
              let resData=res.data.data
              // if(resData.depts&&resData.depts.length){
                this.organization=resData.depts
                this.userList=resData.users
              // }
              this.breadList.push(data)
            })
            this.changeCrumbs(data)
            this.$toast.clear()
          }, 500)
      }
    },
    deepCopy(data){
      return JSON.parse(JSON.stringify(data))
    },
    changeCrumbs(data){
      let obj=this.deepCopy(data)
      this.crumbsList.push(obj)
      console.log(this.crumbsList)
    },

  },
  filters:{
    filterName(name){
      return name.slice(0,1)
    },
    userAvatar(name) {
        return name.slice(0, 1)
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

  .organizationPerson {
    padding: 0 15px;
    background: white;

    .userImg {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 42px;
        @include background-theme("normal");
      color: #FFFFFF;
      text-align: center;
      line-height: 40px;
    }
    img.userImg{
      background:none;
    }
    .personInfo{
      padding:15px 0;
      height:61px;
      border-bottom: 0.5px solid #F4F4F4;
      .personName{
        font-size: var(--font_size_1);
        color:black;
        margin-bottom:4px;
      }
      .personNum{
        font-size:13px;
        color: #666666;
      }
    }
  }
    .fc {
    display: flex;
    flex-direction: column;
  }
  .jsb {
    justify-content: space-between;
  }
  .flex1 {
    flex: 1;
  }

  .disfr {
    display: flex;
  }
</style>
