
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // 取得繪圖環境
var pencilObj= document.getElementById("penSelect");
var eraserObj = document.getElementById("eraserSelect");
var textprintObj = document.getElementById("textprint");
var clearObj = document.getElementById("clear");
var outputImgObj = document.getElementById("outputImg");
var recShapeObj = document.getElementById("recShape");
var circleShapeObj = document.getElementById("circleShape");
var drawMode, mx, my, oriX, oriY, dist;
var mode=0;//0 for pencil; 1 for eraser; 2 for circle; 3 for rectangle
var oldImg;

//畫筆
function pencil(){
	canvas.style.cursor="url(./pics/hw4/penSno.png), auto";
	mode=0;
}
//橡皮擦
function eraser(){
	canvas.style.cursor="url(./pics/hw4/eraserSno.png), auto";
	mode=1;
}
//Circle
function circle(){
	canvas.style.cursor="crosshair";
	mode=2;
}
//Rectangle
function rectangle(){
	canvas.style.cursor="crosshair";
	mode=3;
}
function drawCircle(x, y, mxx, myy, color){
    
	ctx.beginPath();
	ctx.strokeStyle = color;
	// lower curve
	ctx.moveTo(x, y);
	ctx.bezierCurveTo(x, myy, mxx, myy, mxx, y);
	ctx.stroke();
	// upper curve
	ctx.moveTo(x, y);
	ctx.bezierCurveTo(x, 2*y-myy, mxx, 2*y-myy, mxx, y);// y-(myy-y)
	ctx.stroke();
}
function drawRectangle(x, y, r, mxx, myy, color){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(x, y, mxx-x, myy-y);
    ctx.stroke();
}
function dist(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
canvas.onmousedown = function(){
		
	ctx.beginPath();
	if(mode==0){
		ctx.strokeStyle = document.getElementById("penColor").value;//從顏色選擇器取值
		ctx.globalCompositeOperation = "source-over";
		ctx.lineWidth = document.getElementById("penThickness").value;
		ctx.lineCap = document.getElementById("penShape").value;
	}
	else if(mode==1){
		ctx.strokeStyle = "white";
		ctx.globalCompositeOperation = "destination-out";
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.lineWidth = document.getElementById("eraserThickness").value;
		ctx.lineCap = document.getElementById("eraserShape").value;
	}
	else if(mode==2){
		ctx.lineWidth = document.getElementById("shapeThickness").value;
		ctx.globalCompositeOperation = "source-over";
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		oldImg = ctx.getImageData(0, 0, 5000, 5000);
        color = document.getElementById("shapeColor").value;    
        oriX = mx;
        oriY = my;
	}
	else if(mode==3){
		ctx.lineWidth = document.getElementById("shapeThickness").value;
		ctx.globalCompositeOperation = "source-over";
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		oldImg = ctx.getImageData(0, 0, 5000, 5000);
        color = document.getElementById("shapeColor").value;    
        oriX = mx;
        oriY = my;
	}
	ctx.moveTo(event.clientX - canvas.style.posLeft-310, event.clientY - canvas.style.posTop-70);
	drawMode = true;
	return false;//讓游標不要變成text
}
canvas.onmousemove = function(ev){
	if(drawMode){
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		if(mode==0 || mode==1){
			ctx.lineTo(mx, my);
			ctx.stroke();
		}
		else if(mode==2){
			ctx.clearRect(0,0,5000,5000);
			ctx.putImageData(oldImg,0,0);
			drawCircle(oriX, oriY, mx,my,color);
		}
		else if(mode==3){
			ctx.clearRect(0,0,5000,5000);
			ctx.putImageData(oldImg,0,0);
			drawRectangle(oriX, oriY, dist(oriX,oriY,mx,my), mx,my,color);
		}
		
	}

}
//不論在哪裡放開滑鼠都要改變drawmode
window.onmouseup = function(){
	drawMode = false;
}
//輸出圖片
function output() {
	window.open(canvas.toDataURL('img/png'));// or window.open(ctx.canvas.toDataURL('img/png'));
}

//輸入文字
function textt(g,h,i){
	ctx.fillStyle = document.getElementById("textColor").value; 
	ctx.globalCompositeOperation = "source-over";
	ctx.font = '30px Segoe Script';
	//ctx.textAlign = 'center';
	//ctx.strokeText(g,h,i);
	ctx.fillText(g,h,i);
}

//清空畫面
function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// text print
textprintObj.onclick = function(){
	var inputText = document.getElementById("word");
	var xPos = document.getElementById("x");
	var yPos = document.getElementById("y");
	textt(inputText.value,x.value,y.value);
}
//pencil img event
pencilObj.onclick = function(){
	pencil();return false;
}
pencilObj.onmouseover = function(){
	this.src='./pics/hw4/pengreenBno.png';
}
pencilObj.onmouseout = function(){
	this.src='./pics/hw4/penBno.png';
}
//eraser img event
eraserObj.onclick = function(){
	eraser();return false;
}
eraserObj.onmouseover = function(){
	this.src='./pics/hw4/eraserhoverBno.png';
}
eraserObj.onmouseout = function(){
	this.src='./pics/hw4/eraserBno.png';
}
//clear img event
clearObj.onclick = function(){
	clearCanvas();return false;
}
clearObj.onmouseover = function(){
	this.src='./pics/hw4/garbageOno.png';
}
clearObj.onmouseout = function(){
	this.src='./pics/hw4/garbageCno.png';
}
//outputImg img event
outputImgObj.onclick = function(){
	output();return false;
}
outputImgObj.onmouseover = function(){
	this.src='./pics/hw4/outputoverBno.png';
}
outputImgObj.onmouseout = function(){
	this.src='./pics/hw4/outputBno.png';
}
//recShape img event
recShapeObj.onclick = function(){
	rectangle();return false;
}
recShapeObj.onmouseover = function(){
	this.src='./pics/hw4/rectangle_y.png';
}
recShapeObj.onmouseout = function(){
	this.src='./pics/hw4/rectangle.png';
}
//circleShape img event
circleShapeObj.onclick = function(){
	circle();return false;
}
circleShapeObj.onmouseover = function(){
	this.src='./pics/hw4/ellipse_y.png';
}
circleShapeObj.onmouseout = function(){
	this.src='./pics/hw4/ellipse.png';
}