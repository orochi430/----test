import {
  Toast,
  Dialog
} from 'vant';
export default {
  toast: function (str, type, func) {
    if (!str) {
      return
    }
    let opions = {
      duration: 2000,
      message: str,
      onClose() {
        if (func) func()
      }
    }
    if (dsf.isDef(type)) {
      if (typeof type === "function") {
        func = type;
      } else if (type === "html") {
        opions.type = "html";
      } else {
        opions.type = type ? "success" : "fail";
      }
    }
    Toast(opions);
  },
  loading: function (str, close) {
    return Toast.loading({
      message: str || '加载中...',
      forbidClick: true,
      duration: 0,
      onClose: close ? close : dsf.noop
    });
  },
  clear() {
    Toast.clear();
  },
  closeLoading: function (loaderIndex) {
    loaderIndex && loaderIndex.clear();
  },
  alert: function (opts, callback) {
    Dialog.alert(opts).then(() => {
      if (callback) {
        callback();
      }
    });
  },
  confirm: function (opts, callback, errback) {
    Dialog.confirm(opts).then(() => {
      if (callback) {
        callback();
      }
    }).catch(() => {
      errback && errback();
    });
  }
}
