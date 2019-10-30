//公共js
window.remote = require('electron').remote;
const {ipcRenderer} = require('electron');
//debugger;
// if (self != top) {  //子页面
//       window.even = window.parent.even;
//       window.remote = require('electron').remote;
//      // window.$ = window.jQuery; 
// }else{ //主页面
//     window.even = new even();
//     window.remote = require('electron').remote;
//     //window.$ = window.jQuery = require("./lib/jquery.min");
// }

initCache();

(function($){
    $.getScript = function(url, callback, cache) {
        $.ajax({type: 'GET', url: url, success: callback, dataType: 'script', ifModified: true, cache: cache});
    };
})($);

//自定义监听
function even(){
    this.events={};
    this.on=(key, callback)=>{ //添加监听
         if((key in this.events)===false){
            this.events[key]=[];
         }
         this.events[key].push(callback);
    }
    this.emit=(key)=>{ //执行监听
        console.log("触发"+key+"事件");
        if((key in this.events)===false){
           return false;
        }   
        for (let element of this.events[key]) {
            element.call(null);
        }
    }
    this.clear=()=>{//清空所有监听
        this.events={}
    }
    this.del=(key)=>{ //删除单个监听
      
    }
}


//获取当前用户信息
function getNowUser(){
    return remote.getGlobal('userData');
}


//浏览器跳转
function openUrl(url){
    remote.app.sys.openUrl(url);
}
//缓存相关  TODO 本地数据库
function setCache(key,val){
    let data = JSON.stringify(val);
    window.localStorage.setItem(key,data);
}
function getCache(key){
    let data =  window.localStorage.getItem(key);
    if(data){
            return JSON.parse(data);
    }
    return null;
}
function delCache(key){
    localStorage.removeItem(key);
}

function initCache(){
    var def_login_conf = getCache('def_login_conf');
    if(null === def_login_conf){
        def_login_conf={
            protect_acc:false,
            memory_acc:true,
            memory_pwd:true,
            acc_str:'',
            pwd_str:''
        }
        setCache('def_login_conf',def_login_conf);
      }

    var loans = getCache('loans');
    if(null ===loans){
        //loans 配资参数
        loans={
            nowType:1, 
        }
        setCache('loans',loans);
    };
}

var http={
    get(url,param,cb){
        cb = cb || function(){};
        remote.app.sys.get(url,param,function(res){
            cb(JSON.parse(JSON.stringify(res)));
        })
    },
    post(url,param,cb){
        cb = cb || function(){};
        remote.app.sys.post(url,param,function(res){
            cb(JSON.parse(JSON.stringify(res)));
        })
    }
}

function formatTable(table,data,cols,config){
    if(typeof config ==='undefined'){
        config = {};
    }
    let def_conf = {
        elem: '#dataTable',
        size: 'sm', //小尺寸的表格
        page: false,
        limit:1000,
    }
    config.text={
        none: " "
    }

    if("done" in config){
        var fn = config.done;
        delete config['done'];
        config.done = function(res, curr, count){
            tableRline(res, curr, count,fn);
        };
    }else{
        config.done = tableRline;
    }

    config.data = data;
    config.cols = [cols];
    let conf = Object.assign({},def_conf, config);
    
    return table.render(conf);
}

$(function(){
    //监听行单击事件
    table.on('row(test)', function(obj){
    console.log(obj.tr) //得到当前行元素对象
    console.log(obj.data) //得到当前行数据
    //obj.del(); //删除当前行
    //obj.update(fields) //修改当前行数据
    $(obj.tr).addClass('table-hover').siblings('tr').removeClass('table-hover');

  });

  $('body').on('click','.layer-table-Rline',function(){
      $('table.layui-table tr.table-hover').removeClass('table-hover');
  });
});


function tableDouble(cb){
    //监听行双击事件
    table.on('rowDouble(test)', function(obj){
        tdxMsg(obj.data.code)
        cb = cb || function(){};
        cb(obj);
  });
}

function tdxMsg(code){
      remote.app.sys.tdxmsg(code);
}


function tableRline(res, curr, count,cb){
    cb = cb || function(){};
    $('.layui-table-box').append('<div class="layer-table-Rline"></div>');
    $('.layui-table-header table th').each(function(){
        $('.layer-table-Rline').append('<div class="laytable-cell-'+$(this).attr('data-key')+'"></div>');
    })
    cb(res, curr, count);
}


function getList(url,param,cb){
    remote.app.sys.get(url,param,function(res){
        if(res.status ==200 ){
            cb && cb(JSON.parse(JSON.stringify(res.data)));
        }
    })
}

//加载股票数据
function loadJS(url, callback) {
    $.getScript(url,function(response,status){
            
            callback();
    },true);
/*
    var script = document.createElement('script'),
        fn = callback || function() {};
    script.type = 'text/javascript';
    //IE
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                fn();
            }
        };
    } else {
        //其他浏览器
        script.onload = function() {
            fn();
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    */
}

