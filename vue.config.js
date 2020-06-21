const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
var webpack = require("webpack");

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
// 开发环境是否需要使用cdn,true的情况下可以在浏览器看到对应的引入资源的标签
const devNeedCdn = false;

// html-webpack-plugin配置cdn
const cdn = {
    // 左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
    // 模块名称和模块作用域命名（对应window里面挂载的变量名称）
    //externals保证 webpack 在 dev 运行或 build 打包时，
    // 就不会去本地组件包中查找这些在 externals 中注册的组件了（自然也不会将他们打包到一个 app.js 中去），
    // 而是会去 window 域下直接调用 Vue, VueRouter, $ 等对象。
    externals: {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        "element-ui": "ELEMENT"
    },
    // cdn的css链接
    css: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"],
    js: [
        "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js",
        "https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js",
        "https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js",
        "https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js",
        "https://unpkg.com/element-ui/lib/index.js"
    ]
};

module.exports = {
    // 是都开启eslint
    // lintOnSave: false,
    // 设置静态资源，防止找不到
    publicPath: "./",
    //
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    // configureWebpack支持函数写法
    configureWebpack: {
        devtool: isProduction ? "cheap-module-source-map" : false, //选择合适的打包方式  'cheap-module-source-map'适合开发环境
        externals: isProduction || devNeedCdn ? cdn.externals : {},
        resolve: {
            alias: {
                "@": resolve("src"),
                "@views": resolve("src/views"),
                "@admin": resolve("src/views/admin"),
                "@components": resolve("src/components")
            }
        },
        devServer: {
            overlay: {
                warnings: true,
                errors: true
            }
        },
        // devServer: {
        //     open: false, // 自动启动浏览器
        //     host: '0.0.0.0', // localhost
        //     port: 6060, // 端口号
        //     https: false,
        //     hotOnly: false, // 热更新
        //     proxy: {
        //         '^/api/v1': {
        //             target: process.env.VUE_APP_SSO, // 重写路径
        //             ws: true, //开启WebSocket
        //             secure: false, // 如果是https接口，需要配置这个参数
        //             changeOrigin: true
        //         }
        //     }
        // },
        plugins: [
            new CompressionWebpackPlugin({
                algorithm: "gzip",
                test: /\.(js|css)$/, // 匹配文件名
                threshold: 10000, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 不删除源文件
                minRatio: 0.8 // 压缩比
            }),
            //只打包改变的文件
            new webpack.HashedModuleIdsPlugin({
                hashFunction: "sha256",
                hashDigest: "hex",
                hashDigestLength: 20
            })
        ],
        optimization: {
            // optimization.minimize 属性就像是 optimization.minimizer 的开关，
            minimize: isProduction ? true : false,
            // optimization.minimizer 属性是用来放入各种压缩 js 程序套件，如 TerserWebpackPlugin。
            minimizer: [
                // 打包移除console
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false // 去掉注释
                        },
                        parallel: true, // 启用并行压缩
                        cache: true, // 启用缓存
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"] // 移除console
                        }
                    }
                })
            ],
            splitChunks: {
                chunks: "async",
                minSize: 30000, //单位是byte，超过这个大小的文件才会被打包
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: "~",
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin("html").tap(options => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) options[0].cdn = cdn;
            return options;
        });

        // if (isProduction) {
        //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

        // }
    },
    //vue-cli3 自带css分离
    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)

        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
        extract: isProduction ? true : false,
        // 是否开启 CSS source map？
        sourceMap: true,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {},
        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        requireModuleExtension: true
    }
};