const router = require('koa-router')()
const errorsController = require('../controllers/errorsController')
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

router.get('/allErrors', errorsController.getAllError)
router.post('/addError', errorsController.addError)
router.get('/getErrorById/:id', errorsController.getErrorById)
router.get('/getErrorOrderByVisitCount', errorsController.getErrorOrderByVisitCount)
router.get('/getErrorByClassification/:id', errorsController.getErrorByClassification)
router.post('/updateErrorById/', errorsController.updateErrorById)
router.post('/deleteErrorById/', errorsController.deleteErrorById)

// router.put('/blog', articleController.updateError)
// router.post('/upload', upload.single('avatar'), async (ctx, next) => {
//     console.log('123')
//     ctx.body = {
//         'body': ctx.req.body
//     }
// })

module.exports = router