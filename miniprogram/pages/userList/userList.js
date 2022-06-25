const app = getApp()
const db=wx.cloud.database();
const _=db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    nomore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList();
  },

  
//获取用户列表
getUserList:function(){
  let that = this;
  db.collection("user").limit(20).get({
        success: function(res) {
              wx.stopPullDownRefresh(); //暂停刷新动作
              console.log(res)
              if (res.data.length == 0) {
                    that.setData({
                          nomore: true,
                          list: [],
                    })
                    return false;
              }
              if (res.data.length < 20) {
                    that.setData({
                          nomore: true,
                          page: 0,
                          list: res.data,
                    })
              } else {
                    that.setData({
                          page: 0,
                          list: res.data,
                          nomore: false,
                    })
              }
        }
  })
},
//跳转详情
detail(e) {
  let that = this;
  console.log(e)
  wx.setStorage({
    key: 'openid',
    data: e.currentTarget.dataset.id,
    })
  wx.navigateTo({
        url: '/pages/userListDetail/userListDetail',
  })
},
})