var TouchMoveScale = class TouchMoveScale {
  constructor(option) {
    this.touchDom = option.touchDom;
    this.transformDom = option.transformDom;
    this.transformData = {
      x: option?.transformData?.x || 0,
      y: option?.transformData?.y || 0,
      scale: option?.transformData?.scale || 1
    }
    this.maxScale = option.maxScale || Infinity
    this.minScale = option.minScale || 0
    this.store = {
      x: 0,
      y: 0,
      distance: 1
    }
    this.touchType = ''
    this.scaleTranslateProportion = []
    this.init()
  }
  init() {
    this.touchDom.addEventListener('touchstart', this.touchstart.bind(this))
    this.touchDom.addEventListener('touchmove', this.touchmove.bind(this))
    this.touchDom.addEventListener('touchend', this.touchend.bind(this))
    this.transformDom.style.transition = "all .3s"
  }

  touchstart(e) {
    console.log('缩放开始')
    e.preventDefault()
    if (e.touches.length === 1) {
      this.moveStart(e.touches[0].clientX, e.touches[0].clientY);
      this.touchType = "move";
    } else if (e.touches.length === 2) {
      this.store.x2 = e.touches[1].clientX
      this.store.y2 = e.touches[1].clientY
      this.touchType = "scale";
    }
    this.store.moveable = true;
    this.store.originScale = this.transformData.scale || 1;
  }

  // 开始移动的方法: 记录首次的数据
  moveStart(x, y) {
    this.store.x = x;
    this.store.y = y;
  }

  // 获取两点间距离
  getDistance(a, b) {
    const x = Math.abs(a.x - b.x);
    const y = Math.abs(a.y - b.y);
    return Math.sqrt(x * x + y * y)
  }

  // 获取两点坐标的中点
  getCenter(a, b) {
    const x = (a.x + b.x) / 2;
    const y = (a.y + b.y) / 2;
    return { x: x, y: y }
  }
  touchmove(e) {
    console.log('缩放移动')
    if (!this.store.moveable) {
      return;
    }
    e.preventDefault()
    if (e.touches.length === 1 && this.touchType === "move") {
    } else if (e.touches.length === 2) {
      let touches1 = e.touches[0]
      let touches2 = e.touches[1]
      if (!this.store.x2) {
        this.store.x2 = touches2.clientX
      }
      if (!this.store.y2) {
        this.store.y2 = touches2.clientY
      }
      let zoom = this.getDistance({ x: touches1.clientX, y: touches1.clientY }, { x: touches2.clientX, y: touches2.clientY }) / this.getDistance({ x: this.store.x, y: this.store.y }, { x: this.store.x2, y: this.store.y2 })
      let newScale = this.store.originScale * zoom
      if (newScale > this.maxScale) {
        newScale = this.maxScale
      }
      if (newScale < this.minScale) {
        newScale = this.minScale
      }
      let obj = this.getCenter({ x: touches1.clientX, y: touches1.clientY }, { x: touches2.clientX, y: touches2.clientY })
      this.transformData.scale = newScale
      console.log(this.transformData)
      parent.window.scalenumber = Number(newScale.toFixed(1))
      this.transformDom.style.transform = `scale(${newScale.toFixed(1) || 1}, ${newScale.toFixed(1) || 1})`;
      console.log(obj, '位置')
      this.transformDom.style.transformOrigin = `${obj.x+50}px ${obj.y+50}px 0px`
      // this.transformDom.style.transformOrigin = `0,0,0`
    }
  }
  touchend() {
    this.store.moveable = false;
    delete this.store.x2
    delete this.store.yy2
  }
}
export default TouchMoveScale;