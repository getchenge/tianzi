const Router = require('koa-router');
const router = Router();
const WechatAPI = require('wechat-api');
const User = require('../model/user');
const Token = require('../model/token');

// const api = new WechatAPI('wx8d66e301b55da679', 'b491fa445f60a8c78087f1b47df44d50');//tianzi
// const api = new WechatAPI('wxd6b64a85cb9778bf', 'ff9936b43c76110f726d6a7a64433011', (callback) => {//chenge
const api = new WechatAPI('wx8d66e301b55da679', 'b491fa445f60a8c78087f1b47df44d50', (callback) => {
  let token = '';
  Token.find({ id: 1 }).then((doc) => {
    // console.info('token.find_', doc);
    if (doc[0]) {
      token = doc[0].token;
    }
    return callback(null, token);
  });
}, (token, callback) => {
  Token.update({ id: 1 }, { token }, { upsert: true }, callback);
});

const getIds = new Promise((resolve, reject) => {
  // let ids = ["oaq3ys_RAtbII1A8z9gBG3v4W-7k", "oaq3ys5unMTDWoDCDsMZ87rffgn4", "oaq3yszMje45m03JFJZHKEk78yvc", "oaq3ys0rcqmmuvuTMFzF7NFe-rhg", "oaq3ysyHTopkrDQ0h6-krdYijOao", "oaq3ys2iLEm4PrS1UKvzM3a2JP2k", "oaq3ys724taYSyTVvL0a35r59kKs", "oaq3ys-o9zHTdw8cTG0M-JQmrcrA", "oaq3ysxUsZWU79wCuAHe5NVXg3EU", "oaq3ys7rrXBxCaCvbV8pIe_Nhs4I", "oaq3ys5OI-4XHCk8vQ6B4mMkUNqc", "oaq3ys6Irii_c1vGOOihd2mfYCks", "oaq3ys5UmoPxvUiGfgpQ6wPEFS2s", "oaq3yszUE4dapiao120TPti54ZLI", "oaq3ys0X0mQy-QdJnaWyUdc8GpxE", "oaq3yswEdr7qps1Rp1nNQ3ijUXfo", "oaq3yswHZm6WmJw8OrWp5_wUi3-k", "oaq3ys4hTe-6aeplX-itoglIIX38", "oaq3yswcH74k3VZGTXDe9xFbd_Fc", "oaq3ys7kMDb_ZACwNuMcsWKBcHkY", "oaq3yszZEgnLwa2EKjKrUMeD21aY", "oaq3ys5Rkjab54Oog34bfWk8aEA4", "oaq3ys80mWCFyvvlH6v8xOF-s9eE", "oaq3yswVrm8Vto0D2LCSpNn5E964", "oaq3ys_UN2d1nyQwYrjFSeNppMtM", "oaq3ys9__fQD03DYqfnAgnttcyVI", "oaq3ys81bDZE9B1_Ns6Ud47j6r4c", "oaq3ys99UZM_XN3cc-SLOie8934s", "oaq3ys5W8taDBVGUyd0ylx2rnGGI", "oaq3ys5UrAkJJJNTRMJyd2ejwD44", "oaq3yszJPYYbf37X8vAqTKq2XIZ8", "oaq3ys2ebO2y-DbaDFXNc4b9Ydes", "oaq3ys2X-BYuiPHVOQq3bqe5f0MY", "oaq3ys9JdsCPgPvdav4ZbD-Zpx1Q", "oaq3ys1QXseNCaeKxYTWq4ZvGuq4", "oaq3ys4z2jYKBqLeGCwFijr_rxDE", "oaq3ys809XmuYhZ5X_VcsDduHm-0", "oaq3ys_WGfqozbNE_5OZJ_PG8ZW0", "oaq3ys-HgZDc67XYZWNWW1nhvU0U", "oaq3ys7KOK_79Rk5666AiHpmNQqU", "oaq3ys47nuYsytcRGypfFT18QyDA", "oaq3ys22quCwvvM8rvvLuQBJPLQ8", "oaq3ys2mtUIi1MTR0ciEYBAFcY00", "oaq3ysyKQMqyNZjKy_BgktgyJDI0", "oaq3ys0pSaa18n-Dll8PUxOgXLqY", "oaq3yswNiirituZQzC3Zvcc-tjcw", "oaq3ys5h8NYg6imBG7LANKQdC8iU", "oaq3ys8uDrV1IW0rqJ18wS-fWfx0", "oaq3ys53eH26GM_J6eGQ2oEhzpeA", "oaq3ys9TvtOOr7F9smO4bEBjQoII", "oaq3ys-DWmfhjV5gZ1U2JEJwmyR4", "oaq3ys4-LTCEWdUnfenq5waqIlKU", "oaq3ysyS2rKwXk5BEXcQyqCMcUdE", "oaq3ysz_93JGjAl_Y2_d0FF8KzAo", "oaq3ys1RqCk7Re3TjIEJMpC4Xf9g", "oaq3ys6bMKzDnoQ1Inq3Tjw4VYmo", "oaq3ysxLOsdGpPZNAF_5qy8e0G3M", "oaq3ys0-N0ttLpF0JpPQMx4c3AFc", "oaq3ys5jI8vFTX0ENxHpqIz1puLc", "oaq3ys7EMYOa0DNga9h3EftX-7ZU", "oaq3ysxD1f-G_5lEQNelGU5bk-jc", "oaq3ysw9mVEtOI-iL5e7GeTZW3xI", "oaq3ys5j-NNLAaNh3KaN-IvfzvWg", "oaq3ys1L-OtqBQ7lY2pICz-ICYgc", "oaq3ysznRInOha3jKVMStUMvlj3I", "oaq3ys-MKv2ws1lwYmC76nuk8azI", "oaq3ys77OSMRrk8CsQmxcYaCIrII", "oaq3yswujkUF05CqI4PdF9M4FkzQ", "oaq3ys5w_SzR4yYA8W3Mo5M14Rpc", "oaq3ys7jJNhW5GMN-Yw39OxhuCoQ", "oaq3ysylPkJ8vr0B2cf4J3c-wlnk", "oaq3ys-IWSVTNTK2mP_VhjjUlavw"];
  // return resolve(ids);
  // reject(ids);
  return api.getFollowers((err, resp) => {
    if (err) {
      return reject([err, resp]);
    }
    return resolve(resp.data.openid);
  });
});
const getId = new Promise((resolve, reject) => {
  api.getFollowers((err, resp) => {
    resolve({ err, resp });
  });
});
const batch = (openids) => {//todo test
  let n = 0;
  let to;
  let promise_arr = [];
  const limit = 100;
  while (openids.slice(n, (n + limit)).length > 0) {
    let group = openids.slice(n, (n + limit));
    promise_arr.push(getUsers(group));
    n += limit;
  }
  return new Promise((resolve, reject) => {
    Promise.all(promise_arr).then((arr) => {
      let results = [];
      arr.map((item) => {
        results = results.concat(item);
      });
      return resolve(results);
    }).catch(reject);
  });
}
const getUsers = (openids) => {
  return new Promise((resolve, reject) => {
    return api.batchGetUsers(openids, (err, resp) => {
      if (err) {
        return reject([err, resp]);
      }
      return resolve(resp.user_info_list);
    });
  });
}
const updateUsers = (users) => {
  let operations = [];
  users.map((user) => {
    operations.push({
      updateOne: {
        filter: { openid: user.openid },
        update: user,
        upsert: true
      }
    });
  });
  return User.bulkWrite(operations, { ordered: false });
}

