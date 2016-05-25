//export RadioGroup from './RadioGroup.js';

import Logger from './Logger';

if(!window.CatLogger){
    window.CatLogger = Logger;
}

export CatLogger from './Logger';