const express= require("express");
const authenticateToken = require("../middleware/authenticateToken");
const commentController = require("../controllers/commentController")
const router = express.Router();
router.post("/:blogId",authenticateToken,commentController.createComment) ;
router.get("/:blogId",commentController.getAllCommentsByBlogId);
router.put("/",authenticateToken,commentController.updateComment);
router.delete("/",authenticateToken,commentController.deleteComment);

module.exports =router;