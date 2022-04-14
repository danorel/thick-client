import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { validationResult } from "express-validator";

export const validateParamsProps = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined && !Types.ObjectId.isValid(id)) {
        return res.status(400).send({ ok: false, message: "Id is not valid" });
    }
    next();
}

export const validateBodyProps = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const array = result.array();
        return res.status(403).send({ ok: false, message: `${array[0].msg} '${array[0].param}'` });
    }
    next();
}
