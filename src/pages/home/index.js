// 入口
import "./index.scss"

document.querySelector("#app").innerHTML = `<p class="fons">首页</p>`

$(function(){
    $('[data-toggle="popover"]').popover();
})
