import express from "express";

import {validateBody} from "../middleware/validation.middleware.js"
import {loginSchema,userSchema} from "../utils/schema.js"
import {createUserHandler,getUserDetails,loginUser,verifyUser} from "../controllers/userController.js"
import checker from "../middleware/auth.middleware.js"

const router = express.Router();
router.post("/register",validateBody(userSchema),createUserHandler);
router.post("/login",validateBody(loginSchema),loginUser);
router.post("/verify",verifyUser);
router.get("/account",checker,getUserDetails);

export default router;