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
    this.isSign = option.isSign;
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
    e.stopPropagation()
    e.cancelBubble = true;
    if (e.touches.length === 1) {
      this.moveStart(e.touches[0].clientX, e.touches[0].clientY);
      let disx = e.touches[0].clientX - this.transformDom.offsetLeft
      let disy = e.touches[0].clientY - this.transformDom.offsetTop
      this.transformData.x = disx
      this.transformData.y = disy
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
  move (x, y) {
    let styleStr = this.transformDom.getAttribute('style')
    let scale = styleStr.split('scale(')
    if (scale.length >= 2) {
      let num = scale[1].split(', ')[0]
      let active = document.querySelector('.smt-tab-write') ? document.querySelector('.smt-tab-write').className.split(' ') : [];
      //  || !this.isSign
      if ((Number(num) > 1 && !active.includes('active'))) {
        this.transformDom.style.position = 'relative'
        this.transformDom.style.left = (x - this.transformData.x).toFixed(1) + 'px'
        this.transformDom.style.top = (y - this.transformData.y).toFixed(1) + 'px'
      }
      if (Number(num) === 1) {
        this.transformDom.style.transform = `scale(1, 1})`;
        this.transformDom.style.left = 0 + 'px'
        this.transformDom.style.top = 0 + 'px'
      }
    }
  }
  touchmove(e) {
    if (!this.store.moveable) {
      return;
    }
    e.stopPropagation()
    e.cancelBubble = true;
    if (e.touches.length === 1 && this.touchType === "move") {
      this.move(e.touches[0].clientX, e.touches[0].clientY)
    } else if (e.touches.length === 2) {
      let active = document.querySelector('.smt-tab-write') ? document.querySelector('.smt-tab-write').className.split(' ') : [];
      if (active.includes('active')) {
        return
      }
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
      // this.transformData.x += obj.x
      // this.transformData.y += obj.y
      this.transformData.scale = newScale
      parent.window.scalenumber = Number(newScale.toFixed(1))
      this.transformDom.style.transform = `scale(${newScale.toFixed(1) || 1}, ${newScale.toFixed(1) || 1})`;
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