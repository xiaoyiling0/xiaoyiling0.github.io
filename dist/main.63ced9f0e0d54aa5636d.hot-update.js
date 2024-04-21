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
        return left <= tx && tx <= right && top <= ty && ty <= bottom;
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
/******/ 	__webpack_require__.h = function() { return "4d99f62efcc93f01f3ab"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNoQztRQUVELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6Qix1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLDJCQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6Qiw2QkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMseUNBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTRCSCxzQkFBQztBQUFELENBQUM7QUEvWVksMENBQWU7QUFrWjVCLHNIQUF1QztBQUV2QyxJQUFpQixxQkFBcUIsQ0FHckM7QUFIRCxXQUFpQixxQkFBcUI7SUFDdkIscUNBQWUsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDO0FBRW5ELENBQUMsRUFIZ0IscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFHckM7Ozs7Ozs7OztVQ3ZiRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vLi4vRnJhbWV3b3JrL3NyYy9tb2RlbC9jdWJpc211c2VybW9kZWwudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21CcmVhdGggfSBmcm9tICcuLi9lZmZlY3QvY3ViaXNtYnJlYXRoJztcbmltcG9ydCB7IEN1YmlzbUV5ZUJsaW5rIH0gZnJvbSAnLi4vZWZmZWN0L2N1YmlzbWV5ZWJsaW5rJztcbmltcG9ydCB7IEN1YmlzbVBvc2UgfSBmcm9tICcuLi9lZmZlY3QvY3ViaXNtcG9zZSc7XG5pbXBvcnQgeyBDdWJpc21JZEhhbmRsZSB9IGZyb20gJy4uL2lkL2N1YmlzbWlkJztcbmltcG9ydCB7IENvbnN0YW50IH0gZnJvbSAnLi4vbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IEN1YmlzbU1vZGVsTWF0cml4IH0gZnJvbSAnLi4vbWF0aC9jdWJpc21tb2RlbG1hdHJpeCc7XG5pbXBvcnQgeyBDdWJpc21UYXJnZXRQb2ludCB9IGZyb20gJy4uL21hdGgvY3ViaXNtdGFyZ2V0cG9pbnQnO1xuaW1wb3J0IHsgQUN1YmlzbU1vdGlvbiwgRmluaXNoZWRNb3Rpb25DYWxsYmFjayB9IGZyb20gJy4uL21vdGlvbi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IEN1YmlzbUV4cHJlc3Npb25Nb3Rpb24gfSBmcm9tICcuLi9tb3Rpb24vY3ViaXNtZXhwcmVzc2lvbm1vdGlvbic7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb24gfSBmcm9tICcuLi9tb3Rpb24vY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IEN1YmlzbU1vdGlvbk1hbmFnZXIgfSBmcm9tICcuLi9tb3Rpb24vY3ViaXNtbW90aW9ubWFuYWdlcic7XG5pbXBvcnQgeyBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXIgfSBmcm9tICcuLi9tb3Rpb24vY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyJztcbmltcG9ydCB7IEN1YmlzbVBoeXNpY3MgfSBmcm9tICcuLi9waHlzaWNzL2N1YmlzbXBoeXNpY3MnO1xuaW1wb3J0IHsgQ3ViaXNtUmVuZGVyZXJfV2ViR0wgfSBmcm9tICcuLi9yZW5kZXJpbmcvY3ViaXNtcmVuZGVyZXJfd2ViZ2wnO1xuaW1wb3J0IHsgY3NtU3RyaW5nIH0gZnJvbSAnLi4vdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgQ3ViaXNtTG9nRXJyb3IsIEN1YmlzbUxvZ0luZm8gfSBmcm9tICcuLi91dGlscy9jdWJpc21kZWJ1Zyc7XG5pbXBvcnQgeyBDdWJpc21Nb2MgfSBmcm9tICcuL2N1YmlzbW1vYyc7XG5pbXBvcnQgeyBDdWJpc21Nb2RlbCB9IGZyb20gJy4vY3ViaXNtbW9kZWwnO1xuaW1wb3J0IHsgQ3ViaXNtTW9kZWxVc2VyRGF0YSB9IGZyb20gJy4vY3ViaXNtbW9kZWx1c2VyZGF0YSc7XG5cbi8qKlxuICog44Om44O844K244O844GM5a6f6Zqb44Gr5L2/55So44GZ44KL44Oi44OH44OrXG4gKlxuICog44Om44O844K244O844GM5a6f6Zqb44Gr5L2/55So44GZ44KL44Oi44OH44Or44Gu5Z+65bqV44Kv44Op44K544CC44GT44KM44KS57aZ5om/44GX44Gm44Om44O844K244O844GM5a6f6KOF44GZ44KL44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBDdWJpc21Vc2VyTW9kZWwge1xuICAvKipcbiAgICog5Yid5pyf5YyW54q25oWL44Gu5Y+W5b6XXG4gICAqXG4gICAqIOWIneacn+WMluOBleOCjOOBpuOBhOOCi+eKtuaFi+OBi++8n1xuICAgKlxuICAgKiBAcmV0dXJuIHRydWUgICAgIOWIneacn+WMluOBleOCjOOBpuOBhOOCi1xuICAgKiBAcmV0dXJuIGZhbHNlICAgIOWIneacn+WMluOBleOCjOOBpuOBhOOBquOBhFxuICAgKi9cbiAgcHVibGljIGlzSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneacn+WMlueKtuaFi+OBruioreWumlxuICAgKlxuICAgKiDliJ3mnJ/ljJbnirbmhYvjgpLoqK3lrprjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHYg5Yid5pyf5YyW54q25oWLXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdGlhbGl6ZWQodjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDnirbmhYvjga7lj5blvpdcbiAgICpcbiAgICog5pu05paw44GV44KM44Gm44GE44KL54q25oWL44GL77yfXG4gICAqXG4gICAqIEByZXR1cm4gdHJ1ZSAgICAg5pu05paw44GV44KM44Gm44GE44KLXG4gICAqIEByZXR1cm4gZmFsc2UgICAg5pu05paw44GV44KM44Gm44GE44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNVcGRhdGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdXBkYXRpbmc7XG4gIH1cblxuICAvKipcbiAgICog5pu05paw54q25oWL44Gu6Kit5a6aXG4gICAqXG4gICAqIOabtOaWsOeKtuaFi+OCkuioreWumuOBmeOCi1xuICAgKlxuICAgKiBAcGFyYW0gdiDmm7TmlrDnirbmhYtcbiAgICovXG4gIHB1YmxpYyBzZXRVcGRhdGluZyh2OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRpbmcgPSB2O1xuICB9XG5cbiAgLyoqXG4gICAqIOODnuOCpuOCueODieODqeODg+OCsOaDheWgseOBruioreWumlxuICAgKiBAcGFyYW0g44OJ44Op44OD44Kw44GX44Gm44GE44KL44Kr44O844K944Or44GuWOS9jee9rlxuICAgKiBAcGFyYW0g44OJ44Op44OD44Kw44GX44Gm44GE44KL44Kr44O844K944Or44GuWeS9jee9rlxuICAgKi9cbiAgcHVibGljIHNldERyYWdnaW5nKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZHJhZ01hbmFnZXIuc2V0KHgsIHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWKoOmAn+W6puOBruaDheWgseOCkuioreWumuOBmeOCi1xuICAgKiBAcGFyYW0geCBY6Lu45pa55ZCR44Gu5Yqg6YCf5bqmXG4gICAqIEBwYXJhbSB5IFnou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgICogQHBhcmFtIHogWui7uOaWueWQkeOBruWKoOmAn+W6plxuICAgKi9cbiAgcHVibGljIHNldEFjY2VsZXJhdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWNjZWxlcmF0aW9uWCA9IHg7XG4gICAgdGhpcy5fYWNjZWxlcmF0aW9uWSA9IHk7XG4gICAgdGhpcy5fYWNjZWxlcmF0aW9uWiA9IHo7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or6KGM5YiX44KS5Y+W5b6X44GZ44KLXG4gICAqIEByZXR1cm4g44Oi44OH44Or6KGM5YiXXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxNYXRyaXgoKTogQ3ViaXNtTW9kZWxNYXRyaXgge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbE1hdHJpeDtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuI3pgI/mmI7luqbjga7oqK3lrppcbiAgICogQHBhcmFtIGEg5LiN6YCP5piO5bqmXG4gICAqL1xuICBwdWJsaWMgc2V0T3BhY2l0eShhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vcGFjaXR5ID0gYTtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuI3pgI/mmI7luqbjga7lj5blvpdcbiAgICogQHJldHVybiDkuI3pgI/mmI7luqZcbiAgICovXG4gIHB1YmxpYyBnZXRPcGFjaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44OH44O844K/44KS6Kqt44G/6L6844KAXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgICAgbW9jM+ODleOCoeOCpOODq+OBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKi9cbiAgcHVibGljIGxvYWRNb2RlbChidWZmZXI6IEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5fbW9jID0gQ3ViaXNtTW9jLmNyZWF0ZShidWZmZXIpO1xuICAgIHRoaXMuX21vZGVsID0gdGhpcy5fbW9jLmNyZWF0ZU1vZGVsKCk7XG4gICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTtcblxuICAgIGlmICh0aGlzLl9tb2MgPT0gbnVsbCB8fCB0aGlzLl9tb2RlbCA9PSBudWxsKSB7XG4gICAgICBDdWJpc21Mb2dFcnJvcignRmFpbGVkIHRvIENyZWF0ZU1vZGVsKCkuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWxNYXRyaXggPSBuZXcgQ3ViaXNtTW9kZWxNYXRyaXgoXG4gICAgICB0aGlzLl9tb2RlbC5nZXRDYW52YXNXaWR0aCgpLFxuICAgICAgdGhpcy5fbW9kZWwuZ2V0Q2FudmFzSGVpZ2h0KClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuiqreOBv+i+vOOCgFxuICAgKiBAcGFyYW0gYnVmZmVyIG1vdGlvbjMuanNvbuODleOCoeOCpOODq+OBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICogQHBhcmFtIG5hbWUg44Oi44O844K344On44Oz44Gu5ZCN5YmNXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjgq/jg6njgrlcbiAgICovXG4gIHB1YmxpYyBsb2FkTW90aW9uID0gKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKSA9PiBDdWJpc21Nb3Rpb24uY3JlYXRlKGJ1ZmZlciwgc2l6ZSwgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIpO1xuXG4gIC8qKlxuICAgKiDooajmg4Xjg4fjg7zjgr/jga7oqq3jgb/ovrzjgb9cbiAgICogQHBhcmFtIGJ1ZmZlciBleHDjg5XjgqHjgqTjg6vjgYzoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg5Djg4Pjg5XjgqFcbiAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAqIEBwYXJhbSBuYW1lIOihqOaDheOBruWQjeWJjVxuICAgKi9cbiAgcHVibGljIGxvYWRFeHByZXNzaW9uKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZ1xuICApOiBBQ3ViaXNtTW90aW9uIHtcbiAgICByZXR1cm4gQ3ViaXNtRXhwcmVzc2lvbk1vdGlvbi5jcmVhdGUoYnVmZmVyLCBzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg53jg7zjgrrjg4fjg7zjgr/jga7oqq3jgb/ovrzjgb9cbiAgICogQHBhcmFtIGJ1ZmZlciBwb3NlMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgKi9cbiAgcHVibGljIGxvYWRQb3NlKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Bvc2UgPSBDdWJpc21Qb3NlLmNyZWF0ZShidWZmZXIsIHNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OBq+S7mOWxnuOBmeOCi+ODpuODvOOCtuODvOODh+ODvOOCv+OCkuiqreOBv+i+vOOCgFxuICAgKiBAcGFyYW0gYnVmZmVyIHVzZXJkYXRhMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgKi9cbiAgcHVibGljIGxvYWRVc2VyRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9tb2RlbFVzZXJEYXRhID0gQ3ViaXNtTW9kZWxVc2VyRGF0YS5jcmVhdGUoYnVmZmVyLCBzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDniannkIbmvJTnrpfjg4fjg7zjgr/jga7oqq3jgb/ovrzjgb9cbiAgICogQHBhcmFtIGJ1ZmZlciAgcGh5c2ljczMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgKiBAcGFyYW0gc2l6ZSAgICDjg5Djg4Pjg5XjgqHjga7jgrXjgqTjgrpcbiAgICovXG4gIHB1YmxpYyBsb2FkUGh5c2ljcyhidWZmZXI6IEFycmF5QnVmZmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9waHlzaWNzID0gQ3ViaXNtUGh5c2ljcy5jcmVhdGUoYnVmZmVyLCBzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvZPjgZ/jgorliKTlrprjga7lj5blvpdcbiAgICogQHBhcmFtIGRyYXdhYmxlSWQg5qSc6Ki844GX44Gf44GERHJhd2FibGXjga5JRFxuICAgKiBAcGFyYW0gcG9pbnRYIFjkvY3nva5cbiAgICogQHBhcmFtIHBvaW50WSBZ5L2N572uXG4gICAqIEByZXR1cm4gdHJ1ZSDjg5Ljg4Pjg4jjgZfjgabjgYTjgotcbiAgICogQHJldHVybiBmYWxzZSDjg5Ljg4Pjg4jjgZfjgabjgYTjgarjgYRcbiAgICovXG4gIHB1YmxpYyBpc0hpdChcbiAgICBkcmF3YWJsZUlkOiBDdWJpc21JZEhhbmRsZSxcbiAgICBwb2ludFg6IG51bWJlcixcbiAgICBwb2ludFk6IG51bWJlclxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBkcmF3SW5kZXg6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldERyYXdhYmxlSW5kZXgoZHJhd2FibGVJZCk7XG5cbiAgICBpZiAoZHJhd0luZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyDlrZjlnKjjgZfjgarjgYTloLTlkIjjga9mYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXREcmF3YWJsZVZlcnRleENvdW50KGRyYXdJbmRleCk7XG4gICAgY29uc3QgdmVydGljZXM6IEZsb2F0MzJBcnJheSA9IHRoaXMuX21vZGVsLmdldERyYXdhYmxlVmVydGljZXMoZHJhd0luZGV4KTtcblxuICAgIGxldCBsZWZ0OiBudW1iZXIgPSB2ZXJ0aWNlc1swXTtcbiAgICBsZXQgcmlnaHQ6IG51bWJlciA9IHZlcnRpY2VzWzBdO1xuICAgIGxldCB0b3A6IG51bWJlciA9IHZlcnRpY2VzWzFdO1xuICAgIGxldCBib3R0b206IG51bWJlciA9IHZlcnRpY2VzWzFdO1xuXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBjb3VudDsgKytqKSB7XG4gICAgICBjb25zdCB4ID0gdmVydGljZXNbQ29uc3RhbnQudmVydGV4T2Zmc2V0ICsgaiAqIENvbnN0YW50LnZlcnRleFN0ZXBdO1xuICAgICAgY29uc3QgeSA9IHZlcnRpY2VzW0NvbnN0YW50LnZlcnRleE9mZnNldCArIGogKiBDb25zdGFudC52ZXJ0ZXhTdGVwICsgMV07XG5cbiAgICAgIGlmICh4IDwgbGVmdCkge1xuICAgICAgICBsZWZ0ID0geDsgLy8gTWluIHhcbiAgICAgIH1cblxuICAgICAgaWYgKHggPiByaWdodCkge1xuICAgICAgICByaWdodCA9IHg7IC8vIE1heCB4XG4gICAgICB9XG5cbiAgICAgIGlmICh5IDwgdG9wKSB7XG4gICAgICAgIHRvcCA9IHk7IC8vIE1pbiB5XG4gICAgICB9XG5cbiAgICAgIGlmICh5ID4gYm90dG9tKSB7XG4gICAgICAgIGJvdHRvbSA9IHk7IC8vIE1heCB5XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdHg6IG51bWJlciA9IHRoaXMuX21vZGVsTWF0cml4LmludmVydFRyYW5zZm9ybVgocG9pbnRYKTtcbiAgICBjb25zdCB0eTogbnVtYmVyID0gdGhpcy5fbW9kZWxNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWShwb2ludFkpO1xuXG4gICAgcmV0dXJuIGxlZnQgPD0gdHggJiYgdHggPD0gcmlnaHQgJiYgdG9wIDw9IHR5ICYmIHR5IDw9IGJvdHRvbTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjga7lj5blvpdcbiAgICogQHJldHVybiDjg6Ljg4fjg6tcbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbCgpOiBDdWJpc21Nb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeOBruWPluW+l1xuICAgKiBAcmV0dXJuIOODrOODs+ODgOODqVxuICAgKi9cbiAgcHVibGljIGdldFJlbmRlcmVyKCk6IEN1YmlzbVJlbmRlcmVyX1dlYkdMIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICAvKipcbiAgICog44Os44Oz44OA44Op44KS5L2c5oiQ44GX44Gm5Yid5pyf5YyW44KS5a6f6KGM44GZ44KLXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVuZGVyZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JlbmRlcmVyKSB7XG4gICAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXIgPSBuZXcgQ3ViaXNtUmVuZGVyZXJfV2ViR0woKTtcbiAgICB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKHRoaXMuX21vZGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6zjg7Pjg4Djg6njga7op6PmlL5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVSZW5kZXJlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVsZWFzZSgpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jnmbrngavmmYLjga7mqJnmupblh6bnkIZcbiAgICpcbiAgICogRXZlbnTjgYzlho3nlJ/lh6bnkIbmmYLjgavjgYLjgaPjgZ/loLTlkIjjga7lh6bnkIbjgpLjgZnjgovjgIJcbiAgICog57aZ5om/44Gn5LiK5pu444GN44GZ44KL44GT44Go44KS5oOz5a6a44GX44Gm44GE44KL44CCXG4gICAqIOS4iuabuOOBjeOBl+OBquOBhOWgtOWQiOOBr+ODreOCsOWHuuWKm+OCkuOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRWYWx1ZSDnmbrngavjgZfjgZ/jgqTjg5njg7Pjg4jjga7mloflrZfliJfjg4fjg7zjgr9cbiAgICovXG4gIHB1YmxpYyBtb3Rpb25FdmVudEZpcmVkKGV2ZW50VmFsdWU6IGNzbVN0cmluZyk6IHZvaWQge1xuICAgIEN1YmlzbUxvZ0luZm8oJ3swfScsIGV2ZW50VmFsdWUucyk7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI55So44Gu44Kz44O844Or44OQ44OD44KvXG4gICAqXG4gICAqIEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcuOBq+OCpOODmeODs+ODiOeUqOOBq+eZu+mMsuOBmeOCi+OBn+OCgeOBrkNhbGxiYWNr44CCXG4gICAqIEN1YmlzbVVzZXJNb2RlbOOBrue2meaJv+WFiOOBrkV2ZW50RmlyZWTjgpLlkbzjgbbjgIJcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciDnmbrngavjgZfjgZ/jgqTjg5njg7Pjg4jjgpLnrqHnkIbjgZfjgabjgYTjgZ/jg6Ljg7zjgrfjg6fjg7Pjg57jg43jg7zjgrjjg6Pjg7zjgIHmr5TovIPnlKhcbiAgICogQHBhcmFtIGV2ZW50VmFsdWUg55m654Gr44GX44Gf44Kk44OZ44Oz44OI44Gu5paH5a2X5YiX44OH44O844K/XG4gICAqIEBwYXJhbSBjdXN0b21EYXRhIEN1YmlzbVVzZXJNb2RlbOOCkue2meaJv+OBl+OBn+OCpOODs+OCueOCv+ODs+OCueOCkuaDs+WumlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjdWJpc21EZWZhdWx0TW90aW9uRXZlbnRDYWxsYmFjayhcbiAgICBjYWxsZXI6IEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcixcbiAgICBldmVudFZhbHVlOiBjc21TdHJpbmcsXG4gICAgY3VzdG9tRGF0YTogQ3ViaXNtVXNlck1vZGVsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGVsOiBDdWJpc21Vc2VyTW9kZWwgPSBjdXN0b21EYXRhO1xuXG4gICAgaWYgKG1vZGVsICE9IG51bGwpIHtcbiAgICAgIG1vZGVsLm1vdGlvbkV2ZW50RmlyZWQoZXZlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIOWQhOWkieaVsOWIneacn+WMllxuICAgIHRoaXMuX21vYyA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xuICAgIHRoaXMuX21vdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyID0gbnVsbDtcbiAgICB0aGlzLl9leWVCbGluayA9IG51bGw7XG4gICAgdGhpcy5fYnJlYXRoID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbE1hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fcG9zZSA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBudWxsO1xuICAgIHRoaXMuX3BoeXNpY3MgPSBudWxsO1xuICAgIHRoaXMuX21vZGVsVXNlckRhdGEgPSBudWxsO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMS4wO1xuICAgIHRoaXMuX2xpcHN5bmMgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RMaXBTeW5jVmFsdWUgPSAwLjA7XG4gICAgdGhpcy5fZHJhZ1ggPSAwLjA7XG4gICAgdGhpcy5fZHJhZ1kgPSAwLjA7XG4gICAgdGhpcy5fYWNjZWxlcmF0aW9uWCA9IDAuMDtcbiAgICB0aGlzLl9hY2NlbGVyYXRpb25ZID0gMC4wO1xuICAgIHRoaXMuX2FjY2VsZXJhdGlvblogPSAwLjA7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gZmFsc2U7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSBudWxsO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Oe44ON44O844K444Oj44O844KS5L2c5oiQXG4gICAgdGhpcy5fbW90aW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG4gICAgdGhpcy5fbW90aW9uTWFuYWdlci5zZXRFdmVudENhbGxiYWNrKFxuICAgICAgQ3ViaXNtVXNlck1vZGVsLmN1YmlzbURlZmF1bHRNb3Rpb25FdmVudENhbGxiYWNrLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICAvLyDooajmg4Xjg57jg43jg7zjgrjjg6Pjg7zjgpLkvZzmiJBcbiAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICB0aGlzLl9kcmFnTWFuYWdlciA9IG5ldyBDdWJpc21UYXJnZXRQb2ludCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+OCueODiOODqeOCr+OCv+OBq+ebuOW9k+OBmeOCi+WHpueQhlxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgaWYgKHRoaXMuX21vdGlvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIucmVsZWFzZSgpO1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2MgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW9jLmRlbGV0ZU1vZGVsKHRoaXMuX21vZGVsKTtcbiAgICAgIHRoaXMuX21vYy5yZWxlYXNlKCk7XG4gICAgICB0aGlzLl9tb2MgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX21vZGVsTWF0cml4ID0gbnVsbDtcblxuICAgIEN1YmlzbVBvc2UuZGVsZXRlKHRoaXMuX3Bvc2UpO1xuICAgIEN1YmlzbUV5ZUJsaW5rLmRlbGV0ZSh0aGlzLl9leWVCbGluayk7XG4gICAgQ3ViaXNtQnJlYXRoLmRlbGV0ZSh0aGlzLl9icmVhdGgpO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBudWxsO1xuXG4gICAgQ3ViaXNtUGh5c2ljcy5kZWxldGUodGhpcy5fcGh5c2ljcyk7XG4gICAgQ3ViaXNtTW9kZWxVc2VyRGF0YS5kZWxldGUodGhpcy5fbW9kZWxVc2VyRGF0YSk7XG5cbiAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21vYzogQ3ViaXNtTW9jOyAvLyBNb2Pjg4fjg7zjgr9cbiAgcHJvdGVjdGVkIF9tb2RlbDogQ3ViaXNtTW9kZWw7IC8vIE1vZGVs44Kk44Oz44K544K/44Oz44K5XG5cbiAgcHJvdGVjdGVkIF9tb3Rpb25NYW5hZ2VyOiBDdWJpc21Nb3Rpb25NYW5hZ2VyOyAvLyDjg6Ljg7zjgrfjg6fjg7PnrqHnkIZcbiAgcHJvdGVjdGVkIF9leHByZXNzaW9uTWFuYWdlcjogQ3ViaXNtTW90aW9uTWFuYWdlcjsgLy8g6KGo5oOF566h55CGXG4gIHByb3RlY3RlZCBfZXllQmxpbms6IEN1YmlzbUV5ZUJsaW5rOyAvLyDoh6rli5Xjgb7jgbDjgZ/jgY1cbiAgcHJvdGVjdGVkIF9icmVhdGg6IEN1YmlzbUJyZWF0aDsgLy8g5ZG85ZC4XG4gIHByb3RlY3RlZCBfbW9kZWxNYXRyaXg6IEN1YmlzbU1vZGVsTWF0cml4OyAvLyDjg6Ljg4fjg6vooYzliJdcbiAgcHJvdGVjdGVkIF9wb3NlOiBDdWJpc21Qb3NlOyAvLyDjg53jg7zjgrrnrqHnkIZcbiAgcHJvdGVjdGVkIF9kcmFnTWFuYWdlcjogQ3ViaXNtVGFyZ2V0UG9pbnQ7IC8vIOODnuOCpuOCueODieODqeODg+OCsFxuICBwcm90ZWN0ZWQgX3BoeXNpY3M6IEN1YmlzbVBoeXNpY3M7IC8vIOeJqeeQhua8lOeul1xuICBwcm90ZWN0ZWQgX21vZGVsVXNlckRhdGE6IEN1YmlzbU1vZGVsVXNlckRhdGE7IC8vIOODpuODvOOCtuODvOODh+ODvOOCv1xuXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW47IC8vIOWIneacn+WMluOBleOCjOOBn+OBi+OBqeOBhuOBi1xuICBwcm90ZWN0ZWQgX3VwZGF0aW5nOiBib29sZWFuOyAvLyDmm7TmlrDjgZXjgozjgZ/jgYvjganjgYbjgYtcbiAgcHJvdGVjdGVkIF9vcGFjaXR5OiBudW1iZXI7IC8vIOS4jemAj+aYjuW6plxuICBwcm90ZWN0ZWQgX2xpcHN5bmM6IGJvb2xlYW47IC8vIOODquODg+ODl+OCt+ODs+OCr+OBmeOCi+OBi+OBqeOBhuOBi1xuICBwcm90ZWN0ZWQgX2xhc3RMaXBTeW5jVmFsdWU6IG51bWJlcjsgLy8g5pyA5b6M44Gu44Oq44OD44OX44K344Oz44Kv44Gu5Yi25b6h5ZywXG4gIHByb3RlY3RlZCBfZHJhZ1g6IG51bWJlcjsgLy8g44Oe44Km44K544OJ44Op44OD44Kw44GuWOS9jee9rlxuICBwcm90ZWN0ZWQgX2RyYWdZOiBudW1iZXI7IC8vIOODnuOCpuOCueODieODqeODg+OCsOOBrlnkvY3nva5cbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25YOiBudW1iZXI7IC8vIFjou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25ZOiBudW1iZXI7IC8vIFnou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25aOiBudW1iZXI7IC8vIFrou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgcHJvdGVjdGVkIF9kZWJ1Z01vZGU6IGJvb2xlYW47IC8vIOODh+ODkOODg+OCsOODouODvOODieOBi+OBqeOBhuOBi1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBDdWJpc21SZW5kZXJlcl9XZWJHTDsgLy8g44Os44Oz44OA44OpXG59XG5cbi8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuaW1wb3J0ICogYXMgJCBmcm9tICcuL2N1YmlzbXVzZXJtb2RlbCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXZlMkRDdWJpc21GcmFtZXdvcmsge1xuICBleHBvcnQgY29uc3QgQ3ViaXNtVXNlck1vZGVsID0gJC5DdWJpc21Vc2VyTW9kZWw7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbVVzZXJNb2RlbCA9ICQuQ3ViaXNtVXNlck1vZGVsO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjRkOTlmNjJlZmNjOTNmMDFmM2FiXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=