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
];

export const validateMyRestaurantRequest = [
    body("restaurantName"). notEmpty().withMessage("Restaurant name is required"),
    body("city"). notEmpty().withMessage("City name is required"),
    body("country"). notEmpty().withMessage("Country name is required"),
    body("deliveryPrice").isFloat({min: 0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({ min:0 }).withMessage("Estimated delivery time must be a positive integer"),
    body("cuisines").isArray().withMessage("cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors
]