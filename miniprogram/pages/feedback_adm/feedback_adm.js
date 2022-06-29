// 管理员查看无所谓openid，直接查看所有情况
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"已处理",
        isActive:false,
      },
      {
        id:1,
        value:"未处理",
        isActive:true,
      },
    ],
    allData:[],
    openid:"",
   
  },

  handleTabsItemChange(e){
    const {index} = e.detail;
    // 使用浅拷贝的方法赋值
    let {tabs} = Object.assign({}, this.data);;
    tabs.forEach((v,i)=>{
      i == index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
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

  //开始获取数据   管理员查看直接获取数据
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