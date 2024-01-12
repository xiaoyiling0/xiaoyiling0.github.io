var video = document.getElementsByTagName('video');
var buttons = document.getElementsByTagName('button');
//var n =
buttons[0].onclick = function(){		//进入流星视频
	video[0].src = "./video/3star-single.mp4";
	video[0].style.zIndex = 2;
	video[0].loop = false;
	video[0].muted = false;
};

video[0].addEventListener('ended',function(){
	if(video[0].style.zIndex = 2){
		restore();
		document.write('<img src="./image/splash-background-49b61db1.webp" width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;z-index:2>');
	}
});

var restore =function(){
	video[0].src = "./video/bg.webm";
	video[0].style.zIndex = -1;
	video[0].loop = true;
	video[0].muted = true;
}





//buttons[1].onclick = function(){
//	liuxing(n)
//};



		