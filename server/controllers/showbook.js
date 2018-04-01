const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
  var openId = ctx.query.openId;  
  var tbname = ctx.query.tbname;
  await mysql(tbname).select('book_info').where('open_id',openId)
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}