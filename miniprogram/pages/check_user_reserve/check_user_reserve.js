// pages/check_user_reserve/check_user_reserve.js
const util = require('../../utils/utils.js')
const db = wx.cloud.database()
const _ = db.command
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;
// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
      title: "审批列表",
      up_name: "haihong",
      // upimg是用户头像
      up_img: "https://wx1.sinaimg.cn/mw1024/006cV2kkly1g45b8b243bj30sa0nqwha.jpg",
      // 现在时间
      time: "2022/06/19 ",
      down_num: "2",
      
      // bg_color:"118deg,#fdcb6e 7%,#FF6B95 67%,#45D4FB 30%",
      bg_color: "45deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 17%",
    }],





    // 未审批的申请列表
    user_reserve_approving:[],
    // 已审批的接受列表
    // 考虑到已审批的列表中有同意和拒绝的
    user_reserve_approved:[],
    // 接受是要看未审批还是已审批
    state_approving:'未审批',
    nums_approving:0,
    nums_approved:0,
    numss:0,
    // openid+id
    qrid:"",
    // 二维码保存地址
    imgsrc:"",
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    image: '',
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    img:"",
    user_id:"",
    user_openid:"",
    hiddenmodalput:true,
    reject:"",
    nowAdd:"",
    noneValue:""


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("这就是QRRRRRRR",this.data.qrid)
    var DATE = util.formatTime(new Date());
    let that = this
    // that.setData({
    //   list.time: DATE
    // })
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
          
        },()=>{
          let num_temp = that.data.nums_approved + that.data.nums_approving
          that.setData({
            numss: num_temp
          })
        })
      },fail:res=>{
        console.log("获取用户申请失败")
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
              },()=>{
                
                const z = this
                qrcode = new QRCode('canvas', {
                  // usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
                  // text: z.data.qrid,
                  // image: '/images/bg.jpg',
                  width: qrcodeWidth,
                  height: qrcodeWidth,
                  colorDark: "#DA4967",
                  colorLight: "white",
                  correctLevel: QRCode.CorrectLevel.H,
                });
                console.log("能走到191行吗：：")
                // 生成图片，绘制完成后调用回调
                if(z.data.qrid !==""){
                  // qrcode.makeCode(z.data.qrid, () => {
                    // 回调
                    setTimeout(() => {
                      qrcode.exportImage(function(path) {
                        console.log("告诉我imgsrc的path是什么：这个是第二个绘制图片吗：",path)
                        z.setData({
                          imgsrc: path
                        },()=>{
                          console.log("下面是save函数")
                          that.save()
                        }
                        )
                      })
                    }, 100)
                  // })
                }
                
              }
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
     let that = this
     console.log("that.data.numss",that.data.numss)
     wx.showLoading({
      title: '刷新中！',
      duration: 900
    })
    console.log("that.data.user_reserve_approvingthat.data.user_reserve_approving",that.data.user_reserve_approving)
    let old_data_approving = that.data.user_reserve_approving;
    let old_data_approved = that.data.user_reserve_approved;
    db.collection("user_reserve").skip(that.data.numss)
    .get().then(res=>{
      if (res.data == "") {
        wx.showToast({
          icon: 'none',
          title: '已经加载完毕'
        })
      }
      for(var i = 0; i < res.data.length; i++) {
        // 未审批
        console.log("res.data[i].is_approveres.data[i].is_approve",res.data[i].is_approve)
        if(res.data[i].is_approve == 0) {
          old_data_approving = old_data_approving.concat(res.data[i])
        }
        else{
          old_data_approved = old_data_approved.concat(res.data[i])
        }

        if( i == res.data.length - 1) {
          that.setData({
            user_reserve_approved:old_data_approved,
            user_reserve_approving:old_data_approving,
            nums_approved:old_data_approved.length,
            nums_approving:old_data_approving.length,
            numss:(old_data_approved.length + old_data_approving.length)
          })
        }
      }
      


      console.log("res",res)
    })
    .catch(err=>{
      console.error(err)
    })
    console.log("circle下一页")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
  // 制作二维码
  renderCode(value) {
    console.log("renderCode", value)
    const z = this
    console.log('make handler')
    qrcode.makeCode(value, () => {
      console.log('make')
      qrcode.exportImage(function(path) {
        console.log("path这里有没有啊？？？？？第一个::",path)
        z.setData({
          imgsrc: path
        },()=>{
          console.log("imgsrc是什么啊，高明彪贼想知道！！！", z.data.imgsrc)
          z.onShow()
        })
      })
    })
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
    var DATE = util.formatTime(new Date());
    
    let that = this
    console.log(e.target.dataset.id)
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      nowAdd:e.currentTarget.dataset.id,
      noneValue:""
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
        title: '取消成功',//提示文字
        duration:1100,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success', //图标，支持"success"、"loading"  
        success:function(){ 
          db.collection("user_reserve").doc(that.data.nowAdd)
          .update({
            data:{
              is_approve: 1,
              time_approve: DATE,
              reject:that.data.reject
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

  rejectReason:function(e){
    console.log("input失去焦点的输出内容是什么呢？？？？",e)
    this.setData({
      reject: e.detail.value
      })
  },

  // 同意之后我就要给数据库返回一个二维码
  tongyi:function(e){
    var DATE = util.formatTime(new Date());
    let that = this
    console.log("e.target.dataset.id",e.target.dataset.id)
      db.collection("user_reserve").doc(e.target.dataset.id).update({
        data:{
          is_approve: 1,
          status:1,
          time_approve: DATE
        },success:function(res){
          // 成功后就应该读取id+_id生成独一无二的二维码
          db.collection("user_reserve").doc(e.target.dataset.id).get({
           success:res=>{
            // console.log("这就是QR哦瓜娃",res.data._id + res.data._openid)
            that.setData({
              qrid:res.data._id + res.data._openid,
              user_id:res.data._id,
              user_openid:res.data._openid,
            },()=>{
              // console.log("下一步二维码生成？")
              // console.log("that.data.qrid::",that.data.qrid)
              // 
              wx.showToast({
                title: '审批成功',//提示文字
                duration:1100,//显示时长
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon:'success', //图标，支持"success"、"loading"  
                success:function(){ 
                  that.renderCode(that.data.qrid)
                },//接口调用成功
                fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
                complete: function () { } //接口调用结束的回调函数  
             })



            })
            // setTimeout(()=>{
            //   console.log("showshowshow")
              
            // },100)          
           }
          })          
        },fail:res=>{
          console.log("失败的DATE",DATE)
          console.log("当前点击同意申请失败咯")
        }
      })
  },

  save:function(){
    let that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);
    // console.log("看看再save中是否已经可以访问图片HTTP了",that.data.imgsrc)
      wx.cloud.uploadFile({
        cloudPath: '用户申请物品二维码/'+timestamp+'.png',
        
        filePath: that.data.imgsrc, // 文件路径
        success: function(res) {
          // get resource ID
          // console.log("保存图片咯,快看看当前路径对着没babe",res.fileID)
          // console.log("我想知道这个是什么",res.fileID)

          that.setData({
            img:res.fileID,
          },()=>{
            // console.log("save下的update")
            that.updateQr()
          })
          
          
        },
        fail: function(res) {
          console.log("check_user_Reserve286行错误")
        }
      })
  },

  updateQr:function(){
    let that = this
    db.collection("user_reserve").where({
      _id:that.data.user_id,
      _openid:that.data.user_openid
    }).update({
      data:{
        qr:that.data.img
      },success:res=>{
        console.log("二维码更改成功")
        // console.log("that.data.img:::",that.data.img)
      },fail:res=>{
        console.log("图片路径转化为QR失败，check_user_reserve 361行")
      }
    })
  }
})