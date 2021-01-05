$(document).ready(function () {
    $('#link_reg').on('click', function () {
        $('.loginbox').hide()
        $(".regbox").show()
    })
    $('#link_login').on('click', function () {
        $('.loginbox').show()
        $(".regbox").hide()
    })
    //通过layUi内置对象进行表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.regbox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //监听表单提交事件，提交表单的时候发送注册ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val()
        }
        $.post("/api/reguser", data, function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg('注册失败')
            }
            layer.msg('注册成功，请登陆！')
            $('#link_login').click()
        })
    })

    //监听表单登陆，登陆成功后跳转页面
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                console.log(res)
                layer.msg('登陆成功')
                location.href = '/index.html'
            }
        })
    })
})