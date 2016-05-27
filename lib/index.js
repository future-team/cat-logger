//export RadioGroup from './RadioGroup.js';

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

exports.CatLogger = _Logger2['default'];

if (!window.CatLogger) {
    window.CatLogger = exports['CatLogger'];
}