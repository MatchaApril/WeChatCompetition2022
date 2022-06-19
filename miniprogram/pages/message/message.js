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
    navbar: ['资讯通知', '知识普及'], 
    DataPostArry:[],      //时间数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZSList();
    this.getTZList();
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

  },
  search:function(){

  },
  
//获取通知公告的列表
getTZList:function(){
  let that = this;
  db.collection("message").where({type:0}).orderBy('publish_time', 'desc').limit(20).get({
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
//获取知识普及的列表
getZSList:function(){
  let that = this;
  db.collection("message").where({type:1}).orderBy('publish_time', 'desc').limit(20).get({
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
  wx.navigateTo({
        url: '/pages/messageDetail/messageDetail?scene=' + e.currentTarget.dataset.id,
  })
},
//顶部导航
navbarTap: function (e) {
  this.setData({
    currentTab: e.currentTarget.dataset.idx
  })
  if (e.currentTarget.dataset.idx==0)      //通知公告
  {this.getTZList();}
  else if (e.currentTarget.dataset.idx==1) //知识普及
  {this.getZSList();}
},
})