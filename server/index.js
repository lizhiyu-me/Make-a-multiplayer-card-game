const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        handlerData(socket, data)
    });
});

function handlerData(socket, data) {
    send(socket, {'msg':'Welcome, friend.'});
}

function send(socket, data) {
    let bufferData = Buffer.from(JSON.stringify(data));
    socket.write(bufferData);
}

server.listen(8080, () => {
    console.log("server listening on 127.0.0.1:8080")
});

