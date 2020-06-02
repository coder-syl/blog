const db= require("../config/db")
const Sequelize = db.sequelize;
const Classifications = Sequelize.import('../model/classifications')
Classifications.sync({force:false})

class classificationsService{
     /** 获取所有文章 */
     static async  getAllClassifications(query) {
        return await Classifications.findAll({
            where: {
                ...query
            },
            order: [
                ["id", "ASC"]
            ],
        })

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
}

module.exports = classificationsService;
