const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
  const userdata = await mysql('cUserlist').select('*');
  let targetdata = {};
  for (var i = 0; i < userdata.length; i++) {
    targetdata[userdata[i].open_id]=userdata[i].nickname;
  }
  ctx.state.data = targetdata;
} 