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
    // 更新发放机的所有数量是否有小于阈值的
    // 毅淳，这里你不要update，学生端不能更改数据库的
    db.collection("machine_resource").where({
      machine_id:options.id,
      // 这里我为了代码方便，阈值全部调整为5了
      number: _.lt(5)
    })
    .update({
      data:{
        deficiency: 1
      },success:res=>{
        console.log("能走到这一步吗？34行")
        db.collection("machine_resource").where({
          machine_id:options.id
        }).get({
          success:res=>{
            console.log("内部刷新的",res.data)
            that.setData({
              product:res.data
            })
          },fail:res=>{
            console.log("获取发放机资源错误。")
          }
        })
      },fail:res=>{
        console.log("当前点击拒绝申请失败咯")
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