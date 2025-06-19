import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req:Request, res:Response, next: NextFunction):Promise<void> =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return;
    }
    next();
}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("country").isString().notEmpty().withMessage("Country must be string"),
    body("city").isString().notEmpty().withMessage("City must be string"),
    handleValidationErrors
]