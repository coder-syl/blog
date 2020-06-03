const db = require('../config/db') // 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Blogs = Sequelize.import('../model/blogs')
Blogs.sync({ force: false })

class blogsService {
    /** 获取所有文章 */
    static async  getAllBlog(query) {
        return await Blogs.findAll({
            where: {
                ...query
            },
            order: [
                ["id", "ASC"]
            ],
        })

    }
    static async getBlogById(id) {
        return await Blogs.findOne({
            where: {
                id: id
            }
        })
    }
    static async addBlog(data) {
        console.log("tianjia shuju ")
        return await Blogs.create({
           ...data,
           
        })
    }
    static async updateBlogById(data, id) {
        console.log(data, id)
        return await Blogs.update({
            ...data
        }, {
            where: {
                id: id
            }
        })
    }
    static async deleteBlogById(data, id) {
        console.log(data, id)
        return await Blogs.update({
            ...data
        }, {
            where: {
                id: id
            }
        })
    }
}


module.exports = blogsService;
