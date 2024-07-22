const debounce = (fn, wait=500, immediate=true) => {
	let timer, startTimeStamp=0;
	let context, args;
 
	let run = (timerInterval)=>{
		timer= setTimeout(()=>{
			let now = (new Date()).getTime();
			let interval=now-startTimeStamp
			if(interval<timerInterval){ // the timer start time has been reset，so the interval is less than timerInterval
				startTimeStamp=now;
				run(wait-interval);  // reset timer for left time 
			}else{
				if(!immediate){
					fn.apply(context,args);
				}
				clearTimeout(timer);
				timer=null;
			}
			
		},timerInterval);
	}
 
	return function(){
		context=this;
		args=arguments;
		let now = (new Date()).getTime();
		startTimeStamp=now; // set timer start time
 
		if(!timer){
			if(immediate) {
				fn.apply(context,args);
			}
			run(wait);    // last timer alreay executed, set a new timer
		}
		
	}
}

export default {
  name: 'DebounceClick',
  functional: true, // 静态组件 当不声明functional时该组件同样拥有上下文以及生命周期函数
  render(createElement, context) {
    const time = context.props.time
    const immediate = context.props.immediate
    const vnodeList = context.slots().default
    if (vnodeList === undefined){
      console.warn('<debounce> 组件必须要有子元素')
      return null
    }
    const vnode = vnodeList[0] || null // 获取子元素虚拟dom
    if(vnode.data.on && vnode.data.on.click){
      const defaultFun = vnode.data.on.click
      const debounceFun = debounce(defaultFun, time, immediate)
      vnode.data.on.click = debounceFun
    }else if(vnode.componentOptions && vnode.componentOptions.listeners.click){
      const defaultFun = vnode.componentOptions.listeners.click
      const debounceFun = debounce(defaultFun, time, immediate)
      vnode.componentOptions.listeners.click = debounceFun
    }
    return vnode
  }
}
