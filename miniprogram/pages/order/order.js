// pages/order1/order1.js
const app = getApp()
const util = require('../../utils/utils.js')
const db = wx.cloud.database()
const _ = db.command
import rpx2px from '../../utils/rpx2px.js'
// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
      title: "订单列表",
      up_name: "haihong",
      // upimg是用户头像
      up_img: "https://wx1.sinaimg.cn/mw1024/006cV2kkly1g45b8b243bj30sa0nqwha.jpg",
      // 现在时间
      time: "2022/06/19 ",
      down_num: "2",
      bg_color:"118deg, #fdcb6e 7%, #FF6B95 67%, #45D4FB 30%",
    }],

    _openid:"",
    //二维码fileid
    fileID:"",
    // 未审批的申请列表
    user_reserve_approving:[],
    // 已审批的接受列表
    // 考虑到已审批的列表中有同意和拒绝的
    user_reserve_approved:[],
    // 接受是要看未审批还是已审批
    state_approving:'未审批',
    nums_approving:0,
    nums_approved:0,
    // openid+id
    qrid:"",
    hiddenmodalput:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
            let that=this;
            this.setData({
                  userinfo: app.userinfo
            })
            console.log("颜色",that.data.list[0])
            wx.getStorage({
              key: 'openid',
              success(res) {
                  that.setData({
                      _openid:res.data,
                  },()=>{
                        that.getUserInformation();
                  })
                  console.log(that.data._openid)
                 }
            })
            that.setData({
                _openid:that.data._openid,

            },()=>{
              console.log("这就是_openid",that.data._openid)
            }
            )

            


    var DATE = util.formatTime(new Date());

    // that.setData({
    //   list.time: DATE
    // })
    // 未审批的
    db.collection("user_reserve").where({
         _openid:that.data.openid,
        is_approve:0
    }).get({
      success:res=>{
        console.log("openid",res.data.openid)
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
         _openid:that.data.openid,
        is_approve:1
    }).get({
      success:res=>{
        console.log("已审批的user_reserve_approved",res.data)
        that.setData({
          user_reserve_approved:res.data,
          nums_approved:res.data.length,
          fileID:res.data[0].qr
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
    
    console.log("这就是QRRRRRRR",this.data.qrid)
    var DATE = util.formatTime(new Date());


    let that = this
    // 未审批的
    db.collection("user_reserve").where({
        _openid:this.data._openid,
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
        _openid:that.data._openid,
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
   * 生命周期函数--监听页面显示
   */
  onShow() {

    console.log("刚进入showwwww这就是QRRRRRRR",this.data.qrid)
    var DATE = util.formatTime(new Date());


    let that = this
    
    let oP = new Promise( (res, rej) => {
    
    // 未审批的
    db.collection("user_reserve").where({
      is_approve:0
    }).get({
      success:res=>{
        console.log("未审批的user_reserve_approving",res.data)
        that.setData({
          user_reserve_approving:res.data,
          nums_approving:res.data.length,
        },()=>{
          db.collection("user_reserve").where({
            is_approve:1
          }).get({
            success:res=>{
              console.log("已审批的user_reserve_approved",res.data)
              that.setData({
                user_reserve_approved:res.data,
                nums_approved:res.data.length,
              },
              )
            },fail:res=>{
              console.log("获取用户申请过失败")
            }
          })
        }
        )
      },fail:res=>{
        console.log("获取用户审批中失败")
      }
    })
    // 审批完成的
    // 但是审批完成还包括两种：一种是学生没来取的，一种是学生已经取了。
  
    });
    
    
    

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
  qrcode:function(e){
    let that = this
    console.log(e.target.dataset.id)
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      nowAdd:e.currentTarget.dataset.id
    })
  },
  // 取消拒绝
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


  confirm:function(e) {
    var DATE = util.formatTime(new Date());
    let that = this

    that.setData({
      hiddenmodalput: true
    },()=>{
      console.log("这就是reject！！",that.data.reject)
      wx.showToast({
        title: '查看成功',//提示文字
        duration:1100,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success', //图标，支持"success"、"loading"  
        success:function(){ 
          db.collection("user_reserve").doc(that.data.nowAdd)
          .update({
            data:{
              is_approve: 1,
              time_receive: DATE,
              reject:that.data.reject,
              status:2
            },success:function(res){
      
              that.onLoad()
            },fail:res=>{
              console.log("当前点击拒绝申请失败咯")
            }
          })                
        },//接口调用成功
        fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
     })


      
    }
    )
  },

  savesignupimg(){
    wx.authorize({
      scope:'scope.writePhotosAlbum',
      success:res0=>{wx.cloud.downloadFile({
        fileID:this.data.fileID,
        success:res=>{
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:(res)=>{
              wx.showToast({
                title: '保存成功',
              })
            }
          })
        },
        fail:(err)=>{
          console.log(err),
          wx.showToast({
            title: '授权失败',
          })
        }
      })

      }
    })
  },

  getUserInformation: function (){
    let that = this;
    that.data.openid
    db.collection('user').where({
          _openid: this.data.openid
   }).get({
     success: (res) => {
       this.setData({
          userInformation:res.data[0]
         })
     }
   })

},

})