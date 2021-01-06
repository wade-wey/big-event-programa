function getUserinfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: function (res) {
            if (res.status != 0) { return layui.layer.msg('获取用户信息失败！') }
            // layui.layer.msg('获取用户信息成功！')
            renderAvatar(res.data)
        },
        //通过complete回调，判断获取用户信息是否成功，据此决定用户是否有访问后台页面的权限
        complete: function (ret) {

            if (ret.responseJSON.message == "身份认证失败！" && ret.responseJSON.status == 1) {
                window.localStorage.removeItem('token')
                location.replace("../login.html")

            }

        }
        // responseJSON:
        // message: "身份认证失败！"
        // status: 1
    })
}
//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)

    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase())
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
    }
}
$(function () {
    getUserinfo()

    $('#quitpanel').on('click', function (e) {
        // e.preventDefault()
        var layer = layui.layer;
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            window.localStorage.removeItem('token')
            location.replace("../login.html")
            layer.close(index);
        });
    })



})
