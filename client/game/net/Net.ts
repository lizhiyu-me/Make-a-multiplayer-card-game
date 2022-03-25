import { ip, port } from "../../config/GlobalConfig";
import Decoder from "./Decoder";
export class Net {
    private static mDecoder = new Decoder()
    private static mSocket: WebSocket;
    constructor() { }
    private static init(ip: string, port: number) {
        if (!this.mSocket) this.createSocket(ip, port);
    }
    private static createSocket(ip: string, port: number) {
        this.mSocket = new WebSocket("ws://" + ip + ":" + port);

        this.mSocket.addEventListener('open', () => {
            this.mDecoder.serverConnected();
        })
        this.mSocket.addEventListener('message', (buffer) => {
            this.mDecoder.decodeData(buffer);
        })
        this.mSocket.addEventListener('error', (buffer) => {
            console.log(buffer);
        })
    }
    static get ins() {
        if (!this.mSocket) this.init(ip, port);
        return this.mSocket;
    }
}