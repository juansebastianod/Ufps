import { Router } from "express";
import {
    registerVigilantController, 
    registerStudentController,
    registerRoomController,
    registerAdmin

} from "../controllers/adminController.js";
const router = Router();


router.post("/register", registerVigilantController);
router.post("/register_student", registerStudentController);
router.post('/register_admin',registerAdmin);
router.post("/rooms", registerRoomController);


export default router;
