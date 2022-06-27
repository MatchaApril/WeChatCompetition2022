const app = getApp()
const db=wx.cloud.database();
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    newlist: [],
    list: [],
    key: '',
    blank: false,
    hislist: [],
    nomore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
//搜索结果
search(n) {
  let that = this;
  let key = that.data.key;
  if (key == '') {
        wx.showToast({
              title: '请输入关键词',
              icon: 'none',
        })
        return false;
  }
  //修改标题
  wx.setNavigationBarTitle({
        title:'"'+ that.data.key + '"的搜索结果',
  })
  wx.showLoading({
        title: '加载中',
  })
  db.collection('message').where(
        _.or([{
              //对标题和内容进行多字段搜索
            content: db.RegExp({
               regexp: '.*' + key+'.*', //key为用户输入的内容
               options: 'i',
             })
           },
           {  
             title: db.RegExp({
               regexp: '.*' + key+'.*',
               options: 'i',
             })
           }
         ])
      //   content: db.RegExp({
      //         regexp: '.*' + key + '.*',
      //         options: 'i',
      //   })
  ).orderBy('publish_time', 'desc').limit(20).get({
        success(e) {
              console.log(e)
              wx.hideLoading();
              that.setData({
                    list: e.data,
                    blank: true,
              })
              console.log( "搜索到的数据：",this.data.list)
        }
  })
},
//输入搜索关键词
keyInput(e) {
  this.data.key = e.detail.value
  console.log("输入的搜索内容：", this.data.key)
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