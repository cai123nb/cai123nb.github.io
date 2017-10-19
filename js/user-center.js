/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-18 16:43:05
 * @version $Id$
 */

	window.onload = function(){
		
		var oHtml = document.getElementsByTagName('html')[0];

			//通过标签名('')
			run();//先执行一次abc函数
			window.onresize =run;
			function run(){
				var w = window.innerWidth//浏览器窗口大小
				var font = w/100;
				font = Math.min(10,font);//取最小值，限定最大值(10以下就OK)
				font = Math.max(6,font);//取最大值,限定最小值
				oHtml.style.fontSize = font + 'px';
			}
	
	}

	//获取用户信息cookie
	var strUserInfo = getCookie("userInfo");
	var userInfo = strUserInfo == "undefined"?null:JSON.parse(strUserInfo);
	//如果没有登录则跳转到登录页
	if(!userInfo){
		window.location.href = "login.html";
	}

	var oMenu = document.getElementById("menu"),
		aMenuLi = oMenu.getElementsByTagName("li"),
		aMenuContent = getElementsByClass("menu-content"),
		currentLiIndex = 1,
		length = 3;
		//初始显示0
		selected(0);
		//如果账号类型为二级，则隐藏待审核
		if(userInfo.type == 2){
			aMenuLi[2].style.display = "none";
			length = 2;
		}
		//添加点击事件
		for(var i=0;i<length;i++){
			aMenuLi[i].index = i;
			aMenuLi[i].style.width = 100/length + "%";
			aMenuLi[i].onclick = function(){
				selected(this.index);
			}
		}
		//选中
		function selected(index){
			if(index != currentLiIndex){
				aMenuLi[index].style.backgroundColor = "#444";
				aMenuLi[currentLiIndex].style.backgroundColor = "#666";
				aMenuContent[index].style.display = "block";
				aMenuContent[currentLiIndex].style.display = "none";
				currentLiIndex = index;
			}
		}

		//获取个人信息元素
	var aInfoLi,
		aInfoInput,
		oModify,
		oBtnSubmit,
		oTip,
		passwordChanged = false;

		

		if(userInfo){
			var html = '';
			html += '<ul>';
			html += '<li><div id="modify">修改</div></li>';
			html += '<li><span>用户名:</span><input type="text" value="'+userInfo.user.name+'"disabled></li>';
			html += '<li><span>密码:</span><input type="password" disabled value="'+userInfo.user.passwd+'"></li>';
			html += '<li style="display:none"><span>确认密码:</span><input type="password" disabled></li>';
			if(userInfo.type == 2){
				html += '<li style="display:none"><span>描述:</span><input type="text" disabled value="'+userInfo.user.descr+'"></li>'
				html += '<li><span>团支部书记:</span><input type="text" disabled value="'+userInfo.user.admin+'"></li>';
				html += '<li><span>团支部副书记:</span><input type="text" disabled value="'+userInfo.user.admin2+'"></li>';
				html += '<li><span>团支部委员:</span><input type="text" disabled value="'+userInfo.user.admin3+'"></li>';
				html += '<li><span>联系方式:</span><input type="text" disabled value="'+userInfo.user.tel+'"></li>';
			}
			html += '<li><span>用户类型:</span><input type="text" disabled value="'+userInfo.user.type+'"></li>';
			html += '<li style="display:none"><button id="btn-submit">提交</button></li>';
			html += '<li><p id="tip"></p></li>';
			html += '</ul>';
			aMenuContent[0].innerHTML = html;
			aInfoLi = aMenuContent[0].getElementsByTagName("li"),
			aInfoInput = aMenuContent[0].getElementsByTagName("input"),
			oModify = document.getElementById("modify");
			oBtnSubmit = document.getElementById("btn-submit");
			oTip = document.getElementById("tip");
			defineEvent();
		}else{
			window.location.href = "login.html";
		}

		//添加事件
		function defineEvent(){
			//修改事件
			oModify.onclick = function(){
				for(var i=0;i<aInfoInput.length-1;i++){
					aInfoInput[i].removeAttribute("disabled");
					aInfoInput[i].style.backgroundColor = "#fff";
					aInfoLi[aInfoLi.length-2].style.display = "block";
				}
			}

			//密码更改事件
			aInfoInput[1].onblur = function(){
				if(trim(this.value) != userInfo.user.passwd){
					aInfoLi[3].style.display = "block";
					passwordChanged = true;
				}else{
					aInfoLi[3].style.display = "none";
					passwordChanged = false;
				}
			}
			if(aInfoInput[7]){
				aInfoInput[7].onkeyup = function(){
					this.value=this.value.replace(/\D/g,'');
				}
			}
			oBtnSubmit.onclick = function(){
				if(check()){

				}
			}
		}
		
		function check(){
			if(trim(aInfoInput[0].value).length < 3 || trim(aInfoInput[0].value).length > 16){
				oTip.innerText = "用户名长度必须在3~16之间";
				return false;
			}
			if(trim(aInfoInput[1].value) < 6 || trim(aInfoInput[1].value) >16){
					oTip.innerText = "密码长度必须在6~16之间";
					return false;
				}
			if(passwordChanged){
				if(trim(aInfoInput[1].value) != trim(aInfoInput[2].value)){
					oTip.innerText = "两次输入的密码不相同";
					return false;
				}
			}
			
			if(userInfo.type == 2){
				if(trim(aInfoInput[7].value).length < 6){
					oTip.innerText = "联系方式有误";
					return false;
				}
			}
			return true;

		}
		//已发表
		var aDelete,
			aActivity;
		function askUploadedSuccess(data){
			aDelete = getElementsByClass("delete",aMenuContent[1]);
			aActivity = getElementsByClass("activity-box",aMenuContent[1]);
		}
		function setUploadedDeleteEvent(){
			for(var i=0; i<aDelete.length;i++){
				aDelete[i].index = i;
				aDelete[i].onclick = function(e){
					e = e || event;
					e.cancelBubble = true;
					console.log(this.index);
				}
			}
		}

