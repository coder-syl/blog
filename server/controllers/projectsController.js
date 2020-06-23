const projectsService = require("../service/projectsService");

class projectsController {
    static async getAllProjects(ctx) {
        const { query } = ctx.request; // 获取前端传来的参数
        try {
            let data = await projectsService.getAllProjects(query)
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
    static async getProjectById(ctx) {
        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await projectsService.getProjectById(id) // 获取查询的数据
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data,
                count: data.length
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err,
            }
        }
    }
    static async addProject(ctx) {
        let req = ctx.request.body

        if (req.name) {
            try {
                let data = await projectsService.addProject(req)
                ctx.response.status = 200
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data
                }
            } catch (err) {
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
    static async updateProjectById(ctx) {
        let req = ctx.request.body;

        if (req.name && req.id) {
            try {
                let data = await projectsService.updateProjectById(req, req.id)
                ctx.response.status = 200
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data
                }
            } catch (err) {
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
                msg: '参数不全----------',
            }
        }
    }
    static async deleteProjectById(ctx) {
        let req = ctx.request.body;


        if (req.deletef && req.id) {
            try {
                let data = await projectsService.deleteProjectById(req.deletef, req.id)
                ctx.response.status = 200
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data
                }
            } catch (err) {
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

module.exports = projectsController;