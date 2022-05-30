// pages/machine_resource/machine_resouce.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    num:0

  },  

  /**
   * 生命周期函数--监听页面加载
   */
  // item_体温计:[],
    // item_口罩:[],
    // location:"",
  onLoad(options) {
    let that = this
    console.log("发放机页面传进来的数值为：", options.id)
    db.collection("machine_resource").where({
      machine_id:options.id
    }).get({
      success:res=>{
        console.log(res.data)
        that.setData({
          product:res.data
        })
      },fail:res=>{
        console.log("获取发放机资源错误。")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
})