

const axios = require('./http-request');
const querystring = require('querystring');

const conf = require('./conf');
const untils = require('./untils');
const winManger = require('./wins');
var CLASS = function(app){
    this.app = app;
}

CLASS.prototype.close = function(){
    this.app.close();
}
CLASS.prototype.openUrl = function(url){
    require('electron').shell.openExternal(url);
}
CLASS.prototype.login=function(param,cb){
    let tempPwd = param.password;
    param.password = untils.rsa(param.password,conf.login_pem);
    param = untils.dataSign(param);

    axios.post(conf.server_url+'/api/user/login',querystring.stringify(param),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent':'pc_app',
                'Devices-Token':'pc_app',
                'timestamp':(new Date()).getTime(),
                //'accessKey':account
            }
        }).then((res)=>{

            if(res.status==200){
                global.userData=res.data;
                global.userData.pwd = untils.md5(tempPwd);
                //console.log(userData);
                global.mainWindow = winManger.mainWindow();
            }
            cb && cb(JSON.parse(JSON.stringify(res)));
        }); 
}
CLASS.prototype.get=function(url,param,cb){
    let header= {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':'pc_app',
        'Devices-Token':'pc_app',
        'timestamp':(new Date()).getTime(),
        //'accessKey':account
    }
    if(false !== global.userData){
        delete header["Devices-Token"];
        header.accessKey = global.userData.xToken
    }
    param = untils.dataSign(param);

    axios.get(conf.server_url+url,{params:param,
            headers: header
        }).then((res)=>{
            cb && cb(JSON.parse(JSON.stringify(res)));
        }); 
}
CLASS.prototype.post=function(url,param,cb){
    
    let header= {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':'pc_app',
        'Devices-Token':'pc_app',
        'timestamp':(new Date()).getTime(),
        //'accessKey':account
    }
    if(false !== global.userData){
        delete header["Devices-Token"];
        header.accessKey = global.userData.xToken
    }
    param = untils.dataSign(param);
    axios.post(conf.server_url+url,querystring.stringify(param),{
            headers: header
        }).then((res)=>{
            cb && cb(JSON.parse(JSON.stringify(res)));
        }); 
}
CLASS.prototype.copy=function(txt){
    require('electron').clipboard.writeText(txt);
}
CLASS.prototype.tdxmsg=function(txt){
    var FFI = require('ffi');
    function TEXT(text){
       return new Buffer(text, 'ucs2').toString('binary');
    }
    var user32 = new FFI.Library('user32', {
    //    'MessageBoxW': 
    //    [
    //       'int32', [ 'int32', 'string', 'string', 'int32' ]
    //    ],
    //    'GetWindowLongPtrW': ['int', ['int', 'int']],
    //     'SetWindowLongPtrW': ['int', ['int', 'int', 'long']],
    //     'GetSystemMenu': ['int', ['int', 'bool']],
    //     'DestroyWindow': ['bool', ['int']],
        'RegisterWindowMessageA': [
            'int', ['string']
        ],
        'PostMessageW':['bool', ['int','int','int','int']] 
    });
    // var OK_or_Cancel = user32.MessageBoxW(
    //    0, TEXT('I am Node.JS!'), TEXT('Hello, World!'), 1
    // );
    // console.log(OK_or_Cancel);
    var stockTdx = user32.RegisterWindowMessageA('Stock');
    if(!stockTdx){
        return;
    }
    if(txt.length!=6){return;};
    var stockCode = (txt.slice(0,1)==6 ? 7 : 6 )+''+txt;
    var msgTdx = user32.PostMessageW(0xFFFF,stockTdx,parseInt(stockCode),0);
    console.log(stockTdx,msgTdx);
}
module.exports = CLASS;