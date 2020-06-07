import request from '@/utils/request'
// 查询文章列表
export function listBlog(query, hasLoading = false) {
    return request({
        url: '/allBlogs',
        method: 'get',
        params: query,
        hasLoading: hasLoading
    })
}

// 根据id获取文章
export function getBlogById(id, hasLoading = true) {
    return request({
        url: '/getBlogById/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
// 根据id获取文章
export function getBlogByClassification(id, hasLoading = true) {
    return request({
        url: '/getBlogByClassification/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
export function addBlog(article, hasLoading = false) {
    return request({
        url: '/addBlog/',
        method: 'post',
        data: article,
        hasLoading: hasLoading
    })

}
export function updateBlogById(article, hasLoading = false) {
    return request({
        url: '/updateBlogById/',
        method: 'post',
        params: article,
        hasLoading: hasLoading
    })

}
// 删除项目信息
export function delProject(id) {
    return request({
        url: "/delProject/" + id,
        method: 'delete'

    })
}
// 删除信息
export function deleteBlogById(deletef, id, hasLoading = false) {
    return request({
        url: "/deleteBlogById/",
        method: 'post',
        data: { deletef, id },
        hasLoading: hasLoading

    })
}