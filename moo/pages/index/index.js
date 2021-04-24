// index.js


Page({
    data:{

        showicon:true,
        //轮播图的数据
        swiperList:[],
        //课程页的数据
        courses:[],
        //初始化搜索的内容，置空
        searchList:null,
        //先显示推荐页
        type:'recommend',
        tabs:[],
        activity:[]
    },
    // 加载完请求数据，接口地址，
    //成功则返回应答，从应答中取出数据，设置数据
    onLoad(){
        const URL='https://www.fastmock.site/mock/de09148d5875f74899ff6445295ba976/weixin/api/getData';
        wx.request({
            url:URL,
            success:(res)=>{
               const {data:{data}}=res;
               //data=res.data.data
               const{swiperList ,courses,activity,tabs }=data;
                this.setData({
                    swiperList,courses,activity,tabs
                })
              
            }
        })
    },
    //navgitaor的点击事件，传入一个事件参数
    changeType(e){
       
       const type=e.currentTarget.dataset.type;
       if(this.type==type)rertun;
       this.setData({type});
       
    },

    //搜索框的输入事件
    handleInputChange(e){
        //获得输入的数据
        const value=e.detail.value;

        let searchList=null;
        
        if(value){
            searchList=this.data.courses.filter(item=>item.title.indexOf(value)>-1);
        }
        // 有输入，搜索图标不显示，且设置搜索框输入的内容
            this.setData({
            showicon:value?false:true,
            searchList,
        });  
        
    },
})