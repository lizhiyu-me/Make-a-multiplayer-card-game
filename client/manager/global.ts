
export function getSocket(ip: string, port: number, cb: Function) {
    if (typeof window === "undefined") {
        return new (module.require("net").Socket)({
            host: ip,
            port: port
        }, cb);
    } else {
        return new WebSocket("ws://" + ip + ":" + port);
    }
}