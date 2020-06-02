const articleService = require('../service/articlesService') 
// import { getAllBlog } from "../service/article";

class articleController{
   static async  getAllBlog(ctx) {
        const { query } = ctx.request; // 获取前端传来的参数
        try {
            let data = await articleService.getAllBlog(query) // 获取查询的数据
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
    }
   static async  getBlogById(ctx) {
        const  id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await articleService.getBlogById(id) // 获取查询的数据
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
    }
    static async addBlog(ctx){
        let req = ctx.request.query;
        console.log('req',req)

        if (req.title && req.content) {
            try {
                let data = await articleService.addBlog(req)
                ctx.response.status = 200
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data
                }
            } catch (err) {
                console.log(err)
                ctx.response.status = 412
                ctx.body = {
                    code: 412,
                    msg: 'error',
                    err
                }
            }
        } else {
            ctx.response.status = 416
            ctx.body = {
                code: 416,
                msg: '参数不全',
            }
        }
    }
}

module.exports = articleController;


