/*通用事件总线*/
const eventBus = {
    emit() {
    },
    refulsMain(vm, obj) {
        vm.$bus.emit("refulshMain");
    },
    refresh(vm, obj) { //刷新首页或者列表数据
        dsf.noRefreshTitle = false
        if (obj&&obj.noRefreshTitle) {
            dsf.noRefreshTitle = true//如果是保存    就只刷新数据不刷新标题，否则就需要及刷新数据也刷新标题
        }
        vm.$bus.emit("refresh", obj);
    },
    onRefresh(vm, fn) { //首页或者列表数据接收
        vm.$bus.on("refresh", (data) => {
            if (fn) fn(data)
        });
    },
    refreshBadge(vm, obj) { //刷新角标数据
        dsf.noRefreshTitle = true
        vm.$bus.emit("refreshBadge", obj);
    },
    onRefreshBadge(vm, fn) { //监听刷新角标数据事件
        vm.$bus.on("refreshBadge", (data) => {
          if (fn) fn(data)
          dsf.noRefreshTitle = false
        });
    },
    listSend(vm, obj) { //列表中通过JS代码触发的发送操作
        vm.$bus.emit("listSend", obj);
    },
    onListSend(vm, fn) { //监听列表中通过JS代码触发的发送操作
        vm.$bus.on("listSend", (data) => {
            if (fn) fn(data)
        });
    },
    quanyue(vm, obj) { //手写签批通知刷新
        vm.$bus.emit("quanyue", obj);
    },
    OnQuanyue(vm, fn) { //手写签批通知刷新
        vm.$bus.on("quanyue", (data) => {
            if (fn) fn(data)
        });
    },
    // 人大系统刷新事件执行
    refreshNPC(vm, obj) {
        if (vm.$route.name == obj.name) vm.$bus.emit("refreshNPC", obj);
    },
    // 人大系统刷新事件通知
    OnrefreshNPC(vm, fn) {
        vm.$bus.on("refreshNPC", (data) => {
            if (vm.$route.name == data.name && fn) fn(data)
        });
    },

    DoSaveForm(vm, obj) { //通知表单保存
        vm.$bus.emit("SaveForm", obj);
    },
    OnDoSaveForm(vm, fn) { //接收表单保存
        vm.$bus.on("SaveForm", (data) => {
            if (fn) fn(data)
        });
    },
    btnWriteOpintion(vm, obj) { // 审批意见按钮
        vm.$bus.emit("btnWriteOpintion", obj);
    },
    OnBtnWriteOpintion(vm, fn) {
        vm.$bus.on("btnWriteOpintion", (data) => {
            if (fn) fn(data)
        });
    },
    Off(vm, offName) {
        vm.$bus.off(offName);
    },
    refreshSchedule(vm, obj) { // 日程刷新事件通知
        vm.$bus.emit("refreshSchedule", obj);
    },
    OnRefreshSchedule(vm, fn) { // 日程刷新事件监听
        vm.$bus.on("refreshSchedule", (data) => {
            if (fn) fn(data)
        });
    },
    emitSubformOnload(vm, obj) { // 子表加载完成事件通知
        vm.$bus.emit("SubformOnload", obj);
    },
    onSubformOnload(vm, fn) { // 子表加载完成事件监听
        vm.$bus.on("SubformOnload", (data) => {
            if (fn) fn(data)
        });
    },
    emitDefaultListCheck(vm, obj) {   // defaultList选择事件通知
        vm.$bus.emit("defaultListCheck", obj);
    },
    onDefaultListCheck(vm, fn) {  // defaultList选择事件监听
        vm.$bus.off("defaultListCheck")
        vm.$bus.on("defaultListCheck", (data) => {
            if (fn) fn(data)
        });
    },
    emitRefreshFilecode(vm, obj) {   // 刷新文号
        vm.$bus.emit("defaultFilecode", obj);
    },
    onRefreshFilecode(vm, fn) {  // 刷新文号
        vm.$bus.off("defaultFilecode")
        vm.$bus.on("defaultFilecode", () => {
            if (fn) fn()
        });
    }
}

export default function (Vue) {
    //添加全局API
    Vue.prototype.$eventBus = eventBus
}
