// 动态显示提示语JS
/*
https://tool.css-js.com/
主要作用：有些单位不想要正在初始化的提示语，需要用到图片，
在加载的时候判断参数是否需要加载图片，如果没有参数则使用原来的提示语
访问方式就是在地址后面加参数，
如：
autoLoginToUrl/1468121978405642241-6afc68af618a48f3a26d7b0a44ea29f2/L2luZGV4/4862?loadimg=1
loadimg=1标识使用图片，无此参数就用原来的提示语
图片自行替换static/squMenu/loading.gif

2022年4月22日22:40:43
@ly
*/
(function () {

    function getQueryVariable(variable) {
        var query = window.location.href.split("?")[1] || window.location.search.split("?")[1]
        if (query) {
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1].includes('#') ? pair[1].split('#')[0] : pair[1];
                }
            }
        }
        return (false);
    }

    let a = document.querySelector(".init-div")
    let b = document.querySelector(".init-imgdiv")
    let c = document.querySelector(".init-img")
    let img = getQueryVariable("loadimg")
    let count = 0;
    function init() {
        if (count == 0) {
            if (img == "1") {
                b.style.display = "block"
                c.src = "static/squMenu/loading.gif"
            } else {
                a.style.display = "block"
            }
        }
        count++
    }
    init()

})();
