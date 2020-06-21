import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    // mode: 'history',

    routes: [{
            path: '/',
            name: 'home',
            component: require('@views/home/layout').default,
            redirect: 'index',
            children: [{
                    path: "/index",
                    name: "index",
                    component: require('@views/home/index').default,
                },

                {
                    path: '/detail',
                    name: 'detail',
                    component: require('@views/home/detail').default
                },
                {
                    path: '/friends',
                    name: 'friends',
                    component: require('@views/home/friends').default
                }
            ]

        },
        {
            path: '/aboutMe',
            name: 'aboutMe',
            component: require('@views/home/aboutMe').default
        },
       

        {
            path: "/admin/login",
            name: "login",
            component: require('@admin/login').default,
        },
        {
            path: '/admin',
            name: "admin",
            component: require('@admin/layout').default,
            redirect: 'index',
            children: [
                // {
                //     path: 'project',
                //     name: "project",
                //     component: require('@admin/project/project').default,
                //     meta: { title: 'project', icon: '' },

                // },
                {
                    path: 'project',
                    name: "管理项目",
                    component: require('@admin/project/index').default,
                    redirect: "project/list-project",
                    meta: { title: 'project', icon: '' },
                    children: [{
                            path: 'list-project',
                            name: "项目列表",
                            component: require('@admin/project/list-project').default,
                            // meta: { title: 's', icon: '' },
                        }

                    ]

                },
                {
                    path: 'index',
                    name: "index",
                    component: require('@admin/index').default,
                    meta: { title: '首页', icon: '' }
                },
                {
                    path: 'blog',
                    name: "管理文章",
                    component: require('@admin/blog/index').default,
                    redirect: "blog/list-blog",
                    meta: { title: 'blog', icon: '' },
                    children: [{
                            path: 'list-blog',
                            name: "文章列表",
                            component: require('@admin/blog/list-blog').default,
                            // meta: { title: 's', icon: '' },
                        },
                        {
                            path: 'add-blog/:id?',
                            name: "增加文章",
                            component: require('@admin/blog/add-blog').default,
                            // meta: { title: '增加文章', icon: '' }
                        },
                    ]

                },
                {
                    path: 'classification',
                    name: "分类管理",
                    component: require("@admin/classification/index").default,
                    meta: { title: "classification", icon: "" },
                    redirect: "classification/list-classification",
                    children: [{
                            path: 'list-classification',
                            name: "分类列表",
                            component: require('@admin/classification/list-classification').default,
                            // meta: { title: 's', icon: '' },
                        },
                        // {
                        //     path: 'add-blog/:id?',
                        //     name: "增加文章",
                        //     component: require('@admin/blog/add-blog').default,
                        //     // meta: { title: '增加文章', icon: '' }
                        // },
                    ]

                },
                {
                    path: 'error',
                    name: "分类管理",
                    component: require("@admin/error/index").default,
                    meta: { title: "error", icon: "" },
                    redirect: "error/list-error",
                    children: [{
                            path: 'list-error',
                            name: "分类列表",
                            component: require('@admin/error/list-error').default,
                            // meta: { title: 's', icon: '' },
                        },
                    ]

                }
            ]
        }
    ]
})