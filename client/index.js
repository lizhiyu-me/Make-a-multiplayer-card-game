const net = require('net');
const socket = new net.Socket({});

socket.connect({
    host: '127.0.0.1',
    port: 8080
}, onConnected);

socket.on('data', (buffer) => {
    decode(buffer);
})
socket.on('error', (buffer) => {
    console.log(buffer);
});

function onConnected() {
    startGame();
}

function decode(data) {
    console.log(JSON.parse(data).msg);
}

function request(data) {
    const bufferData = Buffer.from(JSON.stringify({ 'msg': data }));
    socket.write(bufferData);
}

function startGame() {
    request('Hello, world!')
}
