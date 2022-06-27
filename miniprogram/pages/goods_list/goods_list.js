// pages/check_machine_resource/check_machine_resource.js
const app=getApp()
const db = wx.cloud.database()
const _ = db.command
const util=require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentIndex:0,
    user:"",
    reason:"",

    imgUrls:[
      "/images/校园11.jpg",
      "/images/校园12.jpg",
      "/images/校园13.jpg",
    ],

    url:"/images/yes1.png",
    // 访问物资数据库，用一个列表分别保存所有物资数量，另一个列表保存所有阈值
    // [[xxx],[x]]
    // [[xxx],[x]]
    product_num:[],
    product_threshold:[],
    product_boolen:[],
    product_image:[],
    product_location:[],
    deficiency:[],
    product_abbre:[],
    // 当前有几个发放机
    number:0,
    product:[],
    // 当前有几个物品
    num:0,
    // 当前点击的是第几个发放机
    currentNum:0,
    idx:0,
    hiddenmodalput:true,
    add:0,
    nowAdd:"",
    index:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this
    var tempNum = that.data.currentNum
    db.collection("infirmary_resource").get({
      success:res=>{
        console.log("res.data[0]",res.data[0])
        that.setData({
          product_image:res.data[0].image,
          product_location:res.data[0].location,
          product_abbre:res.data[0].abbre,
          // res.data[0].number就是有几个发放机
          number:res.data[0].number
        },()=>{
            console.log("所有物资的res.data",res.data)
            console.log("发放机页面传进来的数值为：", tempNum)
            console.log("typeof(tempNum)",typeof(tempNum))
            // 更新发放机的所有数量是否有小于阈值的
            db.collection("machine_resource").where({
              machine_id:tempNum,
              number: _.lt(5)
            })
            .update({
              data:{
                deficiency: 1
              },success:res=>{
                console.log("更新成功59行")
                db.collection("machine_resource").where({
                  machine_id:tempNum,
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


        })
       

      },fail:res=>{
        console.log("获取发放机资源失败")
      }
    })

    
            this.setData({
                  userinfo: app.userinfo
            })
            console.log(app.userinfo)
            wx.getStorage({
              key: 'openid',
              success(res) {
                  that.setData({
                      openid:res.data,
                  },()=>{
                        that.getUserInformation();
                  })
                  console.log(that.data.openid)
                 }
            })
            that.setData({
                _openid:that.data.openid,

            },()=>{
              console.log("这就是openid",that.data._openid)
            }
            )


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
    let that = this
    var tempNum = that.data.currentNum
    db.collection("infirmary_resource").get({
      success:res=>{
        console.log("res.data[0]",res.data[0])
        that.setData({
          product_image:res.data[0].image,
          product_location:res.data[0].location,
          // res.data[0].number就是有几个发放机
          number:res.data[0].number
        },()=>{
            console.log("所有物资的res.data",res.data)
            console.log("发放机页面传进来的数值为：", tempNum)
            console.log("typeof(tempNum)",typeof(tempNum))
            // 更新发放机的所有数量是否有小于阈值的
            db.collection("machine_resource").where({
              machine_id:tempNum,
              number: _.lt(5)
            })
            .update({
              data:{
                deficiency: 1
              },success:res=>{
                console.log("更新成功59行")
                db.collection("machine_resource").where({
                  machine_id:tempNum,
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


        })
       

      },fail:res=>{
        console.log("获取发放机资源失败")
      }
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
  switchCate:function(e) {
    let that = this
    console.log(e.currentTarget.dataset)
    that.setData({
      currentNum:e.currentTarget.dataset.num,
      idx:e.currentTarget.dataset.num
    },()=>{
      
      console.log("currentNum", that.data.currentNum)
      that.onShow()
    }
    )
  },


    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },

  reserve:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset.id)
    console.log("product",this.data.product)
    let that = this
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      nowAdd:e.currentTarget.dataset.id,
      index:e.currentTarget.dataset.index,
      
    })
    console.log("index",that.data.index)
  },

  getUserInformation: function (){
    let that = this;
    that.data.openid
    db.collection('user').where({
          _openid: this.data.openid
   }).get({
     success: (res) => {
       console.log(res.data[0])
       this.setData({
          userInformation:res.data[0],
          user:res.data[0]
         })
     }
   })
},

Reason:function(e){
    console.log("reason",e.detail)
    
    this.setData({
      reason:e.detail.value,
    })
},

confirm:function(e) {
  var DATE = util.formatTime(new Date());

  let that = this
  that.setData({
    hiddenmodalput: true,
    index:that.data.index
  },()=>{
    console.log("reason",that.data.reason)
    wx.showToast({
      title: '预定成功',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'success', //图标，支持"success"、"loading"  
      success:function(){ 
        db.collection("user_reserve")
        .add({
          data:{
            student_number:that.data.user.student_number,
            name:that.data.user.name,
            machine_id:that.data.currentNum,
            reserve_name:that.data.product[that.data.index].name,
            is_approve: 0,
            time_apply: DATE,
            reason:that.data.reason,
            title:that.data.product[that.data.index].name,
          },success:function(res){
            that.onLoad()
          },fail:res=>{
            console.log("当前点击拒绝申请失败咯")
          }
        })
        db.collection("user_reserve").doc(that.data.nowAdd)
        .update({
          data:{
            number:that.data.product[that.data.index].number-1
          }                
      },//接口调用成功
   )
  }
})
  })
},

  
cancel: function(){
  let that = this
  wx.showToast({
    title: '取消成功',//提示文字
    duration:1100,//显示时长
    mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
    icon:'success', //图标，支持"success"、"loading"  
    success:function(){ 
      that.setData({
        hiddenmodalput: true
       });
    },//接口调用成功
    fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
    complete: function () { } //接口调用结束的回调函数  
 })
 },

})