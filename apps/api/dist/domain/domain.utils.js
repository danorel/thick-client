"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.random = void 0;
const random = (min = -1, max = 1) => {
    return min + Math.random() * (max - min);
};
exports.random = random;
const median = (array) => {
    let acc = 0;
    for (let i = 0; i < array.length; ++i) {
        acc += array[i];
    }
    return acc / array.length;
};
exports.median = median;
//# sourceMappingURL=domain.utils.js.map