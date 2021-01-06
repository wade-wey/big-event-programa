$(document).ready(function () {
    //通过jquery中的ajaxPrefilter()方法对页面中所有的ajax请求做一些相应的预处理
    $.ajaxPrefilter(function (options) {
        options.url = "http://api-breakingnews-web.itheima.net" + options.url
        if (options.url.includes('/my/')) {
            options.headers = {
                Authorization: localStorage.getItem("token") || ""
            }
        }
    })


})