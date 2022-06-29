const db=wx.cloud.database();
const _=db.command
const app = getApp()
Page({
  data: {
    h: app.globalData.h,
    flag: false,
    functions: [{
        icon: "/images/订单.png",
        name: "药品预订",
        url: "/pages/check_user_reserve/check_user_reserve"
      },
      {
        icon: "/images/上传.png",
        name: "发布资讯",
        url: "/pages/messageCreate/messageCreate",
        type:0,
      },
      {
        icon: "/images/安全防护.png",
        name: "安全知识",
        url: "/pages/messageCreate/messageCreate",
        type:1,
      },
      {
        icon: "/images/意见反馈.png",
        name: "处理意见",
        url: "/pages/feedback_handle/feedback_handle"
      },
      {
        icon: "/images/纱布.png",
        name: "----数据管理----医疗物品信息",
        url: "/pages/check_machine_resource/check_machine_resource"
      },
      {
        icon: "/images/清单.png",
        name: "----数据管理----资讯信息",
        url: "/pages/message/message"
      },
      {
        icon: "/images/信息管理.png",
        name: "----数据管理----意见信息",
        url: "/pages/feedback_adm/feedback_adm"
      },
      {
        icon: "/images/个人信息1.png",
        name: "----数据管理----用户信息",
        url: "/pages/userList/userList"
      },
    ]
  },
  //跳转
   tofunction: function (e) {
     console.log(e)
     if(e.currentTarget.dataset.type=='0' || e.currentTarget.dataset.type=='1'){
       wx.setStorage({
         data: e.currentTarget.dataset.type,
         key: 'messageType',
       })
     }
       wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})