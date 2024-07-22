let loadUrls=[]
function loadJs(src) {
    return new Promise((resolve, reject) => {
        if (loadUrls.indexOf(src)>-1) {//如果注册过该JS了 直接返回
            resolve()
            return
        }
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);

        script.onload = () => {
            loadUrls.push(src)//注册成功添加到已注册列表
            resolve();
        }
        script.onerror = () => {
            reject();
        }
    })
}

export default loadJs