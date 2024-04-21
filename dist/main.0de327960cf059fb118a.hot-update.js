"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
window.onload = function () {
    if (lappdelegate_1.LAppDelegate.getInstance().initialize() == false) {
        return;
    }
    lappdelegate_1.LAppDelegate.getInstance().run();
};
window.onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "d6b72063302c37d57755"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wZGUzMjc5NjBjZjA1OWZiMTE4YS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQThDO0FBSTlDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFFZCxJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksS0FBSyxFQUFFO1FBQ3BELE9BQU87S0FDUjtJQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFNbkMsQ0FBQyxDQUFDO0FBR0YsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7Ozs7Ozs7OztVQ2xCbkUscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG4vLyBpbXBvcnQgeyBMQXBwTGl2ZTJETWFuYWdlciB9IGZyb20gJy4vbGFwcGxpdmUyZG1hbmFnZXInO1xuXG4vLyDmtY/op4jlmajoo4XlhaXlkI7nmoTlpITnkIbvvIjmiZPlvIDpobXpnaLvvIlcbndpbmRvdy5vbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gIC8vIGNyZWF0ZSB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgaWYgKExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmluaXRpYWxpemUoKSA9PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5ydW4oKTtcbiAgLy8gY29uc3QgbGl2ZTJETWFuYWdlcjogTEFwcExpdmUyRE1hbmFnZXIgPSBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuLy8gICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IC8v5q+PNeenkuWIt+aWsOS4gOasoeWbvuihqFxuLy8gICAgIC8v6ZyA6KaB5omn6KGM55qE5Luj56CB5YaZ5Zyo6L+Z6YeMXG4vLyAgICAgbGl2ZTJETWFuYWdlci5zdGFydFJhbmRvbU1vdGlvbig1MDAwKTtcbi8vIH0sIDUwMDApOyBcbn07XG5cbi8v57uT5p2f5pe255qE5aSE55CGICjliLfmlrDmiJblhbPpl63pobXpnaIpXG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7IC8vbGFtYmRhIOWMv+WQjeWHveaVsFxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImQ2YjcyMDYzMzAyYzM3ZDU3NzU1XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=