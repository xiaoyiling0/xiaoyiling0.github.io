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
    var posX = e.clientX - window.innerWidth + exports.canvas.width;
    var posY = e.clientY / 2;
    posX = (posX < 0) ? 0 : posX;
    posY = (posY < 0) ? 0 : posY;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - window.innerWidth + exports.canvas.width;
    var posY = e.clientY / 2;
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
    var posX = e.changedTouches[0].clientX - window.innerWidth + exports.canvas.width;
    var posY = e.changedTouches[0].clientY / 2;
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
/******/ 	__webpack_require__.h = function() { return "37768909a4e1b9e5abb1"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wYzBmNjc3NmZmMDU5OWEyODI4Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSw2SUFBMkU7QUFFM0UsOEZBQTJDO0FBQzNDLHVHQUF3RDtBQUN4RCx5RUFBb0M7QUFDcEMsMEdBQTBEO0FBQzFELDRFQUFzQztBQUUzQixjQUFNLEdBQXNCLElBQUksQ0FBQztBQUNqQyxrQkFBVSxHQUFpQixJQUFJLENBQUM7QUFDaEMsVUFBRSxHQUEwQixJQUFJLENBQUM7QUFDakMsbUJBQVcsR0FBcUIsSUFBSSxDQUFDO0FBTWhEO0lBbVBFO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDhCQUFNLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFyUGEsd0JBQVcsR0FBekI7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUNqQztRQUVELE9BQU8sa0JBQVUsQ0FBQztJQUNwQixDQUFDO0lBS2EsNEJBQWUsR0FBN0I7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdEI7UUFFRCxrQkFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBS08saUNBQVUsR0FBakI7UUFNQyxjQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMs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QUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyRCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBRXBELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7Ozs7Ozs7VUNyY0QscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHBkZWxlZ2F0ZS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IEN1YmlzbUZyYW1ld29yaywgT3B0aW9uIH0gZnJvbSAnQGZyYW1ld29yay9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuXG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5pbXBvcnQgeyBMQXBwTGl2ZTJETWFuYWdlciB9IGZyb20gJy4vbGFwcGxpdmUyZG1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XG5pbXBvcnQgeyBMQXBwVGV4dHVyZU1hbmFnZXIgfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgeyBMQXBwVmlldyB9IGZyb20gJy4vbGFwcHZpZXcnO1xuXG5leHBvcnQgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xuZXhwb3J0IGxldCBzX2luc3RhbmNlOiBMQXBwRGVsZWdhdGUgPSBudWxsO1xuZXhwb3J0IGxldCBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0ID0gbnVsbDtcbmV4cG9ydCBsZXQgZnJhbWVCdWZmZXI6IFdlYkdMRnJhbWVidWZmZXIgPSBudWxsO1xuXG4vKipcbiAqIOOCouODl+ODquOCseODvOOCt+ODp+ODs+OCr+ODqeOCueOAglxuICogQ3ViaXNtIFNES+OBrueuoeeQhuOCkuihjOOBhuOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcERlbGVnYXRlIHtcbiAgLyoqXG4gICAqIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCue+8iOOCt+ODs+OCsOODq+ODiOODs++8ieOCkui/lOOBmeOAglxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgYznlJ/miJDjgZXjgozjgabjgYTjgarjgYTloLTlkIjjga/lhoXpg6jjgafjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgovjgIJcbiAgICpcbiAgICogQHJldHVybiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTEFwcERlbGVnYXRlIHtcbiAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBEZWxlZ2F0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCue+8iOOCt+ODs+OCsOODq+ODiOODs++8ieOCkuino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHNfaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZS5yZWxlYXNlKCk7XG4gICAgfVxuXG4gICAgc19pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQVBQ44Gr5b+F6KaB44Gq54mp44KS5Yid5pyf5YyW44GZ44KL44CCXG4gICAqL1xuICAgcHVibGljIGluaXRpYWxpemUoKTogYm9vbGVhbiB7XG4gICAgLy8g5Yib5bu655S75biDXG4gICAgLy8gY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgLy8gY2FudmFzLndpZHRoID0gTEFwcERlZmluZS5SZW5kZXJUYXJnZXRXaWR0aDtcbiAgICAvLyBjYW52YXMuaGVpZ2h0ID0gTEFwcERlZmluZS5SZW5kZXJUYXJnZXRIZWlnaHQ7XG4gICAgLy8g5Y6f5p2l5piv55SoanPliqjmgIHlnKjnvZHpobXkuIrliJvlu7rnlLvluIPvvIznlLvluIPnmoTplb/lrr3lnKhsYXBwZGVmaW5lLnRz5oyH5a6a77yM546w5Zyo55u05o6l5ZyoaHRtbOS4reW3sue7j+acieS6hueUu+W4g+ebtOaOpeaLv+i/h+adpeS9v+eUqOWwseihjFxuICAgIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpdmUyZFwiKTsgLy8gaW5kZXguaHRtbOS4reeahGlk5Li6bGl2ZTJk55qE55S75biDXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG5cblx0Ly8g6L+Z5Liq5pivaW5kZXguaHRtbOW3peWFt+agj+S4reeahOecvOedm+Wbvuagh++8jOeCueWHu+ecvOedm+Wbvuagh+WwseWIh+aNouS4i+S4gOS4quaooeWei1xuXHQvLyDmraPop4TmnaXor7TlupTor6XnlZnkuKrliIfmjaLmqKHlnovnmoTlj6PlrZDvvIzlnKhtZXNzYWdlLmpz5Lit6LCD55So77yM5Zug5Li65oeS5bCx55u05o6l5Zyo6L+Z6YeM5YaZ5LqGXG4gICAgY29uc3QgZnVpX2V5ZSA9IDxIVE1MU3BhbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZ1aS1leWVcIilbMF07XG5cbiAgICAvLyDliJ3lp4vljJZnbOS4iuS4i+aWhyDvvIjku6PnoIHmrrXnu5PmnZ/lkI7mnInop6Pph4rvvIlcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnLHthbHBoYTogdHJ1ZSB9KSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7XG5cbiAgICBpZiAoIWdsKSB7XG4gICAgICBhbGVydCgnQ2Fubm90IGluaXRpYWxpemUgV2ViR0wuIFRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0LlxcbuS4jeiDveWIneWni+WMlldlYkdM77yM6K+l5rWP6KeI5Zmo5LiN5pSv5oyBV2ViR0zvvIzor7fliIfmjaLmtY/op4jlmajph43or5UnKTtcbiAgICAgIGdsID0gbnVsbDtcbiAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID1cbiAgICAgICAgJ+ivpea1j+iniOWZqOS4jeaUr+aMgSA8Y29kZT4mbHQ7Y2FudmFzJmd0OzwvY29kZT4g5qCH562+5YWD57Sg77yM6K+35YiH5o2i5rWP6KeI5Zmo6YeN6K+VIC4nO1xuICAgICAgLy8gZ2zliJ3mnJ/ljJblpLHmlZdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyDlkJFET03mt7vliqDnlLvluINcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7ICBcblxuICAgIGlmICghZnJhbWVCdWZmZXIpIHtcbiAgICAgIGZyYW1lQnVmZmVyID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLkZSQU1FQlVGRkVSX0JJTkRJTkcpO1xuICAgIH1cblxuICAgIC8vIOmAj+aYjuiuvue9rlxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICBjb25zdCBzdXBwb3J0VG91Y2g6IGJvb2xlYW4gPSAnb250b3VjaGVuZCcgaW4gY2FudmFzOyAgLy/mmK/lkKbmlK/mjIHop6bnorDvvIjop6bmkbjlsY/vvIlcblxuICAgIGlmIChzdXBwb3J0VG91Y2gpIHsgICAvLyDmsqHmnInop6blsY/nlLXohJHvvIjkuKTnp43kuovku7bpg73opoHms6jlhozvvIlcbiAgICAgIC8vIOazqOWGjOinpuaRuOebuOWFs+eahOWbnuaOieWHveaVsCAg77yI6Kem5pG45bGP77yJXG4gICAgICBjYW52YXMub250b3VjaHN0YXJ0ID0gb25Ub3VjaEJlZ2FuO1xuICAgICAgY2FudmFzLm9udG91Y2htb3ZlID0gb25Ub3VjaE1vdmVkO1xuICAgICAgY2FudmFzLm9udG91Y2hlbmQgPSBvblRvdWNoRW5kZWQ7XG4gICAgICBjYW52YXMub250b3VjaGNhbmNlbCA9IG9uVG91Y2hDYW5jZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOazqOWGjOm8oOagh+ebuOWFs+eahOWbnuWRvOWHveaVsFxuICAgICAgY2FudmFzLm9ubW91c2Vkb3duID0gb25DbGlja0JlZ2FuO1xuICAgICAgLy8gY2FudmFzLm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmVkOyAgIC8v5Y6f5p2l5piv5Zyo55S75biD5LiK5rOo5YaM6byg5qCH56e75Yqo5LqL5Lu277yM6byg5qCH56e75Ye655S75biD5bCx55uR5ZCs5LiN5YiwXG4gICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSBvbk1vdXNlTW92ZWQ7ICAvL+WvueaVtOS4qndpbmRvd+eql+WPo+ebkeWQrO+8jOaYr+inkuiJsui3n+maj+m8oOagh++8jOmcgOimgeWvuem8oOagh+WdkOagh+iOt+WPluWBmuiwg+aVtFxuICAgICAgY2FudmFzLm9ubW91c2V1cCA9IG9uQ2xpY2tFbmRlZDtcbiAgICAgIGZ1aV9leWUub25tb3VzZWRvd24gPSAoKTogdm9pZCA9PiB7XHQvLyDlt6XlhbfmoI/nnLznnZvlm77moIfngrnlh7vkuovku7ZcbiAgICAgICAgY29uc3QgbGl2ZTJETWFuYWdlcjogTEFwcExpdmUyRE1hbmFnZXIgPSBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBsaXZlMkRNYW5hZ2VyLm5leHRTY2VuZSgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBBcHBWaWV355qE5Yid5aeL5YyWXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplKCk7XG5cbiAgICAvLyBDdWJpc20gU0RL55qE5Yid5aeL5YyWXG4gICAgdGhpcy5pbml0aWFsaXplQ3ViaXNtKCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJlc2l6ZSBjYW52YXMgYW5kIHJlLWluaXRpYWxpemUgdmlldy5cbiAgICovXG4gIHB1YmxpYyBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemUoKTtcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemVTcHJpdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyLnJlbGVhc2UoKTtcbiAgICB0aGlzLl90ZXh0dXJlTWFuYWdlciA9IG51bGw7XG5cbiAgICB0aGlzLl92aWV3LnJlbGVhc2UoKTtcbiAgICB0aGlzLl92aWV3ID0gbnVsbDtcblxuICAgIC8vIOODquOCveODvOOCueOCkuino+aUvlxuICAgIExBcHBMaXZlMkRNYW5hZ2VyLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gICAgLy8gQ3ViaXNtIFNES+OBruino+aUvlxuICAgIEN1YmlzbUZyYW1ld29yay5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICog5a6f6KGM5Yem55CG44CCXG4gICAqL1xuICAgIC8vIOaJp+ihjOWkhOeQhlxuICAgIHB1YmxpYyBydW4oKTogdm9pZCB7XG4gICAgICAvLyDkuLvlvqrnjq9cbiAgICAgIGNvbnN0IGxvb3AgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIC8vIOehruiupOacieaXoOWunuS+i1xuICAgICAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gIFxuICAgICAgICAvLyDmm7TmlrDml7bpl7RcbiAgICAgICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XG4gIFxuICAgICAgICAvLyDnlLvpnaLnmoTliJ3lp4vljJZcbiAgICAgICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICBcbiAgICAgICAgLy8g5ZCv5Yqo5rex5bqm5rWL6K+VXG4gICAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgXG4gICAgICAgIC8vIOmZhOi/keeahOeJqeS9k+Wwhui/nOWkhOeahOeJqeS9k+mBrueblui1t+adpVxuICAgICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcbiAgXG4gICAgICAgIC8vIOa4hemZpOW9qeiJsue8k+WGsuWMuuWSjOa3seW6pue8k+WGsuWMuiAg77yI5Yqg5LiK6L+Z5LiA5Y+l5Lya5a+86Ie05pyJ5Lqb5rWP6KeI5Zmo6IOM5pmv5Y+Y5oiQ6buR6Imy77yM6ICM5LiN5piv6YCP5piO77yJXG4gICAgICAgIC8vIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgXG4gICAgICAgIGdsLmNsZWFyRGVwdGgoMS4wKTtcbiAgXG4gICAgICAgIC8vIOmAj+aYjuiuvue9rlxuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgXG4gICAgICAgIC8vIOe7mOWbvuabtOaWsFxuICAgICAgICB0aGlzLl92aWV3LnJlbmRlcigpO1xuICBcbiAgICAgICAgLy8g5b6q546v6YCS5b2S6LCD55SoXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgIH07XG4gICAgICBsb29wKCk7XG4gICAgfVxuICBcblxuICAvKipcbiAgICog44K344Kn44O844OA44O844KS55m76Yyy44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgLy8g44OQ44O844OG44OD44Kv44K544K344Kn44O844OA44O844Gu44Kz44Oz44OR44Kk44OrXG4gICAgY29uc3QgdmVydGV4U2hhZGVySWQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBpZiAodmVydGV4U2hhZGVySWQgPT0gbnVsbCkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ2ZhaWxlZCB0byBjcmVhdGUgdmVydGV4U2hhZGVyJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXI6IHN0cmluZyA9XG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXG4gICAgICAnYXR0cmlidXRlIHZlYzMgcG9zaXRpb247JyArXG4gICAgICAnYXR0cmlidXRlIHZlYzIgdXY7JyArXG4gICAgICAndmFyeWluZyB2ZWMyIHZ1djsnICtcbiAgICAgICd2b2lkIG1haW4odm9pZCknICtcbiAgICAgICd7JyArXG4gICAgICAnICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApOycgK1xuICAgICAgJyAgIHZ1diA9IHV2OycgK1xuICAgICAgJ30nO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlcklkLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVySWQpO1xuXG4gICAgLy8g44OV44Op44Kw44Oh44Oz44OI44K344Kn44O844OA44Gu44Kz44Oz44OR44Kk44OrXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXJJZCA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgaWYgKGZyYWdtZW50U2hhZGVySWQgPT0gbnVsbCkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ2ZhaWxlZCB0byBjcmVhdGUgZnJhZ21lbnRTaGFkZXInKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyOiBzdHJpbmcgPVxuICAgICAgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OycgK1xuICAgICAgJ3ZhcnlpbmcgdmVjMiB2dXY7JyArXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTsnICtcbiAgICAgICd2b2lkIG1haW4odm9pZCknICtcbiAgICAgICd7JyArXG4gICAgICAnICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZ1dik7JyArXG4gICAgICAnfSc7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXJJZCwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XG5cbiAgICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7kvZzmiJBcbiAgICBjb25zdCBwcm9ncmFtSWQgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW1JZCwgdmVydGV4U2hhZGVySWQpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcklkKTtcbiAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XG5cbiAgICAvLyDjg6rjg7Pjgq9cbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtSWQpO1xuXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtSWQpO1xuXG4gICAgcmV0dXJuIHByb2dyYW1JZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV35oOF5aCx44KS5Y+W5b6X44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgZ2V0VmlldygpOiBMQXBwVmlldyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXc7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGV4dHVyZU1hbmFnZXIoKTogTEFwcFRleHR1cmVNYW5hZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZU1hbmFnZXI7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jYXB0dXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX21vdXNlWCA9IDAuMDtcbiAgICB0aGlzLl9tb3VzZVkgPSAwLjA7XG4gICAgdGhpcy5faXNFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbiA9IG5ldyBPcHRpb24oKTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IExBcHBWaWV3KCk7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIgPSBuZXcgTEFwcFRleHR1cmVNYW5hZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3ViaXNtIFNES+OBruWIneacn+WMllxuICAgKi9cbiAgIHB1YmxpYyBpbml0aWFsaXplQ3ViaXNtKCk6IHZvaWQge1xuICAgIC8vIHNldHVwIGN1YmlzbSDorr7nva5jdWJpc21cbiAgICB0aGlzLl9jdWJpc21PcHRpb24ubG9nRnVuY3Rpb24gPSBMQXBwUGFsLnByaW50TWVzc2FnZTsgIC8v5Yid5aeL5YyW5o6n5Yi25Y+w5omT5Y2w5L+h5oGv5bel5YW377yM5bCx5pivY29uc29sZS5sb2dcbiAgICB0aGlzLl9jdWJpc21PcHRpb24ubG9nZ2luZ0xldmVsID0gTEFwcERlZmluZS5DdWJpc21Mb2dnaW5nTGV2ZWw7ICAvL+aMh+WumuaJk+WNsOaXpeW/l+eahOetiee6p1xuICAgIEN1YmlzbUZyYW1ld29yay5zdGFydFVwKHRoaXMuX2N1YmlzbU9wdGlvbik7XG5cbiAgICAvLyBpbml0aWFsaXplIGN1YmlzbSDliJ3lp4vljJborr7nva5jdWJpc21cbiAgICBDdWJpc21GcmFtZXdvcmsuaW5pdGlhbGl6ZSgpO1xuXG4gICAgLy8gbG9hZCBtb2RlbCDliqDovb3mqKHlnotcbiAgICBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8g5pu05paw5pe26Ze0XG4gICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XG5cbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemVTcHJpdGUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0aGUgY2FudmFzIHRvIGZpbGwgdGhlIHNjcmVlbi5cbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZUNhbnZhcygpOiB2b2lkIHtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgX2N1YmlzbU9wdGlvbjogT3B0aW9uOyAvLyBDdWJpc20gU0RLIE9wdGlvblxuICBfdmlldzogTEFwcFZpZXc7IC8vIFZpZXfmg4XloLFcbiAgX2NhcHR1cmVkOiBib29sZWFuOyAvLyDjgq/jg6rjg4Pjgq/jgZfjgabjgYTjgovjgYtcbiAgX21vdXNlWDogbnVtYmVyOyAvLyDjg57jgqbjgrlY5bqn5qiZXG4gIF9tb3VzZVk6IG51bWJlcjsgLy8g44Oe44Km44K5WeW6p+aomVxuICBfaXNFbmQ6IGJvb2xlYW47IC8vIEFQUOe1guS6huOBl+OBpuOBhOOCi+OBi1xuICBfdGV4dHVyZU1hbmFnZXI6IExBcHBUZXh0dXJlTWFuYWdlcjsgLy8g44OG44Kv44K544OB44Oj44Oe44ON44O844K444Oj44O8XG59XG5cbi8qKlxuICog44Kv44Oq44OD44Kv44GX44Gf44Go44GN44Gr5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uQ2xpY2tCZWdhbihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IHBvc1g6IG51bWJlciA9IGUucGFnZVg7XG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUucGFnZVk7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44Oe44Km44K544Od44Kk44Oz44K/44GM5YuV44GE44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbi8vIOm8oOagh+enu+WKqOWQjueahOWbnuaOiVxuZnVuY3Rpb24gb25Nb3VzZU1vdmVkKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgLy8gaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQpIHsgIC8vIOWIpOaWreaYr+WQpuWNleWHu++8jOWOn+adpeaYr+imgeaMieS9j+m8oOagh+W3pumUruWbvuWDj+aJjeS8mui3n+edgOm8oOagh+WKqFxuICAvLyAgIHJldHVybjtcbiAgLy8gfVxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7ICAgLy/ojrflvpdsYXBwdmlldy50c+eahOWunuS+i+WvueixoVxuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGUuY2xpZW50WOWSjGUuY2xpZW50WeiOt+WPlueahOWdkOagh+eCuemDveaYr+S7peW3puS4iuinkuS4uuWOn+eCuVxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAvLyBjb25zdCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIC8vIGNvbnN0IHBvc1k6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICBsZXQgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gd2luZG93LmlubmVyV2lkdGggKyBjYW52YXMud2lkdGg7XG4gIGxldCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkvMjtcblxuICAvLyDlm77lg4/lnKjnvZHpobXnmoTlnZDkuIvop5LvvIznroDljZXlpITnkIblnZDmoIflsIbotoXov4fnlLvluIPovrnnlYzlnZDmoIflsLHnrYnkuI7ovrnnlYzlnZDmoIdcbiAgcG9zWCA9IChwb3NYIDwgMCkgPyAwIDogcG9zWDtcbiAgcG9zWSA9IChwb3NZIDwgMCkgPyAwIDogcG9zWTtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNNb3ZlZChwb3NYLCBwb3NZKTsvLyDov5nkuKrlsLHkuI3lgZrop6Pph4rvvIzlsLHmmK/ovazmjaLlnZDmoIfvvIzosIPnlKhMQXBwTGl2ZTJETWFuYWdlcuexu+mHjeaWsOe7mOWItuWbvuWDj1xufVxuXG5cbi8qKlxuICog44Kv44Oq44OD44Kv44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uQ2xpY2tFbmRlZChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gd2luZG93LmlubmVyV2lkdGggKyBjYW52YXMud2lkdGg7XG4gIGxldCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkvMjtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gdHJ1ZTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K544Ov44Kk44OX44GZ44KL44Go5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K/44OD44OB44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hFbmRlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuICBsZXQgcG9zWDogbnVtYmVyID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gd2luZG93LmlubmVyV2lkdGggKyBjYW52YXMud2lkdGg7XG4gIGxldCBwb3NZOiBudW1iZXIgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkvMjtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgYzjgq3jg6Pjg7Pjgrvjg6vjgZXjgozjgovjgajlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaENhbmNlbChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjM3NzY4OTA5YTRlMWI5ZTVhYmIxXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=