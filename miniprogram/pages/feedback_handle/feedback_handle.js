// 管理员处理，只需查看未处理的
Page({
  data: {
    allData:[],
    openid:"",
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /*
     //获取openid
     wx.cloud.callFunction({
      name:'getOpenid'
  })
  .then(res=>{
     console.log('成功,获取openid',res)
      this.setData({
          openid:res.result.openid
      })
      console.log("openid:",this.data.openid)
  })*/

  //开始获取数据   管理员查看无所谓什么id，直接获取数据
  wx.cloud.database().collection('feedback')
  /*
  .where({//条件查询
      _openid:this.data.openid
  })      */
  .get()
  .then(res=>{
      console.log('获取数据库数据成功',res)
      this.setData({
          allData:res.data
      })
  })
  .catch(res=>{
      console.log('数据返回失败',res)
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
    /*
     //获取openid
     wx.cloud.callFunction({
      name:'getOpenid'
  })
  .then(res=>{
     console.log('成功,获取openid',res)
      this.setData({
          openid:res.result.openid
      })
      console.log("openid:",this.data.openid)
  })*/

  //开始获取数据   管理员查看无所谓什么id，直接获取数据
  wx.cloud.database().collection('feedback')
  /*
  .where({//条件查询
      _openid:this.data.openid
  })      */
  .get()
  .then(res=>{
      console.log('获取数据库数据成功',res)
      this.setData({
          allData:res.data
      })
  })
  .catch(res=>{
      console.log('数据返回失败',res)
  })
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



  handlefeedback(e){
     var now=e.currentTarget.dataset.index;
     console.log(now);
    let that = this
     var id= that.data.allData[now]._id;
     console.log(id);
     wx.cloud.database().collection('feedback')
      //doc中填写你要修改的那一条数据的id
      //.doc('8937eaa9610c115e029eef77188c9e65')
      .doc(id)
      //更新数据
      .update({
        data:{
           //value:10
           isHandle:true
        }
      })
      .then(res =>{
        console.log('更新数据成功')
        wx.showToast({
          title: '处理成功',
          icon: 'none',
          mask: true
        });
        that.onShow()

      })
      .catch(err =>[
        console.log('更新数据失败'),
        wx.showToast({
          title: '处理失败',
          icon: 'none',
          mask: true
        })

      ])
  },
  PreviewImage(e){
    //console.log(e);
    var num1=e.currentTarget.dataset.parent;//一个位置
    var num2=e.currentTarget.dataset.child;
    console.log("num1：",num1);
    console.log("num2：",num2);

  wx.previewImage({
   current:this.data.allData[num1].chooseImgs[num2],
   urls:this.data.allData[num1].chooseImgs,
  })
  }




})