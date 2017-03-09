
var canvas = document.getElementById("myCanvas"); // 取得物件
var ctx = canvas.getContext("2d"); // 取得繪圖環境
var drawMode, mx, my;
var mode=1;//1 for pencil; 0 for eraser

//畫筆
function pencil(){
	canvas.style.cursor="url(./pics/hw4/penSno.png), auto";
	mode=1;
}
//橡皮擦
function eraser(){
	canvas.style.cursor="url(./pics/hw4/eraserSno.png), auto";
	mode=0;
   }
	
canvas.onmousedown = function(){
		
	ctx.beginPath();
	if(mode==1){
		ctx.strokeStyle = document.npencil.penColor.value;//從顏色選擇器取值
		ctx.lineWidth = document.npencil.thickness.value;
		ctx.lineCap = document.npencil.shape.value;
	}
	else if(mode==0){
		ctx.strokeStyle = "white";
		ctx.lineWidth = document.neraser.thickness.value;
		ctx.lineCap = document.neraser.shape.value;
	}
	ctx.moveTo(event.clientX - canvas.style.posLeft-310, event.clientY - canvas.style.posTop-70);
	drawMode = true;
	return false;//讓游標不要變成text
}
canvas.onmousemove = function(ev){
	if(drawMode){
		mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
		ctx.lineTo(mx, my);
		ctx.stroke();
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
