import request from "@/utils/request";
// 查询文章列表
export function getSatrsByUid(

    urlString = ''
) {
    return request({
        url: "/getSatrsByUid",
        method: "get",
        params: { urlString: urlString }
    });
}

