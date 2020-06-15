const Koa = require("koa")
const dataHandler = require("./utils/dataHandler")
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const path = require("path");
const app = new Koa()
const http = require('http');
// app.use(bodyParser());
const blogs = require("./routes/blogsRouter")
const classifications = require("./routes/classificationsRouter")
const projects = require("./routes/projectsRouter")
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        uploadDir: path.join(__dirname, './public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            console.log(`name: ${name}`);
            console.log(file.path);

        },
    }
}));
// 配置静态资源
const staticPath = './public/upload/'
console.log(path.join(__dirname, staticPath))
app.use(require('koa-static')(path.join(__dirname, staticPath)));


app.use(blogs.routes(), blogs.allowedMethods());
app.use(classifications.routes(), classifications.allowedMethods())
app.use(projects.routes(), projects.allowedMethods())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

http.createServer(app.callback()).listen(3000);

console.log('server is running on port: %s', 3000);
// module.exports = app