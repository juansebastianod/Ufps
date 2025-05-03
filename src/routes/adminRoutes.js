import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";
import { authorizeAdmin } from "../middleware/Authorization .js"; 
import {
    registerGuardtController, 
    registerStudentController,
    registerRoomController,
    registerAdmin

} from "../controllers/adminController.js";
const router = Router();


router.post("/register_guard",authRequired,authorizeAdmin, registerGuardtController );
router.post("/register_student",authRequired,authorizeAdmin, registerStudentController);
router.post('/register_admin',registerAdmin);
router.post("/rooms", registerRoomController);


export default router;
