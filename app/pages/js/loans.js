var multipleConf = {};
function getMultiples(type,cb){
    cb=cb|| function(){};

    if(type in multipleConf){
        cb(multipleConf[type]);
        return;
    }
    http.get('/api/loans/loans_multiples',{sectionType:type,userId:getNowUser().id},(res)=>{
    if(res.status!='200'){
        remote.app.untils.alert(res.msg,'系统提醒','warning');
        return; 
    }
    multipleConf[type]=res.data;
    cb(res.data);
    });
}

