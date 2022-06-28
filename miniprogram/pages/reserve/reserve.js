const util=require('../../utils/utils.js')
const db=wx.cloud.database()
const app=getApp()


Page({
    
    data:{
      _openid:"",
      user:""
    },

    //提交表单添加进数据库
    buttonaddData(res){
        var {name,reserve_name,reason}=res.detail.value;
        var DATE=util.formatTime(new Date());
        let that=this;
        console.log(DATE)
        console.log(typeof DATE)
        db.collection("user_reserve").add({
            data:{
                machine_id:-1,
                _openid:that.data._openid,
                student_number:that.data.user.student_number,
                name:name,
                reserve_name:reserve_name,
                reason:reason,
                time_apply:DATE,
                is_approve:0,
                status:0,
                tittle:reserve_name,
            }
        }).then(res=>{
            wx.showToast({
              title: '申请成功',
            })
            console.log(res)
        })

    },

    getUserInformation: function (){
      let that = this;
      that.data.openid
      db.collection('user').where({
            _openid: this.data.openid
     }).get({
       success: (res) => {
         console.log(res.data[0])
         this.setData({
            userInformation:res.data[0],
            user:res.data[0]
           })
       }
     })
  },

    onLoad:function(options){
      this.setData({
        userinfo: app.userinfo
  })
  let that=this;
  console.log(app.userinfo)
  wx.getStorage({
    key: 'openid',
    success(res) {
        that.setData({
            openid:res.data,
        },()=>{
              that.getUserInformation();
        })
        console.log(that.data.openid)
       }
  })
  that.setData({
      _openid:that.data.openid,

  },()=>{
    console.log("这就是openid",that.data._openid)
  }
  )

    },
    onShow:function(){

    },
    onHide:function(){

    },
    onUnload:function(){
        
    }
})