import axios from "axios";
// import { Notification, MessageBox, Loading } from "element-ui";
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// 根据环境确定baseUrl
let lodingService = undefined;
let hasLoading = false;

// 创建axios实例
let httpCode = {
    //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
    400: "请求参数错误",
    401: "权限不足, 请重新登录",
    403: "服务器拒绝本次访问",
    404: "请求资源未找到",
    500: "内部服务器错误",
    501: "服务器不支持该请求中使用的方法",
    502: "网关错误",
    504: "网关超时"
};
let service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:3000/api/v1 ',
    // 超时
    timeout: 1000000
});
service.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// request拦截器
service.interceptors.request.use(
    axiosConfig => {
        if (axiosConfig.hasLoading) {
            // 打开loading
            hasLoading = true;
            // lodingService = Loading.service({ text: "拼命加载中..." });
        }
        // if (axiosConfig.method == "post") {
        //     axiosConfig.params = {};
        // }
        return axiosConfig; //axios 规定返回config
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    res => {
        if (hasLoading) {
            // 打开loading
            // lodingService.close();
        }

        const code = res.status;
        // if (code === 401) {
        //     MessageBox.confirm(
        //         '登录状态已过期，您可以继续留在该页面，或者重新登录',
        //         '系统提示',
        //         {
        //             confirmButtonText: '重新登录',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //         }
        //     ).then(() => {
        //         store.dispatch('LogOut').then(() => {
        //             location.reload() // 为了重新实例化vue-router对象 避免bug
        //         })
        //     })
        // } else
        if (code !== 200) {
            if (hasLoading) {
                // 打开loading
                // lodingService.close();
            }
            console.log({
                title: res.data.status.message
            });
            return Promise.reject("error");
        } else {
            return Promise.resolve(res.data);
        }
    },
    error => {
        if (hasLoading) {
            // 打开loading
            // lodingService.close();
        }
        if (error.response) {
            let tips =
                error.response.status in httpCode ?
                httpCode[error.response.status] :
                error.response.data.message;
            console.log({
                message: tips,
                type: "error"
            });
            if (error.response.status === 401) {
                // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
                router.push({
                    path: `/login`
                });
            }
            return Promise.reject(error);
        } else {
            console.log({
                message: error,
                type: "error",
                duration: 5 * 1000
            });
            return Promise.reject(error);
        }
    }
);

export default service;