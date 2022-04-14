import {check} from "express-validator";

export const validateStock = [
    check('low')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    check('high')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    check('open')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to'),
    check('close')
        .isNumeric()
        .withMessage('Pass number to')
        .notEmpty()
        .withMessage('Pass non-empty value to')
];