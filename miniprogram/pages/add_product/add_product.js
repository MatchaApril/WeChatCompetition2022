// pages/add_product/add_product.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:'',
  },
  // 上传图片
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: '医用物品img/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          },
          fail: function(res) {
            console.log("add_product36行错误")
          }
        })
      }
    })
  },
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    // img.splice(id,1)
    that.setData({
      img: ''
    })
    console.log("e.currentTarget.dataset.src",e.currentTarget.dataset.src)
    wx.cloud.deleteFile({
      
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        console.log("add_product行错误")
      },
    })
    console.log(that.data.img)
  },
  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.number!==""&&e.detail.value.machine_id!==""&&e.detail.value.detail!==""&&that.data.img.length!==0 && e.detail.value.threshold !=="" && e.detail.value.type!==""){
      db.collection('machine_resource').add({
        data:{
          name:e.detail.value.name,
          number:e.detail.value.number,
          machine_id:e.detail.value.machine_id,
          detail:e.detail.value.detail,
          image:that.data.img,
          type:parseInt(e.detail.value.type),
          deficiency:0
        },success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../check_machine_resource/check_machine_resource',
          })
        }
      })
    }else{
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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