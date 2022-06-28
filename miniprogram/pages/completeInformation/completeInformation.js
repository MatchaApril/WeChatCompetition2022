const app = getApp()
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    name: '',
    tel: '',
    openid: '',
  },
  submit (e) {
    console.log(e.detail.value);
    //表单数据
    var objData = e.detail.value;
    if (objData.name && objData.tel && objData.num && objData.school && objData.tel.length==11) {
      //获取openid
      this.setData({
        openid: wx.getStorageSync('openid')
      })
      console.log(this.data.openid)
      //存储到数据库
      db.collection("user").where({
        _openid: this.data.openid
      }).update({
        data: {
          name: objData.name,
          tel: objData.tel,
          is_complete:1,
          school:objData.school,
          num:objData.num
        }
      })
      //跳转
      wx.switchTab({
        url: '../home/home',
      })
    }
    //电话号码不是11位
    else if(objData.name && objData.tel && objData.num && objData.school && objData.tel.length!=11) {
      wx.showToast({
        title: '请输入11位电话号',
        duration:2000,
        mask:true,
        icon:'error',    
     })
    }
    //信息没填全
    else{
      wx.showToast({
        title: '请检查输入信息',
        duration:2000,
        mask:true,
        icon:'error',    
     })
    }

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
