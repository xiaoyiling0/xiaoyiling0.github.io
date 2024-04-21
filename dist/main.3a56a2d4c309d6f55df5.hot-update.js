"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/lapplive2dmanager.ts":
/*!**********************************!*\
  !*** ./src/lapplive2dmanager.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppLive2DManager = exports.s_instance = void 0;
var cubismmatrix44_1 = __webpack_require__(/*! @framework/math/cubismmatrix44 */ "../../../Framework/src/math/cubismmatrix44.ts");
var csmvector_1 = __webpack_require__(/*! @framework/type/csmvector */ "../../../Framework/src/type/csmvector.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lappmodel_1 = __webpack_require__(/*! ./lappmodel */ "./src/lappmodel.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
exports.s_instance = null;
var LAppLive2DManager = (function () {
    function LAppLive2DManager() {
        this._finishedMotion = function (self) {
            lapppal_1.LAppPal.printMessage('Motion Finished:');
            console.log(self);
        };
        this._viewMatrix = new cubismmatrix44_1.CubismMatrix44();
        this._models = new csmvector_1.csmVector();
        this._sceneIndex = 0;
        this.changeScene(this._sceneIndex);
    }
    LAppLive2DManager.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppLive2DManager();
        }
        return exports.s_instance;
    };
    LAppLive2DManager.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    };
    LAppLive2DManager.prototype.getModel = function (no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    };
    LAppLive2DManager.prototype.releaseAllModel = function () {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    };
    LAppLive2DManager.prototype.onDrag = function (x, y) {
        for (var i = 0; i < this._models.getSize(); i++) {
            var model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    };
    LAppLive2DManager.prototype.onTap = function (x, y) {
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]tap point: {x: " + x.toFixed(2) + " y: " + y.toFixed(2) + "}");
        }
        for (var i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [" + LAppDefine.HitAreaNameHead + "]");
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [" + LAppDefine.HitAreaNameBody + "]");
                }
                this._models
                    .at(i)
                    .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, this._finishedMotion);
            }
        }
    };
    LAppLive2DManager.prototype.onUpdate = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var projection = new cubismmatrix44_1.CubismMatrix44();
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            model.update();
            model.draw(projection);
        }
    };
    LAppLive2DManager.prototype.nextScene = function () {
        var no = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
        this.changeScene(no);
    };
    LAppLive2DManager.prototype.changeScene = function (index) {
        this._sceneIndex = index;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]model index: " + this._sceneIndex);
        }
        var model = LAppDefine.ModelDir[index];
        var modelPath = LAppDefine.ResourcesPath + model + '/';
        var modelJsonName = LAppDefine.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName);
    };
    LAppLive2DManager.prototype.setViewMatrix = function (m) {
        for (var i = 0; i < 16; i++) {
            this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
    };
    LAppLive2DManager.prototype.startRandomMotion = function (n) {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models
                .at(i)
                .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, this._finishedMotion);
        }
    };
    return LAppLive2DManager;
}());
exports.LAppLive2DManager = LAppLive2DManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "1fda8f99088a5c600cf9"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zYTU2YTJkNGMzMDlkNmY1NWRmNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxrSUFBZ0U7QUFFaEUsbUhBQXNEO0FBRXRELDhGQUEyQztBQUMzQyx3RkFBd0M7QUFDeEMsK0VBQXdDO0FBQ3hDLHlFQUFvQztBQUV6QixrQkFBVSxHQUFzQixJQUFJLENBQUM7QUFNaEQ7SUF1TUU7UUFXQSxvQkFBZSxHQUFHLFVBQUMsSUFBbUI7WUFDcEMsaUJBQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQWJBLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwrQkFBYyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFTLEVBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBck1hLDZCQUFXLEdBQXpCO1FBQ0UsSUFBSSxrQkFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixrQkFBVSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztTQUN0QztRQUVELE9BQU8sa0JBQVUsQ0FBQztJQUNwQixDQUFDO0lBS2EsaUNBQWUsR0FBN0I7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxrQkFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBUU0sb0NBQVEsR0FBZixVQUFnQixFQUFVO1FBQ3hCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxD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Q0FBQztBQXROWSw4Q0FBaUI7Ozs7Ozs7OztVQ3RCOUIscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHBsaXZlMmRtYW5hZ2VyLnRzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtTWF0cml4NDQgfSBmcm9tICdAZnJhbWV3b3JrL21hdGgvY3ViaXNtbWF0cml4NDQnO1xuaW1wb3J0IHsgQUN1YmlzbU1vdGlvbiB9IGZyb20gJ0BmcmFtZXdvcmsvbW90aW9uL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgY3NtVmVjdG9yIH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbXZlY3Rvcic7XG5cbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcbmltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBNb2RlbCB9IGZyb20gJy4vbGFwcG1vZGVsJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBMaXZlMkRNYW5hZ2VyID0gbnVsbDtcblxuLyoqXG4gKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7PjgavjgYrjgYTjgaZDdWJpc21Nb2RlbOOCkueuoeeQhuOBmeOCi+OCr+ODqeOCuVxuICog44Oi44OH44Or55Sf5oiQ44Go56C05qOE44CB44K/44OD44OX44Kk44OZ44Oz44OI44Gu5Yem55CG44CB44Oi44OH44Or5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBMQXBwTGl2ZTJETWFuYWdlciB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBMaXZlMkRNYW5hZ2VyIHtcbiAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBMaXZlMkRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNfaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbGVhc2VJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gdm9pZCAwO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+ODouODh+ODq+OCkui/lOOBmeOAglxuICAgKlxuICAgKiBAcGFyYW0gbm8g44Oi44OH44Or44Oq44K544OI44Gu44Kk44Oz44OH44OD44Kv44K55YCkXG4gICAqIEByZXR1cm4g44Oi44OH44Or44Gu44Kk44Oz44K544K/44Oz44K544KS6L+U44GZ44CC44Kk44Oz44OH44OD44Kv44K55YCk44GM56+E5Zuy5aSW44Gu5aC05ZCI44GvTlVMTOOCkui/lOOBmeOAglxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsKG5vOiBudW1iZXIpOiBMQXBwTW9kZWwge1xuICAgIGlmIChubyA8IHRoaXMuX21vZGVscy5nZXRTaXplKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuYXQobm8pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+OBmeOBueOBpuOBruODouODh+ODq+OCkuino+aUvuOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbGVhc2VBbGxNb2RlbCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgdGhpcy5fbW9kZWxzLmF0KGkpLnJlbGVhc2UoKTtcbiAgICAgIHRoaXMuX21vZGVscy5zZXQoaSwgbnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWxzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44KS44OJ44Op44OD44Kw44GX44Gf5pmC44Gu5Yem55CGXG4gICAqXG4gICAqIEBwYXJhbSB4IOeUu+mdouOBrljluqfmqJlcbiAgICogQHBhcmFtIHkg55S76Z2i44GuWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uRHJhZyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBjb25zdCBtb2RlbDogTEFwcE1vZGVsID0gdGhpcy5nZXRNb2RlbChpKTtcblxuICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsLnNldERyYWdnaW5nKHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLjgr/jg4Pjg5fjgZfjgZ/mmYLjga7lh6bnkIZcbiAgICpcbiAgICogQHBhcmFtIHgg55S76Z2i44GuWOW6p+aomVxuICAgKiBAcGFyYW0geSDnlLvpnaLjga5Z5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgb25UYXAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgIGBbQVBQXXRhcCBwb2ludDoge3g6ICR7eC50b0ZpeGVkKDIpfSB5OiAke3kudG9GaXhlZCgyKX19YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVscy5hdChpKS5oaXRUZXN0KExBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkLCB4LCB5KSkge1xuICAgICAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFxuICAgICAgICAgICAgYFtBUFBdaGl0IGFyZWE6IFske0xBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkfV1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbHMuYXQoaSkuc2V0UmFuZG9tRXhwcmVzc2lvbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlbHMuYXQoaSkuaGl0VGVzdChMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keSwgeCwgeSkpIHtcbiAgICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICAgIGBbQVBQXWhpdCBhcmVhOiBbJHtMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keX1dYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWxzXG4gICAgICAgICAgLmF0KGkpXG4gICAgICAgICAgLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cFRhcEJvZHksXG4gICAgICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Tm9ybWFsLFxuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRNb3Rpb25cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLmm7TmlrDjgZnjgovjgajjgY3jga7lh6bnkIZcbiAgICog44Oi44OH44Or44Gu5pu05paw5Yem55CG5Y+K44Gz5o+P55S75Yem55CG44KS6KGM44GGXG4gICAqL1xuICBwdWJsaWMgb25VcGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjYW52YXM7XG5cbiAgICBjb25zdCBwcm9qZWN0aW9uOiBDdWJpc21NYXRyaXg0NCA9IG5ldyBDdWJpc21NYXRyaXg0NCgpO1xuICAgIGNvbnN0IG1vZGVsQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVscy5nZXRTaXplKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsQ291bnQ7ICsraSkge1xuICAgICAgY29uc3QgbW9kZWw6IExBcHBNb2RlbCA9IHRoaXMuZ2V0TW9kZWwoaSk7XG5cbiAgICAgIGlmIChtb2RlbC5nZXRNb2RlbCgpKSB7XG4gICAgICAgIGlmIChtb2RlbC5nZXRNb2RlbCgpLmdldENhbnZhc1dpZHRoKCkgPiAxLjAgJiYgd2lkdGggPCBoZWlnaHQpIHtcbiAgICAgICAgICAvLyDmqKrjgavplbfjgYTjg6Ljg4fjg6vjgpLnuKbplbfjgqbjgqPjg7Pjg4njgqbjgavooajnpLrjgZnjgovpmpvjg6Ljg4fjg6vjga7mqKrjgrXjgqTjgrrjgadzY2FsZeOCkueul+WHuuOBmeOCi1xuICAgICAgICAgIG1vZGVsLmdldE1vZGVsTWF0cml4KCkuc2V0V2lkdGgoMi4wKTtcbiAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKDEuMCwgd2lkdGggLyBoZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2plY3Rpb24uc2NhbGUoaGVpZ2h0IC8gd2lkdGgsIDEuMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlv4XopoHjgYzjgYLjgozjgbDjgZPjgZPjgafkuZfnrpdcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNYXRyaXggIT0gbnVsbCkge1xuICAgICAgICAgIHByb2plY3Rpb24ubXVsdGlwbHlCeU1hdHJpeCh0aGlzLl92aWV3TWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtb2RlbC51cGRhdGUoKTtcbiAgICAgIG1vZGVsLmRyYXcocHJvamVjdGlvbik7IC8vIOWPgueFp+a4oeOBl+OBquOBruOBp3Byb2plY3Rpb27jga/lpInos6rjgZnjgovjgIJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5qyh44Gu44K344O844Oz44Gr5YiH44KK44GL44GI44KLXG4gICAqIOOCteODs+ODl+ODq+OCouODl+ODquOCseODvOOCt+ODp+ODs+OBp+OBr+ODouODh+ODq+OCu+ODg+ODiOOBruWIh+OCiuabv+OBiOOCkuihjOOBhuOAglxuICAgKi9cbiAgcHVibGljIG5leHRTY2VuZSgpOiB2b2lkIHtcbiAgICBjb25zdCBubzogbnVtYmVyID0gKHRoaXMuX3NjZW5lSW5kZXggKyAxKSAlIExBcHBEZWZpbmUuTW9kZWxEaXJTaXplO1xuICAgIHRoaXMuY2hhbmdlU2NlbmUobm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCt+ODvOODs+OCkuWIh+OCiuabv+OBiOOCi1xuICAgKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgafjga/jg6Ljg4fjg6vjgrvjg4Pjg4jjga7liIfjgormm7/jgYjjgpLooYzjgYbjgIJcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VTY2VuZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IGluZGV4O1xuICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnTG9nRW5hYmxlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1tb2RlbCBpbmRleDogJHt0aGlzLl9zY2VuZUluZGV4fWApO1xuICAgIH1cblxuICAgIC8vIE1vZGVsRGlyW13jgavkv53mjIHjgZfjgZ/jg4fjgqPjg6zjgq/jg4jjg6rlkI3jgYvjgolcbiAgICAvLyBtb2RlbDMuanNvbuOBruODkeOCueOCkuaxuuWumuOBmeOCi+OAglxuICAgIC8vIOODh+OCo+ODrOOCr+ODiOODquWQjeOBqG1vZGVsMy5qc29u44Gu5ZCN5YmN44KS5LiA6Ie044GV44Gb44Gm44GK44GP44GT44Go44CCXG4gICAgY29uc3QgbW9kZWw6IHN0cmluZyA9IExBcHBEZWZpbmUuTW9kZWxEaXJbaW5kZXhdO1xuICAgIGNvbnN0IG1vZGVsUGF0aDogc3RyaW5nID0gTEFwcERlZmluZS5SZXNvdXJjZXNQYXRoICsgbW9kZWwgKyAnLyc7XG4gICAgbGV0IG1vZGVsSnNvbk5hbWU6IHN0cmluZyA9IExBcHBEZWZpbmUuTW9kZWxEaXJbaW5kZXhdO1xuICAgIG1vZGVsSnNvbk5hbWUgKz0gJy5tb2RlbDMuanNvbic7XG5cbiAgICB0aGlzLnJlbGVhc2VBbGxNb2RlbCgpO1xuICAgIHRoaXMuX21vZGVscy5wdXNoQmFjayhuZXcgTEFwcE1vZGVsKCkpO1xuICAgIHRoaXMuX21vZGVscy5hdCgwKS5sb2FkQXNzZXRzKG1vZGVsUGF0aCwgbW9kZWxKc29uTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0Vmlld01hdHJpeChtOiBDdWJpc21NYXRyaXg0NCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgdGhpcy5fdmlld01hdHJpeC5nZXRBcnJheSgpW2ldID0gbS5nZXRBcnJheSgpW2ldO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDmr4/pmpRu5q+r56eS6ZqP5py65pKt5pS+5LiA5LiL5Yqo55S7XG4gICAqL1xuICBwdWJsaWMgc3RhcnRSYW5kb21Nb3Rpb24objogbnVtYmVyKSB7XG4gICAgLy8gTEFwcFBhbC5wcmludE1lc3NhZ2UoYGE6ICR7TEFwcERlZmluZS5Nb3Rpb25Hcm91cFRhcEJvZHl9YCk7XG4gICAgLy8gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkgeyAvL+avjzXnp5LmiafooYzkuIDmrKHmlrnms5VcbiAgICAgIC8v6ZyA6KaB5omn6KGM55qE5Luj56CB5YaZ5Zyo6L+Z6YeMXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgICB0aGlzLl9tb2RlbHNcbiAgICAgICAgICAuYXQoaSlcbiAgICAgICAgICAuc3RhcnRSYW5kb21Nb3Rpb24oXG4gICAgICAgICAgICBMQXBwRGVmaW5lLk1vdGlvbkdyb3VwVGFwQm9keSxcbiAgICAgICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlOb3JtYWwsXG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZE1vdGlvblxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgLy8gfSwgbik7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl92aWV3TWF0cml4ID0gbmV3IEN1YmlzbU1hdHJpeDQ0KCk7XG4gICAgdGhpcy5fbW9kZWxzID0gbmV3IGNzbVZlY3RvcjxMQXBwTW9kZWw+KCk7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IDA7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLl9zY2VuZUluZGV4KTtcbiAgfVxuXG4gIF92aWV3TWF0cml4OiBDdWJpc21NYXRyaXg0NDsgLy8g44Oi44OH44Or5o+P55S744Gr55So44GE44KLdmlld+ihjOWIl1xuICBfbW9kZWxzOiBjc21WZWN0b3I8TEFwcE1vZGVsPjsgLy8g44Oi44OH44Or44Kk44Oz44K544K/44Oz44K544Gu44Kz44Oz44OG44OKXG4gIF9zY2VuZUluZGV4OiBudW1iZXI7IC8vIOihqOekuuOBmeOCi+OCt+ODvOODs+OBruOCpOODs+ODh+ODg+OCr+OCueWApFxuICAvLyDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobjga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgX2ZpbmlzaGVkTW90aW9uID0gKHNlbGY6IEFDdWJpc21Nb3Rpb24pOiB2b2lkID0+IHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW90aW9uIEZpbmlzaGVkOicpO1xuICAgIGNvbnNvbGUubG9nKHNlbGYpO1xuICB9O1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjFmZGE4Zjk5MDg4YTVjNjAwY2Y5XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=