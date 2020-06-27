import { addError } from "../../api/error/error";
import errorStackParser from "error-stack-parser"
export function injectJsError() {
    // window.onerror = function(message, source, lineno, colno, error) {
    //     console.log("启动onerror")
    //     console.error(message);
    //     console.error(source);
    //     console.error(lineno);
    //     console.error(colno);
    //     console.error(error.stack);
    //     console.error(JSON.stringify(error));
    //     console.error(error.lineNumber);
    //     console.error(error.description);
    // }
    window.addEventListener("error", function(e) {
        console.log("error 监控")
        console.log(errorStackParser.parse(e.error)[0].fileName, '------------error');
        let errors = {
            content: e.error.message,
            errorLineNo: errorStackParser.parse(e.error)[0].lineNumber,
            errorFilename: errorStackParser.parse(e.error)[0].fileName,
            errorColumNo: errorStackParser.parse(e.error)[0].columnNumber,
            errorOrigin: "EventListener-error",
            path: e.path[0].location.href,
            errorType: e.message.split(':')[0],
            errorLevel: 1,
            userAgent: navigator.userAgent,
            errorStack: e.error.stack
        };
        addError(errors).then(res => {
            console.log(res);
        });
        console.log(errors);

    });
    window.addEventListener("unhandledrejection", function(event) {
        console.log("------启动unhandledrejection监听器");
        console.log(event, event.lineno);
        console.log('------------unhandledrejection', errorStackParser.parse(event.reason), );
        let errors = {
            content: event.reason.message,
            errorLineNo: errorStackParser.parse(event.reason)[0].lineNumber,
            errorColumNo: errorStackParser.parse(event.reason)[0].columnNumber,
            errorOrigin: "EventListener-unhandledrejection",
            errorFilename: errorStackParser.parse(event.reason)[0].fileName,
            path: event.reason.config.baseURL + event.reason.config.url,
            errorType: event.type,
            errorLevel: 1,
            userAgent: navigator.userAgent,
            errorStack: event.reason.stack
        };
        console.log(errors)
        addError(errors).then(res => {
            console.log(res);
        });
        return
    });
}