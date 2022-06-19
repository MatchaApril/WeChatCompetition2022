//index.js
//获取应用实例
const db=wx.cloud.database();
const _=db.command
const app = getApp()

 let username=''
 let password=''

Page({
  data: {
    username: '',
    password: '',
    clientHeight:''
  },
  onLoad(){
    var that=this
    wx.getSystemInfo({ 
      success: function (res) { 
        console.log("res.windowHeight",res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }) 
  },
  // //协议
  // goxieyi(){
  //  wx.navigateTo({
  //    url: '/pages/oppoint/oppoint',
  //  })
  // },
  //获取输入款内容
  content(e){
    username=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  //登录事件
  goadmin(){
    let flag = false  //表示账户是否存在,false为初始值
    if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
      console.log('11')
      db.collection('admin')
      .get({
        success:(res)=>{
          console.log(res.data)
          let admin=res.data
          for (let i = 0; i < admin.length; i++) {  //遍历数据库对象集合
            if (username === admin[i].username) { //账户已存在
              flag=true;
              if (password !== admin[i].password) {  //判断密码正确与否
                wx.showToast({  //显示密码错误信息
                  title: '密码错误！！',
                  icon: 'error',
                  duration: 2500
                });
               break;
              } else {
                wx.showToast({  //显示登录成功信息
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                })
                flag=true;
                wx.setStorageSync('admin', password)
               wx.navigateTo({
                 url: '/pages/adminHome/adminHome',
               })
                break;
              }
            }
          };
          if(flag==false)//遍历完数据后发现没有该账户
          {
            wx.showToast({
              title: '该用户不存在',
              icon: 'error',
              duration: 2500
            })
          }
        }
      })
    }
  },
})