import request from "@/utils/request";
// 查询文章列表
export function listLangicons(
  query = {
    curPage: 0,
    pageSize: 0
  },
  hasLoading = false
) {
  return request({
    url: "/allLangicons",
    method: "get",
    params: query,
    hasLoading: hasLoading
  });
}

// 根据id获取Langicon
export function getLangiconById(id, hasLoading = true) {
  return request({
    url: "/getLangiconById/" + id,
    method: "get",
    // params:query,
    hasLoading: hasLoading
  });
}
// 根据id获取文章
export function uploadImg(fd, hasLoading = true) {
  return request({
    url: "/uploadLangicon/",
    method: "post",
    data: fd,
    hasLoading: hasLoading
  });
}
export function addLangicon(article, hasLoading = false) {
  return request({
    url: "/addLangicon/",
    method: "post",
    data: article,
    hasLoading: hasLoading
  });
}
export function updateLangiconById(data, hasLoading = false) {
  return request({
    url: "/updateLangiconById/",
    method: "post",
    data: data,
    hasLoading: hasLoading
  });
}
// 删除项目信息
export function deleteLangiconById(deletef, id, hasLoading = false) {
  return request({
    url: "/deleteLangiconById/",
    method: "post",
    data: { deletef, id },
    hasLoading: hasLoading
  });
}
