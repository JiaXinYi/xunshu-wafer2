const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var msg={
    from_id:'ogZMb5IsGSKJplkr2igp4Otc6_Kk',
    to_id:'520',
    message_text:'嗨，你好呀！',
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