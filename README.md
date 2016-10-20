# cat-logger

记录js报错日志，默认初始化实例后会自动捕获异常发送到服务端，通过cat客户端搜索模块名查看异常信息；也可手动调用api(info,error,warn)方法进行异常信息记录；
cat端可以设置报错阈值，到达阈值后会自动报警邮件通知。


## 使用

```js

    import {CatLogger} from  'cat-logger';
    
    let logger = new CatLogger({
        moduleName:'cat-logger',//项目模块名
        url:''                  //信息记录的服务器地址,
        isBeta:false   //默认false是否是beta环境，建议不要使用
    });
    
    logger.info('error message');   //info level
    logger.error('error message');  //error level
    logger.warn('error message');   //warn level
```

or:

```js

    var Logger = require('cat-logger');
    var logger = new Logger.CatLogger();
    logger.info('error message');
    logger.error('error message');
    logger.warn('error message');
```


