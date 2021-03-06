/**
 * 
 * @authors liugang (742230063@qq.com)
 * @date    2017-10-18 09:41:04
 * @version 1.0
 */

 var oUsernameInput = document.getElementById("username"),
	 oPasswordInput = document.getElementById("password"),
	 oBtnLogin = document.getElementById("btn-login"),
	 oTip = document.getElementById("tip");

	 oBtnLogin.onclick = function(){
	 	if(check()){
	 		oTip.innerText = "";
	 		ajax({
	 			url : "http://120.77.219.167:9191/users/login/",
	 			data : {
	 				name : trim(oUsernameInput.value),
	 				passwd : trim(oPasswordInput.value)
	 			},
	 			success : login,
	 			error : loginFail
	 		});
	 	}
	 } 

	 function loginFail(json){
	 	oTip.innerText = "访问服务器失败";
	 }

	 function login(data){
	 	if(data.user || data.superUser){
		 	if(data.type == 1){
		 		data.user = data.superUser;
		 		delete data.superUser;
		 	}else{
		 		delete data.superUser;
		 	}
		 	setCookie("userInfo",JSON.stringify(data),12*3600*1000);
		 	window.location.href = "index.html";
		 }else{
		 	oTip.innerText = "用户名或密码错误";
		 }
	 }


	 function check(){
		var username = trim(oUsernameInput.value);
		var password = trim(oPasswordInput.value);
		if(username.length == 0){
			oTip.innerText = "账号不能为空";
			return false;
		}
		if(username.length < 3 || username.length > 16 ){
			oTip.innerText = "账号长度在3~16之间";
			return false;
		}
		if(password.length == 0){
			oTip.innerText = "密码不能为空";
			return false;
		}
		if(password.length <6 || password.length > 16 ){
			oTip.innerText = "密码长度在6~16之间";
			return false;
		}
		return true;
	 }

	