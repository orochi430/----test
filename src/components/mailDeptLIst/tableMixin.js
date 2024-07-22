export default {
  data() {
    return {
      timer: '',

    }
  },
  mounted() {

  },
  methods: {
    // 监听窗口变化
    debounce(fn, wait=500) {
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
          fn()
            }, wait);
    },

  }
}