// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselImgUrls:[
      "/images/校园4.jpeg",
      "/images/校园3.jpeg",
      "/images/校园2.jpeg",
      "/images/校园1.jpeg"
    ],
    //功能模块 
    functions: [{
      name: '医疗物品预订',
      numbers: '',
      iconpath: '/images/查看病例.png',
      classifier: "Reserve",
      color: "orange",
      url:  "/pages/reserve/reserve",
    },
    {
      name: '资讯/安全知识',
      numbers: "",
      color: "cyan",
      iconpath: '/images/资讯1.png',
      classifier: "Message",
      url: "/pages/message/message",
    },
    {
      name: '反映意见',
      numbers: '',
      color: "red",
      iconpath: '/images/公司公告.png',
      classifier: "Comment",
      url: "/pages/message/message",
    },
    {
      name: '个人信息',
      numbers: '',
      color: "purple",
      iconpath: '/images/账号管理.png',
      classifier: "Personal",
      url: "/pages/personalInformation/personalInformation",
    }
  ],
  },
  // 跳转页面
  tofunction: function (e) {
    console.log(e)
    wx.navigateTo({
     url: e.currentTarget.dataset.url,
   })
 },
  go(e) {
    wx.navigateTo({
          url: e.currentTarget.dataset.go
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
