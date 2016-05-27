import {CatLogger} from  '../../src/index.js';

let logger = new CatLogger({
    moduleName:'cat-logger'
});

logger.error('cat-logge errorr');
alert('请打开cat搜索cat-logger模块查看日志');