import { ip, port } from "../../../config/globalConfig";
import { Net } from "../../net/Net";
import { NetFacade } from './../../net/NetFacade';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PreScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onLoad() {
        //Connect to the server(maybe receive data and format for scene rendering) and load the game scene
        new NetFacade();
        Net.init(ip, port, () => {
            cc.director.loadScene("GameScene");
        }
        );
    }

    start() {

    }
}
