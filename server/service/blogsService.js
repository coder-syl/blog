const db = require("../config/db"); // 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Blogs = Sequelize.import("../model/blogs");
Blogs.sync({ force: false });
const equelize = require("sequelize");
const Op = equelize.Op;

class blogsService {
  /** 获取所有文章 */
  static async getAllBlog(curPage=0, pageSize=0) {
    let offset = (curPage - 1) * pageSize;

    let data ={
      rows:'',
      count:0,
    };
    let condition=''
    if(curPage===0){
      condition=''
    }else{
      condition=" limit " + pageSize +" offset " + offset
    }
    console.log(condition,'condition')
    await Sequelize.query(
      "select  blogs.id,blogs.title,blogs.classification_id,blogs.parent_classification_id,blogs.author,blogs.content,blogs.htmlContent,blogs.created_time,blogs.updated_time,blogs.visit_count,blogs.reply_count,blogs.deletef,classifications.name as classification_name FROM blogs,classifications where classifications.id=blogs.classification_id and blogs.deletef=0" + condition       
    ).spread(function(results, metadata) {
      // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
      // console.log(results,'results');
      data.rows = results;
      // console.log(results)
      //    data=  dataHandler.jsonTree(results,0)
    });
    await Sequelize.query(
      "select  count(*) as count from blogs"
    ).spread((results, metadata)=>{
      console.log(results,'results=====================')
      data.count=results[0].count
    })
    return data;
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
        deletef: 0,
        [Op.or]: [
          { classification_id: new Number(id) },
          { parent_classification_id: new Number(id) }
        ]

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
      order: [["id", "ASC"]]
    });
  }
  static async getBlogById(id) {
    return await Blogs.findOne({
      where: {
        id: id
      }
    });
  }
  static async getBlogOrderByVisitCount(id) {
    return await Blogs.findAll({
      where: {
        deletef: 0
      },
      order: [["visit_count", "DESC"]],
      limit: 5
    });
  }
  static async addBlog(data) {
    return await Blogs.create({
      ...data
    });
  }
  static async updateBlogById(data, id) {
    return await Blogs.update(
      {
        ...data
      },
      {
        where: {
          id: id
        }
      }
    );
  }
  static async deleteBlogById(deletef, id) {
    return await Blogs.update(
      {
        deletef: deletef
      },
      {
        where: {
          id: id
        }
      }
    );
  }
}

module.exports = blogsService;
