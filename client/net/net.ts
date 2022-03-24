import Decoder from "./decoder";

export class Net{
    constructor(private mDecoder = new Decoder()){}
    private mSocket;
    private createSocket(ip: string, port: number) {
        this.mSocket = new WebSocket("ws://" + ip + ":" + port);

        this.mSocket.on('open', (buffer) => {
            console.log("Server connected, waiting for other player join...");
        })
        this.mSocket.on('message', (buffer) => {
            this.mDecoder.decodeData(buffer);
        })
        this.mSocket.on('error', (buffer) => {
            console.log(buffer);
        })
    }
}