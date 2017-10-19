/**
 * 
 * @authors liugang (742230063@qq.com)
 * @date    2017-10-18 08:26:46
 * @version 1.0
 */

 var oActivityTitle = document.getElementById("activity-title"),
 	 oActivityMember = document.getElementById("activity-member"),
 	 oActivityDate = document.getElementById("activity-date"),
 	 oActivityLocation = document.getElementById("activity-location"),
 	 oActivityContent = document.getElementById("activity-aontent"),
 	 obtnUpload = document.getElementById("btn-upload"),
 	 oActivityImg = document.getElementById("activity-img"),
 	 oTip = document.getElementById("tip"),
 	 oImgBox = document.getElementById("img-box");


 	 obtnUpload.onclick = function(){
 	 	if(check()){
 	 		var data = new FormData();
 	 		data.append("userName","lg");
 	 		data.append("userType","1");
 	 		data.append("id",0);
 	 		data.append("location",trim(oActivityLocation.value));
 	 		data.append("member",trim(oActivityMember.value));
 	 		data.append("time",trim(oActivityDate.value));
 	 		data.append("userId",0);
 	 		data.append("files",oActivityImg.files
 	 		data.append("title",trim(oActivityTitle.value));

 	 		ajax(){
	 			type : "post",
	 			url : "http://120.77.219.167:9191/activitys/uploadActivity",
	 			data : data,
	 			error : uploadFail
	 		);
 	 	}
 	 }

 	 oActivityImg.onchange = function(){
 	 	var html = "";
 	 	var windowURL = window.URL || window.webkitURL;
		if(oActivityImg.files){
			for(var i=0;i<oActivityImg.files.length;i++){
				html += '<div class="img-preview-box">';
				html += '<img src="'+ windowURL.createObjectURL(oActivityImg.files[i])+'" width="160" height="90"/>'
				html += '</div>';
			}
		}else{
			html += '<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + oMessageImg.value + '\');"></div>';
		}
		oImgBox.innerHTML = html;
 	 }

 	 function uploadFail(){
 	 	oTip.innerText = "发表失败";
 	 }
 	 function check(){
 	 	if(trim(oActivityTitle.value).length < 6 || trim(oActivityTitle.value).length > 36){
 	 		oTip.innerText = "标题字数必须在6~36字之间";
 	 		return false;
 	 	}
 	 	if(trim(oActivityMember.value).length < 2){
 	 		oTip.innerText = "请输入参与活动的人员";
 	 		return false;
 	 	}
 	 	if(trim(oActivityDate.value).length < 0){
			oTip.innerText = "请输入活动时间";
 	 		return false;
 	 	}
 	 	if(trim(oActivityLocation.value).length < 2){
 	 		oTip.innerText = "请输入活动地点";
 	 		return false;
 	 	}
 	 	if(trim(oActivityContent.value).length < 20){
 	 		oTip.innerText = "内容不能少于20字";
 	 		return false;
 	 	}
 	 	if(oActivityImg.files.length == 0){
 	 		oTip.innerText = "至少添加1张图片";
 	 		return false;
 	 	}
 	 	if(oActivityImg.files.length > 9){
 	 		oTip.innerText = "最多添加9张图片";
 	 		return false;
 	 	}
 	 	return true;
 	 }

 	 window.onload = function(){
		
		var html = document.getElementsByTagName('html')[0];

			//通过标签名('')
			run();//先执行一次abc函数
			window.onresize =run;
			function run(){
				var w = window.innerWidth//浏览器窗口大小
				var font = w/100;
				font = Math.min(10,font);//取最小值，限定最大值(10以下就OK)
				font = Math.max(6,font);//取最大值,限定最小值
				html.style.fontSize = font + 'px';
				console.log(11111)
			}
	
	}

