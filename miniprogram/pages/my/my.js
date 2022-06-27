const app = getApp()
const db=wx.cloud.database();
const _=db.command

Page({
      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            // poster: JSON.parse(config.data).share_poster,
      },
      onShow() {
            this.setData({
                  userinfo: app.userinfo
            })
            
      },
      go(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      //展示分享弹窗
      showShare() {
            this.setData({
                  showShare: true
            });
      },
      //关闭弹窗
      closePop() {
            this.setData({
                  showShare: false,
            });
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
      // onShareAppMessage() {
      //       return {
      //             title: JSON.parse(config.data).share_title,
      //             imageUrl: JSON.parse(config.data).share_img,
      //             path: '/pages/start/start'
      //       }

      // },
})