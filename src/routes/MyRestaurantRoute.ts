import express from "express";
import multer from "multer";
import {createMyRestraurant, getMyResturant, updateMyRestaurant} from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage= multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

router.get("/", jwtCheck, jwtParse, getMyResturant);
router.post("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, createMyRestraurant);
router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, updateMyRestaurant)

export default router;