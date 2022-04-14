"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyProps = exports.validateParamsProps = void 0;
const mongoose_1 = require("mongoose");
const express_validator_1 = require("express-validator");
const validateParamsProps = (req, res, next) => {
    const { id } = req.params;
    if (id !== undefined && !mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ ok: false, message: "Id is not valid" });
    }
    next();
};
exports.validateParamsProps = validateParamsProps;
const validateBodyProps = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        const array = result.array();
        return res.status(403).send({ ok: false, message: `${array[0].msg} '${array[0].param}'` });
    }
    next();
};
exports.validateBodyProps = validateBodyProps;
//# sourceMappingURL=domain.middleware.js.map