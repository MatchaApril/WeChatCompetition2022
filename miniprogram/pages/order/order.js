const util=require('../../utils/utils.js')
const db=wx.cloud.database()


Page({
    data:{
        dataObj:""
    },

    onLoad:function(options){
        db.collection("user_reserve").where({
            _openid:"oVG2o4vXsjQYOUpPupRXTCbyBtQs"
        })
        .get().then(
            res=>{
                this.setData({
                    dataObj:res.data
                })
            }
        )

    },
    onShow:function(){

    },
    onHide:function(){

    },
    onUnload:function(){
        
    },
    save: function() {
        console.log('save')
        wx.showActionSheet({
          itemList: ['保存图片'],
          success: function(res) {
            console.log(res.tapIndex)
            if (res.tapIndex == 0) {
              qrcode.exportImage(function(path) {
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                })
              })
            }
          }
        })
         }
})