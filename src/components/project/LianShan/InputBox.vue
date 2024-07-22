<template>
  <div>
    <div class="vnp-input-box">
      <ul>
        <li
          v-for="(item, index) in val"
          :key="index"
          :class="{ active: activeIndex === index }"
          @click="handleClickItem(index)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <span class="spans" @click="getJy" v-show="showName" >新能源</span>
  </div>
    
  </template>
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: "",
      },
      editable: {
        type: Boolean,
        default: false,
      },
      formData:{type:Object},
    },
    data() {
      return {
        showName:true,
        // 默认
        val: ["川", "","","","","",""],
        Nem:this.formData,
        but:'',
        activeIndex: this.editable ? 0 : undefined,
      };
    },
    watch: {
      activeIndex() {
        this.$emit("activeChange", this.activeIndex);
      },
      // value: {
      //   immediate: true,
      //   handler() {
      //     if (this.val.join("") === this.value) {
      //       return;
      //     }
      //     const val = this.value.split("");
      //     if (this.editable) {
      //       this.activeIndex = val.length;
      //     }
      //     while (val.length < 8) {
      //       val.push("");
      //     }
      //     this.val = val;
      //   },
      // },
      val(Na) {
        this.$emit("input", this.val.join(""));
      },
    },
    mounted(){
     this.but = this.Nem.main.B0001.value.split("")

     if(this.but.length != 0 && this.but.length > 6 ){
      this.val = this.but
     }
    },
    methods: {
      getJy(){
        console.log('我点击了新');
        if(this.val.length == 7){
          this.val.push("")
        }else if(this.val.length == 8){
          this.val.pop("")
        }
      },
      handleClickItem(index) {
        if (!this.editable) {
          return;
        }
        this.activeIndex = index;
      },
      setValue(val) {
        this.$set(this.val, this.activeIndex, val);
        if (this.activeIndex < 7) {
          this.activeIndex += 1;
        }
      },
    // 删除  
      del() {
        this.$set(this.val, this.activeIndex, "");
        if (this.activeIndex > 0) {
          this.activeIndex -= 1;
        }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .spans{
    width: 55px;
    height: 35px;
    background: rgb(7,193,96);
    // padding: 0 16px;
    color: white;
    font-size: var(--font_size_3);
    border: none;
    text-align: center;
    line-height: 35px;
    border-radius: 3px;
    cursor: pointer;
    float:right;
    margin-top: -0.80rem;
    margin-right: -65px;
  }
  .vnp-input-box {
    padding: 10px 0;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
    color: #8d8d8d;
    font-size: 15px;
    text-align: center;
    ul {
      display: flex;
    }
    li {
      flex: 1;
      border-right: 1px solid #eaeaea;
      height: 28px;
      line-height: 28px;
  
      &:first-child {
        border-color: #a6a6a6;
        flex: 1.3;
      }
      &:last-child {
        border: none;
      }
      &.active {
        color: #1989fa;
  
        > span {
          height: 100%;
          width: 20px;
          display: inline-block;
          border-bottom: 1px solid #1989fa;
        }
      }
    }
  }
  </style>
  