const classificationsService = require("../service/classificationsService");
const db = require("../config/db")
const Sequelize = db.sequelize;
class classificationsController {
    static async getAllClassifications(ctx) {
        const { query } = ctx.request; // 获取前端传来的参数
        try {
            let data = ''
            await Sequelize.query("select child.name,child.deletf,child.id,child.parentId,parent.name as parentName FROM classifications parent left join classifications child on parent.id=child.parentId or parent.id=0").spread(function(results, metadata) {
                    // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
                    data = results;
                }) // let data = await classificationsService.getAllClassifications(query) // 获取查询的数据
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
    static async getClassificationById(ctx) {
        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await classificationsService.getClassificationById(id) // 获取查询的数据
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
    static async addClassification(ctx) {
        let req = ctx.request.body
        console.log('req', req)

        if (req.name) {
            try {
                let data = await classificationsService.addClassification(req)
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
    static async updateClassificationById(ctx) {
        let req = ctx.request.query;
        console.log('req', req)

        if (req.title && req.content) {
            try {
                let data = await classificationsService.updateClassificationById(req, req.id)
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

module.exports = classificationsController;