const fs = require("fs");
const http = require("http");

const glob = require("glob");
const path = require("path");
let curFileNo = 0;

class UploadSourceMapWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tap("upload-sourecemap-plugin", async status => {
            console.log(
                "UploadSourceMapWebPackPlugin apply",
                status.compilation.outputOptions.path
            );
            if (process.env.NODE_ENV === "production") {
                const list = glob.sync(
                    path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`)
                );
                // console.log('list:', list)
                for (let filename of list) {
                    this.upload(this.options.uploadUrl, filename);
                }
            }
        });
    }
    upload(url, file) {
        curFileNo++;
        return new Promise(resolve => {
            console.log("upload Map:", file);

            const req = http.request(
                `${url}?name=${path.basename(file)}&curFileNo=${curFileNo}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        Connection: "keep-alive",
                        "Transfer-Encoding": "chunked"
                    }
                }
            );
            fs.createReadStream(file)
                .on("data", chunk => {
                    req.write(chunk);
                })
                .on("end", () => {
                    req.end();
                    resolve();
                });
        });
    }
}

module.exports = UploadSourceMapWebpackPlugin;