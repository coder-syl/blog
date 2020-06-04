const db = require("../config/db")
const Sequelize = db.sequelize;
const Classifications = Sequelize.import('../model/classifications')
Classifications.sync({ force: false })
const dataHandler= require("./../utils/dataHandler")

class classificationsService {
    /** 获取所有文章 */
    static async  getAllClassifications(query) {
        let data=null
        await Sequelize.query("select child.name,child.deletef,child.id,child.parentId,child.created_time ,parent.name as parent_name FROM classifications parent right join classifications child on parent.id=child.parentId or child.parentId=child.id").spread(function (results, metadata) {
            // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
            // console.log(results,'results');
        //    data= results;
        // console.log(results)
           data=  dataHandler.jsonTree(results,0)
        })
        return data 
        // let data = await classificationsService.getAllClassifications(query) // 获取查询的数据
        // return await Classifications.findAll({
        //     where: {
        //         ...query
        //     },
        //     order: [
        //         ["id", "ASC"]
        //     ],
        // })

    }
    static async getClassificationById(id) {
        return await Classifications.findOne({
            where: {
                id: id
            }
        })
    }
    static async addClassification(data) {
        console.log("tianjia shuju ")
        return await Classifications.create({
            ...data,

        })
    }
    static async updateClassificationById(data, id) {
        console.log(data, id)
        return await Classifications.update({
            ...data
        }, {
            where: {
                id: id
            }
        })
    }
    static async deleteClassificationById(deletef, id) {
        console.log(deletef, id)
        return await Classifications.update({
            deletef:deletef
        }, {
            where: {
                id: id
            }
        })
    }
}

module.exports = classificationsService;
