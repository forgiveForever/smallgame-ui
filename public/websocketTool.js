
// type 0 代表第一次传送用户标识，
   // const ip ='ws://47.107.105.43:8001';
    const ip ='ws://127.0.0.1:8001';
	var ws ;
    var session = window.sessionStorage;

    function initWebSocket(){
        ws.onopen = function(e){
            console.log("连接服务器成功");
            
            var userInfo = JSON.parse(session.getItem('userInfo'));
           
                let info={
                    userInfo:userInfo,
                    sendtype:0,
                    returntype:0,
                    returnroom:null,
                    returnisclear:false,
                    draw_info:null,
                    draw_uid:null,
                }
                ws.send(JSON.stringify(info));
    
           
          
        }
        ws.onclose = function(e){
            console.log("服务器关闭");
        }
        ws.onerror = function(){
            console.log("连接出错");
        }
    }
   

            // ws.onmessage = function(e){
            //     mess.innerHTML = "连接成功"
            //     document.querySelector(".kuang").onclick = function(e){
            //         var time = new Date();
            //         ws.send(time + "  game1点击了“" + e.target.innerHTML+"”");
            //     }
            // }

        function getWebsocket(){
            if(userInfo){
                ws = new WebSocket(ip);
                initWebSocket();
            }
           
            return ws;
        }