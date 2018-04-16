const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var user = {
    open_id: ctx.query.openId,
    nickname: ctx.query.nickName,
  }
  const isUser = await mysql('cUserlist').select('*').where('open_id', user.open_id);
  if (!isUser.length) {
    await mysql('cUserlist').insert(user)
      .then(res => {
        ctx.state.code = 0;
        ctx.state.data = res;
      })
      .catch(err => {
        ctx.state.code = -1;
        throw new Error(err);
      })
  } else {
    ctx.state.data = '已存在该用户信息';
  }

} 