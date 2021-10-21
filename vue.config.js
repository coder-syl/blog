const path = require("path");


function resolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@views": resolve("./src/views"),
        "@admin": resolve("./src/views/admin"),
        "@components": resolve("./src/components")
      }
    }
  },
  css: {
    loaderOptions: {
        sass: {
          // @/ is an alias to src/
          // so this assumes you have a file named `src/variables.scss`
          prependData: `@import "./src/assets/style/scss/app.scss";`
        }
    }
},


}
