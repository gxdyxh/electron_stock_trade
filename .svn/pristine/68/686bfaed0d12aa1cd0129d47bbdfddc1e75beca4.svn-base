//登录js
/**
 * 
    protect_acc:false,
    memory_acc:false,
    memory_pwd:false,
    acc_str:'',
    pwd_str:''} def_login_conf 
 */
function protec_acc(def_login_conf){
    if(def_login_conf.protect_acc){
        $('#protect_acc').prop('checked',true);
        $('#account').prop('type','password');
    }else{
        $('#protect_acc').removeAttr('checked');
        $('#account').prop('type','text');
    }
}
function set_acc(def_login_conf){
    if(def_login_conf.memory_acc){
        $('#memory_acc').prop('checked',true);
        $('#account').val(def_login_conf.acc_str);
    }
}
function set_pwd(def_login_conf){
    if(def_login_conf.memory_pwd){
        $('#memory_pwd').prop('checked',true);
        $('#password').val(def_login_conf.pwd_str);
    }
}
function login(){

    var account = $('#account').val();
    var password = $('#password').val();

    if(account==''){
        $('#tipbox').text('请填写账号信息');
        return false;
    }
    if(password==''){
        $('#tipbox').text('请填写账号密码');
        return false;
    }
    //设置缓存
    def_login_conf={
        protect_acc:$("#protect_acc").is(":checked"),
        memory_acc:$("#memory_acc").is(":checked"),
        memory_pwd:$("#memory_pwd").is(":checked"),
        acc_str:account,
        pwd_str:password
    }
    setCache('def_login_conf',def_login_conf);

    remote.app.sys.login({
            loginName:account,
            password:password
        },(res)=>{

           if(res.status !=200){
                remote.app.untils.alert(res.msg,'登录提醒','warning');
                return false;
           }
           close();

        })

    // http.post('http://47.106.222.57:9090/api/user/login',{
    //     loginName:account,
    //     password:password
    // },{
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
    //         'Devices-Token':'pc_app',
    //         'timestamp':(new Date()).getTime(),
    //         //'accessKey':account
    //     }
    // },function(res){
    //     debugger;
    //     console.log(res);
    // })

}


function planClose(qz){
    if(qz===true){
        remote.app.quit();
        return false;
    }else{
        remote.getCurrentWindow().close();
    }
    
}