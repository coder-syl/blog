const jsonTree = (data, parentId) => {
  var itemArr = [];
  for (var i = 0; i < data.length; i++) {
    var node = data[i];
    var newNode = {};
    if (node.parentId === parentId) {
      newNode.id = node.id;
      newNode.name = node.name;
      // 编写文章中树形结构用
      newNode.label = node.name;
      newNode.created_time = node.created_time;
      newNode.deletef = node.deletef;
      newNode.parent_name = node.parent_name ? node.parent_name : "顶级";
      newNode.children = jsonTree(data, node.id);
      itemArr.push(newNode);
    }
  }
  return itemArr;
};
module.exports.jsonTree = jsonTree;

let getUploadDirName = () => {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
};
module.exports.getUploadDirName = getUploadDirName;
