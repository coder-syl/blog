import request from '@/utils/request'
// 查询文章列表
export function listBlog(query, hasLoading = false) {
    return request({
        url: '/articles',
        method: 'get',
        // params: query,
        hasLoading: hasLoading
    })
}

// 根据id获取文章
export function getBlogById(id, hasLoading = true) {
    return request({
        url: '/getArticlesById/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
export function addBlog(article, hasLoading = false) {
    return request({
        url: '/addArticles/',
        method: 'post',
        params: article,
        hasLoading: hasLoading
    })

}
export function updateBlogById(article, hasLoading = false) {
    return request({
        url: '/updateArticlesById/',
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