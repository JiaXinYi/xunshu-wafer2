// 教程https://www.jianshu.com/p/072ff89e723c
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  // var id = ctx.state.$wxInfo.openId;
  var res = await mysql('cSessionInfo').select('*')
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}
// const { mysql } = require('../qcloud')

// module.exports = async (ctx, next) => {
//   mysql('cAppinfo').select('*').then(res => {
//     ctx.state.code = 0
//     ctx.state.data = res
//   }).catch(err => {
//     ctx.state.code = -1
//     throw new Error(err)
//   })
// }