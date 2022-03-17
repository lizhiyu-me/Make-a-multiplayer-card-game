export default class Utils {
    static arraysEqual(_arr1, _arr2): boolean {
        if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length)
            return false;
        var arr1 = _arr1.concat().sort();
        var arr2 = _arr2.concat().sort();
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }

    static removeArrFromArr(fromArr: number[], removeArr: number[]): number[] {
        let _res = fromArr.slice();
        removeArr.forEach((v) => {
            let _idx = _res.indexOf(v);
            if (_idx != -1) _res.splice(_idx, 1);
        })
        return _res;
    }
}