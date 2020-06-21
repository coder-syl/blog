export function injectJsError() {
    // window.onerror = function(message, source, lineno, colno, error) {
    //     console.error('通过onerror捕获到的错误');
    //     console.error(message);
    //     console.error(source);
    //     console.error(lineno);
    //     console.error(colno);
    //     console.error(error);
    // }
    console.log('------start-injectJsError')

    window.addEventListener('error', function(event) {
        console.log('------injectJsError')
        console.log(event, event.lineno)
        let log = {
            kind: 'stability',
            type: 'error',
            errorType: 'jsError',
            url: '',
            message: ""
        }
    });
}