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
  }
}
