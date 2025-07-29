import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/signup", signup);// at here there is just callbacks and routes that have been seted up
router.post("/login", login);
router.post("/logout", logout);



export default router;