const express = require("express");
import { userLogin, UserRegister, UserValidation } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", UserRegister);
router.get("/validate", UserValidation);

export default router;