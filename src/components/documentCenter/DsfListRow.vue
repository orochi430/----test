<template functional>
  <div class="ds-listRow">
    <slot name="default" />
    <div v-if="$slots.tabspageCheck" class="tabspageCheck">
      <slot name="tabspageCheck" />
    </div>
    <div class="tabspage">
      <div v-if="$slots.header" class="ds-listRow-header">
        <slot name="header" />
      </div>
      <div v-if="$slots.content" class="ds-listRow-content">
        <slot name="content" />
      </div>
      <div v-if="$slots.footer" class="ds-listRow-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.ds-listRow{
  background-color: #ffffff;
  // border-radius: 7px;
  position: relative;
	// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
}

.ds-listRow-header{
  color: $fontColor_main;
  padding: 20px 20px 0;
  margin-bottom: 10px;
  box-sizing: border-box;
  // text-align: justify;
  text-align: left;
  @include font_3;

}
.tabspageCheck{
  padding:10px 15px;
  ::v-deep .van-checkbox{
    justify-content: flex-end;
  }
}
.ds-listRow-content{
  margin-top: 10px;
  padding: 0 20px 10px;
  box-sizing: border-box;
}
.ds-listRow-footer{
  border-top: 1px solid #f5f5f5;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
