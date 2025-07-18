import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const getMyResturant = async (req: Request, res: Response):Promise<void> => {
    try{
        const restaurant = await Restaurant.findOne({user: req.userId});
        if(!restaurant){
            res.status(404).json({message: "restaurant not found"});
            return;
        }
        res.json(restaurant);
    }catch(error){
        console.log("error", error);
        res.status(500).json({message: "Error fetching restaurant"});
        return;
    }
}

const createMyRestraurant = async(req: Request, res: Response):Promise<void> => {
    try{
        const existingRestaurant = await Restaurant.find({user:req.userId});

        if(existingRestaurant){
            res.status(409).json({message:"User restaurant already exists"});
            return;
        }

        // const image = req.file as Express.Multer.File;
        // const base64Image = Buffer.from(image.buffer).toString("base64");
        // const dattaURI = `data:${image.mimetype};base64,${base64Image}`

        // const uploadResponse = await cloudinary.v2.uploader.upload(dattaURI);

        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        res.status(201).send(restaurant);
        return;
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateMyRestaurant = async(req: Request, res: Response):Promise<void> => {
    try{
        const restaurant = await Restaurant.findOne({user:req.userId});
        if(!restaurant){
            res.status(400).json({message: "restaurant not found"});
            return;
        }

        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant?.save();
        res.status(200).send(restaurant);
        return;
    }catch(error){
        console.log("error", error);
        res.status(500).json({message: "Something went wrong"});
        return;
    }
}

const uploadImage = async (file:Express.Multer.File) =>{

    const image = file;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dattaURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dattaURI);
        return uploadResponse.url;
}

export  {createMyRestraurant, getMyResturant, updateMyRestaurant};