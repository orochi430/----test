<template>
  <div class="cube-scroll-nav cube-scroll-nav_side">
    <cube-sticky ref="sticky" :pos="scrollY" @change="stickyChangeHandler">
      <cube-scroll ref="scroll" :scroll-events="scrollEvents" :options="options" :data="data" @scroll="scrollHandler" @scroll-end="scrollEndHandler" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
        <slot name="prepend"></slot>
        <div class="cube-scroll-nav-main">
          <cube-sticky ref="pageSticky" :offset="pageStickyOffset" :pos="scrollY" @change="pageStickyChangeHandler">
            <div class="cube-scroll-nav-panels">
              <slot></slot>
            </div>
          </cube-sticky>
        </div>
      </cube-scroll>
    </cube-sticky>
  </div>
</template>

<script type="text/ecmascript-6">
import CubeSticky from './sticky.vue'
import CubeStickyEle from './sticky-ele.vue'
import CubeScroll from './scroller.vue'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

const COMPONENT_NAME = 'cube-scroll-nav'
const EVENT_CHANGE = 'change'
const EVENT_STICKY_CHANGE = 'sticky-change'

export default {
  name: COMPONENT_NAME,
  provide() {
    return {
      scrollNav: this
    }
  },
props: {
    options: {
    type: Object,
    default() {
      return {}
    }
  },
    data: {
      type: Array
    },
    speed: {
      type: Number,
      default: 300
    },
    side: {
      type: Boolean,
      default: true
    },
    current: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      scrollEvents: ['scroll', 'scroll-end'],
      scrollY: 0,
      panels: [],
      active: this.current,
      pageStickyOffset: 0
    }
  },
  computed: {
    labels() {
      return this.panels.map((panel) => panel.label)
    },
    barTxts() {
      return this.panels.map((panel) => panel.title)
    },
    barDirection() {
      return this.side ? DIRECTION_V : DIRECTION_H
    }
  },
  watch: {
    current(newVal) {
      this.stickyCurrent = newVal
      this.active = newVal
      this.jumpTo(newVal)
    },
    active(newVal) {
      this.$emit(EVENT_CHANGE, newVal)
    },
    data() {
      this.refresh()
    }
  },
  created() {
    this.navBar = null
    this.stickyCurrent = this.current
  },
  mounted() {
    this.$nextTick(() => {
      if (this.side) {
        const fixedEle = this.$refs.pageSticky.$refs.fixedEle
        this.$refs.scroll.$el.appendChild(fixedEle)
      }
      if (!this.current) {
        this.active = this.stickyCurrent = this.labels[0]
      }
      this.refresh()
      this.jumpTo(this.current)
    })
  },
  methods: {
    refresh() {
      this.navBar && this.navBar.refresh()
      this.$refs.sticky.refresh()
      this.$refs.pageSticky.refresh()
      this.pageStickyOffset = this.side ? 0 : this.$refs.navBarEle.$el.offsetHeight
      this.$refs.scroll.refresh()
    },
    setBar(bar) {
      this.navBar = bar
    },
    barChange(label) {
      this.active = label
      // waiting touchend
      // so the inner scroll won't affect the touchend logic
      this.$nextTick(() => {
        this.jumpTo(label)
      })
    },
    jumpTo(label) {
      if (!label) {
        return
      }
      const panel = this.getPanel(label)
      if (panel) {
        this._jumping = true
        const offset = this.pageStickyOffset
        this.$refs.scroll.scrollToElement(panel.$el, this.speed, 0, this.side ? offset : -offset)
      }
    },
    getPanel(label) {
      let panel = null
      this.panels.some((_panel) => {
        if (_panel.label === label) {
          panel = _panel
          return true
        }
      })
      return panel
    },
    pageStickyChangeHandler(current) {
      if (current === '') {
        current = this.labels[0]
      }
      this.stickyCurrent = current
      if (this._jumping) {
        return
      }
      this.active = current
    },
    stickyChangeHandler(current) {
      // when sticky change waiting dom changed
      // then refresh navBar(navBar will get correct height)
      this.$nextTick(() => {
        this.navBar && this.navBar.refresh()
      })
      this.$emit(EVENT_STICKY_CHANGE, current)
    },
    scrollHandler(pos) {
      this.scrollY = -pos.y
      if (!this._jumping) {
        this.active = this.stickyCurrent
      }
      this.$emit('scroll', this.scrollY)
    },
    scrollEndHandler() {
      this._jumping = false
    },
    addPanel(panel) {
      if (this.pullingDirection == 'down') {
        this.panels.unshift(panel)
      } else {
        this.panels.push(panel)
      }
    },
    removePanel(panel) {
      const i = this.panels.indexOf(panel)
      this.panels.splice(i, 1)
    },
    onPullingDown() {
      // this.scrollY = 0
      this.$refs.pageSticky.currentIndex = -1
      this.pullingDirection = 'down'
      this.$emit('pulling-down')
    },
    onPullingUp() {
      this.pullingDirection = 'up'
      this.$emit('pulling-up')
    }
  },
  components: {
    CubeSticky,
    CubeStickyEle,
    CubeScroll,
  }
}
</script>

<style lang="scss" scoped>
.cube-scroll-nav {
  position: relative;
  height: 100%;
  overflow: hidden;
  .cube-sticky-content {
    height: 100%;
  }
}
.cube-scroll-nav-main {
  overflow: hidden;
  > .cube-sticky {
    position: static;
  }
}
.cube-scroll-nav_side {
  > .cube-sticky {
    display: flex;
    > .cube-scroll-wrapper {
      flex: 1;
    }
    > .cube-sticky-fixed {
      position: relative;
      height: 100%;
      order: -1;
    }
  }
  .cube-scroll-nav-main {
    > .cube-sticky-ele {
      float: left;
    }
    > .cube-sticky {
      overflow: hidden;
    }
  }
}
</style>
