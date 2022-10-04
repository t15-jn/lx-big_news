$(function () {
  getUserInfo()
})
let layer = layui.layer

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    /* headers: {
      Authorization: localStorage.getItem('token') || ''
    }, */
    success(res) {
      if (res.status !== 0) return layui.layer.msg('获取用户信息失败!')
      renderAvatar(res.data)
    },
   /*  //不论请求成功与否都会执行 
    complete: function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        console.log(111)
        //强制清除本地储存
        localStorage.removeItem('token')
        //调回登录页
        location.href='/login.html'
      }
    } */
  })
}

//渲染用户头像
function renderAvatar(user) {
  //渲染用户名
  // console.log(user)
  const  name =  user.nickname || user.username 
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

//点击退出事件 
$('#btnLogout').on('click', function () {
  layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
    //清除本地储存
    localStorage.removeItem('token')
    //返回登录页
    location.href = '/login.html'
    //关闭询问窗口
    layer.close(index);
  })
})