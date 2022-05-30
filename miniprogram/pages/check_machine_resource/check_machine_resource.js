// pages/check_machine_resource/check_machine_resource.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 访问物资数据库，用一个列表分别保存所有物资数量，另一个列表保存所有阈值
    // [[xxx],[x]]
    // [[xxx],[x]]
    product_num:[],
    product_threshold:[],
    product_boolen:[],
    product_image:[],
    product_location:[],
    deficiency:[],
    number:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection("infirmary_resource").get({
      success:res=>{
        console.log("res.data[0]",res.data[0])
        that.setData({
          product_image:res.data[0].image,
          product_location:res.data[0].location,
          // res.data[0].number就是有几个发放机
          number:res.data[0].number
        })
        // 0-num 发放机的物资数量等放入product_num:
        db.collection("machine_resource").get({
          success:res=>{
            console.log(res.data)
            // for (var i = 0; i < res.data[0].number; i++) {
            //   console.log("iiii", i)
              
            // }
          }
        })

      },fail:res=>{
        console.log("获取发放机资源失败")
      }
    })

    for (var i = 0; i < that.data.number; i++) {
      console.log("iiii", i)
    }
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

  }
})