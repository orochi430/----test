// 请求函数封装
import axios from "axios";
import qs from "qs";
import dsf from ".";
import url from "./url";
import store from "./util";
import { zzsw_http } from "./zzsw";

const Axios = axios.create({
    baseURL: "",
    timeout: 20000,
    responseType: "json",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        //"Content-Type": "text/plain;charset=UTF-8",
        Code: "pc"
    },
    withCredentials: true
});

const DEFAULT_ERROR = "网络存在异常";

// Axios.interceptors.response.use(response => {
//   //处理IE9请求json时不能自动转化成对象的问题
//   if (
//     response.data == null &&
//     response.config.responseType === "json" &&
//     response.request.responseText != null
//   ) {
//     try {
//       response.data = JSON.parse(response.request.responseText);
//     } catch (e) {
//       // ignored
//     }
//   }
//   return response;
// });
let errornum = 0;

Axios.interceptors.response.use(
    /**
     * 如果您想要获取诸如头或状态之类的http信息
     * 就 return  response => response
     */

    /**
     *通过自定义代码确定请求状态
     *这里只是一个例子
     *您还可以通过HTTP状态代码判断状态
     */
    response => {
        let res = response.data;
        if (res.status === 501) {
            dsf.layer.toast("操作被取消，暂时不能操作");
        } else if (res.status === 500) {
            dsf.layer.toast("未知异常！请重试，仍不能操作请联系管理员");
        }
        return response;
    },
    error => {
        console.log(error)
        errornum++;
        if (error.response) {
            const res = error.response;
            if (res.status === 401) {
                error.message = "";
                if (errornum == 1) { //只提示一次
                    if (store.getClientName() == "app" || store.getClientName() == "browser") { //app内或者浏览器访问  都返回登录页
                        dsf.layer.toast("您进行了未授权的访问,请重新登录！", undefined, function () {
                            errornum = 0;
                            store.logOut(true);
                        });
                    } else if (store.getClientName() == "mobileIM") {
                        dsf.layer.toast("您进行了未授权的访问", undefined, function () {
                            window.native?.goHome();
                        });
                    } else {
                        dsf.layer.toast("您进行了未授权的访问,请重新登录！", undefined, function () {
                            errornum = 0;
                        });
                        //store.logOut();
                    }
                }
            } else if (res.status === 400) {
                dsf.layer.toast("客户端错误！" + res.status);
            } else if (res.status === 403) {
                dsf.layer.toast("抱歉，您查看的信息已被撤销/删除。");
            } else if (res.status === 404) {
                console.log("网络请求不存在,请联系管理员！" + res.status);
            } else if (res.status === 500) {
                dsf.layer.toast("服务器异常,请稍后重试！" + res.status);
            } else if (res.status === 501) {
                dsf.layer.toast("您的操作被取消或不允许提交！" + res.status);
            } else if (res.status === 504) {
                dsf.layer.toast("网络错误,请联系管理员！" + res.status);
            } else {
                dsf.layer.toast("服务器正在开小差。。。。" + res.status);
            }
        } else if (error.message.includes("timeout")) {
            if (errornum == 1) { //只提示一次
                dsf.layer.toast("请求超时，请检查网络连接！", undefined, function () {
                    errornum = 0;
                });
            }
        }
        return Promise.reject(error);
    }
);
// 请求拦截器
Axios.interceptors.request.use(
    config => {
        // 本地静态josn数据开关，文件存于static\staticJson下对应目录
        if (dsf.config.staticJson && dsf.config.staticJson.enable) {
            // 根据配置过滤例外请求
            if (dsf.config.staticJson.filterRequest &&
                dsf.config.staticJson.filterRequest.length > 0 &&
                dsf.config.staticJson.filterRequest.some((item) => (`${config.url}/`).includes(`/${item}/`))) {
                return config;
            }
            if (config.method == "post") {
                config.method = "get";
            }
            if (process.env.NODE_ENV == "development") {
                config.url =
                    config.url.replace(dsf.config.webRoot, "/static/staticJson/") +
                    ".json";
            } else {
                config.url = "../dist/static/staticJson/" + config.url.replace("../", "") + ".json";
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

window.Promise.prototype.done = function (fn) {
    function responseHandler(response) {
        return fn(response?.data || response);
    }
    let r = this.then(response => {
        return responseHandler(response);
    });
    return r;
};

window.Promise.prototype.error = function (fn) {
    // function errorHandler(error) {
    //   fn({
    //     capture: false,
    //     state: -1,
    //     message: DEFAULT_ERROR,
    //     error: error
    //   });
    // }
    // return this.catch(error => {
    //   errorHandler(error);
    // });

    return this.catch(fn);
};

window.Promise.prototype.always = function (fn) {
    this.finally(fn);
};

function get(path, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "GET")
    }
    else {
        path = url.getWebPath(path);
        let opts = {
            params: params,
            headers: {},
            paramsSerializer: function (params) {
                return qs.stringify(params, {
                    arrayFormat: "repeat"
                });
            }
        };
        if (store.loadSessionStore("loginToken")) {
            opts.headers["x-auth-token"] = store.loadSessionStore("loginToken");
        }
        opts.transformRequest = [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ];
        opts = dsf.mix(opts, options || {});
        let p = Axios.get(path, opts);
        return p;
    }
}

function getNoRootUrl(path, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "GET")
    }
    else {
        let AxiosNoRootUrl = axios.create({
            baseURL: "",
            timeout: 20000,
            responseType: "json"
        });
        let opts = {
            params: params,
            headers: {},
            paramsSerializer: function (params) {
                return qs.stringify(params, {
                    arrayFormat: "repeat"
                });
            }
        };

        opts.transformRequest = [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ];
        opts = dsf.mix(opts, options || {});
        let p = AxiosNoRootUrl.get(path, opts);
        return p;
    }
}

