import express from "express";
import {signup,login,logout, updateProfile ,checkAuth} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/signup", signup);// at here there is just callbacks and routes that have been seted up
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile",protectRoute,updateProfile)


router.get("/check", protectRoute,checkAuth)
export default router;