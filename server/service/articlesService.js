const db = require('../config/db') // 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Articles = Sequelize.import('../model/articles')
Articles.sync({ force: false })

class articleService {
    /** 获取所有文章 */
    static async getAllBlog(query) {
        return await Articles.findAll({
            where: {
                ...query
            },
            order: [
                ["id", "ASC"]
            ],
        })

    }
    static async getBlogById(id) {
        return await Articles.findOne({
            where: {
                id: id
            }
        })
    }
    static async addBlog(data) {
        console.log("tianjia shuju ")
        return await Articles.create({
            ...data,

        })
    }
    static async updateBlogById(data, id) {
        console.log(data, id)
        return await Articles.update({
            ...data
        }, {
            where: {
                id: id
            }
        })
    }

}


module.exports = articleService;