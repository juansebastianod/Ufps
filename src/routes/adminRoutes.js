import { Router } from "express";
import {
    registerVigilantController , 
    registerStudentController ,
    registerRoomController } from "../controllers/adminController.js";

const router = Router();


router.post("/register", registerVigilantController);
router.post("/register_student", registerStudentController);
router.post("/rooms", registerRoomController);

export default router;
