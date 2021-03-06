const Router = require('koa-router');
const User = require('../controllers/user');
const Group = require('../controllers/group');

const router = new Router();

router.post('/', async(ctx, next) => {
  const {
    name,
    range
  } = ctx.request.body;

  const user = await User.search(name);
  const group = await Group.search(name);

  if (!user[0] && !group[0]) {
    ctx.body = {
      success: false
    };
  } else {
    ctx.body = {
      success: true,
      content: {
        user: user,
        group: group,
      }
    }
  }
  await next();
})

module.exports = router;