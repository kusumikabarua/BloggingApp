const express= require("express");
const router = express.Router();
const authController =require("../controllers/authController")
const authenticateToken =require("../middleware/authenticateToken");
router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/getData",authenticateToken,authController.getData)

module.exports =router;