const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var msg={
    from_id: ctx.query.fromId,
    to_id:ctx.query.toId,
    message_text: ctx.query.message,
    states:false
  }
  await mysql('cMessagelist').insert(msg)
    .then(res => {
      ctx.state.code = 0;
      ctx.state.data = res;
    })
    .catch(err => {
      ctx.state.code = -1;
      throw new Error(err);
    })
} 