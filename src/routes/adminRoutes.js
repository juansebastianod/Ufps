import { Router } from "express";
import {
    registerVigilantController, 
    registerStudentController,
    registerRoomController,
    login,
    registerAdmin

} from "../controllers/adminController.js";

const router = Router();


router.post("/register", registerVigilantController);
router.post("/register_student", registerStudentController);
router.post("/rooms", registerRoomController);
router.post("/login", login);
router.post('/register_admin',registerAdmin);

export default router;