function postNoRootUrl(path, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "POST")
    }
    else {
        let AxiosNoRootUrl = axios.create({
            baseURL: "",
            timeout: 20000,
            responseType: "json"
        });
        //path = url.getWebPath(path);
        let configContentType =
            options && options.headers && options.headers["Content-Type"] ?
                options.headers["Content-Type"] :
                "";
        let opts = {
            headers: {}
        };
        opts.transformRequest = [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ];
        opts = dsf.mix(opts, options || {});
        let p = AxiosNoRootUrl.post(path, params, opts);
        return p;
    }
}

function post(path, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "POST")
    }
    else {
        path = url.getWebPath(path);
        let configContentType =
            options && options.headers && options.headers["Content-Type"] ?
                options.headers["Content-Type"] :
                "";
        /*   if (configContentType !== 'multipart/form-data') {
          params = qs.stringify(params);
        } */
        let opts = {
            headers: {}
        };
        if (store.loadSessionStore("loginToken")) {
            opts.headers["x-auth-token"] = store.loadSessionStore("loginToken");
        }
        opts.transformRequest = [
            function (data) {
                let ret;
                if (configContentType.includes("multipart/form-data")) {
                    ret = data;
                } else if (configContentType.includes("application/json")) {
                    ret = JSON.stringify(data);
                } else {
                    ret = "";
                    for (let it in data) {
                        ret +=
                            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                    }
                }
                return ret;
            }
        ];
        opts = dsf.mix(opts, options || {});
        let p = Axios.post(path, params, opts);
        return p;
    }
}

function postUrls(path, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "POST")
    }
    else {
        let paths = path.split("|");
        let allPromise = [];
        for (let index = 0; index < paths.length; index++) {
            let p1 = new Promise((resolve, reject) => {
                path = url.getWebPath(paths[index]);

                let opts = {
                    headers: {}
                };
                if (store.loadSessionStore("loginToken")) {
                    opts.headers["x-auth-token"] = store.loadSessionStore("loginToken");
                }
                opts.transformRequest = [
                    function (data) {
                        let ret = "";
                        for (let it in data) {
                            ret +=
                                encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                        }
                        return ret;
                    }
                ];
                opts = dsf.mix(opts, options || {});
                Axios.post(path, params, opts)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
            allPromise.push(p1);
        }
        // 调用Promise.all().then(res=>{})
        let allPromiseObj = Promise.all(allPromise);
        return allPromiseObj;
    }
}

function upload(path, file, params, options) {
    if (dsf.util.getClientName() == "zzsw") {
        return zzsw_http(path, params, "POST")
    }
    else {
        if (params?.file?.size === 0) {
            dsf.layer.toast(`不允许上传空文件`, false);
            return;
        }
        let opts = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        if (store.loadSessionStore("loginToken")) {
            opts.headers["x-auth-token"] = store.loadSessionStore("loginToken");
        }
        opts = dsf.mix(opts, options || {});
        let forms = new FormData();
        file && forms.append("file", file);
        for (let k in params) {
            forms.append(k, params[k]);
        }
        path = url.getWebPath(path);
        let p = Axios.post(path, forms, opts);
        return p;
    }
}

export default {
    get,
    post,
    upload,
    getNoRootUrl,
    postNoRootUrl,
    postUrls,
    Axios
};
