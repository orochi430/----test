// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    "postcss-pxtorem": {
      rootValue: 50,
      selectorBlackList: [':after',':before',"el-"], // 忽略转换正则匹配项
      propList: ['*', '!border*','!box-shadow','!text-shadow'],
    },
    "postcss-momentum-scrolling": ['hidden','scroll','auto','inherit'],
  }
}
