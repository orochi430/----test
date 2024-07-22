
import router from "../router";

//加载项目特殊路由逻辑
function routerLoading() {
  if (process.env.NODE_ENV == 'projectProduction') { // 实现项目差异化打包， PROJECT_NAME会被替换成命令行 npm run buildNoSourceMap --project= 的参数，只会引入该项目路径下的路由
    try {
      let dynmicRouter = require(`@/components/project/PROJECT_NAME/router.js`).default;
      router.addRoutes(dynmicRouter);
    } catch (error) {
      console.log('无该项目路径')
    }
  } else { // 开发环境或打包命令无项目参数时，全部引入
    let requireComponent = require.context(
      "@/components/project/",
      true,
      /router.js$/
    );
    requireComponent.keys().forEach(key => {
      let dynmicRouter = requireComponent(key).default;
      router.addRoutes(dynmicRouter);
    });
  }
}

export default routerLoading