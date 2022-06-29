// pages/feedback/index.js
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"校医院方面",
        isActive:true,
      },
      {
        id:1,
        value:"小程序方面",
        isActive:false
      },
      
    ],
    // 被选择图片路径数组
    chooseImgs:[],
    // 文本域内容
    textVal:"",
    //哪个方面的
    typename:"",
    //是否被处理了
    isHandle:false
  },
  // 全局的 上床到外网图床的图片路径数组
  UpLoadImgs:[],
 
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
  // 点击加号选择图片
  chooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 删除图片
  removeImg(e){
    // 获取被点击的图片索引
    const {index} = e.currentTarget.dataset;
    // 获取data中的原数组
    let {chooseImgs} = this.data;
    // 删除元素
    chooseImgs.splice(index,1);
    this.setData({chooseImgs})
  },

  // 文本域的输入事件
  textInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  
  // 提交功能
  formSubmit(){
    // 获取文本域内容
    const {textVal,chooseImgs,tabs} = this.data;
    // 合法性验证
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    // 把图片上传到图床
    // 上传文件的api不支持多个文件同时上传，通过循环遍历上传
    // 显示正在等待图标
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if (chooseImgs.length!=0) {
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          // 图片上传服务器路径
          url: 'https://img.coolcr.cn/api/upload',
          // 被上传的文件路径
          filePath: v,
          // 上传的文件名称  名称可以自定义的 后台通过此命名获取文件
          name: 'image',
          // 上传文件顺带的文本信息
          formData: {},
          success: (result) => {
            // 外网图床返回的图片路径数组
            let {url} = JSON.parse(result.data).data
            this.UpLoadImgs.push(url)
            // 所有图片上传完毕 才触发的代码
            if (i===chooseImgs.length-1) {
              // 关闭loading
              wx.hideLoading();
              // 表示最后一个图片上传完毕
              // 把路径上传到后台服务器 异步 由于没有后台 打印一句话 模拟一下
              console.log("把文本内容和图片路径提交到后台");
            
              this.upload_feedback();
            
              // 提交成功了 重置页面 并返回上一个页面
              this.setData({
                textVal:"",
                chooseImgs:[]
              })
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      console.log("只是提交了文本");
      this.upload_feedback();
      wx.hideLoading();
    }

    wx.showToast({
      title: '提交成功',
      icon: 'none',
      mask: true
    });
  },

//上传到数据库
  upload_feedback(){
    const {tabs} = this.data;
    if(tabs[0].isActive==true){
      this.setData({
        typename:tabs[0].value
      })
      console.log(tabs[0].value)
    }else{
      this.setData({
        typename:tabs[1].value
      })
      console.log(tabs[1].value)
    }
    //上传到云控制台
    wx.cloud.database().collection('feedback')
    .add({
       data:{
         //哪个方面的建议
         typeName:this.data.typename,
         // 被选择图片路径数组
         chooseImgs:this.UpLoadImgs,
         // 文本域内容
         textVal:this.data.textVal,
         isHandle:this.data.isHandle
       }
     }).then(res=>{
       console.log("添加成功",res)
     }).catch(res=>{
       console.log("添加失败",res)
     }) 
 
  }


})