<template functional>
  <div class="ds-card">
    <slot name="default" />
    <div class="tabspage">
      <div v-if="$slots.tabspageCheck" class="tabspageCheck">
        <slot name="tabspageCheck" />
      </div>
      <div style="flex: 1;overflow: hidden;">
        <div v-if="$slots.header" class="ds-card-header">
          <slot name="header" />
        </div>
        <div v-if="$slots.content" class="ds-card-content">
          <slot name="content" />
        </div>
      </div>
      <div v-if="$slots.rightIcon" class="rightIcon">
        <slot name="rightIcon" />
      </div>
    </div>
    <div v-if="$slots.footer" class="ds-card-footer">
      <slot name="footer" />
    </div>
    <div v-if="$slots.footermin" class="ds-card-footer ds-card-footer2">
      <slot name="footermin" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.ds-card{
  background-color: #ffffff;
  // border-radius: 7px;
  position: relative;
	// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  box-shadow: 0 1px 10px 0 rgba(191,191,191,0.26);
  border-radius: 3px;
}
.ds-card + .ds-card {
  margin-top: 10px;
}
.ds-card-header{
  color: $fontColor_main;
  padding: 15px 10px 0;
  // margin-bottom: 10px;
  box-sizing: border-box;
  // text-align: justify;
  text-align: left;
  @include font_4;

}
.tabspageCheck{
  // position: absolute;
  // right: 0;
  // top: 0;
  padding: 0 5px 0 15px;
  display: flex;
  align-items: center;
  
  ::v-deep .van-checkbox{
    justify-content: flex-end;
  }
}
.ds-card-content{
  // margin-top: 10px;
  // padding: 0 16px 10px;
  // padding: 0px 10px 15px 10px;
  padding: 10px 10px 15px;
  box-sizing: border-box;
}
.ds-card-footer{
  border-top: 1px solid $separate_color;
  padding: 10px;
  box-sizing: border-box;
}
.ds-card-footer2{
  padding: 0px 16px !important;
}
.tabspage {
  display: flex;
}
.rightIcon {
  padding: 15px 10px 10px 0;
}
</style>
