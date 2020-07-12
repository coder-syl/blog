import request from "@/utils/request";
// 查询文章列表
export function listProjects(
  query = {
    curPage: 0,
    pageSize: 0
  },
  hasLoading = false
) {
  return request({
    url: "/allProjects",
    method: "get",
    params: query,
    hasLoading: hasLoading
  });
}

// 根据id获取Project
export function getProjectById(id, hasLoading = true) {
  return request({
    url: "/getProjectById/" + id,
    method: "get",
    // params:query,
    hasLoading: hasLoading
  });
}
// 根据id获取文章
export function uploadImg(fd, hasLoading = true) {
  return request({
    url: "/upload",
    method: "post",
    data: fd,
    hasLoading: hasLoading
  });
}
export function addProject(article, hasLoading = false) {
  return request({
    url: "/addProject/",
    method: "post",
    data: article,
    hasLoading: hasLoading
  });
}
export function updateProjectById(data, hasLoading = false) {
  return request({
    url: "/updateProjectById/",
    method: "post",
    data: data,
    hasLoading: hasLoading
  });
}
// 删除项目信息
export function deleteProjectById(deletef, id, hasLoading = false) {
  return request({
    url: "/deleteProjectById/",
    method: "post",
    data: { deletef, id },
    hasLoading: hasLoading
  });
}
