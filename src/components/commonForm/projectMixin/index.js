let defaultMixin = {
  // 表单加载时项目特殊逻辑混入各种生命周期，根据config.projectName命名文件
  methods: {
    // afterGetinfoFunc: 获取表单信息后方法
  }
}
let requireComponent = require.context(
  "./", // 在当前目录下查找
  false, // 不遍历子文件夹
  /\.js$/ // 正则匹配 以 .vue结尾的文件
)
requireComponent.keys().forEach(fileName => {
  let fileKey = fileName.replace(/\.\/|\.js/g, "")
  if (fileKey == dsf.config.projectName) {
    defaultMixin = requireComponent(fileName).default
  }
})

export default defaultMixin
