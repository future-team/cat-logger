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