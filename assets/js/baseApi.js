$.ajaxPrefilter(function (config) {
  //拼接根路径
  config.url = 'http://big-event-api-t.itheima.net' + config.url

  //请求头
  if (config.url.indexOf('/my/') !== -1) {
    config.headers = { Authorization: localStorage.getItem('token') || '' }
    //不论请求成功与否都会执行 
    config.complete =function(res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        console.log(111)
        //强制清除本地储存
        localStorage.removeItem('token')
        //调回登录页
        location.href='/login.html'
      }
    }
  }
})