function formatStock(code) {
    var data = window['hq_str_' + code];
    if (typeof(data) == 'undefined') {
        return false;
    }
    var e = data.split(",");
    if(!e[3]){
        return false;
    }
    return {
        name:e[0],
        code:(code+'').substr(2),
        sybmol:code,
        open:e[1],
        close:parseFloat(e[2]).toFixed(2),
        price:parseFloat(e[3]).toFixed(2),
        height:e[4],
        low:e[5],
        volume:e[8],
        turnover:e[9],
        change:parseFloat(e[3] - e[2]).toFixed(2),
        changeP:parseFloat((e[3] - e[2]) / e[2] * 100).toFixed(2),
        time:e[30]+' '+e[31],
        buy:[[e[10],parseFloat(e[11]).toFixed(2)],[e[12],parseFloat(e[13]).toFixed(2)],[e[14],parseFloat(e[15]).toFixed(2)],[e[16],parseFloat(e[17]).toFixed(2)],[e[18],parseFloat(e[19]).toFixed(2)]],
        sell:[[e[20],parseFloat(e[21]).toFixed(2)],[e[22],parseFloat(e[23]).toFixed(2)],[e[24],parseFloat(e[25]).toFixed(2)],[e[26],parseFloat(e[27]).toFixed(2)],[e[28],parseFloat(e[29]).toFixed(2)]],
    };

}

var stock_data={};
var stock_task=[];//页面监听列表
var tmp_task=[];//临时监听列表
var task=null;
var taskFn = null;
function startTask(fn){
    //fn = fn || function(){};
    if( typeof fn =='function'){
        taskFn = fn;
    }
    if(task!==null){
        clearInterval(task);
    }
  
    task = window.setInterval(()=>{getStock(taskFn)},2000);
    getStock(taskFn);
}


function  getStock(fn){
    fn = fn || function(){};
    if(stock_task.length>0 || tmp_task.length>0){
        var stocklist = Array.from(new Set(stock_task.concat(tmp_task)));
        loadJS('http://hq.sinajs.cn/?list='+(stocklist).join(','), ()=> {
           
            var res = null;
            for (var i = 0; i < stocklist.length; i++) {
                res = null;
                res = formatStock(stocklist[i]);
                if(res){
                stock_data[stocklist[i]] = res;
                }
            }
            fn();
        });
    }
}


function formatStockData(fn){
    fn = fn || function(){};
    for (const key in stock_data) {
        
      if (stock_data.hasOwnProperty(key)) {
        const element = stock_data[key];
        
        if(tmp_task.length>0 && tmp_task[0]==key){
            fn(element);
        }

        $('.stock_'+key).each(function(){

            
          if($(this).hasClass('ccsz')){//持仓市值
            let yvolume = $(this).attr('data-volume');
            $(this).text(parseFloat(element.price*yvolume).toFixed(2));
          }
          if($(this).hasClass('gpxj')){//股票现价
            $(this).text(element.price);
          }
          if($(this).hasClass('fdyk')){//浮动盈亏
            let yprice = $(this).attr('data-price');
            let yvolume = $(this).attr('data-volume');
            let fdyk = (element.price-parseFloat(yprice))*parseFloat(yvolume);
            $(this).text(parseFloat(fdyk).toFixed(2));
            if(fdyk>0){
              $(this).closest('tr').css('color','#FC0000');
            }else{
              $(this).closest('tr').css('color','#0000A0');
            }
          }

          if($(this).hasClass('ykbl')){//盈亏比例
            let yprice = $(this).attr('data-price');
            let yvolume = $(this).attr('data-volume');
            let ykbl = (element.price-parseFloat(yprice))/parseFloat(yprice)*100;
            $(this).text(parseFloat(ykbl).toFixed(2));
          }

        })

      }

    }
 }


 function getStockColor(price,dbprice){
     dbprice =  dbprice || 0;
     if(!price){
            return '#000000';
     }
     if(price<dbprice){
        return '#0000FA';
     }
     return '#FC0000';
 }

 function searchStock(key,cb){
     if(key==''){
            return ;
     }
     cb = cb || function(){};
    remote.app.sys.get('/api/quotation/query_fuzzey_markets',{fuzzeyKey:key},function(res){
        if(res.status ==200 ){
            cb && cb(JSON.parse(JSON.stringify(res.data)));
        }
    })
 }



if((window.location.href).indexOf("login.html") == -1 && (window.location.href).indexOf("pages/index.html")==-1){ //webview打开

    $(document).keydown(function(event){
       
        var act={};
        act['112'] = 'trade/buy.html';
        act['113']= 'trade/sell.html';
        act['114']= 'trade/cancle.html';
        act['115']= 'positon/index.html';
        act['116']='';
       
        if(event.keyCode+'' in act){ //F1-F5 112-116
            ipcRenderer.sendToHost('initpage',{'page':act[event.keyCode+'']}) //向webview所在页面发送消息

        }
    })

    
    
}