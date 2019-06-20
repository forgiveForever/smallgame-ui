function loadJs(url,callback){
    var script=document.createElement('script');
    script.type="text/javascript";
    if(typeof(callback)!="undefined"){
    if(script.readyState){
    script.onreadystatechange=function(){
     if(script.readyState == "loaded" || script.readyState == "complete"){
     script.onreadystatechange=null;
     callback();
     }
    }
    }else{
    script.onload=function(){
     callback();
    }
    }
    }
    script.src=url;
    //document.body.appendChild(script);
    document.getElementsByTagName("head")[0].appendChild(script);
    }

    function addUserElement(userInfo){
        var user_div = document.getElementById('user_div');
        var user = document.createElement("div")
        user.id = userInfo.uid;
        var img = document.createElement("img");
        img.src = userInfo.user_img;
        img.className = 'user_img'
        user.appendChild(img);
        var b = document.createElement("b");
        b.innerHTML = userInfo.username;
        b.className ="user_b";
        user.appendChild(b);
        user_div.appendChild(user)

    }
    function removeUserElement(ele_id){
        let remove = document.getElementById(ele_id);
        if(remove!=null){
            remove.parentNode.removeChild(remove);
        }
        
    }

    function isExistElement(ele_id){
        let flag = false;
        let el = document.getElementById(ele_id)
        if(el!= null){ flag=true;}
        return flag;
    }
    function dealUser(userList){
        var user_div = document.getElementById('user_div');
        let num = user_div.childElementCount;
       
        let list =[];

        for(let n=0;n<num;n++){
           list.push(user_div.children[n].id)
        }
        list.forEach((el)=>{
            removeUserElement(el)
        });
        userList.forEach(element => {
            addUserElement(element);
        });

    }