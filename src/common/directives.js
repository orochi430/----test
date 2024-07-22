export default {
    'long-press': {
        bind: function (el, binding, vNode) {
            if (typeof binding.value !== 'function') {
                console.warn(`Vue.longPress: provided expression '${binding.expression}' is not a function.`);
                return;
            }
            let pressTimer = null;
            // 创建计时器
            const start = (e) => {
                if (e.type === 'click' && e.button !== 0) {
                    return;
                }
                if (pressTimer === null) {
                    pressTimer = setTimeout(() => {
                        binding.value(e);
                    }, 500);
                }
            };
            // 取消计时器
            const cancel = () => {
                if (pressTimer !== null) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
            };
            // 添加事件监听
            el.addEventListener('mousedown', start);
            el.addEventListener('touchstart', start, { passive: true });
            el.addEventListener('click', cancel);
            el.addEventListener('mouseout', cancel);
            el.addEventListener('touchend', cancel);
            el.addEventListener('touchcancel', cancel);
        },
    }
}