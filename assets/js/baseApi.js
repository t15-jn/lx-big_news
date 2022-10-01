$.ajaxPrefilter(function (config) {
  //拼接根路径
  config.url = 'http://big-event-api-t.itheima.net'+ config.url
})