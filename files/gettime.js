function addZero(i) {
              return i < 10 ? "0" + i: i + "";
}

function countDown() {
	var nowtime = new Date();
 	var year = nowtime.getFullYear();//年
	var month = nowtime.getMonth() + 1;//月
	var day = nowtime.getDate();//日
	var hour = nowtime.getHours();//时
	var minite = nowtime.getMinutes();//分
	var second = nowtime.getSeconds();//秒
	var week = nowtime.getDay();//星期

	var weekday;
	if (week == 0) {  
		weekday = "星期日";  
	} else if (week == 1) {  
		weekday = "星期一";  
	} else if (week == 2) {  
        	weekday = "星期二";  
	}else if (week == 3) {  
        	weekday = "星期三";  
	} else if (week == 4) {  
      	  	weekday = "星期四";  
	} else if (week == 5) {  
       		weekday= "星期五";  
	} else if (week == 6) {  
	        weekday = "星期六";  
	}  

	month = addZero(month);
	day = addZero(day);
	hour = addZero(hour);
	minite = addZero(minite);
	second = addZero(second);

	document.getElementById("year").innerHTML =year;
	document.getElementById("month").innerHTML =month;
	document.getElementById("day").innerHTML =day;
	document.getElementById("hour").innerHTML =hour;
	document.getElementById("minite").innerHTML =minite;
	document.getElementById("second").innerHTML =second;
	document.getElementById("week").innerHTML =weekday;
	
	return
}

var tin=setTimeout("countDown()", 0);
clearTimeout(tin);
setInterval(function(){countDown()},1000);    
