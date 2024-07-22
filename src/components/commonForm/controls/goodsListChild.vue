<template>
  <div class="goodsListChild">
    <template v-for="(item, index) in goodsData">
      <div class="flex-box" :style="{ 'padding-left': getPadding(item.level, 1) }" @click="openChild(item)">
        <van-checkbox icon-size="20px" v-if="!item.attrs.noselect" v-model="item.checked" @click="goodsCheck(item)"
          :shape="`${multiple ? 'square' : 'round'}`">
          <div class="goods_name">{{ item.showName || item.name }}</div>
        </van-checkbox>
        <div v-else class="goods_name">{{ item.showName || item.name }}</div>
        <van-icon name="arrow-down" v-if="item.children.length > 0"
          :class="item.open ? 'arrowTransform' : 'arrowTransformReturn'" />
      </div>
      <collapseTransition>
        <div style="border-bottom: 1px solid #eee;" v-show="item.open">
          <template v-for="(cell, inx) in item.children">
            <template v-if="!cell.children.length && cell.attrs.type != 'category'">
              <div class="goods_child" :style="{ 'padding-left': getPadding(cell.level, 0) }">
                <van-checkbox icon-size="20px" class="child_check" v-model="cell.checked" @click="goodsCheck(cell)"
                  :shape="`${multiple ? 'square' : 'round'}`"></van-checkbox>
                <div class="goods_img" @click="imgSwipe({ imgArr: cell.attrs.img, name: cell.name })">
                  <img :src="cell.attrs.img?.length ? cell.attrs.img[0] : 'static/images/project/sxXTBG/moren.png'"
                    alt="">
                </div>
                <div class="goods_name goods_child_name">
                  <span>{{ cell.showName || cell.name }}</span>
                  <div class="goods_child_kc">
                    <span>库存：</span>
                    <span :style="{ color: (cell.attrs.stockCount ?? 0) == 0 ? 'red' : '#999' }">{{ cell.attrs.stockCount
                      ?? 0 }}</span>
                  </div>
                </div>
              </div>
            </template>
            <div v-else>
              <goods-list-child :goodsData="[cell]" :multiple="multiple" @imgSwipeShow="imgSwipe"
                @goodsCheck="goodsCheck" />
            </div>
          </template>
        </div>
      </collapseTransition>
    </template>
  </div>
</template>

<script>
import collapseTransition from "@/components/project/platform/conference/components/collapseTransition.jsx"
export default {
  name: 'goodsListChild',
  props: ["goodsData", "multiple"],
  components: { collapseTransition },
  data() {
    return {
    }
  },

  created() { },

  methods: {
    getPadding(level, flag) {
      // flag: 1是父级，0是子级
      return ((level + flag) * 15) + 'px'
    },
    openChild(item) {
      this.$set(item, "open", !item.open);
    },
    imgSwipe(imgObj) {
      if (!imgObj.imgArr.length) return
      this.$emit("imgSwipeShow", imgObj);
    },
    goodsCheck(item) {
      this.$emit("goodsCheck", item);
    }
  }
}
</script>

<style scoped lang='scss'>
.goodsListChild {
  background-color: #fff;

  .flex-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 10px;
    border-bottom: 1px solid #eee;

    .goods_name {
      display: inline-block;
      font-size: 16px;
      color: #333;
      text-align: left;
    }
  }

  .goods_child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    background-color: #fafafa;

    .goods_img {
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 6px;
      width: 40px;
      height: 40px;
      margin-left: 15px;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .goods_child_name {
      display: flex;
      flex-direction: column;
      height: 40px;
      justify-content: space-evenly;
      font-size: 16px;
      margin-left: 15px;

      .goods_child_kc {
        font-size: 14px;
        color: #999;
      }
    }
  }
}

.arrowTransform {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(180deg);
}

.arrowTransformReturn {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(0deg);
}
</style>