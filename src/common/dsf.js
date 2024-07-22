/* eslint-disable no-unused-vars */
//修复低版本浏览器本身的jsapi功能缺失的缺陷

//增加string的startsWith
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) === prefix;
    };
}
//增加string的endsWith
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i], i);
        }
    }
}
if (typeof Array.prototype.filter != 'function') {
    Array.prototype.filter = function(callback) {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            var r = callback(this[i]);
            if (r === true) {
                result.push(this[i]);
            }
        }
        return result;
    }
}

let hasConsole = typeof console === 'object';

let getProto = Object.getPrototypeOf;
let $types = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol']
let class2type = {};
let hasOwn = class2type.hasOwnProperty;
let fnToString = hasOwn.toString;
let ObjectFunctionString = fnToString.call(Object);
let toString = class2type.toString;
$types.forEach((elem, i) => {
    class2type["[object " + elem + "]"] = elem.toLowerCase();
});

let uuidCharts = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

let $files = [{
    'absolutePath': "",
    'contentType': "",
    'id': "",
    'name': "",
    'originalFileName': "",
    'relativePath': "",
    'size': 0,
    'suffix': "",
    'uploadDate': ""
}];

let $dsf = {
    noop: function() {},
    //获取唯一标识
    uuid: function(len, radix) {
        var chars = uuidCharts,
            uuid = [],
            i;
        radix = radix || chars.length;
        len = len || 16;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    },
    UUID: function() {
        return this.uuid()
    },
    //验证是否不为undefind或者null
    isDef: function(obj) {
        return obj !== undefined && obj != null;
    },
    //验证是否为undefind或者null
    isUnDef: function(obj) {
        return obj === undefined || obj === null;
    },
    //获取对象类型
    type: function(obj) {
        if (obj == null) {
            return obj + "";
        }
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    //验证是否为一个空对象
    isEmptyObject: function(obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    },
    //验证是否是一个纯粹的对象
    isPlainObject: function(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    //验证类型是否为函数
    isFunction(fn) {
        return $dsf.type(fn) == "function";
    },
    //代理console.log
    log: function() {
        if (hasConsole) {
            Function.apply.call(console.log, console, arguments);
        }
    },
    //代理console.time
    time: function() {
        if (hasConsole) {
            var method = console.time;
            Function.apply.call(method, console, arguments);
        }
    },
    //代理console.timeEnd
    timeEnd: function() {
        if (hasConsole) {
            var method = console.timeEnd;
            Function.apply.call(method, console, arguments);
        }
    },
    //代理console.warn
    warn: function() {
        if (hasConsole) {
            var method = console.warn || console.log;
            Function.apply.call(method, console, arguments);
        }
    },
    //代理console.error
    error: function() {
        if (hasConsole) {
            var method = console.error || console.log;
            Function.apply.call(method, console, arguments);
        }
    },
    //类似jQuery.extend方法，可用于浅拷贝，深拷贝
    mix: function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    copy = options[name];

                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if (name === "__proto__" || target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ($dsf.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {
                        src = target[name];

                        // Ensure proper type for the source value
                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        } else if (!copyIsArray && !$dsf.isPlainObject(src)) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;

                        // Never move original objects, clone them
                        target[name] = $dsf.mix(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },
    //获取元素某个计算后的css属性
    getCss: function(curEle, attr) {
        var val = null,
            reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else { //ie6~8不支持上面属性
            //不兼容
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"]; //'alpha(opacity=12,345)'
                reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        return parseFloat(val)
    },
    getUploadFileInfo(str, index) {
        let files = $files;
        if (str) {
            let result = JSON.parse(str);
            if (dsf.type(result) == "array") {
                files = result;
            } else if (dsf.type(result) == "object") {
                files = [result];
            }
        }
        if (dsf.isDef(index)) {
            return files[index];
        }
        return files;
    },
    //获取cookie值
    getCookie:function(cookie_name){
      var allcookies = document.cookie;
      //索引长度，开始索引的位置
      var cookie_pos = allcookies.indexOf(cookie_name);
      // 如果找到了索引，就代表cookie存在,否则不存在
      if (cookie_pos != -1) {
        //把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1;
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
          cookie_end = allcookies.length;
        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
      }
      return value;
    },
    getCurrentTime:function(){
        var d = new Date();       
        var year = d.getFullYear();   
        var month = d.getMonth()+1;    
        var date = d.getDate();    
        var day = d.getDay();    
        var hours = d.getHours();    
        var minutes = d.getMinutes();   
        var seconds = d.getSeconds();   
        var ms = d.getMilliseconds();   
        var curDateTime= year; 
        if(month>9) 
            curDateTime = curDateTime +""+month; 
        else  
            curDateTime = curDateTime +"0"+month; 
        if(date>9) 
            curDateTime = curDateTime +""+date; 
        else 
            curDateTime = curDateTime +"0"+date; 
        if(hours>9) 
            curDateTime = curDateTime +""+hours; 
        else 
            curDateTime = curDateTime +"0"+hours; 
        if(minutes>9) 
           curDateTime = curDateTime +""+minutes;  
        else  
            curDateTime = curDateTime +"0"+minutes;
        if(seconds>9)
            curDateTime = curDateTime +""+seconds;
        else
            curDateTime = curDateTime +"0"+seconds; 

        if(ms>99)
            curDateTime = curDateTime +""+ms;
        else if(ms>9)
            curDateTime = curDateTime +"0"+ms;
        else
            curDateTime = curDateTime +"00"+ms; 

        return curDateTime;
    }
}
if(window.dsf){
    window.dsf.mix(dsf,$dsf)
    if (!dsf.themeConfig) {
        dsf.themeConfig = {};
      }
      dsf.themeConfig.setting = {
        defaultAsideMini: 0,
        defaultHeaderCeiling: 0,
        defaultHeaderMini: 0,
        fontSize: "normal",
        theme: "blue-theme",
        fontSizeMap: {
          bigFont: 16,
          bigFont_1: 18,
          bigFont_2: 20,
          bigFont_3: 22,
          normal: 14,
          smallFont: 12
        }
      };
    //window.dsf = Object.create($dsf);
}
else{
    window.dsf = Object.create($dsf);
}
