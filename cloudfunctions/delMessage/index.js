// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-9gcef6nu6fc89a19'
})   // 初始化 cloud

const db = cloud.database({ env: 'cloud1-9gcef6nu6fc89a19' })
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const Post_id = event.youid
console.log(Post_id)
  return db.collection('message').doc(Post_id).remove({
  }).then(res => { 
    console.log(res);
  },error=>{
    console.log(error);
  })
}