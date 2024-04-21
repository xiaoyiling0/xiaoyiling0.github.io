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
    live2DManager.startRandomMotion(5000);
};
window.onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "b35cc6d35c9883ae465b"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xNzY2ZjQ0MGE4NjcwOGI2NjY4Yi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQThDO0FBQzlDLHVHQUF3RDtBQUd4RCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBRWQsSUFBSSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUssRUFBRTtRQUNwRCxPQUFPO0tBQ1I7SUFDRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLElBQU0sYUFBYSxHQUFzQixxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6RSxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBR0YsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7Ozs7Ozs7OztVQ2ZuRSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBMaXZlMkRNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwbGl2ZTJkbWFuYWdlcic7XG5cbi8vIOa1j+iniOWZqOijheWFpeWQjueahOWkhOeQhu+8iOaJk+W8gOmhtemdou+8iVxud2luZG93Lm9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZSgpID09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLnJ1bigpO1xuICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gIGxpdmUyRE1hbmFnZXIuc3RhcnRSYW5kb21Nb3Rpb24oNTAwMCk7XG59O1xuXG4vL+e7k+adn+aXtueahOWkhOeQhiAo5Yi35paw5oiW5YWz6Zet6aG16Z2iKVxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gKCk6IHZvaWQgPT4gTEFwcERlbGVnYXRlLnJlbGVhc2VJbnN0YW5jZSgpOyAvL2xhbWJkYSDljL/lkI3lh73mlbBcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJiMzVjYzZkMzVjOTg4M2FlNDY1YlwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9