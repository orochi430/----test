<template>
<div class="database-component">
  <div class="title">资料库</div>
  <div class="menus">
    <div class="left" :style="{backgroundImage: `url('static/images/wanzhengtong/资料库1.png')`}" @click="to('xijingping')">
      <span>习近平系列重要<br/>讲话数据库</span>
    </div>
    <div class="right">
      <div :style="{backgroundImage: `url('static/images/wanzhengtong/资料库2.png')`}" @click="to('stateCouncil')">
        <span>国务院文件库</span>
      </div>
      <div :style="{backgroundImage: `url('static/images/wanzhengtong/资料库3.png')`}" @click="to('anhui')">
        <span>安徽省文件库</span>
      </div>
      <div :style="{backgroundImage: `url('static/images/wanzhengtong/资料库4.png')`}" @click="to('government')">
        <span>政务知识库</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    to(name) {
      if(dsf.config.wanzhengtong && dsf.config.wanzhengtong.dataBase && dsf.config.wanzhengtong.dataBase[name]) {
        if(window.dd) {
          dd.openLink({
            url: dsf.config.wanzhengtong.dataBase[name]
          }).then(res => {
              console.log(res)
          }).catch(err => { })
        } else {
          this.$router.push({
            path: "/iframe",
            query: {
                url: dsf.config.wanzhengtong.dataBase[name]
            }
          })
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.database-component {
  margin: 15px;
  .title {
    padding-bottom: 15px;
    font-size: var(--font_size_2);
    font-weight: 600;
  }
  .menus {
    display: flex;
    justify-content: space-between;
    .left {
      width: 45%;
      background-size: cover;
      background-position: center;
      span {
        padding: 20px 0 0 10px;
        display: flow-root;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .right {
      width: 53%;
      &>div {
        height: 47px;
        background-size: cover;
        background-position: center;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        span {
          padding-left: 20px;
          line-height: 47px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>