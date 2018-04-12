const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  var fromId = ctx.query.fromId;
  var toId = ctx.query.toId;
  const msg = await mysql('cMessagelist')
    .select('*')
    .where('from_id', fromId)
    .andWhere('to_id', toId)
    .union(
    mysql('cMessagelist').select('*')
      .where('from_id', toId)
      .andWhere('to_id', fromId)
    )
    .orderBy('id', 'asc')
    //asc升序desc降序
  //我发送给toId的数据
  // const sendmsg = await mysql('cMessagelist')
  //   .select('*')
  //   .where('from_id', fromId)
  //   .andWhere('to_id', toId)
  //   .orderBy('id', 'desc')
  //我接收到来自toId的数据  
  // const recivemsg = await mysql('cMessagelist')
  //   .select('*')
  //   .where('from_id', toId)
  //   .andWhere('to_id', fromId)
  //   .orderBy('id', 'desc')

  ctx.state.data = { msg: msg };
} 