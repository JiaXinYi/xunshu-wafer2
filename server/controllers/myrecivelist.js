const { mysql } = require('../qcloud');
//获取和我交流的人的id
module.exports = async (ctx) => {
  var fromId = ctx.query.fromId;
  const toIds = await mysql('cMessagelist')
    .select('to_id')
    .where('from_id', fromId)
    .groupBy('to_id')
  const fromIds = await mysql('cMessagelist')
    .select('from_id')
    .where('to_id', fromId)
    .groupBy('from_id')
  let idArr = [];
  let obj = [];
  for (let i = 0; i < fromIds.length; i++) {
    if (!obj[fromIds[i].from_id]) { //如果能查找到，证明数组元素重复了
      obj[fromIds[i].from_id] = 1;
      idArr.push(fromIds[i].from_id);
    }
  }
  for (let i = 0; i < toIds.length; i++) {
    if (!obj[toIds[i].to_id]) { //如果能查找到，证明数组元素重复了
      obj[toIds[i].to_id] = 1;
      idArr.push(toIds[i].to_id);
    }
  }
  ctx.state.code = 0;
  ctx.state.data = idArr;
} 