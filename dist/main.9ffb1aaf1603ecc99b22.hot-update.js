"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/lappdelegate.ts":
/*!*****************************!*\
  !*** ./src/lappdelegate.ts ***!
  \*****************************/
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
exports.LAppDelegate = exports.frameBuffer = exports.gl = exports.s_instance = exports.canvas = void 0;
var live2dcubismframework_1 = __webpack_require__(/*! @framework/live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lapptexturemanager_1 = __webpack_require__(/*! ./lapptexturemanager */ "./src/lapptexturemanager.ts");
var lappview_1 = __webpack_require__(/*! ./lappview */ "./src/lappview.ts");
exports.canvas = null;
exports.s_instance = null;
exports.gl = null;
exports.frameBuffer = null;
var LAppDelegate = (function () {
    function LAppDelegate() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new live2dcubismframework_1.Option();
        this._view = new lappview_1.LAppView();
        this._textureManager = new lapptexturemanager_1.LAppTextureManager();
    }
    LAppDelegate.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppDelegate();
        }
        return exports.s_instance;
    };
    LAppDelegate.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance.release();
        }
        exports.s_instance = null;
    };
    LAppDelegate.prototype.initialize = function () {
        exports.canvas = document.getElementById("live2d");
        exports.canvas.width = exports.canvas.width;
        exports.canvas.height = exports.canvas.height;
        exports.canvas.toDataURL("image/png");
        var fui_eye = document.getElementsByClassName("fui-eye")[0];
        exports.gl = exports.canvas.getContext('webgl', { alpha: true }) || exports.canvas.getContext('experimental-webgl');
        if (!exports.gl) {
            alert('Cannot initialize WebGL. This browser does not support.\n不能初始化WebGL，该浏览器不支持WebGL，请切换浏览器重试');
            exports.gl = null;
            document.body.innerHTML =
                '该浏览器不支持 <code>&lt;canvas&gt;</code> 标签元素，请切换浏览器重试 .';
            return false;
        }
        if (!exports.frameBuffer) {
            exports.frameBuffer = exports.gl.getParameter(exports.gl.FRAMEBUFFER_BINDING);
        }
        exports.gl.enable(exports.gl.BLEND);
        exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
        var supportTouch = 'ontouchend' in exports.canvas;
        if (supportTouch) {
            exports.canvas.ontouchstart = onTouchBegan;
            exports.canvas.ontouchmove = onTouchMoved;
            exports.canvas.ontouchend = onTouchEnded;
            exports.canvas.ontouchcancel = onTouchCancel;
        }
        else {
            exports.canvas.onmousedown = onClickBegan;
            window.onmousemove = onMouseMoved;
            exports.canvas.onmouseup = onClickEnded;
            fui_eye.onmousedown = function () {
                var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
                live2DManager.nextScene();
            };
        }
        this._view.initialize();
        this.initializeCubism();
        return true;
    };
    LAppDelegate.prototype.onResize = function () {
        this._resizeCanvas();
        this._view.initialize();
        this._view.initializeSprite();
    };
    LAppDelegate.prototype.release = function () {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        lapplive2dmanager_1.LAppLive2DManager.releaseInstance();
        live2dcubismframework_1.CubismFramework.dispose();
    };
    LAppDelegate.prototype.run = function () {
        var _this = this;
        var loop = function () {
            if (exports.s_instance == null) {
                return;
            }
            lapppal_1.LAppPal.updateTime();
            exports.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            exports.gl.enable(exports.gl.DEPTH_TEST);
            exports.gl.depthFunc(exports.gl.LEQUAL);
            exports.gl.clearDepth(1.0);
            exports.gl.enable(exports.gl.BLEND);
            exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
            _this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    };
    LAppDelegate.prototype.createShader = function () {
        var vertexShaderId = exports.gl.createShader(exports.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        var vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        exports.gl.shaderSource(vertexShaderId, vertexShader);
        exports.gl.compileShader(vertexShaderId);
        var fragmentShaderId = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        var fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        exports.gl.shaderSource(fragmentShaderId, fragmentShader);
        exports.gl.compileShader(fragmentShaderId);
        var programId = exports.gl.createProgram();
        exports.gl.attachShader(programId, vertexShaderId);
        exports.gl.attachShader(programId, fragmentShaderId);
        exports.gl.deleteShader(vertexShaderId);
        exports.gl.deleteShader(fragmentShaderId);
        exports.gl.linkProgram(programId);
        exports.gl.useProgram(programId);
        return programId;
    };
    LAppDelegate.prototype.getView = function () {
        return this._view;
    };
    LAppDelegate.prototype.getTextureManager = function () {
        return this._textureManager;
    };
    LAppDelegate.prototype.initializeCubism = function () {
        this._cubismOption.logFunction = lapppal_1.LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        live2dcubismframework_1.CubismFramework.startUp(this._cubismOption);
        live2dcubismframework_1.CubismFramework.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance();
        lapppal_1.LAppPal.updateTime();
        this._view.initializeSprite();
    };
    LAppDelegate.prototype._resizeCanvas = function () {
        exports.canvas.width = window.innerWidth;
        exports.canvas.height = window.innerHeight;
    };
    return LAppDelegate;
}());
exports.LAppDelegate = LAppDelegate;
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.pageX;
    var posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(1, 1);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    console.log("1");
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.changedTouches[0].pageX;
    var posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "9f2073bf86066e79040c"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45ZmZiMWFhZjE2MDNlY2M5OWIyMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSw2SUFBMkU7QUFFM0UsOEZBQTJDO0FBQzNDLHVHQUF3RDtBQUN4RCx5RUFBb0M7QUFDcEMsMEdBQTBEO0FBQzFELDRFQUFzQztBQUUzQixjQUFNLEdBQXNCLElBQUksQ0FBQztBQUNqQyxrQkFBVSxHQUFpQixJQUFJLENBQUM7QUFDaEMsVUFBRSxHQUEwQixJQUFJLENBQUM7QUFDakMsbUJBQVcsR0FBcUIsSUFBSSxDQUFDO0FBTWhEO0lBbVBFO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDhCQUFNLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFyUGEsd0JBQVcsR0FBekI7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUNqQztRQUVELE9BQU8sa0JBQVUsQ0FBQztJQUNwQixDQUFDO0lBS2EsNEJBQWUsR0FBN0I7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdEI7UUFFRCxrQkFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBS08saUNBQVUsR0FBakI7UUFNQyxjQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMs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M0QsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyRCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBRXBELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBS0QsU0FBUyxhQUFhLENBQUMsQ0FBYTtJQUNsQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUU3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRTtRQUNyQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxPQUFPO0tBQ1I7SUFFRCxJQUFNLElBQUksR0FBSSxDQUFDLENBQUMsTUFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRTNELElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckQsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUVwRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7Ozs7O1VDbmNELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9sYXBwZGVsZWdhdGUudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmssIE9wdGlvbiB9IGZyb20gJ0BmcmFtZXdvcmsvbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcblxuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgTEFwcFRleHR1cmVNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcFZpZXcgfSBmcm9tICcuL2xhcHB2aWV3JztcblxuZXhwb3J0IGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbmV4cG9ydCBsZXQgc19pbnN0YW5jZTogTEFwcERlbGVnYXRlID0gbnVsbDtcbmV4cG9ydCBsZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCA9IG51bGw7XG5leHBvcnQgbGV0IGZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyID0gbnVsbDtcblxuLyoqXG4gKiDjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgq/jg6njgrnjgIJcbiAqIEN1YmlzbSBTREvjga7nrqHnkIbjgpLooYzjgYbjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBEZWxlZ2F0ZSB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBEZWxlZ2F0ZSB7XG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZSA9IG5ldyBMQXBwRGVsZWdhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc19pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUluc3RhbmNlKCk6IHZvaWQge1xuICAgIGlmIChzX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UucmVsZWFzZSgpO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFQUOOBq+W/heimgeOBqueJqeOCkuWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgIHB1YmxpYyBpbml0aWFsaXplKCk6IGJvb2xlYW4ge1xuICAgIC8vIOWIm+W7uueUu+W4g1xuICAgIC8vIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIC8vIGNhbnZhcy53aWR0aCA9IExBcHBEZWZpbmUuUmVuZGVyVGFyZ2V0V2lkdGg7XG4gICAgLy8gY2FudmFzLmhlaWdodCA9IExBcHBEZWZpbmUuUmVuZGVyVGFyZ2V0SGVpZ2h0O1xuICAgIC8vIOWOn+adpeaYr+eUqGpz5Yqo5oCB5Zyo572R6aG15LiK5Yib5bu655S75biD77yM55S75biD55qE6ZW/5a695ZyobGFwcGRlZmluZS50c+aMh+Wumu+8jOeOsOWcqOebtOaOpeWcqGh0bWzkuK3lt7Lnu4/mnInkuobnlLvluIPnm7TmjqXmi7/ov4fmnaXkvb/nlKjlsLHooYxcbiAgICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXZlMmRcIik7IC8vIGluZGV4Lmh0bWzkuK3nmoRpZOS4umxpdmUyZOeahOeUu+W4g1xuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXG5cdC8vIOi/meS4quaYr2luZGV4Lmh0bWzlt6XlhbfmoI/kuK3nmoTnnLznnZvlm77moIfvvIzngrnlh7vnnLznnZvlm77moIflsLHliIfmjaLkuIvkuIDkuKrmqKHlnotcblx0Ly8g5q2j6KeE5p2l6K+05bqU6K+l55WZ5Liq5YiH5o2i5qih5Z6L55qE5Y+j5a2Q77yM5ZyobWVzc2FnZS5qc+S4reiwg+eUqO+8jOWboOS4uuaHkuWwseebtOaOpeWcqOi/memHjOWGmeS6hlxuICAgIGNvbnN0IGZ1aV9leWUgPSA8SFRNTFNwYW5FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmdWktZXllXCIpWzBdO1xuXG4gICAgLy8g5Yid5aeL5YyWZ2zkuIrkuIvmlocg77yI5Luj56CB5q6157uT5p2f5ZCO5pyJ6Kej6YeK77yJXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyx7YWxwaGE6IHRydWUgfSkgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuXG4gICAgaWYgKCFnbCkge1xuICAgICAgYWxlcnQoJ0Nhbm5vdCBpbml0aWFsaXplIFdlYkdMLiBUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydC5cXG7kuI3og73liJ3lp4vljJZXZWJHTO+8jOivpea1j+iniOWZqOS4jeaUr+aMgVdlYkdM77yM6K+35YiH5o2i5rWP6KeI5Zmo6YeN6K+VJyk7XG4gICAgICBnbCA9IG51bGw7XG4gICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9XG4gICAgICAgICfor6XmtY/op4jlmajkuI3mlK/mjIEgPGNvZGU+Jmx0O2NhbnZhcyZndDs8L2NvZGU+IOagh+etvuWFg+e0oO+8jOivt+WIh+aNoua1j+iniOWZqOmHjeivlSAuJztcbiAgICAgIC8vIGds5Yid5pyf5YyW5aSx5pWXXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8g5ZCRRE9N5re75Yqg55S75biDXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpOyAgXG5cbiAgICBpZiAoIWZyYW1lQnVmZmVyKSB7XG4gICAgICBmcmFtZUJ1ZmZlciA9IGdsLmdldFBhcmFtZXRlcihnbC5GUkFNRUJVRkZFUl9CSU5ESU5HKTtcbiAgICB9XG5cbiAgICAvLyDpgI/mmI7orr7nva5cbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgY29uc3Qgc3VwcG9ydFRvdWNoOiBib29sZWFuID0gJ29udG91Y2hlbmQnIGluIGNhbnZhczsgIC8v5piv5ZCm5pSv5oyB6Kem56Kw77yI6Kem5pG45bGP77yJXG5cbiAgICBpZiAoc3VwcG9ydFRvdWNoKSB7ICAgLy8g5rKh5pyJ6Kem5bGP55S16ISR77yI5Lik56eN5LqL5Lu26YO96KaB5rOo5YaM77yJXG4gICAgICAvLyDms6jlhozop6bmkbjnm7jlhbPnmoTlm57mjonlh73mlbAgIO+8iOinpuaRuOWxj++8iVxuICAgICAgY2FudmFzLm9udG91Y2hzdGFydCA9IG9uVG91Y2hCZWdhbjtcbiAgICAgIGNhbnZhcy5vbnRvdWNobW92ZSA9IG9uVG91Y2hNb3ZlZDtcbiAgICAgIGNhbnZhcy5vbnRvdWNoZW5kID0gb25Ub3VjaEVuZGVkO1xuICAgICAgY2FudmFzLm9udG91Y2hjYW5jZWwgPSBvblRvdWNoQ2FuY2VsO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDms6jlhozpvKDmoIfnm7jlhbPnmoTlm57lkbzlh73mlbBcbiAgICAgIGNhbnZhcy5vbm1vdXNlZG93biA9IG9uQ2xpY2tCZWdhbjtcbiAgICAgIC8vIGNhbnZhcy5vbm1vdXNlbW92ZSA9IG9uTW91c2VNb3ZlZDsgICAvL+WOn+adpeaYr+WcqOeUu+W4g+S4iuazqOWGjOm8oOagh+enu+WKqOS6i+S7tu+8jOm8oOagh+enu+WHuueUu+W4g+WwseebkeWQrOS4jeWIsFxuICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmVkOyAgLy/lr7nmlbTkuKp3aW5kb3fnqpflj6Pnm5HlkKzvvIzmmK/op5LoibLot5/pmo/pvKDmoIfvvIzpnIDopoHlr7npvKDmoIflnZDmoIfojrflj5blgZrosIPmlbRcbiAgICAgIGNhbnZhcy5vbm1vdXNldXAgPSBvbkNsaWNrRW5kZWQ7XG4gICAgICBmdWlfZXllLm9ubW91c2Vkb3duID0gKCk6IHZvaWQgPT4ge1x0Ly8g5bel5YW35qCP55y8552b5Zu+5qCH54K55Ye75LqL5Lu2XG4gICAgICAgIGNvbnN0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgbGl2ZTJETWFuYWdlci5uZXh0U2NlbmUoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQXBwVmlld+eahOWIneWni+WMllxuICAgIHRoaXMuX3ZpZXcuaW5pdGlhbGl6ZSgpO1xuXG4gICAgLy8gQ3ViaXNtIFNES+eahOWIneWni+WMllxuICAgIHRoaXMuaW5pdGlhbGl6ZUN1YmlzbSgpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXNpemUgY2FudmFzIGFuZCByZS1pbml0aWFsaXplIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplQ2FudmFzKCk7XG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl90ZXh0dXJlTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIgPSBudWxsO1xuXG4gICAgdGhpcy5fdmlldy5yZWxlYXNlKCk7XG4gICAgdGhpcy5fdmlldyA9IG51bGw7XG5cbiAgICAvLyDjg6rjgr3jg7zjgrnjgpLop6PmlL5cbiAgICBMQXBwTGl2ZTJETWFuYWdlci5yZWxlYXNlSW5zdGFuY2UoKTtcblxuICAgIC8vIEN1YmlzbSBTREvjga7op6PmlL5cbiAgICBDdWJpc21GcmFtZXdvcmsuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWun+ihjOWHpueQhuOAglxuICAgKi9cbiAgICAvLyDmiafooYzlpITnkIZcbiAgICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgICAgLy8g5Li75b6q546vXG4gICAgICBjb25zdCBsb29wID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAvLyDnoa7orqTmnInml6Dlrp7kvotcbiAgICAgICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICBcbiAgICAgICAgLy8g5pu05paw5pe26Ze0XG4gICAgICAgIExBcHBQYWwudXBkYXRlVGltZSgpO1xuICBcbiAgICAgICAgLy8g55S76Z2i55qE5Yid5aeL5YyWXG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgXG4gICAgICAgIC8vIOWQr+WKqOa3seW6pua1i+ivlVxuICAgICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gIFxuICAgICAgICAvLyDpmYTov5HnmoTniankvZPlsIbov5zlpITnmoTniankvZPpga7nm5botbfmnaVcbiAgICAgICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XG4gIFxuICAgICAgICAvLyDmuIXpmaTlvanoibLnvJPlhrLljLrlkozmt7HluqbnvJPlhrLljLogIO+8iOWKoOS4iui/meS4gOWPpeS8muWvvOiHtOacieS6m+a1j+iniOWZqOiDjOaZr+WPmOaIkOm7keiJsu+8jOiAjOS4jeaYr+mAj+aYju+8iVxuICAgICAgICAvLyBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gIFxuICAgICAgICBnbC5jbGVhckRlcHRoKDEuMCk7XG4gIFxuICAgICAgICAvLyDpgI/mmI7orr7nva5cbiAgICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gIFxuICAgICAgICAvLyDnu5jlm77mm7TmlrBcbiAgICAgICAgdGhpcy5fdmlldy5yZW5kZXIoKTtcbiAgXG4gICAgICAgIC8vIOW+queOr+mAkuW9kuiwg+eUqFxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICB9O1xuICAgICAgbG9vcCgpO1xuICAgIH1cbiAgXG5cbiAgLyoqXG4gICAqIOOCt+OCp+ODvOODgOODvOOCkueZu+mMsuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNoYWRlcigpOiBXZWJHTFByb2dyYW0ge1xuICAgIC8vIOODkOODvOODhuODg+OCr+OCueOCt+OCp+ODvOODgOODvOOBruOCs+ODs+ODkeOCpOODq1xuICAgIGNvbnN0IHZlcnRleFNoYWRlcklkID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuXG4gICAgaWYgKHZlcnRleFNoYWRlcklkID09IG51bGwpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdmYWlsZWQgdG8gY3JlYXRlIHZlcnRleFNoYWRlcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4U2hhZGVyOiBzdHJpbmcgPVxuICAgICAgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OycgK1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIHBvc2l0aW9uOycgK1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIHV2OycgK1xuICAgICAgJ3ZhcnlpbmcgdmVjMiB2dXY7JyArXG4gICAgICAndm9pZCBtYWluKHZvaWQpJyArXG4gICAgICAneycgK1xuICAgICAgJyAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMS4wKTsnICtcbiAgICAgICcgICB2dXYgPSB1djsnICtcbiAgICAgICd9JztcblxuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXJJZCwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcklkKTtcblxuICAgIC8vIOODleODqeOCsOODoeODs+ODiOOCt+OCp+ODvOODgOOBruOCs+ODs+ODkeOCpOODq1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVySWQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgIGlmIChmcmFnbWVudFNoYWRlcklkID09IG51bGwpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdmYWlsZWQgdG8gY3JlYXRlIGZyYWdtZW50U2hhZGVyJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFnbWVudFNoYWRlcjogc3RyaW5nID1cbiAgICAgICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsnICtcbiAgICAgICd2YXJ5aW5nIHZlYzIgdnV2OycgK1xuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7JyArXG4gICAgICAndm9pZCBtYWluKHZvaWQpJyArXG4gICAgICAneycgK1xuICAgICAgJyAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXh0dXJlLCB2dXYpOycgK1xuICAgICAgJ30nO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVySWQsIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgLy8g44OX44Ot44Kw44Op44Og44Kq44OW44K444Kn44Kv44OI44Gu5L2c5oiQXG4gICAgY29uc3QgcHJvZ3JhbUlkID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIHZlcnRleFNoYWRlcklkKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbUlkLCBmcmFnbWVudFNoYWRlcklkKTtcblxuICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XG4gICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgLy8g44Oq44Oz44KvXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbUlkKTtcblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUlkKTtcblxuICAgIHJldHVybiBwcm9ncmFtSWQ7XG4gIH1cblxuICAvKipcbiAgICogVmlld+aDheWgseOCkuWPluW+l+OBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGdldFZpZXcoKTogTEFwcFZpZXcge1xuICAgIHJldHVybiB0aGlzLl92aWV3O1xuICB9XG5cbiAgcHVibGljIGdldFRleHR1cmVNYW5hZ2VyKCk6IExBcHBUZXh0dXJlTWFuYWdlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmVNYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fY2FwdHVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9tb3VzZVggPSAwLjA7XG4gICAgdGhpcy5fbW91c2VZID0gMC4wO1xuICAgIHRoaXMuX2lzRW5kID0gZmFsc2U7XG5cbiAgICB0aGlzLl9jdWJpc21PcHRpb24gPSBuZXcgT3B0aW9uKCk7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBMQXBwVmlldygpO1xuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbmV3IExBcHBUZXh0dXJlTWFuYWdlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1YmlzbSBTREvjga7liJ3mnJ/ljJZcbiAgICovXG4gICBwdWJsaWMgaW5pdGlhbGl6ZUN1YmlzbSgpOiB2b2lkIHtcbiAgICAvLyBzZXR1cCBjdWJpc20g6K6+572uY3ViaXNtXG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ0Z1bmN0aW9uID0gTEFwcFBhbC5wcmludE1lc3NhZ2U7ICAvL+WIneWni+WMluaOp+WItuWPsOaJk+WNsOS/oeaBr+W3peWFt++8jOWwseaYr2NvbnNvbGUubG9nXG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ2dpbmdMZXZlbCA9IExBcHBEZWZpbmUuQ3ViaXNtTG9nZ2luZ0xldmVsOyAgLy/mjIflrprmiZPljbDml6Xlv5fnmoTnrYnnuqdcbiAgICBDdWJpc21GcmFtZXdvcmsuc3RhcnRVcCh0aGlzLl9jdWJpc21PcHRpb24pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjdWJpc20g5Yid5aeL5YyW6K6+572uY3ViaXNtXG4gICAgQ3ViaXNtRnJhbWV3b3JrLmluaXRpYWxpemUoKTtcblxuICAgIC8vIGxvYWQgbW9kZWwg5Yqg6L295qih5Z6LXG4gICAgTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIOabtOaWsOaXtumXtFxuICAgIExBcHBQYWwudXBkYXRlVGltZSgpO1xuXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNhbnZhcyB0byBmaWxsIHRoZSBzY3JlZW4uXG4gICAqL1xuICBwcml2YXRlIF9yZXNpemVDYW52YXMoKTogdm9pZCB7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuXG4gIF9jdWJpc21PcHRpb246IE9wdGlvbjsgLy8gQ3ViaXNtIFNESyBPcHRpb25cbiAgX3ZpZXc6IExBcHBWaWV3OyAvLyBWaWV35oOF5aCxXG4gIF9jYXB0dXJlZDogYm9vbGVhbjsgLy8g44Kv44Oq44OD44Kv44GX44Gm44GE44KL44GLXG4gIF9tb3VzZVg6IG51bWJlcjsgLy8g44Oe44Km44K5WOW6p+aomVxuICBfbW91c2VZOiBudW1iZXI7IC8vIOODnuOCpuOCuVnluqfmqJlcbiAgX2lzRW5kOiBib29sZWFuOyAvLyBBUFDntYLkuobjgZfjgabjgYTjgovjgYtcbiAgX3RleHR1cmVNYW5hZ2VyOiBMQXBwVGV4dHVyZU1hbmFnZXI7IC8vIOODhuOCr+OCueODgeODo+ODnuODjeODvOOCuOODo+ODvFxufVxuXG4vKipcbiAqIOOCr+ODquODg+OCr+OBl+OBn+OBqOOBjeOBq+WRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvbkNsaWNrQmVnYW4oZTogTW91c2VFdmVudCk6IHZvaWQge1xuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gdHJ1ZTtcblxuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLnBhZ2VYO1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLnBhZ2VZO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0JlZ2FuKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOODnuOCpuOCueODneOCpOODs+OCv+OBjOWLleOBhOOBn+OCieWRvOOBsOOCjOOCi+OAglxuICovXG4vLyDpvKDmoIfnp7vliqjlkI7nmoTlm57mjolcbmZ1bmN0aW9uIG9uTW91c2VNb3ZlZChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIC8vIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7ICAvLyDliKTmlq3mmK/lkKbljZXlh7vvvIzljp/mnaXmmK/opoHmjInkvY/pvKDmoIflt6bplK7lm77lg4/miY3kvJrot5/nnYDpvKDmoIfliqhcbiAgLy8gICByZXR1cm47XG4gIC8vIH1cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykgeyAgIC8v6I635b6XbGFwcHZpZXcudHPnmoTlrp7kvovlr7nosaFcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlLmNsaWVudFjlkoxlLmNsaWVudFnojrflj5bnmoTlnZDmoIfngrnpg73mmK/ku6Xlt6bkuIrop5LkuLrljp/ngrlcbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgLy8gbGV0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHdpbmRvdy5pbm5lcldpZHRoICsgY2FudmFzLndpZHRoO1xuICAvLyBsZXQgcG9zWTogbnVtYmVyID0gZS5jbGllbnRZLzI7XG5cbiAgLy8g5Zu+5YOP5Zyo572R6aG155qE5Z2Q5LiL6KeS77yM566A5Y2V5aSE55CG5Z2Q5qCH5bCG6LaF6L+H55S75biD6L6555WM5Z2Q5qCH5bCx562J5LiO6L6555WM5Z2Q5qCHXG4gIC8vIHBvc1ggPSAocG9zWCA8IDApID8gMCA6IHBvc1g7XG4gIC8vIHBvc1kgPSAocG9zWSA8IDApID8gMCA6IHBvc1k7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQoMSwgMSk7Ly8g6L+Z5Liq5bCx5LiN5YGa6Kej6YeK77yM5bCx5piv6L2s5o2i5Z2Q5qCH77yM6LCD55SoTEFwcExpdmUyRE1hbmFnZXLnsbvph43mlrDnu5jliLblm77lg49cbn1cblxuXG4vKipcbiAqIOOCr+ODquODg+OCr+OBjOe1guS6huOBl+OBn+OCieWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvbkNsaWNrRW5kZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgY29uc29sZS5sb2coXCIxXCIpXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCv+ODg+ODgeOBl+OBn+OBqOOBjeOBq+WRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvblRvdWNoQmVnYW4oZTogVG91Y2hFdmVudCk6IHZvaWQge1xuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgrnjg6/jgqTjg5fjgZnjgovjgajlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaE1vdmVkKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNNb3ZlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgYzntYLkuobjgZfjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaEVuZGVkKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K/44OD44OB44GM44Kt44Oj44Oz44K744Or44GV44KM44KL44Go5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hDYW5jZWwoZTogVG91Y2hFdmVudCk6IHZvaWQge1xuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcblxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI5ZjIwNzNiZjg2MDY2ZTc5MDQwY1wiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9