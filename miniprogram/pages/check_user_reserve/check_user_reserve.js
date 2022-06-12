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
    // 二维码保存地址
    imgsrc:"",
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    image: '',
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    img:"",
    user_id:"",
    user_openid:"",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
                console.log("能走到168行吗：：")
                // 生成图片，绘制完成后调用回调
                if(z.data.qrid !==""){
                  qrcode.makeCode(z.data.qrid, () => {
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
                    }, 10)
                  })
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
    db.collection("user_reserve").doc(e.target.dataset.id).update({
      data:{
        is_approve: 1,
        time_approve: DATE

      },success:function(res){
        that.onLoad()
      },fail:res=>{
        console.log("当前点击拒绝申请失败咯")
      }
    })
  },
  // 同意之后我就要给数据库返回一个二维码
  tongyi:function(e){
    var DATE = util.formatTime(new Date());
    let that = this
    console.log(e.target.dataset.id)
      db.collection("user_reserve").doc(e.target.dataset.id).update({
        data:{
          is_approve: 1,
          status:1,
          time_approve: DATE
        },success:function(res){
          // 成功后就应该读取id+_id生成独一无二的二维码
          db.collection("user_reserve").doc(e.target.dataset.id).get({
           success:res=>{
            console.log("这就是QR哦瓜娃",res.data._id + res.data._openid)
            that.setData({
              qrid:res.data._id + res.data._openid,
              user_id:res.data._id,
              user_openid:res.data._openid,
            },()=>{
              console.log("下一步二维码生成？")
              console.log("that.data.qrid::",that.data.qrid)
              that.renderCode(that.data.qrid)
            })
            // setTimeout(()=>{
            //   console.log("showshowshow")
              
            // },100)          
           }
          })          
        },fail:res=>{
          console.log("当前点击同意申请失败咯")
        }
      })
  },

  save:function(){
    let that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    console.log("看看再save中是否已经可以访问图片HTTP了",that.data.imgsrc)
      wx.cloud.uploadFile({
        cloudPath: '用户申请物品二维码/'+timestamp+'.png',
        
        filePath: that.data.imgsrc, // 文件路径
        success: function(res) {
          // get resource ID
          console.log("保存图片咯,快看看当前路径对着没babe",res.fileID)
          console.log("我想知道这个是什么",res.fileID)

          that.setData({
            img:res.fileID,
          },()=>{
            console.log("save下的update")
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
        console.log("that.data.img:::",that.data.img)
      },fail:res=>{
        console.log("图片路径转化为QR失败，check_user_reserve 361行")
      }
    })
  }
})