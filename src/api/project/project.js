import request from '@/utils/request'
// 查询项目信息列表
export function listProject(query, hasLoading = false) {
    return request({
        url: 'admin/listProject',
        method: 'get',
        params: query,
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