const router = require('koa-router')()
const projectsController = require('../controllers/projectsController')

router.prefix("/api/v1")

router.get('/allProjects', projectsController.getAllProjects)
router.post('/addProject', projectsController.addProject)
router.get('/getProjectById/:id', projectsController.getProjectById)
router.post('/updateProjectById/', projectsController.updateProjectById)
router.post('/deleteProjectById/', projectsController.deleteProjectById)

// router.put('/blog', articleController.updateBlog)
router.post('/upload', async (ctx, next) => {
    // console.log('123')
    // ctx.body = {
    //     'body': ctx.req.body
    // }
    let data = ctx.request.files
    let tempPath = String(data.avatar.path).split('\\')
    data.avatar.path = tempPath[tempPath.length - 1]
    // console.log(ctx.request.body)
    try {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: 'success',
            data,
            count: data.length
        }
    } catch (err) {
        console.log(err)
        ctx.response.status = 412;
        ctx.body = {
            code: 412,
            msg: 'error',
            err,
        }
    }
})

module.exports = router