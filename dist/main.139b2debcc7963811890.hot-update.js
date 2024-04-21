"use strict";
self["webpackHotUpdate"]("main",{

/***/ "../../../Framework/src/model/cubismusermodel.ts":
/*!*******************************************************!*\
  !*** ../../../Framework/src/model/cubismusermodel.ts ***!
  \*******************************************************/
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
exports.Live2DCubismFramework = exports.CubismUserModel = void 0;
var cubismbreath_1 = __webpack_require__(/*! ../effect/cubismbreath */ "../../../Framework/src/effect/cubismbreath.ts");
var cubismeyeblink_1 = __webpack_require__(/*! ../effect/cubismeyeblink */ "../../../Framework/src/effect/cubismeyeblink.ts");
var cubismpose_1 = __webpack_require__(/*! ../effect/cubismpose */ "../../../Framework/src/effect/cubismpose.ts");
var live2dcubismframework_1 = __webpack_require__(/*! ../live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var cubismmodelmatrix_1 = __webpack_require__(/*! ../math/cubismmodelmatrix */ "../../../Framework/src/math/cubismmodelmatrix.ts");
var cubismtargetpoint_1 = __webpack_require__(/*! ../math/cubismtargetpoint */ "../../../Framework/src/math/cubismtargetpoint.ts");
var cubismexpressionmotion_1 = __webpack_require__(/*! ../motion/cubismexpressionmotion */ "../../../Framework/src/motion/cubismexpressionmotion.ts");
var cubismmotion_1 = __webpack_require__(/*! ../motion/cubismmotion */ "../../../Framework/src/motion/cubismmotion.ts");
var cubismmotionmanager_1 = __webpack_require__(/*! ../motion/cubismmotionmanager */ "../../../Framework/src/motion/cubismmotionmanager.ts");
var cubismphysics_1 = __webpack_require__(/*! ../physics/cubismphysics */ "../../../Framework/src/physics/cubismphysics.ts");
var cubismrenderer_webgl_1 = __webpack_require__(/*! ../rendering/cubismrenderer_webgl */ "../../../Framework/src/rendering/cubismrenderer_webgl.ts");
var cubismdebug_1 = __webpack_require__(/*! ../utils/cubismdebug */ "../../../Framework/src/utils/cubismdebug.ts");
var cubismmoc_1 = __webpack_require__(/*! ./cubismmoc */ "../../../Framework/src/model/cubismmoc.ts");
var cubismmodeluserdata_1 = __webpack_require__(/*! ./cubismmodeluserdata */ "../../../Framework/src/model/cubismmodeluserdata.ts");
var CubismUserModel = (function () {
    function CubismUserModel() {
        this.loadMotion = function (buffer, size, name, onFinishedMotionHandler) { return cubismmotion_1.CubismMotion.create(buffer, size, onFinishedMotionHandler); };
        this._moc = null;
        this._model = null;
        this._motionManager = null;
        this._expressionManager = null;
        this._eyeBlink = null;
        this._breath = null;
        this._modelMatrix = null;
        this._pose = null;
        this._dragManager = null;
        this._physics = null;
        this._modelUserData = null;
        this._initialized = false;
        this._updating = false;
        this._opacity = 1.0;
        this._lipsync = true;
        this._lastLipSyncValue = 0.0;
        this._dragX = 0.0;
        this._dragY = 0.0;
        this._accelerationX = 0.0;
        this._accelerationY = 0.0;
        this._accelerationZ = 0.0;
        this._debugMode = false;
        this._renderer = null;
        this._motionManager = new cubismmotionmanager_1.CubismMotionManager();
        this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
        this._expressionManager = new cubismmotionmanager_1.CubismMotionManager();
        this._dragManager = new cubismtargetpoint_1.CubismTargetPoint();
    }
    CubismUserModel.prototype.isInitialized = function () {
        return this._initialized;
    };
    CubismUserModel.prototype.setInitialized = function (v) {
        this._initialized = v;
    };
    CubismUserModel.prototype.isUpdating = function () {
        return this._updating;
    };
    CubismUserModel.prototype.setUpdating = function (v) {
        this._updating = v;
    };
    CubismUserModel.prototype.setDragging = function (x, y) {
        this._dragManager.set(x, y);
    };
    CubismUserModel.prototype.setAcceleration = function (x, y, z) {
        this._accelerationX = x;
        this._accelerationY = y;
        this._accelerationZ = z;
    };
    CubismUserModel.prototype.getModelMatrix = function () {
        return this._modelMatrix;
    };
    CubismUserModel.prototype.setOpacity = function (a) {
        this._opacity = a;
    };
    CubismUserModel.prototype.getOpacity = function () {
        return this._opacity;
    };
    CubismUserModel.prototype.loadModel = function (buffer) {
        this._moc = cubismmoc_1.CubismMoc.create(buffer);
        this._model = this._moc.createModel();
        this._model.saveParameters();
        if (this._moc == null || this._model == null) {
            (0, cubismdebug_1.CubismLogError)('Failed to CreateModel().');
            return;
        }
        this._modelMatrix = new cubismmodelmatrix_1.CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
    };
    CubismUserModel.prototype.loadExpression = function (buffer, size, name) {
        return cubismexpressionmotion_1.CubismExpressionMotion.create(buffer, size);
    };
    CubismUserModel.prototype.loadPose = function (buffer, size) {
        this._pose = cubismpose_1.CubismPose.create(buffer, size);
    };
    CubismUserModel.prototype.loadUserData = function (buffer, size) {
        this._modelUserData = cubismmodeluserdata_1.CubismModelUserData.create(buffer, size);
    };
    CubismUserModel.prototype.loadPhysics = function (buffer, size) {
        this._physics = cubismphysics_1.CubismPhysics.create(buffer, size);
    };
    CubismUserModel.prototype.isHit = function (drawableId, pointX, pointY) {
        var drawIndex = this._model.getDrawableIndex(drawableId);
        if (drawIndex < 0) {
            return false;
        }
        var count = this._model.getDrawableVertexCount(drawIndex);
        var vertices = this._model.getDrawableVertices(drawIndex);
        var left = vertices[0];
        var right = vertices[0];
        var top = vertices[1];
        var bottom = vertices[1];
        for (var j = 1; j < count; ++j) {
            var x = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep];
            var y = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep + 1];
            if (x < left) {
                left = x;
            }
            if (x > right) {
                right = x;
            }
            if (y < top) {
                top = y;
            }
            if (y > bottom) {
                bottom = y;
            }
        }
        var tx = this._modelMatrix.invertTransformX(pointX);
        var ty = this._modelMatrix.invertTransformY(pointY);
        console.log("4");
        return true;
    };
    CubismUserModel.prototype.getModel = function () {
        return this._model;
    };
    CubismUserModel.prototype.getRenderer = function () {
        return this._renderer;
    };
    CubismUserModel.prototype.createRenderer = function () {
        if (this._renderer) {
            this.deleteRenderer();
        }
        this._renderer = new cubismrenderer_webgl_1.CubismRenderer_WebGL();
        this._renderer.initialize(this._model);
    };
    CubismUserModel.prototype.deleteRenderer = function () {
        if (this._renderer != null) {
            this._renderer.release();
            this._renderer = null;
        }
    };
    CubismUserModel.prototype.motionEventFired = function (eventValue) {
        (0, cubismdebug_1.CubismLogInfo)('{0}', eventValue.s);
    };
    CubismUserModel.cubismDefaultMotionEventCallback = function (caller, eventValue, customData) {
        var model = customData;
        if (model != null) {
            model.motionEventFired(eventValue);
        }
    };
    CubismUserModel.prototype.release = function () {
        if (this._motionManager != null) {
            this._motionManager.release();
            this._motionManager = null;
        }
        if (this._expressionManager != null) {
            this._expressionManager.release();
            this._expressionManager = null;
        }
        if (this._moc != null) {
            this._moc.deleteModel(this._model);
            this._moc.release();
            this._moc = null;
        }
        this._modelMatrix = null;
        cubismpose_1.CubismPose.delete(this._pose);
        cubismeyeblink_1.CubismEyeBlink.delete(this._eyeBlink);
        cubismbreath_1.CubismBreath.delete(this._breath);
        this._dragManager = null;
        cubismphysics_1.CubismPhysics.delete(this._physics);
        cubismmodeluserdata_1.CubismModelUserData.delete(this._modelUserData);
        this.deleteRenderer();
    };
    return CubismUserModel;
}());
exports.CubismUserModel = CubismUserModel;
var $ = __importStar(__webpack_require__(/*! ./cubismusermodel */ "../../../Framework/src/model/cubismusermodel.ts"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismUserModel = $.CubismUserModel;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "63ced9f0e0d54aa5636d"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsdUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsNkJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLHlDQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE0Qkgsc0JBQUM7QUFBRCxDQUFDO0FBL1lZLDBDQUFlO0FBa1o1QixzSEFBdUM7QUFFdkMsSUFBaUIscUJBQXFCLENBR3JDO0FBSEQsV0FBaUIscUJBQXFCO0lBQ3ZCLHFDQUFlLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQztBQUVuRCxDQUFDLEVBSGdCLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR3JDOzs7Ozs7Ozs7VUN2YkQscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uLy4uLy4uL0ZyYW1ld29yay9zcmMvbW9kZWwvY3ViaXNtdXNlcm1vZGVsLnRzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtQnJlYXRoIH0gZnJvbSAnLi4vZWZmZWN0L2N1YmlzbWJyZWF0aCc7XG5pbXBvcnQgeyBDdWJpc21FeWVCbGluayB9IGZyb20gJy4uL2VmZmVjdC9jdWJpc21leWVibGluayc7XG5pbXBvcnQgeyBDdWJpc21Qb3NlIH0gZnJvbSAnLi4vZWZmZWN0L2N1YmlzbXBvc2UnO1xuaW1wb3J0IHsgQ3ViaXNtSWRIYW5kbGUgfSBmcm9tICcuLi9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBDb25zdGFudCB9IGZyb20gJy4uL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XG5pbXBvcnQgeyBDdWJpc21Nb2RlbE1hdHJpeCB9IGZyb20gJy4uL21hdGgvY3ViaXNtbW9kZWxtYXRyaXgnO1xuaW1wb3J0IHsgQ3ViaXNtVGFyZ2V0UG9pbnQgfSBmcm9tICcuLi9tYXRoL2N1YmlzbXRhcmdldHBvaW50JztcbmltcG9ydCB7IEFDdWJpc21Nb3Rpb24sIEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgfSBmcm9tICcuLi9tb3Rpb24vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBDdWJpc21FeHByZXNzaW9uTW90aW9uIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbWV4cHJlc3Npb25tb3Rpb24nO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb25NYW5hZ2VyIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbW1vdGlvbm1hbmFnZXInO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uUXVldWVNYW5hZ2VyIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlcic7XG5pbXBvcnQgeyBDdWJpc21QaHlzaWNzIH0gZnJvbSAnLi4vcGh5c2ljcy9jdWJpc21waHlzaWNzJztcbmltcG9ydCB7IEN1YmlzbVJlbmRlcmVyX1dlYkdMIH0gZnJvbSAnLi4vcmVuZGVyaW5nL2N1YmlzbXJlbmRlcmVyX3dlYmdsJztcbmltcG9ydCB7IGNzbVN0cmluZyB9IGZyb20gJy4uL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IEN1YmlzbUxvZ0Vycm9yLCBDdWJpc21Mb2dJbmZvIH0gZnJvbSAnLi4vdXRpbHMvY3ViaXNtZGVidWcnO1xuaW1wb3J0IHsgQ3ViaXNtTW9jIH0gZnJvbSAnLi9jdWJpc21tb2MnO1xuaW1wb3J0IHsgQ3ViaXNtTW9kZWwgfSBmcm9tICcuL2N1YmlzbW1vZGVsJztcbmltcG9ydCB7IEN1YmlzbU1vZGVsVXNlckRhdGEgfSBmcm9tICcuL2N1YmlzbW1vZGVsdXNlcmRhdGEnO1xuXG4vKipcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq1xuICpcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq+OBruWfuuW6leOCr+ODqeOCueOAguOBk+OCjOOCkue2meaJv+OBl+OBpuODpuODvOOCtuODvOOBjOWun+ijheOBmeOCi+OAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtVXNlck1vZGVsIHtcbiAgLyoqXG4gICAqIOWIneacn+WMlueKtuaFi+OBruWPluW+l1xuICAgKlxuICAgKiDliJ3mnJ/ljJbjgZXjgozjgabjgYTjgovnirbmhYvjgYvvvJ9cbiAgICpcbiAgICogQHJldHVybiB0cnVlICAgICDliJ3mnJ/ljJbjgZXjgozjgabjgYTjgotcbiAgICogQHJldHVybiBmYWxzZSAgICDliJ3mnJ/ljJbjgZXjgozjgabjgYTjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc0luaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3mnJ/ljJbnirbmhYvjga7oqK3lrppcbiAgICpcbiAgICog5Yid5pyf5YyW54q25oWL44KS6Kit5a6a44GZ44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSB2IOWIneacn+WMlueKtuaFi1xuICAgKi9cbiAgcHVibGljIHNldEluaXRpYWxpemVkKHY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHY7XG4gIH1cblxuICAvKipcbiAgICog5pu05paw54q25oWL44Gu5Y+W5b6XXG4gICAqXG4gICAqIOabtOaWsOOBleOCjOOBpuOBhOOCi+eKtuaFi+OBi++8n1xuICAgKlxuICAgKiBAcmV0dXJuIHRydWUgICAgIOabtOaWsOOBleOCjOOBpuOBhOOCi1xuICAgKiBAcmV0dXJuIGZhbHNlICAgIOabtOaWsOOBleOCjOOBpuOBhOOBquOBhFxuICAgKi9cbiAgcHVibGljIGlzVXBkYXRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0aW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOeKtuaFi+OBruioreWumlxuICAgKlxuICAgKiDmm7TmlrDnirbmhYvjgpLoqK3lrprjgZnjgotcbiAgICpcbiAgICogQHBhcmFtIHYg5pu05paw54q25oWLXG4gICAqL1xuICBwdWJsaWMgc2V0VXBkYXRpbmcodjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0aW5nID0gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg57jgqbjgrnjg4njg6njg4PjgrDmg4XloLHjga7oqK3lrppcbiAgICogQHBhcmFtIOODieODqeODg+OCsOOBl+OBpuOBhOOCi+OCq+ODvOOCveODq+OBrljkvY3nva5cbiAgICogQHBhcmFtIOODieODqeODg+OCsOOBl+OBpuOBhOOCi+OCq+ODvOOCveODq+OBrlnkvY3nva5cbiAgICovXG4gIHB1YmxpYyBzZXREcmFnZ2luZyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2RyYWdNYW5hZ2VyLnNldCh4LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliqDpgJ/luqbjga7mg4XloLHjgpLoqK3lrprjgZnjgotcbiAgICogQHBhcmFtIHggWOi7uOaWueWQkeOBruWKoOmAn+W6plxuICAgKiBAcGFyYW0geSBZ6Lu45pa55ZCR44Gu5Yqg6YCf5bqmXG4gICAqIEBwYXJhbSB6IFrou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgICovXG4gIHB1YmxpYyBzZXRBY2NlbGVyYXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FjY2VsZXJhdGlvblggPSB4O1xuICAgIHRoaXMuX2FjY2VsZXJhdGlvblkgPSB5O1xuICAgIHRoaXMuX2FjY2VsZXJhdGlvblogPSB6O1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+ihjOWIl+OCkuWPluW+l+OBmeOCi1xuICAgKiBAcmV0dXJuIOODouODh+ODq+ihjOWIl1xuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTWF0cml4KCk6IEN1YmlzbU1vZGVsTWF0cml4IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWxNYXRyaXg7XG4gIH1cblxuICAvKipcbiAgICog5LiN6YCP5piO5bqm44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBhIOS4jemAj+aYjuW6plxuICAgKi9cbiAgcHVibGljIHNldE9wYWNpdHkoYTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fb3BhY2l0eSA9IGE7XG4gIH1cblxuICAvKipcbiAgICog5LiN6YCP5piO5bqm44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g5LiN6YCP5piO5bqmXG4gICAqL1xuICBwdWJsaWMgZ2V0T3BhY2l0eSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+ODh+ODvOOCv+OCkuiqreOBv+i+vOOCgFxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyICAgIG1vYzPjg5XjgqHjgqTjg6vjgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICovXG4gIHB1YmxpYyBsb2FkTW9kZWwoYnVmZmVyOiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuX21vYyA9IEN1YmlzbU1vYy5jcmVhdGUoYnVmZmVyKTtcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX21vYy5jcmVhdGVNb2RlbCgpO1xuICAgIHRoaXMuX21vZGVsLnNhdmVQYXJhbWV0ZXJzKCk7XG5cbiAgICBpZiAodGhpcy5fbW9jID09IG51bGwgfHwgdGhpcy5fbW9kZWwgPT0gbnVsbCkge1xuICAgICAgQ3ViaXNtTG9nRXJyb3IoJ0ZhaWxlZCB0byBDcmVhdGVNb2RlbCgpLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21vZGVsTWF0cml4ID0gbmV3IEN1YmlzbU1vZGVsTWF0cml4KFxuICAgICAgdGhpcy5fbW9kZWwuZ2V0Q2FudmFzV2lkdGgoKSxcbiAgICAgIHRoaXMuX21vZGVsLmdldENhbnZhc0hlaWdodCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLoqq3jgb/ovrzjgoBcbiAgICogQHBhcmFtIGJ1ZmZlciBtb3Rpb24zLmpzb27jg5XjgqHjgqTjg6vjgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqIEBwYXJhbSBuYW1lIOODouODvOOCt+ODp+ODs+OBruWQjeWJjVxuICAgKiBAcGFyYW0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIg44Oi44O844K344On44Oz5YaN55Sf57WC5LqG5pmC44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAqIEByZXR1cm4g44Oi44O844K344On44Oz44Kv44Op44K5XG4gICAqL1xuICBwdWJsaWMgbG9hZE1vdGlvbiA9IChcbiAgICBidWZmZXI6IEFycmF5QnVmZmVyLFxuICAgIHNpemU6IG51bWJlcixcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICkgPT4gQ3ViaXNtTW90aW9uLmNyZWF0ZShidWZmZXIsIHNpemUsIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyKTtcblxuICAvKipcbiAgICog6KGo5oOF44OH44O844K/44Gu6Kqt44G/6L6844G/XG4gICAqIEBwYXJhbSBidWZmZXIgZXhw44OV44Kh44Kk44Or44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgKiBAcGFyYW0gbmFtZSDooajmg4Xjga7lkI3liY1cbiAgICovXG4gIHB1YmxpYyBsb2FkRXhwcmVzc2lvbihcbiAgICBidWZmZXI6IEFycmF5QnVmZmVyLFxuICAgIHNpemU6IG51bWJlcixcbiAgICBuYW1lOiBzdHJpbmdcbiAgKTogQUN1YmlzbU1vdGlvbiB7XG4gICAgcmV0dXJuIEN1YmlzbUV4cHJlc3Npb25Nb3Rpb24uY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICog44Od44O844K644OH44O844K/44Gu6Kqt44G/6L6844G/XG4gICAqIEBwYXJhbSBidWZmZXIgcG9zZTMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICovXG4gIHB1YmxpYyBsb2FkUG9zZShidWZmZXI6IEFycmF5QnVmZmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3NlID0gQ3ViaXNtUG9zZS5jcmVhdGUoYnVmZmVyLCBzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgavku5jlsZ7jgZnjgovjg6bjg7zjgrbjg7zjg4fjg7zjgr/jgpLoqq3jgb/ovrzjgoBcbiAgICogQHBhcmFtIGJ1ZmZlciB1c2VyZGF0YTMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICovXG4gIHB1YmxpYyBsb2FkVXNlckRhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbW9kZWxVc2VyRGF0YSA9IEN1YmlzbU1vZGVsVXNlckRhdGEuY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICog54mp55CG5ryU566X44OH44O844K/44Gu6Kqt44G/6L6844G/XG4gICAqIEBwYXJhbSBidWZmZXIgIHBoeXNpY3MzLmpzb27jgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUgICAg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqL1xuICBwdWJsaWMgbG9hZFBoeXNpY3MoYnVmZmVyOiBBcnJheUJ1ZmZlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcGh5c2ljcyA9IEN1YmlzbVBoeXNpY3MuY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICog5b2T44Gf44KK5Yik5a6a44Gu5Y+W5b6XXG4gICAqIEBwYXJhbSBkcmF3YWJsZUlkIOaknOiovOOBl+OBn+OBhERyYXdhYmxl44GuSURcbiAgICogQHBhcmFtIHBvaW50WCBY5L2N572uXG4gICAqIEBwYXJhbSBwb2ludFkgWeS9jee9rlxuICAgKiBAcmV0dXJuIHRydWUg44OS44OD44OI44GX44Gm44GE44KLXG4gICAqIEByZXR1cm4gZmFsc2Ug44OS44OD44OI44GX44Gm44GE44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNIaXQoXG4gICAgZHJhd2FibGVJZDogQ3ViaXNtSWRIYW5kbGUsXG4gICAgcG9pbnRYOiBudW1iZXIsXG4gICAgcG9pbnRZOiBudW1iZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZHJhd0luZGV4OiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXREcmF3YWJsZUluZGV4KGRyYXdhYmxlSWQpO1xuXG4gICAgaWYgKGRyYXdJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8g5a2Y5Zyo44GX44Gq44GE5aC05ZCI44GvZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0RHJhd2FibGVWZXJ0ZXhDb3VudChkcmF3SW5kZXgpO1xuICAgIGNvbnN0IHZlcnRpY2VzOiBGbG9hdDMyQXJyYXkgPSB0aGlzLl9tb2RlbC5nZXREcmF3YWJsZVZlcnRpY2VzKGRyYXdJbmRleCk7XG5cbiAgICBsZXQgbGVmdDogbnVtYmVyID0gdmVydGljZXNbMF07XG4gICAgbGV0IHJpZ2h0OiBudW1iZXIgPSB2ZXJ0aWNlc1swXTtcbiAgICBsZXQgdG9wOiBudW1iZXIgPSB2ZXJ0aWNlc1sxXTtcbiAgICBsZXQgYm90dG9tOiBudW1iZXIgPSB2ZXJ0aWNlc1sxXTtcblxuICAgIGZvciAobGV0IGogPSAxOyBqIDwgY291bnQ7ICsraikge1xuICAgICAgY29uc3QgeCA9IHZlcnRpY2VzW0NvbnN0YW50LnZlcnRleE9mZnNldCArIGogKiBDb25zdGFudC52ZXJ0ZXhTdGVwXTtcbiAgICAgIGNvbnN0IHkgPSB2ZXJ0aWNlc1tDb25zdGFudC52ZXJ0ZXhPZmZzZXQgKyBqICogQ29uc3RhbnQudmVydGV4U3RlcCArIDFdO1xuXG4gICAgICBpZiAoeCA8IGxlZnQpIHtcbiAgICAgICAgbGVmdCA9IHg7IC8vIE1pbiB4XG4gICAgICB9XG5cbiAgICAgIGlmICh4ID4gcmlnaHQpIHtcbiAgICAgICAgcmlnaHQgPSB4OyAvLyBNYXggeFxuICAgICAgfVxuXG4gICAgICBpZiAoeSA8IHRvcCkge1xuICAgICAgICB0b3AgPSB5OyAvLyBNaW4geVxuICAgICAgfVxuXG4gICAgICBpZiAoeSA+IGJvdHRvbSkge1xuICAgICAgICBib3R0b20gPSB5OyAvLyBNYXggeVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHR4OiBudW1iZXIgPSB0aGlzLl9tb2RlbE1hdHJpeC5pbnZlcnRUcmFuc2Zvcm1YKHBvaW50WCk7XG4gICAgY29uc3QgdHk6IG51bWJlciA9IHRoaXMuX21vZGVsTWF0cml4LmludmVydFRyYW5zZm9ybVkocG9pbnRZKTtcbiAgICBjb25zb2xlLmxvZyhcIjRcIilcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjga7lj5blvpdcbiAgICogQHJldHVybiDjg6Ljg4fjg6tcbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbCgpOiBDdWJpc21Nb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeOBruWPluW+l1xuICAgKiBAcmV0dXJuIOODrOODs+ODgOODqVxuICAgKi9cbiAgcHVibGljIGdldFJlbmRlcmVyKCk6IEN1YmlzbVJlbmRlcmVyX1dlYkdMIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICAvKipcbiAgICog44Os44Oz44OA44Op44KS5L2c5oiQ44GX44Gm5Yid5pyf5YyW44KS5a6f6KGM44GZ44KLXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVuZGVyZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JlbmRlcmVyKSB7XG4gICAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXIgPSBuZXcgQ3ViaXNtUmVuZGVyZXJfV2ViR0woKTtcbiAgICB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKHRoaXMuX21vZGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6zjg7Pjg4Djg6njga7op6PmlL5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVSZW5kZXJlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVsZWFzZSgpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jnmbrngavmmYLjga7mqJnmupblh6bnkIZcbiAgICpcbiAgICogRXZlbnTjgYzlho3nlJ/lh6bnkIbmmYLjgavjgYLjgaPjgZ/loLTlkIjjga7lh6bnkIbjgpLjgZnjgovjgIJcbiAgICog57aZ5om/44Gn5LiK5pu444GN44GZ44KL44GT44Go44KS5oOz5a6a44GX44Gm44GE44KL44CCXG4gICAqIOS4iuabuOOBjeOBl+OBquOBhOWgtOWQiOOBr+ODreOCsOWHuuWKm+OCkuOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRWYWx1ZSDnmbrngavjgZfjgZ/jgqTjg5njg7Pjg4jjga7mloflrZfliJfjg4fjg7zjgr9cbiAgICovXG4gIHB1YmxpYyBtb3Rpb25FdmVudEZpcmVkKGV2ZW50VmFsdWU6IGNzbVN0cmluZyk6IHZvaWQge1xuICAgIEN1YmlzbUxvZ0luZm8oJ3swfScsIGV2ZW50VmFsdWUucyk7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI55So44Gu44Kz44O844Or44OQ44OD44KvXG4gICAqXG4gICAqIEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcuOBq+OCpOODmeODs+ODiOeUqOOBq+eZu+mMsuOBmeOCi+OBn+OCgeOBrkNhbGxiYWNr44CCXG4gICAqIEN1YmlzbVVzZXJNb2RlbOOBrue2meaJv+WFiOOBrkV2ZW50RmlyZWTjgpLlkbzjgbbjgIJcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciDnmbrngavjgZfjgZ/jgqTjg5njg7Pjg4jjgpLnrqHnkIbjgZfjgabjgYTjgZ/jg6Ljg7zjgrfjg6fjg7Pjg57jg43jg7zjgrjjg6Pjg7zjgIHmr5TovIPnlKhcbiAgICogQHBhcmFtIGV2ZW50VmFsdWUg55m654Gr44GX44Gf44Kk44OZ44Oz44OI44Gu5paH5a2X5YiX44OH44O844K/XG4gICAqIEBwYXJhbSBjdXN0b21EYXRhIEN1YmlzbVVzZXJNb2RlbOOCkue2meaJv+OBl+OBn+OCpOODs+OCueOCv+ODs+OCueOCkuaDs+WumlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjdWJpc21EZWZhdWx0TW90aW9uRXZlbnRDYWxsYmFjayhcbiAgICBjYWxsZXI6IEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcixcbiAgICBldmVudFZhbHVlOiBjc21TdHJpbmcsXG4gICAgY3VzdG9tRGF0YTogQ3ViaXNtVXNlck1vZGVsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGVsOiBDdWJpc21Vc2VyTW9kZWwgPSBjdXN0b21EYXRhO1xuXG4gICAgaWYgKG1vZGVsICE9IG51bGwpIHtcbiAgICAgIG1vZGVsLm1vdGlvbkV2ZW50RmlyZWQoZXZlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIOWQhOWkieaVsOWIneacn+WMllxuICAgIHRoaXMuX21vYyA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xuICAgIHRoaXMuX21vdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyID0gbnVsbDtcbiAgICB0aGlzLl9leWVCbGluayA9IG51bGw7XG4gICAgdGhpcy5fYnJlYXRoID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbE1hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fcG9zZSA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBudWxsO1xuICAgIHRoaXMuX3BoeXNpY3MgPSBudWxsO1xuICAgIHRoaXMuX21vZGVsVXNlckRhdGEgPSBudWxsO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMS4wO1xuICAgIHRoaXMuX2xpcHN5bmMgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RMaXBTeW5jVmFsdWUgPSAwLjA7XG4gICAgdGhpcy5fZHJhZ1ggPSAwLjA7XG4gICAgdGhpcy5fZHJhZ1kgPSAwLjA7XG4gICAgdGhpcy5fYWNjZWxlcmF0aW9uWCA9IDAuMDtcbiAgICB0aGlzLl9hY2NlbGVyYXRpb25ZID0gMC4wO1xuICAgIHRoaXMuX2FjY2VsZXJhdGlvblogPSAwLjA7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gZmFsc2U7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSBudWxsO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Oe44ON44O844K444Oj44O844KS5L2c5oiQXG4gICAgdGhpcy5fbW90aW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG4gICAgdGhpcy5fbW90aW9uTWFuYWdlci5zZXRFdmVudENhbGxiYWNrKFxuICAgICAgQ3ViaXNtVXNlck1vZGVsLmN1YmlzbURlZmF1bHRNb3Rpb25FdmVudENhbGxiYWNrLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICAvLyDooajmg4Xjg57jg43jg7zjgrjjg6Pjg7zjgpLkvZzmiJBcbiAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICB0aGlzLl9kcmFnTWFuYWdlciA9IG5ldyBDdWJpc21UYXJnZXRQb2ludCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+OCueODiOODqeOCr+OCv+OBq+ebuOW9k+OBmeOCi+WHpueQhlxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgaWYgKHRoaXMuX21vdGlvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIucmVsZWFzZSgpO1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2MgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW9jLmRlbGV0ZU1vZGVsKHRoaXMuX21vZGVsKTtcbiAgICAgIHRoaXMuX21vYy5yZWxlYXNlKCk7XG4gICAgICB0aGlzLl9tb2MgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX21vZGVsTWF0cml4ID0gbnVsbDtcblxuICAgIEN1YmlzbVBvc2UuZGVsZXRlKHRoaXMuX3Bvc2UpO1xuICAgIEN1YmlzbUV5ZUJsaW5rLmRlbGV0ZSh0aGlzLl9leWVCbGluayk7XG4gICAgQ3ViaXNtQnJlYXRoLmRlbGV0ZSh0aGlzLl9icmVhdGgpO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBudWxsO1xuXG4gICAgQ3ViaXNtUGh5c2ljcy5kZWxldGUodGhpcy5fcGh5c2ljcyk7XG4gICAgQ3ViaXNtTW9kZWxVc2VyRGF0YS5kZWxldGUodGhpcy5fbW9kZWxVc2VyRGF0YSk7XG5cbiAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21vYzogQ3ViaXNtTW9jOyAvLyBNb2Pjg4fjg7zjgr9cbiAgcHJvdGVjdGVkIF9tb2RlbDogQ3ViaXNtTW9kZWw7IC8vIE1vZGVs44Kk44Oz44K544K/44Oz44K5XG5cbiAgcHJvdGVjdGVkIF9tb3Rpb25NYW5hZ2VyOiBDdWJpc21Nb3Rpb25NYW5hZ2VyOyAvLyDjg6Ljg7zjgrfjg6fjg7PnrqHnkIZcbiAgcHJvdGVjdGVkIF9leHByZXNzaW9uTWFuYWdlcjogQ3ViaXNtTW90aW9uTWFuYWdlcjsgLy8g6KGo5oOF566h55CGXG4gIHByb3RlY3RlZCBfZXllQmxpbms6IEN1YmlzbUV5ZUJsaW5rOyAvLyDoh6rli5Xjgb7jgbDjgZ/jgY1cbiAgcHJvdGVjdGVkIF9icmVhdGg6IEN1YmlzbUJyZWF0aDsgLy8g5ZG85ZC4XG4gIHByb3RlY3RlZCBfbW9kZWxNYXRyaXg6IEN1YmlzbU1vZGVsTWF0cml4OyAvLyDjg6Ljg4fjg6vooYzliJdcbiAgcHJvdGVjdGVkIF9wb3NlOiBDdWJpc21Qb3NlOyAvLyDjg53jg7zjgrrnrqHnkIZcbiAgcHJvdGVjdGVkIF9kcmFnTWFuYWdlcjogQ3ViaXNtVGFyZ2V0UG9pbnQ7IC8vIOODnuOCpuOCueODieODqeODg+OCsFxuICBwcm90ZWN0ZWQgX3BoeXNpY3M6IEN1YmlzbVBoeXNpY3M7IC8vIOeJqeeQhua8lOeul1xuICBwcm90ZWN0ZWQgX21vZGVsVXNlckRhdGE6IEN1YmlzbU1vZGVsVXNlckRhdGE7IC8vIOODpuODvOOCtuODvOODh+ODvOOCv1xuXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW47IC8vIOWIneacn+WMluOBleOCjOOBn+OBi+OBqeOBhuOBi1xuICBwcm90ZWN0ZWQgX3VwZGF0aW5nOiBib29sZWFuOyAvLyDmm7TmlrDjgZXjgozjgZ/jgYvjganjgYbjgYtcbiAgcHJvdGVjdGVkIF9vcGFjaXR5OiBudW1iZXI7IC8vIOS4jemAj+aYjuW6plxuICBwcm90ZWN0ZWQgX2xpcHN5bmM6IGJvb2xlYW47IC8vIOODquODg+ODl+OCt+ODs+OCr+OBmeOCi+OBi+OBqeOBhuOBi1xuICBwcm90ZWN0ZWQgX2xhc3RMaXBTeW5jVmFsdWU6IG51bWJlcjsgLy8g5pyA5b6M44Gu44Oq44OD44OX44K344Oz44Kv44Gu5Yi25b6h5ZywXG4gIHByb3RlY3RlZCBfZHJhZ1g6IG51bWJlcjsgLy8g44Oe44Km44K544OJ44Op44OD44Kw44GuWOS9jee9rlxuICBwcm90ZWN0ZWQgX2RyYWdZOiBudW1iZXI7IC8vIOODnuOCpuOCueODieODqeODg+OCsOOBrlnkvY3nva5cbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25YOiBudW1iZXI7IC8vIFjou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25ZOiBudW1iZXI7IC8vIFnou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25aOiBudW1iZXI7IC8vIFrou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9kZWJ1Z01vZGU6IGJvb2xlYW47IC8vIOODh+ODkOODg+OCsOODouODvOODieOBi+OBqeOBhuOBi1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBDdWJpc21SZW5kZXJlcl9XZWJHTDsgLy8g44Os44Oz44OA44OpXG59XG5cbi8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuaW1wb3J0ICogYXMgJCBmcm9tICcuL2N1YmlzbXVzZXJtb2RlbCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXZlMkRDdWJpc21GcmFtZXdvcmsge1xuICBleHBvcnQgY29uc3QgQ3ViaXNtVXNlck1vZGVsID0gJC5DdWJpc21Vc2VyTW9kZWw7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbVVzZXJNb2RlbCA9ICQuQ3ViaXNtVXNlck1vZGVsO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjYzY2VkOWYwZTBkNTRhYTU2MzZkXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=