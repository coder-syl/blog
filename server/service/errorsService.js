const db = require("../config/db"); // 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Errors = Sequelize.import("../model/errors");
Errors.sync({ force: false });
const equelize = require("sequelize");
const Op = equelize.Op;

class errorsService {
    /** 获取所有文章 */
    static async getAllError(curPage, pageSize) {
            let offset = (curPage - 1) * pageSize;

            return await Errors.findAndCountAll({
                //offet去掉前多少个数据
                offset,
                //limit每页数据数量
                limit: pageSize,
                order: [
                    ["id", "DESC"]
                ]
            });
        }
        /** 根据分类id获取文章 */
    static async getErrorByClassification(id) {
        return await Errors.findAll({
            where: {
                deletef: 0,
                [Op.or]: [
                    { classification_id: new Number(id) },
                    { parent_classification_id: new Number(id) }
                ]
            },
            order: [
                ["id", "ASC"]
            ]
        });
    }
    static async getErrorById(id) {
        return await Errors.findOne({
            where: {
                id: id
            }
        });
    }
    static async getErrorOrderByVisitCount(id) {
        return await Errors.findAll({
            where: {
                deletef: 0
            },
            order: [
                ["visit_count", "DESC"]
            ],
            limit: 5
        });
    }
    static async addError(data) {
        return await Errors.create({
            ...data
        });
    }
    static async updateErrorById(data, id) {
        return await Errors.update({
            ...data
        }, {
            where: {
                id: id
            }
        });
    }
    static async deleteErrorById(deletef, id) {
        return await Errors.update({
            deletef: deletef
        }, {
            where: {
                id: id
            }
        });
    }
}

module.exports = errorsService;