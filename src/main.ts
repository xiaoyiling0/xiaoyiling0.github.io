import { LAppDelegate } from './lappdelegate';
// import { LAppLive2DManager } from './lapplive2dmanager';

// 浏览器装入后的处理（打开页面）
window.onload = (): void => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }
  LAppDelegate.getInstance().run();
  // const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();
//   setInterval(function () { //每5秒刷新一次图表
//     //需要执行的代码写在这里
//     live2DManager.startRandomMotion(5000);
// }, 5000); 
};

//结束时的处理 (刷新或关闭页面)
window.onbeforeunload = (): void => LAppDelegate.releaseInstance(); //lambda 匿名函数
