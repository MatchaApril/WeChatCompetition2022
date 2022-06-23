const app = getApp()
const db=wx.cloud.database();
const _=db.command
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    number: 1,
    PostType:'',
    PostTypeNum:0,
    telValue1: "",
    telValue2: "",
    UserInfo:''
  },
  getInput1: function (e) {      //获取输入的标题，
    this.setData({
      telValue1: e.detail.value    //detail代表当前元素，value获取值，把data里的telValue的值就改变了，可以在wxml里通过{{}}引用
    })
  },
  getInput2: function (e) {      //获取输入的内容，
    this.setData({
      telValue2: e.detail.value    //detail代表当前元素，value获取值，把data里的telValue的值就改变了，可以在wxml里通过{{}}引用
    })
  },
  clickimage: function (e) {
    var index = e.target.dataset.index
    wx.previewImage({
      urls: [this.data.Filepath[index]], // 需要预览的图片http链接列表
    })
  },
  addImage: function (e) {     //添加图片
    var that = this
    wx.chooseImage({   //cloudpath无
      count: 6,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)
        that.setData({
          Filepath: res.tempFilePaths,
          number: res.tempFilePaths.length + 1
        })
      }
    })
  },
  deleteImage: function (e) {
    var that = this
    var index = e.target.dataset.index
    console.log("+++++++++", index)
    var tempFilePaths = that.data.Filepath
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          Filepath: tempFilePaths,
          number: that.data.number - 1
        });
        console.log(that.data.Filepath);
      }
    })
  },




  
  //上传
  upload: function () {
    var that = this
    if (that.data.telValue1.length > 2 && that.data.telValue2.length > 2) {
      wx.showLoading({
        title: '上传中...',
      })
      if (that.data.number > 1)
      {
        console.log('正在上传图片',that.data)
        Promise.all(that.data.Filepath.map((value) => {
          console.log('异步处理',value)
        return wx.cloud.uploadFile({
          cloudPath: Date.now() + parseInt(Math.random() * 100) + value.match(/\.[^.]+?$/)[0],  // 上传至云端的路径
          filePath: value,    // 小程序临时文件路径
        })
      })).then(res => {
        return res.map((res) => {
          console.log('res.fileID:',res.fileID)
          return res.fileID
        });
      }).then(res => {
        console.log(app.globalData.openid)
        // const _id=app.globalData.openid
        // const db = wx.cloud.database({ env: 'cloud1-7gxiim6x2a66e335' })
        
        return db.collection('message').add({ //添加
              data: {
                title: that.data.telValue1,
                content: that.data.telValue2,
                image: res,
                publish_time: util.formatTime(new Date()),
                type: that.data.PostTypeNum,   
              }
            }).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                console.log(res)
                //要改！！！！
                wx.navigateTo({
                  url: '/pages/adminHome/adminHome',
                })
              }
            })
          }).catch((ex) => {
            console.log(ex);
          })
      })
      }
      else{
        // const _id = app.globalData.openid
        // const db = wx.cloud.database({ env: 'cloud1-7gxiim6x2a66e335' })
        return db.collection('message').add({ //添加帖子
          data: {
            title: that.data.telValue1,
            content: that.data.telValue2,
            image: [],
            publish_time: util.formatTime(new Date()),
            type: that.data.PostTypeNum,  
          }
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              console.log(res)
             //要改！！！！
             wx.navigateTo({
              url: '/pages/adminHome/adminHome',
            })
            }
          })
        })

      }
    }
    else {
      wx.showToast({
        title: '话题或内容字数不够',
        duration: 1000,
        mask: true,
        icon: 'none',
      })
    }
  },


  onLoad: function (options) {
    var that = this
    //获取发布的信息类型
    wx.getStorage({
      key: 'messageType',
      success(res) {
        if(res.data==0){
          that.setData({
          PostType:'资讯通知',
          PostTypeNum:0,

        })
        }
        else if(res.data==1){
          that.setData({
          PostType:'知识普及',
          PostTypeNum:1,
        })
        }
       }
    })
    wx.getStorage({
      key: 'Userinfo',
      success(res) {
        console.log(res);  
        that.setData({
          UserInfo : res
        })
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