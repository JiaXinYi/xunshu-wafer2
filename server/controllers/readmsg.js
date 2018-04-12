const { mysql } = require('../qcloud');
module.exports = async(ctx)=>{
  var fromId = ctx.query.fromId;
  await mysql('cMessagelist').select('*').where('from_id', fromId)
    .then(res=>{
      ctx.state.code=0;
      ctx.state.data = res;
    })
    .catch(err=>{
      ctx.state.code=-1;
      throw new Error(err);
    })
} 