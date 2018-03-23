// 教程https://www.jianshu.com/p/072ff89e723c
const { mysql } = require('../qcloud')
const uuid = require('node-uuid')

module.exports = async (ctx) => {
  var bookinfo = {
    name: '基于Ionic的移动APP开发',
    city: '广东省广州市天河区'
  }
  var book = {
    open_id: ctx.query.openId,
    uuid: uuid.v1(),
    book_info: JSON.stringify(bookinfo)
  }
  var res = await mysql('cBooklist').insert(book)
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
  // var res = await mysql('cSessionInfo').select('*')
  //   .then(res => {
  //     ctx.state.code = 0
  //     ctx.state.data = res
  //   })
  //   .catch(err => {
  //     ctx.state.code = -1
  //     throw new Error(err)
  //   })
}
// const { mysql } = require('../qcloud')

// module.exports = async (ctx, next) => {
//   mysql('cAppinfo').select('*').then(res => {
//     ctx.state.code = 0
//     ctx.state.data = res
//   }).catch(err => {
//     ctx.state.code = -1
//     throw new Error(err)
//   })
// }