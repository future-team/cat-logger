'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Level = require('./Level');

var _UserAgent = require('./UserAgent');

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