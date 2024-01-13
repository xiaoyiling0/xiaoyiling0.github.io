var video = document.getElementsByTagName('video');
var buttons = document.getElementsByTagName('button');
var namearray =new Array()
var ne = document.getElementById('newelement');
var n 

buttons[0].onclick = function(){		//进入流星视频
	n = 1;
	for(i=0;i<n;i++){
		pullname(i);
	};
	video[0].src = "./video/3star-single.mp4";
	video[0].style.zIndex = 2;
	video[0].loop = false;
	video[0].muted = false;
	var skip = ne.appendChild(document.createElement('button'))		//跳过进入result
	skip.appendChild(document.createTextNode('跳过▶'))
	skip.setAttribute('class','skipbutton')
	skip.onclick = function(){
		ne.removeChild(skip);
		result(n);
	};
};

video[0].addEventListener('ended',function(){		//视频播放完毕进入result
	if(video[0].style.zIndex == 2){	
		result()
	
	}
});	


var result = function(){
	var nb = ne.appendChild(document.createElement('img'))		//result背景图片
	nb.setAttribute('src','./image/splash-background-49b61db1.webp');
	nb.setAttribute('class','nb');
	video[0].src = "./video/bg.webm";		//背景视频恢复
	video[0].style.zIndex = -1;
	video[0].loop = true;
	video[0].muted = true;
	var nn=ne.appendChild(document.createElement('span'));		//名字、背景、叉号按钮出现
	nn.appendChild(document.createTextNode(namearray[0]));
	nn.setAttribute('class','mainname')
	buttons[2].style.display='inline';
}

buttons[2].onclick =function(){
	ne.innerHTML = "";
	buttons[2].style.display='none';
}