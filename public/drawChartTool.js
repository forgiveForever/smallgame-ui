
// var penWeight = 1;
// var penColor = '#f00';
// var isEraser = false;	//是否正在使用橡皮擦 
var ws;
var canvas //= document.getElementById('canvas');
var cvs //= canvas.getContext('2d');
var userInfo =JSON.parse(window.sessionStorage.getItem("userInfo")) ;
var drawobj = {
    start_x:null,
    start_y:null,
    end_x:null,
    end_y:null,
    penWeight:1,
    penColor:'#f00',
    isEraser:false,
    draw_status:1

}

function clearCanvesEnvent(canvas){
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = null;
}

function clearchart(canvas){
    var tempWidth = canvas.width;
    canvas.width = canvas.height;
    canvas.width = tempWidth;
    clearCanvesEnvent(canvas);
}

function draw(){
//画画
canvas.onmouseenter = function(){
    canvas.onmousedown = function(e){
        var start_x = e.clientX - canvas.offsetLeft + document.body.scrollLeft;
        var start_y = e.clientY - canvas.offsetTop + document.body.scrollTop;
        //传送起点
        drawobj.start_x = start_x;
        drawobj.start_y = start_y;
       
        if(isEraser === false){
            
            cvs.beginPath();				//开始本次绘画
            cvs.moveTo(start_x, start_y);	//画笔起始点
            cvs.lineCap = 'round';
            cvs.lineJoin="round";
            cvs.strokeStyle = penColor;		//加载全局数据（画笔颜色）
            cvs.lineWidth = penWeight;		//加载全局数据（画笔粗细）
            cvs.lineTo(start_x, start_y);
            cvs.stroke();	//画一个点
        }
        else{
            cvs.clearRect(start_x - penWeight/2, start_y - penWeight/2, penWeight, penWeight);
        }
        canvas.onmousemove = function(e){
            var move_x = e.clientX - canvas.offsetLeft + document.body.scrollLeft;
            var move_y = e.clientY - canvas.offsetTop + document.body.scrollTop;
            
            drawobj.end_x = move_x;
            drawobj.end_y = move_y;
            drawobj.draw_status = 2;
            if(isEraser === false){
                cvs.lineTo(move_x, move_y);
                cvs.stroke();	//渲染
            }
            else{
                cvs.clearRect(move_x - penWeight/2, move_y - penWeight/2, penWeight, penWeight);
            }
            var msg = {
                    userInfo:userInfo,
                    sendtype:1,
                    returntype:-1,
                    returnroom:null,
                    returnisclear:false,
                    draw_info:drawobj,
                    draw_uid:userInfo.uid,
              
            }
            console.log(drawobj)
           
            ws.send(JSON.stringify(msg))
        }
        canvas.onmouseup = function(e){
            cvs.closePath();	//结束本次绘画
            canvas.onmousemove = null;
            canvas.onmouseup = null;
        }
        drawobj.draw_status = 1;
                msg = {
                    userInfo:userInfo,
                    sendtype:1,
                    returntype:-1,
                    returnroom:null,
                    returnisclear:false,
                    draw_info:drawobj, 
                    draw_uid:userInfo.uid,
            
            }
            console.log(drawobj)
           
            ws.send(JSON.stringify(msg))
    }
    canvas.onmouseleave = function(){
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = null;
    }
}
}
  

function drawchart(tem_drawobj,tem_canvas,tem_cvs,tem_ws){
    canvas = tem_canvas;
    cvs = tem_cvs; //canvas.getContext('2d');
    drawobj = tem_drawobj;
    ws = tem_ws
    draw()
}

function showchart(cvs,draw_msg){
        var drawobj = draw_msg
        cvs.lineCap = 'round';
        cvs.lineJoin="round";
        cvs.strokeStyle = drawobj.penColor;		//加载全局数据（画笔颜色）
        cvs.lineWidth = drawobj.penWeight;//加载全局数据（画笔粗细）
         
        if(drawobj.draw_status == 1&& drawobj.isEraser == false){
            let start_x = drawobj.start_x;
            let start_y = drawobj.start_y;
              cvs.beginPath();				//开始本次绘画
              cvs.moveTo(start_x, start_y);	//画笔起始点
              
              // cvs.strokeStyle = drawobj.penColor;		//加载全局数据（画笔颜色）
              // cvs.lineWidth = drawobj.penWeight;		//加载全局数据（画笔粗细）
              cvs.lineTo(start_x, start_y);
              cvs.stroke();	//画一个点
        }
       else if (drawobj.draw_status == 2 &&  drawobj.isEraser == false){
          let move_x = drawobj.end_x;
          let move_y = drawobj.end_y;
         
          cvs.lineTo(move_x, move_y);
          cvs.stroke();	//渲染
       }
       else{
          let start_x = drawobj.end_x;
          let start_y = drawobj.end_y;
          cvs.clearRect(start_x - drawobj.penWeight/2, start_y - drawobj.penWeight/2, drawobj.penWeight, drawobj.penWeight);
       }

         
}