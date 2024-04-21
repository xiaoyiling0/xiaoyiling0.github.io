"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
window.onload = function () {
    if (lappdelegate_1.LAppDelegate.getInstance().initialize() == false) {
        return;
    }
    lappdelegate_1.LAppDelegate.getInstance().run();
    var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
};
window.onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "306e9d0ca46cc4f9ddd9"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xMjBhNzAwNjEwNzYzOTI5MTY5ZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQThDO0FBQzlDLHVHQUF3RDtBQUd4RCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBRWQsSUFBSSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUssRUFBRTtRQUNwRCxPQUFPO0tBQ1I7SUFDRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLElBQU0sYUFBYSxHQUFzQixxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUszRSxDQUFDLENBQUM7QUFHRixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQVksa0NBQVksQ0FBQyxlQUFlLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQzs7Ozs7Ozs7O1VDbEJuRSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBMaXZlMkRNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwbGl2ZTJkbWFuYWdlcic7XG5cbi8vIOa1j+iniOWZqOijheWFpeWQjueahOWkhOeQhu+8iOaJk+W8gOmhtemdou+8iVxud2luZG93Lm9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZSgpID09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4vLyAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHsgLy/mr48156eS5Yi35paw5LiA5qyh5Zu+6KGoXG4vLyAgICAgLy/pnIDopoHmiafooYznmoTku6PnoIHlhpnlnKjov5nph4xcbi8vICAgICBsaXZlMkRNYW5hZ2VyLnN0YXJ0UmFuZG9tTW90aW9uKDUwMDApO1xuLy8gfSwgNTAwMCk7IFxufTtcblxuLy/nu5PmnZ/ml7bnmoTlpITnkIYgKOWIt+aWsOaIluWFs+mXremhtemdoilcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9ICgpOiB2b2lkID0+IExBcHBEZWxlZ2F0ZS5yZWxlYXNlSW5zdGFuY2UoKTsgLy9sYW1iZGEg5Yy/5ZCN5Ye95pWwXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMzA2ZTlkMGNhNDZjYzRmOWRkZDlcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==