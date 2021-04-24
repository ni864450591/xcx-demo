// pages/ckd/ckd.js
Page({


    data: {
        result:"undefined",
        flag:false
    },
    handleInputChange(e){
        //获得输入的数据
        const result=e.detail.value;
        if(result)
            {
                this.setData({
                result,
                flag:true
        }) ; }
        else{
            this.setData({
                result:'',
                flag:false
        });    
        }
    },

})