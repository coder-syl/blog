const Koa = require("koa")
const app = new Koa()
const http = require('http');

const article = require("./routes/articlesRouter")

app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

app.use(article.routes(), article.allowedMethods())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

http.createServer(app.callback()).listen(3000);
console.log('server is running on port: %s', 3000);
// module.exports = app
