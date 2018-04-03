const { mysql } = require('../qcloud')
module.exports = async (ctx) => {
  var bookname = ctx.query.bookname;
  await mysql('cBooklist').select('*').where('book_name', bookname)
    .then(res => {
      ctx.state.code = 0;
      ctx.state.data = res;
    })
    .catch(err => {
      ctx.state.code = -1;
      throw new Error(err);
    })
}