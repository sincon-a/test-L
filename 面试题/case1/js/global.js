/*导航栏菜单函数*/
var underlineMenuItems = document.querySelectorAll("ul li");
underlineMenuItems[0].classList.add("active");
underlineMenuItems.forEach(function (item) {
    item.addEventListener("click", function () {
        underlineMenuItems.forEach(function (item) { return item.classList.remove("active"); });
        item.classList.add("active");
    });
});


/*轮播图*/
var index = 0 , //当前显示图片的索引，默认为0
    timer = null,//定时器
    body2_left = byId("body2_left"),
    prev = byId("prev"), // 上一张
    next = byId("next"), // 下一张
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length;
    
// 封装浏览器通用绑定事件
function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type] = handler;
    }    
}

//停止自动轮播
function stopAutoplay() {
    if(timer){
        clearInterval(timer);

    }
}

//自动播放
function starAutoplay() {
    timer = setInterval(function() {
        index++;
        if(index >= size) index = 0;
        changeImg();
    },1500)
}

//封装Byid   
function byId(id){
    return typeof(id) === "string" ? document.getElementById(id):id;
}

//切换图片
function changeImg(){
    for(var i = 0 ;i<size;i++){
        pics[i].style.display = "none"
        dots[i].className = ""
    }
    pics[index].style.display = "block";
    dots[index].className = "active"
}
// 点击按钮下一张
addHandler(next,"click",function() {
    index++;
    if(index>=size) index = 0;
    changeImg()
}) 

// 点击按钮上一张
addHandler(prev,"click",function() {
    index--;
    if(index<0) index = size-1;
    changeImg()
  
})

//点击圆点切换图片
for( var d = 0;d<size;d++){
    dots[d].setAttribute("data-id",d)
    addHandler(dots[d],"click",function(){
        index = this.getAttribute("data-id");
        changeImg()
    })
}

//鼠标划入，停止轮播
addHandler(body2_left,"mouseover",stopAutoplay);

//鼠标离开，停止轮播
addHandler(body2_left,"mouseout",starAutoplay);

// 自动轮播
starAutoplay();






