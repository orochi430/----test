/**
 *2023年4月20日19:39:00
 *  @luy 
 */

/**
 * 动态加载css文件
 */
let loadUrls = []
function load(url) {
    return new Promise((resolve, reject) => {
        if (loadUrls.indexOf(url) > -1) {//如果注册过该CSS了 直接返回
            resolve()
            return
        }

        let element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", url + "?t=" + new Date().getTime());
        document.head.appendChild(element);

        if (element.attachEvent) {
            // NOTICE:
            // 1. "onload" will be fired in IE6-9 when the file is 404, but in
            // this situation, Opera does nothing, so fallback to timeout.
            // 2. "onerror" doesn't fire in any browsers!
            element.attachEvent('onload', () => {
                loadUrls.push(url)//注册成功添加到已注册列表
                resolve();
            });
        }
        else {
            setTimeout(function () {
                poll(element);
            }, 1);
        }
        // polling for Firefox, Chrome, Safari
        function poll(node) {
            var isLoaded = false;
            if (/webkit/i.test(navigator.userAgent)) {//webkit
                if (node['sheet']) {
                    isLoaded = true;
                }
            }
            // for Firefox
            else if (node['sheet']) {
                try {
                    if (node['sheet'].cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    // NS_ERROR_DOM_SECURITY_ERR
                    if (ex.code === 1000) {
                        isLoaded = true;
                    }
                }
            }
            if (isLoaded) {
                // give time to render.
                setTimeout(() => {
                    loadUrls.push(url)//注册成功添加到已注册列表
                    resolve();
                }, 1);
            }
            else {
                setTimeout(function () {
                    poll(node);
                }, 1);
            }
        }
    })

}

/**
 * 加载全局的表单特殊css
 */
function loadForm() {
    let formCssUrl = dsf.config.projectName ? `static/css/${dsf.config.projectName}/form.css` : `static/css/form.css`
    return load(formCssUrl)
}

export default { load, loadForm }