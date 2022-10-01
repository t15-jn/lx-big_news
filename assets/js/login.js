$(function () {
  $('#link_reg').on('click', function () {
    $('.login_wrap').hide()
    $('.reg_wrap').show()
  })

  $('#link_login').on('click', function () {
    $('.reg_wrap').hide()
    $('.login_wrap').show()
  })

  //定义输入框的验证规则
  let form = layui.form
  let layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      if (value !== $('.reg_wrap [name="password"]').val()) {
        return '两次输入的密码不一致!'
      }
    }
  })


  //注册表单提交事件
  $('#form_reg').on('submit', function (e) {
    //住址默认提交行为
    e.preventDefault()
    //获取注册数据
    let data = {
      username: $('.reg_wrap [name="username"]').val(),
      password: $('.reg_wrap [name="password"]').val(),
      repassword: $('.reg_wrap [name="repassword"]').val()
    }
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功,请登录!')
        //模拟手动点击
        $('#link_login').click()
      }
    })
  })


  //登录表单提交事件
  $('#form_login').submit(function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //提交登录的数据
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data:$(this).serialize(),
      success(res) {
        if(res.status!== 0)return layer.msg(res.message)
        layer.msg('登录成功')
        console.log(res)
        //储存token
        localStorage.setItem('token',res.token)
        //自动跳转到首页
        location.href= '/index.html'
      }
    })
  })
})