const express= require("express");
const authenticateToken = require("../middleware/authenticateToken");
const blogController = require("../controllers/blogController")
const router = express.Router();
router.post("/",authenticateToken,blogController.createBlog) ;
router.get("/",blogController.getAllBlogs);
router.put("/:id",authenticateToken,blogController.updateBlog);
router.delete("/:id",authenticateToken,blogController.deleteBLog);

module.exports =router;