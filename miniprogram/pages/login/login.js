const app = getApp()
const db=wx.cloud.database();
const _=db.command

Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2022,

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    openid:''    //用户的openid
  },
  getUserProfile() {
    //用户登录
    wx.setStorage({
      data: 0,
      key: 'character',
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log(this.data.userInfo)
        //获取openid
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            app.globalData.openid = res.result.openid
            this.setData({
             openid:res.result.openid
            })
            //异步存储openid
            wx.setStorage({
              key: 'openid',
              data: this.data.openid,
              })
            //判断该openid在不在数据库中
            db.collection('user').where({
                   _openid: this.data.openid
            }).get({
              success: (res) => {
                if (res.data.length == 0){
                  console.log('没有符合的用户')
                  // 存入数据库
                  db.collection('user').add({
                    data:{
                      openid:this.data.openid,
                      nickName:this.data.userInfo.nickName,
                      gender:this.data.userInfo.gender,
                      language:this.data.userInfo.language,
                      avatarUrl:this.data.userInfo.avatarUrl
                    }
                  }).then(res=>{
                    console.log(res)
                  })
                  //跳转到填写个人信息的页面（输入：学校，学院，电话，名字）
                  wx.navigateTo({
                    url: '../completeInformation/completeInformation',
                  })
                }else{
                  console.log('查找到对应的用户',res.data)
                  //判断有无完善过个人信息
                  if(res.data[0].is_complete==1){
                    console.log('1111')
                    //跳转
                    wx.switchTab({
                     url: '../home/home',
                    })
                  }
                  else{
                    wx.navigateTo({
                      url: '../completeInformation/completeInformation',
                    })
                  }
                  
                }
              }
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      
 
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo));
        wx.setStorageSync('openid', JSON.stringify(this.openid));
        //wx.getStorageSync('userInfo');
        
        
      },
      //用户拒绝授权
      fail: (res) =>{

      }
      
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  //校医院登录
  adminLogin:function(){
    //角色：校医院
    wx.setStorage({
      data: 1,
      key: 'character',
    })
    //跳转
    wx.redirectTo({
      url: '../adminLogin/adminLogin',
    })
  },
 
  onLoad: function() {
    var that = this;
    that.setData({
      year: new Date().getFullYear()
    });

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },

  
  onShow: function () {

  },

  
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({
      modalHidden:!this.data.modalHidden
    })
    
  },
  //确定按钮点击事件
  modalBindaconfirm:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  },
  //取消按钮点击事件
  modalBindcancel:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
}
})