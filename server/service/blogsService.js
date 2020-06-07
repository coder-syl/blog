const db = require('../config/db') // 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Blogs = Sequelize.import('../model/blogs')
Blogs.sync({ force: false })
const equelize = require('sequelize')
const Op = equelize.Op;

class blogsService {
    /** 获取所有文章 */
    static async getAllBlog() {
            let data = null
            await Sequelize.query("select child.id,child.title,child.classification_id,child.parent_classification_id,child.author,child.content,child.htmlContent,child.created_time,child.updated_time,child.visit_count,child.reply_count,child.deletef,parent.name as classification_name FROM classifications parent right join blogs child on parent.id=child.classification_id where child.deletef=0").spread(function(results, metadata) {
                // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
                // console.log(results,'results');
                data = results;
                // console.log(results)
                //    data=  dataHandler.jsonTree(results,0)
            })
            return data
                // return await Blogs.findAll({
                //     order: [
                //         ["id", "ASC"]
                //     ],
                // })

        }
        /** 根据分类id获取文章 */
    static async getBlogByClassification(id) {
        return await Blogs.findAll({
            where: {
                [Op.or]: [{ classification_id: new Number(id) }, { parent_classification_id: new Number(id) }]

                // $or:[
                //     {
                //         classification_id: id 
                //     },
                //     {
                //         parent_classification_id: id
                //     }
                // ]
                // classification_id：{

                // }
                // [Op.or]: [
                //     {'classification_id': id},
                //     {'parent_classification_id': id}
                // ]
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
    static async deleteBlogById(deletef, id) {
        return await Blogs.update({
            deletef: deletef
        }, {
            where: {
                id: id
            }
        })
    }
}


module.exports = blogsService;