import request from '@/utils/request'
// 查询文章列表
export function listClassifications(query, hasLoading = false) {
    return request({
        url: '/allClassifications',
        method: 'get',
        // params: query,
        hasLoading: hasLoading
    })
}

// 根据id获取文章
export function getClassificationById(id, hasLoading = true) {
    return request({
        url: '/getClassificationById/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
export function addClassification(article, hasLoading = false) {
    return request({
        url: '/addClassification/',
        method: 'post',
        data: article,
        hasLoading: hasLoading
    })

}
export function updateClassificationById(article, hasLoading = false) {
    return request({
        url: '/updateClassificationById/',
        method: 'post',
        params: article,
        hasLoading: hasLoading
    })

}
// 删除项目信息
export function deleteClassificationsById(deletf,id,hasLoading = false) {
    return request({
        url: "/deleteClassificationsById/" + id,
        method: 'post',
        data:{deletf,id},
        hasLoading: hasLoading

    })
}