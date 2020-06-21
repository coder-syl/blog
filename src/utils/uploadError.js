export function uploadError({
    lineno,
    colno,
    error: { stack },
    timeStamp,
    message,
    filename
}) {
    // 过滤
    const info = {
        lineno,
        colno,
        stack,
        timeStamp,
        message,
        filename
    };
    console.log(info)
        // const str = Base64.encode(JSON.stringify(info))
        // const str = window.btoa(JSON.stringify(info));
        // const host = "http://localhost:7001/monitor/error";
        // new Image().src = `${host}?info=${str}`;
}