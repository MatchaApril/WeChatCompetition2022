const app = getApp()
const db=wx.cloud.database();
const _=db.command

Page({
      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            // poster: JSON.parse(config.data).share_poster,
      },
      onShow() {
            let that = this;
            this.setData({
                  userinfo: app.userinfo
            })
            wx.getStorage({
              key: 'openid',
              success(res) {
                  that.setData({
                      openid:res.data,
                  })
                  console.log(that.data.openid)
                 }
            })
            console.log(that.data.openid)
            this.getUserInformation();
            
      },
      //获取用户信息
      getUserInformation: function (){
            db.collection('user').where({
                  _openid: this.data.openid
           }).get({
             success: (res) => {
               console.log(res.data[0])
               this.setData({
                  userInformation:res.data[0]
                 })
             }
           })

      },
})