router.get('/api/users', async (ctx, next) => {
  const { search } = ctx.query;
  const toFind = new RegExp(search, 'i');
  // return ctx.body = await User.find({ nickname: toFind });
  return ctx.body = await User.find({
    $or: [
      { remark: toFind },
      { nickname: toFind }
    ]
  });
});
router.post('/api/users', async (ctx, next) => {//user sync
  const result = await getIds.then(batch).then(updateUsers).catch(e => e);
  console.info('sync__', result);
  return ctx.body = result;
});
// router.get('/sync', async (ctx, next) => {
//   const result = await getIds.then(batch).then(updateUsers).catch(e => e);
//   return ctx.body = result;
// });
function sendText(to, message) {
  return new Promise((resolve, reject) => {
    api.sendText(to[0], message, (err, msg) => {
      console.info('sendtext_err', err, msg);
      if (!err) {
        resolve(msg);
      }
      reject(err, msg);
    })
  });
}
function massSend(to, message) {
  return new Promise((resolve, reject) => {
    const opts = {
      "msgtype": "text",
      "text": { "content": message }
    };
    const receivers = to;
    if (receivers.length === 1) {//OpenID最少2个，最多10000个
      receivers[1] = receivers[0];
    }
    api.massSend(opts, receivers, (err, msg) => {
      console.info('massSend__', err, msg);
      if (!err) {
        return resolve(msg);
      }
      reject(err, msg);
    });
  });
}
function sendByTag(tags, message) {
  return new Promise((resolve, reject) => {
    const opts = {
      "msgtype": "text",
      "text": { "content": message },
      "tag_id": tags[0]
    }
    api.massSend(opts, '', (err, msg) => {
      console.info('tag_massSend__', err, msg);
      if (!err) {
        return resolve(msg);
      }
      reject(err, msg);
    });
  });

}
function getTags() {
  return new Promise((resolve, reject) => {
    api.getTags((err, msg) => {
      console.info('gettags__', err, msg);
      if (!err) {
        return resolve(msg);
      }
      reject(err, msg);
    })
  });
}
router.post('/api/send', async (ctx, next) => {
  const params = ctx.request.body;
  console.info('api/send', params);
  const { to, totag, message } = params;
  if (to && to.length === 1) {
    try {
      return ctx.body = await sendText(to, message);
    } catch (e) {
      console.info('sendText__', e);
      try {
        return ctx.body = await massSend(to, message);
      } catch (error) {
        ctx.status = 503;
        return ctx.body = error;
      }
    }
  } else if (totag) {
    return ctx.body = await sendByTag(totag, message);
  } else {
    try {
      return ctx.body = await massSend(to, message);
    } catch (error) {
      ctx.status = 503;
      return ctx.body = error;
    }
  }
  // { totags: [ 2 ], message: 'test' }
});
router.get('/api/tags', async (ctx, next) => {
  const result = await getTags();
  return ctx.body = result.tags;
});
router.post('/api/login', async (ctx, next) => {
  const params = ctx.request.body;
  console.info('login_', params);
  const { username, password } = params;
  if (username === 'admin' && password === 'admin@tianzi') {
    ctx.cookies.set('login', 'true', {
      signed: true,
      maxAge: 30 * 60 * 1000
    });
    return ctx.body = { login: true };
  }
  return ctx.body = { err: true, msg: '账号或密码错误' };
});
router.get('/api/checklogin', (ctx, next) => {
  console.info('checklogin', ctx.cookies.get('login'));
  if (ctx.cookies.get('login')) {
    return ctx.body = { login: true };
  }
  return ctx.body = { login: false };
});
// router.get('/test', (ctx, next) => {
//   ctx.cookies.set('a', 'b');
//   console.info('____,cookie_', ctx.cookies.get('login'));
//   return ctx.body = 'cookies';
// });
router.use('/ids', async (ctx, next) => {
  return ctx.body = await getId;
});
router.get(/(.*)\.js/, (ctx, next) => {
  console.info('@@@', ctx.request.url);
})
router.get('*', (ctx, next) => {
  return ctx.render('index.dt', { title: '天孜' });
});

module.exports = router;
