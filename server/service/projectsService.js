const db = require("../config/db");
const Sequelize = db.sequelize;
const projects = Sequelize.import("../model/projects");
projects.sync({ force: false });
const dataHandler = require("../utils/dataHandler");

class projectsService {
  /** 获取所有文章 */
  static async getAllProjects(curPage = 0, pageSize = 0) {
    // let data = null
    // await Sequelize.query("select child.name,child.deletef,child.id,child.parentId,child.created_time ,parent.name as parent_name FROM projects parent right join projects child on parent.id=child.parentId or child.parentId=child.id").spread(function(results, metadata) {
    //     // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
    //     // console.log(results,'results');
    //     //    data= results;
    //     // console.log(results)
    //     data = dataHandler.jsonTree(results, 0)
    // })
    // return data
    // let data = await projectsService.getAllprojects() // 获取查询的数据
    let offset = (curPage - 1) * pageSize;
    if (curPage !== 0) {
      return await projects.findAndCountAll({
        //offet去掉前多少个数据
        offset: offset,
        //limit每页数据数量
        limit: pageSize,
        where: {
          deletef: 0
        },
        order: [["id", "ASC"]]
      });
    } else {
      return await projects.findAndCountAll({
        where: {
          deletef: 0
        },
        order: [["id", "ASC"]]
      });
    }
  }
  static async getProjectById(id) {
    return await projects.findOne({
      where: {
        id: id
      }
    });
  }
  static async addProject(data) {
    console.log("tianjia shuju ");
    return await projects.create({
      ...data
    });
  }
  static async updateProjectById(data, id) {
    console.log(data, id);
    return await projects.update(
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
  static async deleteProjectById(deletef, id) {
    console.log(deletef, id);
    return await projects.update(
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

module.exports = projectsService;
