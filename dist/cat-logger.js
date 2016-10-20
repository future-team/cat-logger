(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//export RadioGroup from './RadioGroup.js';

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Logger = __webpack_require__(2);

	var _Logger2 = _interopRequireDefault(_Logger);

	exports.CatLogger = _Logger2['default'];

	if (!window.CatLogger) {
	    window.CatLogger = exports['CatLogger'];
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Level = __webpack_require__(3);

	var _UserAgent = __webpack_require__(4);

	var _UserAgent2 = _interopRequireDefault(_UserAgent);

	var Logger = (function () {
	    function Logger(opts) {
	        _classCallCheck(this, Logger);

	        //测试环境  //192.168.226.45/web-broker-service/api/js
	        var catUrl = (opts.isBeta ? '//192.168.226.45' : '//221.181.67.144') + '/web-broker-service/api/js';
	        this.url = catUrl; // opts.url || '//221.181.67.144/web-broker-service/api/js';//'//webcatdot.dianping.com/web-broker-service/api/js';
	        this.moduleName = opts.moduleName;

	        //需绑定onerror事件
	        this.userAgent = new _UserAgent2['default']();
	        this.bindError();
	    }

	    //发送错误到监控系统

	    Logger.prototype.send = function send(data) {
	        var url = this.url;
	        var image = new Image(1, 1);

	        console.dir(data);
	        image.src = url + "?" + this.format(data);
	    };

	    Logger.prototype.format = function format(data) {
	        var arr = [];

	        if (data && typeof data == 'object') {
	            for (var _name in data) {
	                arr.push(_name + '=' + data[_name]);
	            }
	        }

	        return arr.join('&');
	    };

	    Logger.prototype.error = function error(message) {
	        this.captureError(message, location.href, '', '', '', _Level.ERROR);
	    };

	    Logger.prototype.info = function info(message) {
	        this.captureError(message, location.href, '', '', '', _Level.INFO);
	    };

	    Logger.prototype.warn = function warn(message) {
	        this.captureError(message, location.href, '', '', '', _Level.WARN);
	    };

	    Logger.prototype.dev = function dev(message) {
	        this.captureError(message, location.href, '', '', '', _Level.DEV);
	    };

	    Logger.prototype.getParam = function getParam(data) {
	        var defaultParams = {
	            n: data.appname,
	            v: 1,
	            msg: data.message || '',
	            t: +new Date(),
	            l: data.level,
	            a: this.userAgent.getName(),
	            data: encodeURIComponent(JSON.stringify(data))
	        };

	        return defaultParams;
	    };

	    Logger.prototype.captureError = function captureError(message, url, line, column, errorObject, level) {
	        if (url === undefined) url = location.href;

	        if (message != "Script error." && !url) {
	            return true;
	        }
	        if (url == '') {
	            url = location.href;
	        }

	        if (errorObject && errorObject.stack) {
	            data.stack = errorObject.stack.toString();
	        }

	        //把data上报到后台！
	        //console.dir(data );

	        this.send(this.getParam({
	            message: message,
	            url: url,
	            line: line,
	            column: column,
	            appname: this.moduleName,
	            filename: __filename || '',
	            timestamp: new Date(),
	            level: level || _Level.ERROR
	        }));

	        return true;
	    };

	    Logger.prototype.bindError = function bindError() {
	        var _this = this;
	        window.onerror = function (message, url, line, column, errorObject) {
	            _this.captureError(message, url, line, column, errorObject, _Level.ERROR);
	        };
	    };

	    return Logger;
	})();

	exports['default'] = Logger;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	//export const [ERROR,WARN,INFO,DEV] = ['error','warn','info','dev'];
	'use strict';

	exports.__esModule = true;
	var ERROR = 'ERROR';
	exports.ERROR = ERROR;
	var WARN = 'WARN';
	exports.WARN = WARN;
	var INFO = 'INFO';
	exports.INFO = INFO;
	var DEV = 'DEV';
	exports.DEV = DEV;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var UserAgent = (function () {
	    function UserAgent() {
	        _classCallCheck(this, UserAgent);

	        this.reg = {
	            isOpera: /opera/,
	            isIE: /msie (\d+)/, // just up to IE10
	            isStdIE: /rv:(\d+)/,
	            isFirefox: /firefox\/(\d+)/,
	            isChrome: /chrome/,
	            isSafari: /safari/,
	            isIOS: /iphone|ipod|ipad/,
	            isIPhone: /iphone/,
	            isIPod: /ipod/,
	            isIPad: /ipad/,
	            isIPadUCWeb: /ucweb/
	        };
	    }

	    UserAgent.prototype.getName = function getName() {
	        return this.getBrowser().name;
	    };

	    UserAgent.prototype.is = function is(type) {
	        return this.getBrowser().browser['is' + type];
	    };

	    UserAgent.prototype.getBrowser = function getBrowser() {
	        var b = {
	            isOpera: false,
	            isIE: false, //10以下
	            isStdIE: false, //11
	            isAllIE: false, //6-11
	            isIE6: false,
	            isIE7: false,
	            isIE8: false,
	            isIE9: false,
	            isIE10: false,
	            isIE11: false,
	            isFirefox: false,
	            isFirefox2: false,
	            isFirefox3: false,
	            isFirefox4: false,
	            isChrome: false,
	            isSafari: false,
	            isIOS: false,
	            isIPhone: false,
	            isIPod: false,
	            isIPad: false,
	            isIPadUCWeb: false
	        };
	        var name = '';
	        var ua = window.navigator.userAgent.toLowerCase();
	        var usedRe = this.reg;
	        var vd = (window.navigator.vendor || '').toLowerCase();
	        var arr;
	        //Opera
	        if (usedRe.isOpera.test(ua)) {
	            b.isOpera = true;
	            return {
	                browser: b,
	                name: 'opera'
	            };
	        }
	        //IE
	        else if (arr = ua.match(usedRe.isIE)) {
	                b.isIE = true;
	                b.isAllIE = true;
	                b['isIE' + arr[1]] = true;

	                return {
	                    browser: b,
	                    name: 'ie'
	                };
	                //IE (fix IE11 bug)
	            } else if (ua.indexOf('trident') > -1 ? arr = ua.match(usedRe.isStdIE) : false) {
	                    b.isStdIE = true;
	                    b.isAllIE = true;
	                    b['isIE' + arr[1]] = true;
	                    return {
	                        browser: b,
	                        name: 'ie'
	                    };
	                }

	                //Firefox
	                else if (arr = ua.match(usedRe.isFirefox)) {
	                        b.isFirefox = true;
	                        b['isFirefox' + arr[1]] = true;
	                        name = 'firefox';
	                    }
	                    //Chrome
	                    else if (usedRe.isChrome.test(ua)) {
	                            b.isChrome = true;
	                            name = 'chrome';
	                        }
	                        //Safari
	                        else if (usedRe.isSafari.test(ua)) {
	                                b.isSafari = true;
	                                name = 'safari';
	                            }

	        //IOS
	        if (usedRe.isIOS.test(ua)) {
	            b.isIOS = true;
	            if (usedRe.isIPhone.test(ua)) {
	                b.isIPhone = true;
	                name = 'iphone';
	            } else if (usedRe.isIPod.test(ua)) {
	                b.isIPod = true;
	                name = 'ipod';
	            } else if (usedRe.isIPad.test(ua)) {
	                b.isIPad = true;
	                name = 'ipad';
	                if (usedRe.isIPadUCWeb.test(vd)) {
	                    b.isIPadUCWeb = true;
	                    name = 'ipaduc';
	                }
	            }
	        }
	        return {
	            browser: b,
	            name: name
	        };
	    };

	    return UserAgent;
	})();

	exports['default'] = UserAgent;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;