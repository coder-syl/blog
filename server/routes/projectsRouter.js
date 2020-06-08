const router = require('koa-router')()
const projectsController = require('../controllers/projectsController')

router.prefix("/api/v1")

router.get('/allProjects', projectsController.getAllProjects)
router.post('/addProject', projectsController.addProject)
router.get('/getProjectById/:id', projectsController.getProjectById)
router.post('/updateProjectById/', projectsController.updateProjectById)
router.post('/deleteProjectById/', projectsController.deleteProjectById)

// router.put('/blog', articleController.updateBlog)
// router.post('/upload', upload.single('avatar'), async (ctx, next) => {
//     console.log('123')
//     ctx.body = {
//         'body': ctx.req.body
//     }
// })

module.exports = router