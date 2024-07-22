<template>
  <div class="box">
    <div class="list" v-for="(item, index) in deptList" :key="index" @click="goPush(item)">
      <div class="img"><img src="static\images\jiangsuyancao\info.png" alt="" /></div>
      <span>{{item.name}}</span>
    </div>
    <div class="list" v-for="(item,index) in userList" :key="index" @click="goPush(item)">
      <img :src="item.picture" style="width:9%;margin-right:10px;" />
      <div class="name">
        <span>{{item.name}}</span>
        <span>{{item.zj}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  created() {
    let url = "/fn/hrMobile/addressBook/getDeptList"
    if(this.$route.query.fid){
      url = url + `?parentId=${this.$route.query.fid}`
      dsf.url.setTitle(this.$route.query.name)
    }
    dsf.http.get(url).then(({ data }) => {
      this.deptList = data.data.deptList
      this.userList = data.data.userList
      this.userList.forEach(item => {
        item.picture = dsf.url.getWebPath(`/fn/file/downloadImage?fileName=${item.picture}`)
      })
    })
  },
  data() {
    return {
      deptList: [],
      userList: [],
    }
  },
  methods:{
    goPush(item){
      if("zj" in item){
        this.$router.push({
          path: `/commonForm/220110151337WVwkjPzwHzhinhg3C2q/${item.id}`
        })
      }else {
        this.$router.push({
          path: "/userInfo",
          query: {
            fid: item.id,
            name: item.name,
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.box {
  background-color: white;
  .list {
    display: flex;
    align-items: center;
    min-height: 60px;
    margin: 0 10px;
    padding: 5px 0;
    border-bottom: 1px #ccc solid;
    .img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      padding-left: 0.05rem;
      background-color: rgba(0, 0, 0, 0.05);
      img {
        width: 90%;
      }
    }
    span {
      font-size: var(--font_size_2);
      font-weight: 600;
      letter-spacing: 1;
    }
    .name {
      display: flex;
      flex-direction: column;
      span:nth-child(2) {
        color: #ccc;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
}
</style>