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
            newNode.deletf = node.deletf;
            newNode.parent_name = node.parent_name ? node.parent_name : "顶级";
            newNode.children = jsonTree(data, node.id);
            itemArr.push(newNode);
        }
    }
    return itemArr;
}
module.exports.jsonTree = jsonTree