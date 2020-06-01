// import Vue from 'vue'
import camelCase from 'lodash/camelCase'
//引入所有的组件
// require.context的三个参数
// 要搜索的文件夹目录
// 是否搜索它的子目录
// 以及一个匹配文件的正则表达式

// require.context模块导出（返回）一个（require）函数，
// 这个函数可以接收一个参数：request 函数–这里的 request 应该是指在 require() 语句中的表达式


// 注册全局组件。
// 使用Vue.component()方法注册全局组件。
// 第一个参数是自定义元素名称，也就是将来在别的组件中使用这个组件的标签名称。
// 第二个参数是将要注册的Vue组件。

const requireComponents = require.context('@components', true, /\.vue/)
// console.log(requireComponents)
// 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面可直接枚
export default {
    install: function (_Vue) {
        requireComponents.keys().forEach(fileName => {
            console.log("fileNAme", fileName)
            // 组件实例
            const reqCom = requireComponents(fileName)
            // 自定义组件名
            // 这里使用
            const componentName = camelCase(fileName.replace(/\.\w+/, '').replace(/\.\//, '').replace(/\w+\//, ''))
            console.log("componentName-1", componentName)
            // console.log('componentName-2', reqCom.default.name)
            // console.log("reqCom", reqCom.default)
            // console.log("reqCom", reqCom)
            // 如果这个组件选项是通过 `export default` 导出的，
            // 那么就会优先使用 `.default`，
            // 否则回退到使用模块的根。
            _Vue.component(componentName, reqCom.default || reqCom)
            // console.log(Vue.prototype)
        })
    }
}