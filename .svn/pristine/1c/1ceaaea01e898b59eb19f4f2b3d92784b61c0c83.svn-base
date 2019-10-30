const {app, dialog} = require('electron')
   
  var parseCommand = function() {
   dialog.showMessageBox({
     title  : '错误'
    , type  : 'error'
    , message : '此文件没有跟 OnceDoc 绑定'
   })
  }
   
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

var isEmptyObject = function (obj) {
    return JSON.stringify(obj) === '{}';
}

Object.defineProperty(Object.prototype, 'isEmptyObject', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: isEmptyObject
});

module.exports = {
    /**
 * 格式化时间
 * @param {*} format  格式 
 * @param {*} date  Date实体
 * formatTime("yyyy年MM月dd日",new Date());
 * formatTime("MM/dd/yyyy",new Date());
 * formatTime("yyyyMMdd",new Date());
 * formatTime("yyyy-MM-dd hh:mm:ss",new Date());
 */
    formatTime(format, date){
   
        if (undefined === date){
            date = new Date();
        }else{
            date = new Date(date);
        }
        var that = date;
        var o = {
            "M+": that.getMonth() + 1, //month 
            "d+": that.getDate(), //day 
            "h+": that.getHours(), //hour 
            "m+": that.getMinutes(), //minute 
            "s+": that.getSeconds(), //second 
            "q+": Math.floor((that.getMonth() + 3) / 3), //quarter 
            "S": that.getMilliseconds() //millisecond 
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
            for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    md5(str){
        var md5 = crypto.createHash('md5');
        return md5.update(str).digest('hex');
    },
    rsa(data,publicKey){
        function insert_str(str, insert_str, sn) {
            var newstr = "";
            for (var i = 0; i < str.length; i += sn) {
                var tmp = str.substring(i, i + sn);
                newstr += tmp + insert_str;
            }
            return newstr;
        }
        
        var getPublicKey = function(key){
            var result = insert_str(key, '\n', 64);
            return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
        };

        const key = new NodeRSA(getPublicKey(publicKey));
        key.setOptions({encryptionScheme: 'pkcs1'}) //就是新增这一行代码
        let rasStr =key.encrypt(data, 'base64');
        return  rasStr;
    },

    getParamStrFromObj (data = {}, paramProxy = ''){
       return Object.keys(data).map(key => {
            if (paramProxy) {
                return `${paramProxy}[${key}]=${encodeURIComponent(data[key])}`
            }
            return `${key}=${encodeURIComponent(data[key])}`
        }).join('&');
},
    dataSign(param){
        if(param.isEmptyObject()) {
            return {};
        }
        var newkey = Object.keys(param).sort();
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
            newObj[newkey[i]] = param[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        var urlStr = this.getParamStrFromObj(newObj);
        var singStr = this.md5(urlStr);
        newObj['sign'] = singStr;
        return newObj;
    }
    ,alert(msg,title,type){
         let data = {
            message : msg,
            type:"none"
          }
          if(typeof title !== 'undefined' && title){
            data.title = title;  
          }
          if(typeof type !== 'undefined'){
            data.type = type;  
          }
        dialog.showMessageBox(data);
    }
    ,dialogsync(msg,title,type,opt){
       
         let data = {
           message : msg,
           type:"none"
         }
         if(typeof title !== 'undefined' && title){
           data.title = title;  
         }
         if(typeof type !== 'undefined'){
           data.type = type;  
         }
         opt = opt || {};
         conf = Object.assign({},data,opt);
       return dialog.showMessageBox(conf);
   }
};