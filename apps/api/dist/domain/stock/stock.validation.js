"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStock = void 0;
const express_validator_1 = require("express-validator");
exports.validateStock = [
    (0, express_validator_1.check)('low')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('high')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('open')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('close')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to')
];
//# sourceMappingURL=stock.validation.js.map