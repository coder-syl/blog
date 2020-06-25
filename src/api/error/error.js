import request from '@/utils/request'
// 查询文章列表
export function listError(query, hasLoading = false) {
    console.log('============1', query, )
    return request({
        url: '/allErrors',
        method: 'get',
        params: query,
        hasLoading: hasLoading
    })
}
export function getErrorOrderByVisitCount(hasLoading = false) {
    return request({
        url: '/getErrorOrderByVisitCount',
        method: 'get',
        params: query,
        hasLoading: hasLoading
    })
}

// 根据id获取文章
export function getErrorById(id, hasLoading = true) {
    return request({
        url: '/getErrorById/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
// 根据id获取文章
export function getErrorByClassification(id, hasLoading = true) {
    return request({
        url: '/getErrorByClassification/' + id,
        method: 'get',
        // params:query,
        hasLoading: hasLoading
    })
}
export function addError(errors, hasLoading = false) {
    return request({
        url: '/addError/',
        method: 'post',
        data: errors,
        hasLoading: hasLoading
    })

}
export function updateErrorById(errors, hasLoading = false) {
    return request({
        url: '/updateErrorById/',
        method: 'post',
        data: errors,
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
export function deleteErrorById(deletef, id, hasLoading = false) {
    return request({
        url: "/deleteErrorById/",
        method: 'post',
        data: { deletef, id },
        hasLoading: hasLoading

    })
}