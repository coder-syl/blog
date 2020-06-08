const blogsService = require("../service/blogsService");

class blogsController {
    static async getAllBlog(ctx) {
        try {
            let data = await blogsService.getAllBlog(); // 获取查询的数据
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data,
                count: data.length
            };
        } catch (err) {
            console.log(err);
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "error",
                err
            };
        }
    }
    static async getBlogByClassification(ctx) {
        console.log('获取数据===============')

        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await blogsService.getBlogByClassification(id); // 获取查询的数据
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data,
                count: data.length
            };
        } catch (err) {
            console.log(err);
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "error",
                err
            };
        }
    }
    static async getBlogById(ctx) {
        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await blogsService.getBlogById(id); // 获取查询的数据
            console.log(data)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data,
                count: data.length
            };
        } catch (err) {
            console.log(err);
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "error",
                err
            };
        }
    }
    static async addBlog(ctx) {
        let req = ctx.request.body
        console.log("req", req);

        if (req.title && req.content) {
            try {
                let data = await blogsService.addBlog(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data
                };
            } catch (err) {
                console.log(err);
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "error",
                    err
                }
            };
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: "参数不全"
            };
        }
    }
    static async updateBlogById(ctx) {
        let req = ctx.request.body
        console.log("req", req);

        if (req.title && req.content) {
            try {
                let data = await blogsService.updateBlogById(req, req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data
                };
            } catch (err) {
                console.log(err);
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "error",
                    err
                };
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: "参数不全"
            };
        }
    }
    static async deleteBlogById(ctx) {
        let req = ctx.request.body;
        console.log(req.deletef, req.id)
        if (req.deletef && req.id) {
            try {
                let data = await blogsService.deleteBlogById(req.deletef, req.id)
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
                msg: '参数不全------',
            }
        }
    }
}

module.exports = blogsController;