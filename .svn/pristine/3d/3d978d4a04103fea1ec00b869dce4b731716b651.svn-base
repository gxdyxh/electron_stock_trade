// 全局请求插件 Axios

const Axios = require('axios');
const dialog= require('electron').dialog;
var axios = Axios.create() // 实例化

//axios.defaults.baseURL = '/api/v1/' // 接口请求前缀
//axios.defaults.withCredentials = true // 是否跨域
axios.defaults.responseType = 'json' // json

// axios.defaults.transformResponse = [(data) => {
//   return DataHandle.filterNull(data)
// }] // `transformResponse` 在请求完成后响应传递给 then/catch 前，允许修改响应数据，函数必须return，function (data) { return data }
// 添加响应拦截器
axios.interceptors.response.use(function (response) { // 请求成功的回调
  return Promise.resolve(response.data)
}, function (error) { // 请求失败的回调

  if (error.response) { // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    //console.error(error)
    console.log('错误数据: ', error.response)
    dialog.showMessageBox({
      message : error.response,
      type:"warning",
      title:"提示消息"
    });

  } else { // 在提出请求设置时发生的错误: Something happened in setting up the request that triggered an Error
    console.error('Error', error.message)
      dialog.showMessageBox({
        message : err.message,
        type:"error",
        title:"错误消息"
      });
  }
  
  return Promise.reject(error)
})

module.exports = axios