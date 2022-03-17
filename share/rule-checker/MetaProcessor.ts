
import { E_META } from "./Const";

export class MetaProcessor {
    private mMetaLib: { [count: number]: number[][] } = {};
    /**
     * @param arr serials with same value 
     */
    constructor(arr: number[]) {
        this.load(arr);
    }

    private load(arr: number[]) {
        this.update(arr);
    }

    private _val: number;
    get val(): number {
        return this._val;
    }
    set val(v: number) {
        this._val = v;
    }

    getMeta(count: E_META): number[][] {
        return this.mMetaLib[count];
    }

    update(arr: number[]) {
        for (const e in E_META) {
            let _parsed = parseInt(e);
            if (!isNaN(_parsed) && _parsed > 0) this.mMetaLib[_parsed] = this.processByMetaType(arr, _parsed);
        }
    }

    processByMetaType(arr: number[], type: E_META): number[][] {
        let _arr = arr.slice();
        let _res: number[][] = [];
        let _len: number = arr.length;
        while (_len >= type) {
            _res.push(_arr.splice(0, type));
            _len = _arr.length;
        }
        return _res;
    }
}
