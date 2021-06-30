let websocket, lockReconnect = false;
let createWebSocket = (url) => {
    websocket = new WebSocket(url);
    websocket.onopen = function () {
        console.log('WebSocket open');//成功连接上Websocket
        websocket.send('1');
    }
    websocket.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    websocket.onmessage = function (event) {
        console.log(event);//打印服务端返回的数据
        //event 为服务端传输的消息，在这里可以处理
    }
}
//关闭连接
let closeWebSocket=()=> {
    websocket && websocket.close();
}
export {
    websocket,
    createWebSocket,
    closeWebSocket
};

