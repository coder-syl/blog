const router = require('koa-router')()
const articleController = require('../controllers/articlesController')
    // const multer = require('koa-multer');

router.prefix('/api/v1')

//配置    
// var storage = multer.diskStorage({
//     //文件保存路径
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/')  //注意路径必须存在
//     },
//     //修改文件名称
//     filename: function (req, file, cb) {
//         var fileFormat = (file.originalname).split(".");
//         cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })

// //加载配置
// var upload = multer({ storage: storage })

router.get('/articles', articleController.getAllBlog)
router.post('/addArticles', articleController.addBlog)
router.get('/getArticlesById/:id', articleController.getBlogById)
router.post('/updateArticlesById/', articleController.updateBlogById)
    // router.put('/blog', articleController.updateBlog)
    // router.post('/upload', upload.single('avatar'), async (ctx, next) => {
    //     console.log('123')
    //     ctx.body = {
    //         'body': ctx.req.body
    //     }
    // })

module.exports = router