var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:'',
        musicCover:'',
        hotComments:[],
        isPlaying:false,
        mvUrl:'',
        isShow:false,
        imgShow:false,
        localUserPic:["../img/user1.jpg","../img/user2.jpg"]
    },
    methods:{
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
                .then(
                    function(response){
                        that.musicList = response.data.result.songs;
                        // console.log(response);
                        // console.log(that.musicList);
                    },
                    function(err){
                        console.log(err);
                    }
                )
        },
        playMusic:function(musicId){
            // console.log(musicId)
            var that = this;
            //获取歌曲url
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then(
                    function(response){
                        // console.log(response);
                        // console.log(response.data.data[0].url);
                        that.musicUrl = response.data.data[0].url;
                    },
                    function(err){
                        console.log(err);
                    }
                )
            //获取歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
                .then(
                    function(response){
                        // console.log(response);
                        // console.log(response.data.songs[0].al.picUrl);
                        that.musicCover = response.data.songs[0].al.picUrl;
                        that.imgShow=true;
                    },
                    function(err){
                        console.log(err);
                    }
                )
            //获取歌曲评论
            //获取歌曲详情
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
                .then(
                    function(response){
                        // console.log(response);
                        console.log(response.data.hotComments);
                        that.hotComments = response.data.hotComments;
                    },
                    function(err){
                        console.log(err);
                    }
                )
        },
        play:function(){
            // console.log("play");
            this.isPlaying=true;
        },
        pause:function(){
            // console.log("pause");
            this.isPlaying=false;
        },
        playMv:function(mvId){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId)
                .then(
                    function(response){
                        // console.log(response);
                        // console.log(response.data.hotComments);
                        that.isShow=true;
                        that.mvUrl = response.data.data.url;
                    },
                    function(err){
                        console.log(err);
                    }
                )
        },
        //隐藏mv
        hide:function(){
            this.isShow=false;
        }
        
    }
})