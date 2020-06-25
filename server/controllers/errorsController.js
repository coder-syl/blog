const errorsService = require("../service/errorsService");

class errorsController {
    static async getAllError(ctx) {
        console.log(ctx.request.query);
        console.log(ctx.request.body);
        console.log(ctx.params);
        const curPage = Number(ctx.request.query.curPage);
        const pageSize = Number(ctx.request.query.pageSize);
        try {
            let data = await errorsService.getAllError(curPage, pageSize); // 获取查询的数据
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
    static async getErrorByClassification(ctx) {
        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await errorsService.getErrorByClassification(id); // 获取查询的数据
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
    static async getErrorById(ctx) {
        const id = ctx.params.id; // 获取前端传来的参数
        try {
            let data = await errorsService.getErrorById(id); // 获取查询的数据
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
    static async getErrorOrderByVisitCount(ctx) {
        try {
            let data = await errorsService.getErrorOrderByVisitCount(); // 获取查询的数据
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
    static async addError(ctx) {
        let req = ctx.request.body;
        console.log("req", req);

        if (req.errorStack && req.content) {
            try {
                let data = await errorsService.addError(req);
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
    static async updateErrorById(ctx) {
        let req = ctx.request.body;
        console.log("req", req);

        if (req.title && req.content) {
            try {
                let data = await errorsService.updateErrorById(req, req.id);
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
    static async deleteErrorById(ctx) {
        let req = ctx.request.body;
        console.log(req.deletef, req.id);
        if (req.deletef && req.id) {
            try {
                let data = await errorsService.deleteErrorById(req.deletef, req.id);
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
                msg: "参数不全------"
            };
        }
    }
}

module.exports = errorsController;