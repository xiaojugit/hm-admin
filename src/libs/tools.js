export const forEach = (arr, fn) => {
    if (!arr || !arr.length || !fn) return;
    let i = -1;
    let len = arr.length;
    while (++i < len) {
        let item = arr[i];
        fn(item, i, arr)
    }
};

export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if (keysArr1.length !== keysArr2.length) {
        return false
    } else if (keysArr1.length === 0 && 0 === keysArr2.length) {
        return true
    } else {
        return !keysArr1.some(key => obj1[key] !== obj2[key])
    }
};