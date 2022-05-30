// pages/check_user_reserve/check_user_reserve.js
const util = require('../../utils/utils.js')
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 未审批的申请列表
    user_reserve_approving:[],
    // 已审批的接受列表
    // 考虑到已审批的列表中有同意和拒绝的
    user_reserve_approved:[],
    // 接受是要看未审批还是已审批
    state_approving:'未审批',
    nums_approving:0,
    nums_approved:0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var DATE = util.formatTime(new Date());
    console.log(DATE)
    console.log(typeof DATE)


    let that = this
    // 未审批的
    db.collection("user_reserve").where({
      is_approve:0
    }).get({
      success:res=>{
        console.log("未审批的user_reserve_approving",res.data)
        that.setData({
          user_reserve_approving:res.data,
          nums_approving:res.data.length,
        })
      },fail:res=>{
        console.log("获取用户审批中失败")
      }
    })
    // 审批完成的
    // 但是审批完成还包括两种：一种是学生没来取的，一种是学生已经取了。
    db.collection("user_reserve").where({
      is_approve:1
    }).get({
      success:res=>{
        console.log("已审批的user_reserve_approved",res.data)
        that.setData({
          user_reserve_approved:res.data,
          nums_approved:res.data.length,
        })
      },fail:res=>{
        console.log("获取用户申请过失败")
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
  xuanze1:function(e){
    let that = this
      console.log(e.currentTarget.dataset.state)
      // 接收 看 未审批
      that.setData({
        state_approving:e.currentTarget.dataset.state
    })
    },

  xuanze2:function(e){
    let that = this
    console.log(e.currentTarget.dataset.state)
    // 接收 看 已审批
    that.setData({
      state_approving:e.currentTarget.dataset.state
  })
  },
  jujue:function(e){
    let that = this
    console.log(e.target.dataset.id)
    db.collection("user_reserve").doc(e.target.dataset.id).update({
      data:{
        is_approve: 1
      },success:function(res){
        that.onLoad()
      },fail:res=>{
        console.log("当前点击拒绝申请失败咯")
      }
    })
  },
  tongyi:function(e){
    
    let that = this
    console.log(e.target.dataset.id)
    db.collection("user_reserve").doc(e.target.dataset.id).update({
      data:{
        is_approve: 1,
        status:1
      },success:function(res){
        that.onLoad()
      },fail:res=>{
        console.log("当前点击拒绝申请失败咯")
      }
    })

  }
})