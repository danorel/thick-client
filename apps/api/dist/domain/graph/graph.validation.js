"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStocks = void 0;
const express_validator_1 = require("express-validator");
exports.validateStocks = [
    (0, express_validator_1.check)('graph.*.low')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('graph.*.high')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('graph.*.open')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    (0, express_validator_1.check)('graph.*.close')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to')
];
//# sourceMappingURL=graph.validation.js.map