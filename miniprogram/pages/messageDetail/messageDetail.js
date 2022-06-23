const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    character:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.data.id = e.scene;
    //获取详细信息
    this.getDetail(e.scene);
    //获取角色
    let that = this;
    wx.getStorage({
      key: 'character',
      success(res) {
        console.log(res)
        that.setData({
            character:res.data,
        })
        console.log(that.data.character)
       }
    })
  },
 //获取详细信息
 getDetail(e) {
  let that = this;
  db.collection('message').doc(e).get({
        success: function(res) {
              that.setData({
                    messageInfo: res.data
              })
        }
  })
},
//删除资讯
deleteMessage: function () {
  let that = this
    wx.showModal({
      title: '提示',
      content: '请问是否删除？',     
      success: function (res) {
        if (res.confirm) {
          console.log(that.data.messageInfo._id)//事件的id
          wx.cloud.callFunction({
            name: 'delMessage',
            data: {
              youid: that.data.messageInfo._id,
            },
            success: function (res) {
              console.log(res);
              wx.navigateTo({
                url: "/pages/adminMessage/adminMessage"
              })
            },
            error:function(res){
console.log(res);
            }
          })
        }
      }
    })
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