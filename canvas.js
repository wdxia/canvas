var canvas = document.getElementById('canvas')
changeWindow()
window.onresize = function(){
    changeWindow()
}

var usingEraser = false
var flag = false
var ctx = canvas.getContext('2d')
var painting = false

var point = {
    x:undefined,
    y:undefined,
}
//特性检测
if('ontouchstart' in document.body){
    //说明是触屏设备

    listenToTouch(canvas)


}else{
    //说明是非触屏设备

    listenToMouse(canvas)
}



/*
**获取视窗的宽高
*/






//橡皮擦

var eraser = document.getElementById('eraser')
eraser.onclick = function(){
    painting = false
    usingEraser = true
    eraser.classList.add('active')
    pencil.classList.remove('active')

}
var pencil = document.getElementById('pencil')
pencil.onclick = function () {
    painting = true
    usingEraser = false
    pencil.classList.add('active')
    eraser.classList.remove('active')


        var red = document.getElementById('red')
        red.onclick = function(){
            ctx.strokeStyle = 'red'
            red.classList.add('active')
            green.classList.remove('active')
            blue.classList.remove('active')
        }
        var green = document.getElementById('green')
        green.onclick = function(){
            ctx.strokeStyle = 'green'
            green.classList.add('active')
            red.classList.remove('active')
            blue.classList.remove('active')
        }
        var blue = document.getElementById('blue')
        blue.onclick = function () {
            ctx.strokeStyle = 'blue'
            blue.classList.add('active')
            red.classList.remove('active')
            green.classList.remove('active')
        }

}
pencil.classList.add('active')




function changeWindow(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight - 60
    canvas.width = pageWidth
    canvas.height = pageHeight
}

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
                ctx.fillRect (point.x-1, point.y-1, 2, 2)
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
                ctx.lineWidth = 2
                ctx.lineTo(point.x,point.y)
                ctx.closePath()
                ctx.stroke()
            }
        }
    }

    canvas.onmouseup = function(ent){
        flag = false
        painting = false
    }
}

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
                ctx.fillRect (point.x-1, point.y-1, 2, 2)
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


