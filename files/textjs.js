var buttons = document.getElementsByTagName('button');
var namearray =new Array();
var namecolour =new Array();
var ne = document.getElementById('newelement');
var count = 0;
var srca ='';
var nb=''
var nn=''
var n=0
buttons[0].onclick = function(){		//进入流星视频
	n = 1;
	count += n ;
	var pullnum = pullname(0);
	if(pullnum>0&&pullnum<=6){		//确定播放视频的src
		srca = './video/5star-single.mp4';
	}else if(pullnum>6&&pullnum<=57){
		srca = './video/4star-single.mp4';
	}else{
		srca = './video/3star-single.mp4';
	}
	var ve = ne.appendChild(document.createElement('video'));
	ve.setAttribute('src',srca);
	ve.setAttribute('id','ve');
	ve.setAttribute('autoplay','autoplay');
	ve.setAttribute('onended',"result()")
	buttons[2].style.display = "inline";
};

buttons[1].onclick = function(){
	n = 10;
	count += n ;
	for(var i=0;i<n;i++){
		var pullnum = pullname(i);
		if(pullnum>0&&pullnum<=6){		//确定播放视频的src
			srca = './video/5star-multi.mp4';
		}else if(srca!='./video/5star-multi.mp4'){
			srca = './video/4star-multi.mp4';
		}
	}
	var ve = ne.appendChild(document.createElement('video'));
	ve.setAttribute('src',srca);
	ve.setAttribute('id','ve');
	ve.setAttribute('autoplay','autoplay');
	ve.setAttribute('onended',"result()")
	buttons[2].style.display = "inline";
};

var pullname = function(i){
	pullnum = Math.floor(Math.random()*1000+1)
	if(pullnum>0&&pullnum<=6){
		namearray[i]=pull5star();
		namecolour[i] ='#FFFF00';
	}else if(pullnum>6&&pullnum<=57){
		namearray[i]=pull4star();
		namecolour[i] ='#8A2BE2';
	}else{
		namearray[i]=pull3star();
		namecolour[i] ='#00BFFF';
	}
	return pullnum;
}

var result = function(){
	buttons[2].style.display = 'none';
	ve.remove();
	i=1
	nb = ne.appendChild(document.createElement('img'))		//result背景图片
	nb.setAttribute('src','./image/splash-background-49b61db1.webp');
	nb.setAttribute('id','nb');
	nb.setAttribute('onclick','x123()')
	nn=ne.appendChild(document.createElement('span'));		//名字、背景、叉号按钮出现	
	nn.appendChild(document.createTextNode(namearray[0]));
	nn.setAttribute('id','mainname')
	nn.style.color = namecolour;
	nn.setAttribute('onclick','x123()')
	
}

var restore =function(){
	ne.innerHTML = "";
	document.getElementById('close').style.display='none';
};


var x123=function(){
	if(i<n){
		nn.innerText = namearray[i];
		nn.style.color = namecolour[i];
		i++;
	}else{
		document.getElementById('close').style.display='inline'
	}
}
	