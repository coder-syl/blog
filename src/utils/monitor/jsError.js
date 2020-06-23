import { addError } from "../../api/error/error"

export function injectJsError() {
    // window.onerror = function(message, source, lineno, colno, error) {
    //     console.log("启动onerror")
    //     console.error(message);
    //     console.error(source);
    //     console.error(lineno);
    //     console.error(colno);
    //     console.error(error.stack);
    //     console.error(JSON.stringify(error));
    //     console.error(error.lineNumber);
    //     console.error(error.description);

    // }
    window.addEventListener("error", function(e) {
        console.log(e)
        let errors = {
            content: e.message,
            errorLineNo: e.lineno,
            errorFilename: e.filename,
            path: e.path[0].location.href,
            errorType: e.type,
            errorLevel: 1,
            userAgent: 'chrome',
            errorStasck: e.error.stack

        };
        addError(errors).then(res => {
            console.log(res)
        });
        console.log(errors);
    });
    window.addEventListener("unhandledrejection", function(event) {
        console.log("------启动unhandledrejection监听器");
        console.log(event, event.lineno);
        let log = {
            kind: "stability",
            type: "error",
            errorType: "jsError",
            url: "",
            message: ""
        };
    });
}