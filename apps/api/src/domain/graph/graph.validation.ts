import { check } from "express-validator";

export const validateGraph = [
  check("frequency")
    .isNumeric()
    .withMessage("Pass number to")
    .notEmpty()
    .withMessage("Pass non-empty value to")
];

export const validateStocks = [
  check("graph.*.low")
    .isNumeric()
    .withMessage("Pass number to")
    .notEmpty()
    .withMessage("Pass non-empty value to"),
  check("graph.*.high")
    .isNumeric()
    .withMessage("Pass number to")
    .notEmpty()
    .withMessage("Pass non-empty value to"),
  check("graph.*.open")
    .isNumeric()
    .withMessage("Pass number to")
    .notEmpty()
    .withMessage("Pass non-empty value to"),
  check("graph.*.close")
    .isNumeric()
    .withMessage("Pass number to")
    .notEmpty()
    .withMessage("Pass non-empty value to")
];
