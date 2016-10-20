import {ERROR,INFO,WARN,DEV} from './Level';
import UserAgent from './UserAgent';

export default class Logger{

    constructor(opts){

        //测试环境  //192.168.226.45/web-broker-service/api/js
        var catUrl = (opts.isBeta ? '//192.168.226.45':'//221.181.67.144' )+'/web-broker-service/api/js';
        this.url =catUrl;// opts.url || '//221.181.67.144/web-broker-service/api/js';//'//webcatdot.dianping.com/web-broker-service/api/js';
        this.moduleName = opts.moduleName;

        //需绑定onerror事件
        this.userAgent = new UserAgent();
        this.bindError();
    }

    //发送错误到监控系统
    send(data){
        let [url,image] = [this.url, new Image(1, 1)];

        console.dir(data);
        image.src = url+"?"+this.format(data );
    }

    format(data){
        let arr = [];

        if(data && typeof(data) =='object' ){
            for(let name in data){
                arr.push(`${name}=${data[name]}`);
            }
        }

        return arr.join('&');
    }

    error(message){
        this.captureError(message, location.href, '', '', '',ERROR);
    }

    info(message){
        this.captureError(message, location.href, '', '', '',INFO);
    }

    warn(message){
        this.captureError(message, location.href, '', '', '',WARN);
    }

    dev(message){
        this.captureError(message, location.href, '', '', '',DEV);
    }

    getParam(data){
        let defaultParams = {
            n:data.appname,
            v:1,
            msg:data.message ||'',
            t:+new Date(),
            l:data.level,
            a:this.userAgent.getName(),
            data:encodeURIComponent(JSON.stringify(data))
        };

        return defaultParams;
    }

    captureError(message, url=location.href, line, column, errorObject,level){

        if (message != "Script error." && !url) {
            return true;
        }
        if(url ==''){
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
            level: level ||ERROR
        }) );

        return true;
    }
    bindError(){
        let _this = this;
        window.onerror = function(message, url, line, column, errorObject){
            _this.captureError(message, url, line, column, errorObject,ERROR);
        };
    }
}
