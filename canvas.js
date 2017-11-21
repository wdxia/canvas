var canvas = document.getElementById('canvas')
changeWindow()
window.onresize = function(){
    changeWindow()
}

var usingEraser = false
var flag = false
var ctx = canvas.getContext('2d')
var painting = false
var width = 2
var point = {
    x:undefined,
    y:undefined,
}
/*
* 删除屏幕
* 
* */
var clear = document.getElementById('clear')
clear.onclick = function(){
    ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
}
/*
*调整画笔粗细
*/
var bold = document.getElementsByClassName('bold')[0]
bold.onclick = function () {
    width = 8
}
var lighter = document.getElementsByClassName('lighter')[0]
lighter.onclick = function () {
    width = 5
}
//保存
var save = document.getElementById('downloader')
save.onclick = function () {
    document.getElementById("downloader").download = "image.png";
    document.getElementById("downloader").href = document.getElementById("canvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

//特性检测
if('ontouchstart' in document.body){
    //说明是触屏设备

    listenToTouch(canvas)


}else{
    //说明是非触屏设备

    listenToMouse(canvas)
}







//橡皮擦

var eraser = document.getElementById('eraser')
eraser.onclick = function(){
    painting = false
    usingEraser = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

//铅笔
var pencil = document.getElementById('pencil')
pencil.onclick = function () {
    painting = false
    usingEraser = false
    width = 2
    pencil.classList.add('active')
    eraser.classList.remove('active')


}
pencil.classList.add('active')




var red = document.getElementById('red')
red.onclick = function(){
    if(!usingEraser){
        ctx.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
}
var green = document.getElementById('green')
green.onclick = function(){
    if(!usingEraser){
        ctx.strokeStyle = 'green'
        green.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
    }
}
var blue = document.getElementById('blue')
blue.onclick = function () {
    if(!usingEraser){
        ctx.strokeStyle = 'blue'
        blue.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
    }
}





//监听窗口是否改变
function changeWindow(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight - 60
    canvas.width = pageWidth
    canvas.height = pageHeight
}
//监听鼠标事件
function listenToMouse(canvas) {
    canvas.onmousedown = function(ent){
        point = {
            x:ent.clientX,
            y:ent.clientY - 60
        }
        if(usingEraser){
            flag = true
            ctx.clearRect(point.x-3, point.y-3, 6, 6)

        }else{
            painting = true
            if(painting){
                ctx.fillRect (point.x, point.y, 0, 0)
            }

        }
    }

    canvas.onmousemove = function(ent){

        if(usingEraser && flag){
            point = {
                x:ent.clientX,
                y:ent.clientY - 60
            }
            ctx.clearRect(point.x-3, point.y-3, 6, 6)
        }else{
            if(painting){
                ctx.beginPath()
                ctx.moveTo(point.x,point.y)
                point = {
                    x:ent.clientX,
                    y:ent.clientY - 60
                }
                ctx.lineWidth = width
                ctx.lineTo(point.x,point.y)
                ctx.closePath()
                ctx.stroke()
            }
        }
    }

    canvas.onmouseup = function(ent){
        flag = false
        painting = false
        point = {
            x:undefined,
            y:undefined
        }
    }
}
//监听触摸事件
function listenToTouch(canvas) {

    canvas.ontouchstart=function (en) {

        point = {
            x:en.touches[0].clientX,
            y:en.touches[0].clientY - 60
        }
        if(usingEraser){
            console.log(3)
            flag = true
            ctx.clearRect(point.x-3, point.y-3, 6, 6)

        }else{
            console.log(4)
            painting = true
            if(painting){
                ctx.fillRect (point.x, point.y, 0, 0)
            }
        }

    }

    canvas.ontouchmove=function (en) {
        if(usingEraser && flag){
            point = {
                x:en.touches[0].clientX,
                y:en.touches[0].clientY - 60
            }
            ctx.clearRect(point.x-3, point.y-3, 6, 6)
        }else{
            if(painting){
                ctx.beginPath()
                ctx.moveTo(point.x,point.y)
                point = {
                    x:en.touches[0].clientX,
                    y:en.touches[0].clientY - 60
                }
                ctx.lineWidth = 2
                ctx.lineTo(point.x,point.y)
                ctx.closePath()
                ctx.stroke()
            }
        }
    }
    canvas.ontouchend=function () {
        flag = false
        painting = false
    }
}


