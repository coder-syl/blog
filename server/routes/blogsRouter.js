const router = require('koa-router')()
const blogsController = require('../controllers/blogsController')
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

router.get('/allBlogs', blogsController.getAllBlog)
router.post('/addBlog', blogsController.addBlog)
router.get('/getBlogById/:id', blogsController.getBlogById)
router.get('/getBlogByClassification/:id', blogsController.getBlogByClassification)
router.post('/updateBlogById/', blogsController.updateBlogById)
router.post('/deleteBlogById/', blogsController.deleteBlogById)

// router.put('/blog', articleController.updateBlog)
// router.post('/upload', upload.single('avatar'), async (ctx, next) => {
//     console.log('123')
//     ctx.body = {
//         'body': ctx.req.body
//     }
// })

module.exports = router