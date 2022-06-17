var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const db = wx.cloud.database()

Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    product_num:[],
    product_threshold:[],
    product_boolen:[],
    product_image:[],
    product_location:[],
    deficiency:[],
    number:0,
    allProduct:[]
  },
  // onLoad: function (options) {
  //   this.getCatalog();
  // },
  onLoad(options) {
    let that = this
    console.log("options",options)
    db.collection("infirmary_resource").get({
      success:res=>{
        console.log("res.data[0]",res.data[0])
        that.setData({
          product_image:res.data[0].image,
          product_location:res.data[0].location,
          // res.data[0].number就是有几个发放机
          number:res.data[0].number
        },()=>{
           // 0-num 发放机的物资数量等放入product_num:
          db.collection("machine_resource").get({
            success:res=>{
              // 222
              for(var i = 0; i < that.data.number; i++) {
                if(res.data[i].machine_id - "0" == i) {
                  
                }
              }
              console.log("res.data",res.data)
              this.getCatalog();
              
              // for (var i = 0; i < res.data[0].number; i++) {
              //   console.log("iiii", i)
                
              // }
            }
          })
        }
        )
       

      },fail:res=>{
        console.log("获取发放机资源失败")
      }

    })

    
  },


  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });


    util.request(api.CatalogList).then(function (res) {
        that.setData({
          navList: res.data.categoryList,
          currentCategory: res.data.currentCategory
        });
        wx.hideLoading();
      });


    // util.request(api.GoodsCount).then(function (res) {
    //   that.setData({
    //     goodsCount: res.data.goodsCount
    //   });
    // });

  },
  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CatalogCurrent, { id: id })
      .then(function (res) {
        that.setData({
          currentCategory: res.data.currentCategory
        });
      });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getList: function () {
    var that = this;
    util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
      .then(function (res) {
        that.setData({
          categoryList: res.data,
        });
      });
  },

  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    console.log("event.currentTarget.dataset",event.currentTarget.dataset)
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }
    

    this.getCurrentCategory(event.currentTarget.dataset.id);
  }
})