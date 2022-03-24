import { ip, port } from "../../config/GlobalConfig";
import Decoder from "./Decoder";
export class Net {
    private static mDecoder = new Decoder()
    constructor() { }

    private static init(ip: string, port: number) {
        this.createSocket(ip, port);
    }

    private static mSocket;
    private static createSocket(ip: string, port: number) {
        this.mSocket = new WebSocket("ws://" + ip + ":" + port);

        this.mSocket.on('open', () => {
            console.log("Server connected, waiting for other player join...");
        })
        this.mSocket.on('message', (buffer) => {
            this.mDecoder.decodeData(buffer);
        })
        this.mSocket.on('error', (buffer) => {
            console.log(buffer);
        })
    }

    static get ins() {
        if (!this.mSocket) this.init(ip, port);
        return this.mSocket;
    }
}