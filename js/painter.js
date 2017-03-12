
var canvas = document.getElementById("myCanvas"); // 取得物件
var ctx = canvas.getContext("2d"); // 取得繪圖環境
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
		ctx.strokeStyle = document.npencil.penColor.value;//從顏色選擇器取值
		ctx.lineWidth = document.npencil.thickness.value;
		ctx.lineCap = document.npencil.shape.value;
	}
	else if(mode==1){
		ctx.strokeStyle = "white";
		ctx.lineWidth = document.neraser.thickness.value;
		ctx.lineCap = document.neraser.shape.value;
	}
	else if(mode==2){
		ctx.lineWidth = document.nshape.thickness.value;
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		oldImg = ctx.getImageData(0, 0, 5000, 5000);
        color = document.npencil.penColor.value;    
        oriX = mx;
        oriY = my;
	}
	else if(mode==3){
		ctx.lineWidth = document.nshape.thickness.value;
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		oldImg = ctx.getImageData(0, 0, 5000, 5000);
        color = document.npencil.penColor.value;    
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
	window.open(document.getElementById('myCanvas').toDataURL('img/png'));// or window.open(ctx.canvas.toDataURL('img/png'));
}

//輸入文字
function text(g,h,i){
	ctx.fillStyle = document.ntext.textColor.value;
	ctx.font = '30px Segoe Script';
	//ctx.textAlign = 'center';
	//ctx.strokeText(g,h,i);
	ctx.fillText(g,h,i);
}

//清空畫面
function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
