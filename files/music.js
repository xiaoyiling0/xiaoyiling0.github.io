const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: false,                //是否附着页面底部，否为false
        autoplay: true,             //是否自动播放，否为false,移动端不能生效
        volume: 0.6,                //初始音量（0~1）
        lrcType: 3,                 //歌词模式（1、HTML模式 2、js模式 3、lrc文件模式）
        mutex: true,                //互斥模式：阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
        order: 'random',            //音频循环顺序（'list'：顺序, 'random'：随机）
        preload: 'none',            //预加载（'none'：不预加载, 'metadata'：元数据, 'auto'：自动）
        listFolded: true,          //列表默认折叠，开启为true
	listMaxHeight: 90,
        theme: '#ee8243',           //主题颜色
        audio: [{
            name: 'The TIDES',           //歌曲名称
            artist: '饭卡&白鲨JAWS',       //歌曲作者
            url: './music/饭卡&白鲨JAWS-The TIDES.mp3',         //歌曲源文件地址
            cover: 'cover.jpg',     //歌曲封面地址
            lrc:  './music/Irc/饭卡&白鲨JAWS-The TIDES.lrc',        //歌曲的歌词文件
            theme: '#eeeeee'        //主题颜色（优先）
        },{
            name: 'VORTEX',           //歌曲名称
            artist: '白鲨JAWS',       //歌曲作者
            url: './music/白鲨JAWS-VORTEX.mp3',         //歌曲源文件地址
            cover: 'cover.jpg',     //歌曲封面地址
            lrc:  './music/Irc/白鲨JAWS-VORTEX.lrc',        //歌曲的歌词文件
            theme: '#eeeeee'        //主题颜色（优先）
        },{
            name: 'Dive Back In Time',           //歌曲名称
            artist: '白鲨JAWS',       //歌曲作者
            url: './music/白鲨JAWS-Dive Back In Time.mp3',         //歌曲源文件地址
            cover: 'cover.jpg',     //歌曲封面地址
            lrc:  './music/Irc/白鲨JAWS-Dive Back In Time.Irc',        //歌曲的歌词文件
            theme: '#eeeeee'        //主题颜色（优先）
        },{
            name: 'OverThink',           //歌曲名称
            artist: '饭卡',       //歌曲作者
            url: './music/饭卡-OverThink.mp3',         //歌曲源文件地址
            cover: 'cover.jpg',     //歌曲封面地址
            lrc:  './music/Irc/饭卡-OverThink.Irc',        //歌曲的歌词文件
            theme: '#eeeeee'        //主题颜色（优先）
        }]
    });