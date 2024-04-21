//对话框显示信息列表
const messageList = [
  'デメリットについても話してみてはどうか？'
]
//对话框当前显示信息的index
let messageIndex = 0
let timer
function init(){
    var resourcesPaths = `${resourcesPath}`;
    var backImageNames = `${backImageName}`;
    var modelDirString = `${modelDir}`;
    var modelDirs = modelDirString.split(',');

    initDefine(resourcesPaths, backImageNames, modelDirs);
}

// 监听复制
(function() {
    document.addEventListener('copy',(e)=>{
      e.preventDefault();
      e.stopPropagation();
      showMessage('你都复制了些什么呀,能让我看看吗？', 5000, true)
    })
  }());


function showMessage(text, timeout, flag){
  console.log('timer:'+timer)
  if (!timer) {
    timer = setInterval(() => {
      showMessage(messageList[messageIndex], 5000, true)
      //如果messageIndex不超过数组长度-1就递增messageIndex，否则重置为0
      if (messageIndex < messageList.length - 1) {
        messageIndex++
      } else {
        messageIndex = 0
      }
    }, 30000);
  }
    if(flag || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
        //console.log(text);
        if(flag) sessionStorage.setItem('waifu-text', text);
        $('.live2d-tips').stop();
        $('.live2d-tips').html(text).fadeTo(200, 1);
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout){
    $('.live2d-tips').stop().css('opacity',1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function() {sessionStorage.removeItem('waifu-text')}, timeout);
    $('.live2d-tips').delay(timeout).fadeTo(200, 0);
}

// 工具栏的点击事件
$('.tool .fui-home').click(function (){
});

$('.tool .fui-eye').click(function (){
});

$('.tool .fui-chat').click(function (){
});

$('.tool .fui-user').click(function (){
});

$('.tool .fui-info-circle').click(function (){
});

$('.tool .fui-cross').click(function (){
});

$('.tool .fui-photo').click(function (){
});