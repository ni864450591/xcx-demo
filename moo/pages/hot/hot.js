Page({
    // 一共四张榜 实战周排行榜 实战月排行榜 路径周排行榜 路径月排行榜
    listData:{},



    // 数据
    data:{
        // 实战排行 and 路径排行
       rankType:undefined,
       rankTypes:[{
           title:"实战排行",
           type:"project",
       },{
        title:"路径排行",
        type:"path",
    }],

    //周排行 and 月排行
    rankPeriod:undefined,
    rankPeriods:[{
        title:"周",
        value:"week"
    },{
        title:"月",
        value:"month"
    }],

    //数据列表
    currentList:[],

    },
    onLoad(){
        const URL='https://www.fastmock.site/mock/de09148d5875f74899ff6445295ba976/weixin/api/getRecommond';
        wx.request({
          url: URL,
          success:(res)=>{
          const {data:{data}}=res;
          this.listData=data;
          //从缓存中取出，再设置，再改变
          const rankPeriod=wx.getStorageSync('rankPeriod')||'week';
          const rankType=wx.getStorageSync('rankType')||'project';
            this.setData({rankType,rankPeriod});
            this.changeCurrentList(rankType,rankPeriod);
          }
        })
    },
    changeCurrentList(rankType,rankPeriod){
        let currentList=[];
    if(rankType==="project"&&rankPeriod==="week"){
        currentList=this.listData.projectWeek;
    }else if(rankType==="project"&&rankPeriod==="month"){
        currentList=this.listData.projectMonth;
    }else if(rankType==="path"&&rankPeriod==="month"){
        currentList=this.listData.pathMonth;
    }else{
        currentList=this.listData.pathWeek;
    }
    this.setData({currentList});
    },



    handleTabchange(e){
        
        const rankType=e.currentTarget.dataset.type;
       
        const {rankPeriod}=this.data;
        this.setData({rankType});
        //置于缓存
        wx.setStorage({
            data: rankType,
            key: 'rankType',
          });
          //切换页面，传入不同数据即可
        this.changeCurrentList(rankType,rankPeriod);
    },
    handlePeriodchange(e){
        const rankPeriod=e.currentTarget.dataset.type;
        const {rankType}=this.data;
        this.setData({rankPeriod});
        wx.setStorage({
          data: rankPeriod,
          key: 'rankPeriod',
        })
        this.changeCurrentList(rankType,rankPeriod);
    }
})