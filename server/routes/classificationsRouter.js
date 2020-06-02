const router = require('koa-router')()
const classificationsController = require('../controllers/classificationsController')

router.prefix("/api/v1")

router.get('/allClassifications', classificationsController.getAllClassifications)
router.post('/addClassification', classificationsController.addClassification)
router.get('/getClassificationById/:id',classificationsController.getClassificationById)
router.post('/updateClassificationsById/', classificationsController.updateClassificationById)

// router.put('/blog', articleController.updateBlog)
// router.post('/upload', upload.single('avatar'), async (ctx, next) => {
//     console.log('123')
//     ctx.body = {
//         'body': ctx.req.body
//     }
// })

module.exports = router