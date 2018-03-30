// 教程https://www.jianshu.com/p/072ff89e723c
const { mysql } = require('../qcloud')
const uuid = require('node-uuid')

module.exports = async (ctx) => {
  var tbname = ctx.query.tbname;
  var bookinfo = {
    name: ctx.query.bookName,
    writes: ctx.query.bookWriter,
    imgUrl: ctx.query.imgUrl,
    city: ctx.query.bookLocation,
    description: ctx.query.bookDetail
  }
  var book = {
    open_id: ctx.query.openId,
    uuid: uuid.v1(),
    book_name: ctx.query.bookName,  
    states:false,
    book_info: JSON.stringify(bookinfo)
  }
  var res = await mysql(tbname).insert(book)
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
