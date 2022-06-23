const util=require('../../utils/utils.js')
const db=wx.cloud.database()


Page({
    
    data:{
 
    },

    //提交表单添加进数据库
    buttonaddData(res){
        var {reserve_name,reason}=res.detail.value;
        var DATE=util.formatTime(new Date());
        console.log(DATE)
        console.log(typeof DATE)
        db.collection("user_reserve").add({
            data:{
                reserve_name:reserve_name,
                reason:reason,
                time_apply:DATE,
                is_approve:0,
                status:0,
                tittle:reserve_name
            }
        }).then(res=>{
            wx.showToast({
              title: '申请成功',
            })
            console.log(res)
        })

    },

    onLoad:function(options){

    },
    onShow:function(){

    },
    onHide:function(){

    },
    onUnload:function(){
        
    }
})