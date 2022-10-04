$(function () {
  let form = layui.form
  let layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称不能大于6个字符!'
      }
    }
  })
  initUserInfo()
  //获取用户基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败!' + res.message)
        }
        console.log(res)
        //调用 form.val() 快速 获取 表单的值
        form.val('formUserInfo', res.data)
      }
    })
  }

  //重置按钮点击行为
  $('#btnReset').on('click', function (e) {
    //阻止默认行为 
    e.preventDefault()
    initUserInfo()
  })

  //表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg('用户信息提交失败!')
        layer.msg('用户信息提交成功!')
        //调用父元素中 的方法,重新渲染头像和用户名
        window.parent.getUserInfo()
      }
    })
  })
})